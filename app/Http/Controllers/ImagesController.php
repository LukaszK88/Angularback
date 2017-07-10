<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImagesController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $gallery = Post::with('image')
                        ->with('user')
                        ->where('gallery',1)
                        ->get();

        return $this->respond($gallery);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    public function storePostImages(Request $request, $postId, $type)
    {

        if($type == '2'){
            $file = $request->file('file');

            $name = $file->getClientOriginalName();

            Storage::disk('local')->put('public/post-' . $postId . '/' . $name, file_get_contents($file->getRealPath()));

            $imageUrl = config('app.url') . '/storage/post-' . $postId . '/' . $name;

            Image::create([
                'image_type_id' => $type,
                'url' => $imageUrl,
                'post_id' => $postId
            ]);

        }elseif($type == '1') {

            $file = $request->file('file');

            $name = $file['header']->getClientOriginalName();

            Storage::disk('local')->put('public/post-' . $postId . '/' . $name, file_get_contents($file['header']->getRealPath()));

            $imageUrl = config('app.url') . '/storage/post-' . $postId . '/' . $name;

            Image::create([
                'image_type_id' => $type,
                'url' => $imageUrl,
                'post_id' => $postId
            ]);

            return $this->responseCreated('Header added');
        }
    }

    public function storeEventImages(Request $request, $eventId, $type)
    {


            $file = $request->file('file');

            $name = $file['header']->getClientOriginalName();

            Storage::disk('local')->put('public/event-' . $eventId . '/' . $name, file_get_contents($file['header']->getRealPath()));

            $imageUrl = config('app.url') . '/storage/event-' . $eventId . '/' . $name;

            Image::create([
                'image_type_id' => $type,
                'url' => $imageUrl,
                'event_id' => $eventId
            ]);

            return $this->responseCreated('Header added');

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($postId)
    {
        $postImages = Image::where('post_id',$postId)
            ->where('image_type_id','<=' ,2)
            ->inRandomOrder()
            ->limit(4)
            ->get();

        return $this->respond($postImages);
    }

    public function showGalleryById($postId)
    {
        $galleryImages = Image::where('post_id',$postId)
            ->where('image_type_id','<=',2)
            ->get();

        return $this->respond($galleryImages);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Image::find($id)->delete();

        $this->responseDeleted('Image Deleted');
    }

    public function deleteGallery($postId)
    {
        Image::where(Image::COL_POST_ID,$postId)->delete();

        $post = Post::find($postId);
        if($post->body === null){
            $post->delete();
        }elseif ($post->body){
            $post->update([
                Post::COL_GALLERY => 0
            ]);
        }

        $this->responseDeleted('Gallery Deleted');
    }
}
