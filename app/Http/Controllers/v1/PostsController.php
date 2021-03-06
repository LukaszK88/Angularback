<?php

namespace App\Http\Controllers\v1;

use App\Models\Image;
use App\Models\Post;
use App\Models\PostType;
use App\Models\Video;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostsController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
//        $posts =
//           Post::join(Image::TABLE,Post::TCOL_ID,'=',Image::TCOL_POST_ID)
//                ->join(PostType::TABLE,PostType::TABLE.'.'.PostType::COL_ID,'=',Post::TCOL_POST_TYPE)
//                ->select('post.*',PostType::TCOL_TYPE, Image::TCOL_URL)
//                ->whereNotNull(Post::TCOL_BODY)
//                ->where(Image::TCOL_IMAGE_TYPE_ID,1)
//                ->with('user')
//                ->get();
//
//        return $this->respond($posts);
    }

    public function getPostsOfType($type)
    {
        $posts = Post::leftJoin(Image::TABLE, function ($join) {
                    $join->on(Post::TCOL_ID,'=',Image::TCOL_POST_ID)
                        ->where(Image::TCOL_IMAGE_TYPE_ID, '=', 1);})
                ->leftJoin(Video::TABLE, function ($join) {
                    $join->on(Post::TCOL_ID,'=',Video::TCOL_POST_ID)
                        ->where(Video::TCOL_VIDEO_TYPE_ID, '=', 1);
                    ;})
                ->join(PostType::TABLE,PostType::TABLE.'.'.PostType::COL_ID,'=',Post::TCOL_POST_TYPE)

                ->select('post.*',PostType::TCOL_TYPE, Image::TCOL_URL, Video::TCOL_URL.' AS video_url')
               // ->where(Post::TCOL_POST_TYPE,$type)
                ->where(PostType::TCOL_SLUG,$type)
                ->whereNotNull(Post::TCOL_BODY)
                ->groupBy(Post::TCOL_ID)
                //->with('image')
                ->with('user')
                ->get();

        return $this->respond($posts);
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
        $data = $request->all();

        $post = Post::create($data);

        return $this->respond($post);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::with('user')
            ->with('image')
            ->with('video')
            ->with(['comments' => function($query){
                $query->orderBy('created_at','desc');
                $query->orderBy('updated_at','desc');
                $query->with(['user' => function($q) {
                    $q->select('id','name','username');
                }]);
                $query->with(['replies' => function($repliesQuery) {
                    $repliesQuery->orderBy('created_at','desc');
                    $repliesQuery->orderBy('updated_at','desc');
                    $repliesQuery->with(['user' => function($repliesUserQuery) {
                        $repliesUserQuery->select('id','name','username');
                    }]);
                }]);
            }])
            ->with('postType')
            ->find($id);

        $now = Carbon::now();

        foreach ($post['comments'] as $comment){
            //TODO function
            $comment['posted'] = $now->diffForHumans($comment['created_at'], true);
            if(!is_null($comment['updated_at'])){
                $comment['comment_update'] = $now->diffForHumans($comment['updated_at'], true);
            }
            foreach($comment['replies'] as $reply){
                $reply['posted'] = $now->diffForHumans($reply['created_at'], true);
                if(!is_null($reply['updated_at'])){
                    $reply['reply_update'] = $now->diffForHumans($reply['updated_at'], true);
                }
            }
        }

        return $this->respond($post);
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
        $data = $request->all();

        Post::where(Post::COL_ID,$id)
            ->update([
                'title' => $data['title'],
                'body'  => $data['body'],
            ]);

        return $this->responseCreated('Post Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Post::find($id)->delete();

        $this->responseDeleted('Post Deleted');
    }
}
