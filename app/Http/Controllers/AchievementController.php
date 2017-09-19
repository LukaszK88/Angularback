<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\Event;
use Illuminate\Http\Request;

class AchievementController extends ApiController
{
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($userId = null)
    {
        //TODO split into 2 methods
        if(!$userId){
            $userId = $this->request->query('id');
        }
        if($userId){
            $achievements = Achievement::with('event')->where(Achievement::COL_USER_ID,$userId)->get();

            $countires = Achievement::
                with(['event' =>function($query) {
                    $query->select('id',Event::COL_LOCATION);
                }])
                ->where(Achievement::COL_USER_ID,$userId)
                ->groupBy(Achievement::COL_EVENT_ID)
                ->get();

            $response = [
                'data' => [
                    'data' => $achievements,
                    'achievement' => [
                        'gold' => $achievements->where("place","1st")->count(),
                        'silver' => $achievements->where("place","2nd")->count(),
                        'bronze' => $achievements->where("place","3rd")->count(),
                        'countries' => $countires
                    ]

                ]
            ];
            return $this->respond($response);
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
    public function store(Request $request)
    {
        $data = $request->all();

        if(!$data) return $this->respondWithError('Achievement Save failed');

        $data[Achievement::COL_CUP] = $this->prepareCup($data);

        $achievement = Achievement::create($data);

        return $this->respondWithMessageAndData('Achievement added',$achievement);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $achievementId
     * @return \Illuminate\Http\Response
     */
    public function show($achievementId)
    {
       $achievement = Achievement::findOrFail('id',$achievementId)
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
    public function update(Request $request, $achievementId)
    {
        $data = $request->all();

        if(!$data) return $this->respondWithError('Achievement Update failed');

        $data[Achievement::COL_CUP] = $this->prepareCup($data);

        Achievement::findOrFail($achievementId)->update($data);

        return $this->responseCreated('Achievement updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function deleteAchievement($achievementId)
    {
       $achievement = Achievement::find($achievementId);

       if($achievementId){
           $achievement->delete();

           return $this->responseDeleted('Achievement Deleted');
       }
    }

    private function prepareCup($data)
    {
        if($data['place'] === '3rd'){
            return "<font color='#a52a2a'><i class='fa fa-trophy fa-2x' aria-hidden='true'></i></font>";
        }elseif ($data['place'] === '2nd'){
            return "<font color='silver'><i class='fa fa-trophy fa-2x' aria-hidden='true'></i></font>";
        }else{
            return "<font color='#ffd700'><i class='fa fa-trophy fa-2x' aria-hidden='true'></i></font>";
        }
    }
}
