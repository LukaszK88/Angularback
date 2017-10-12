<?php

namespace App\Http\Controllers;

use App\Mail\ClubActivated;
use App\Mail\ClubRegistration;
use App\Models\Club;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class ClubsController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clubs = Club::where(Club::COL_ACTIVE,1)->get();

        return $this->respond($clubs);
    }

    public function getAllClubs()
    {
        $clubs = Club::all();

        return $this->respond($clubs);
    }

    public function takeClubAdminAction($action,Request $request)
    {
        $club = $request->all();

        if($action == 'approve'){
            Club::where(Club::COL_ID,$club['id'])->update([Club::COL_ACTIVE => 1]);
            //email
            Mail::to($club['founder'])->send(new ClubActivated($club));
        }else if($action == 'decline'){
            Club::where(Club::COL_ID,$club['id'])->update([Club::COL_ACTIVE => null]);
        }

        return $this->respond('Action taken');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

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

        $club = Club::where(Club::COL_NAME,$data['name'])->first();

        if($club) return $this->responseCreated('Club already exists');

        Club::create($data);

        Mail::to(config('app.myEmail'))->send(new ClubRegistration($data));

        return $this->responseCreated('Club Registered, we will get back to you with confirmation soon...');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $club = Club::with('users')->where(Club::COL_ID,$id)->first();

        $total = 0;
        $gold = 0;
        $silver = 0;
        $bronze = 0;
        foreach ($club->users as $user){
            $gold += $user->achievement->where('place','1st')->count();
            $silver += $user->achievement->where('place','2nd')->count();
            $bronze += $user->achievement->where('place','3rd')->count();

            $total += $user->bohurt->sum('fights');
            $total += $user->profight->sum('fights');
            $total += $user->swordBuckler->sum('fights');
            $total += $user->swordShield->sum('fights');
            $total += $user->longsword->sum('fights');
            $total += $user->triathlon->sum('fights');
            $total += $user->polearm->sum('fights');
        }

        $club['total_fights'] = $total;
        $club['gold'] = $gold;
        $club['silver'] = $silver;
        $club['bronze'] = $bronze;

        return $this->respond($club);
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

        Club::where(Club::COL_ID,$id)->update($data);

        return $this->respondWithMessage('Club Info Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function storeClubLogo(Request $request, $id, Club $club)
    {

        $file = $request->file('file');

        $name = $file->getClientOriginalName();

        Storage::disk('local')->put('public/club-assets/'.$id.'/'.$name , file_get_contents($file->getRealPath()));

        $imageUrl = config('app.url').'/storage/club-assets/'.$id.'/'.$name;

        $club->updateOrCreate(['id'=> $id]
            ,['logo' => $imageUrl]);

        $response = [
            'message' => 'Photo Uploaded',
            'imageUrl' => $imageUrl
        ];

        return response()->json($response, 200);

    }
}
