<?php

namespace App\Http\Controllers;

use App\Achievement;
use Illuminate\Http\Request;

class AchievementController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($userId)
    {
        if($userId){
            $achievements = Achievement::where('user_id',$userId)->get();

            $response = [
                'data' => [
                    'data' => $achievements,

                    'achievement' => [
                        'gold' => $achievements->where("place","1st")->count(),
                        'silver' => $achievements->where("place","2nd")->count(),
                        'bronze' => $achievements->where("place","3rd")->count(),
                        'countries' => Achievement::select('location')->where('user_id',$userId)->distinct()->get()
                    ]

                ]
            ];

            return response()->json($response, 200);
        }
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
    public function store($userId, $achievementId = null, Request $request)
    {
        $data = $request->all();

        if($data){

            if($request->input('place') === '3rd'){
                $cup = "<font color='#a52a2a'><i class='fa fa-trophy fa-2x' aria-hidden='true'></i></font>";
            }elseif ($request->input('place') === '2nd'){
                $cup = "<font color='silver'><i class='fa fa-trophy fa-2x' aria-hidden='true'></i></font>";
            }else{
                $cup = "<font color='#ffd700'><i class='fa fa-trophy fa-2x' aria-hidden='true'></i></font>";
            }

            if(array_key_exists('id',$data)){
                $achievementId = $data['id'];
            }

            $date = substr($data['date'],0,10);

            $achievement = Achievement::updateOrCreate(['id' => $achievementId],[
                'user_id' => $userId,
                'category' => $data['category'],
                'competition_name' => $data['competition_name'],
                'location' => $data['location'],
                'place' => $data['place'],
                'cup'   => $cup,
                'date' => $date,

            ]);

            return $this->respondWithMessageAndData('Achievement added',$achievement);
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($userid, $achievementId)
    {
       $achievement = Achievement::where('user_id',$userid)
           ->where('id',$achievementId)
           ->first();
       return $this->respond($achievement);
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
    public function deleteAchievement($userId, $achievementId)
    {
       $achievement = Achievement::find($achievementId);

       if($achievementId){
           $achievement->delete();

          // return $this->respond($achievement);
           return $this->responseDeleted('Achievement Deleted');
       }
    }
}
