<?php

namespace App\Http\Controllers;

use App\Bohurt;
use App\Profight;
use App\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Transformers\UserTransformer;
use Illuminate\Support\Facades\Storage;


class RankingController extends ApiController
{
    protected $userTransformer;

    /**
     * FightersController constructor.
     */
    public function __construct(UserTransformer $userTransformer)
    {
        $this->userTransformer = $userTransformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function tableData()
    {

        $fighters = User::with('bohurt')->with('profight')->where('name', '!=', '')->get();

        $response = [
            'fighters' => $fighters
        ];

        return response()->json($response, 200);

    }

    public function saveBohurt(Request $request)
    {
        $record = Bohurt::create([
                'user_id' => $request->input('fighterId'),
                'won' => $request->input('bohurt.won'),
                'last' => $request->input('bohurt.last'),
                'down' => $request->input('bohurt.down'),
                'suicide' => $request->input('bohurt.suicide'),
                'fights' => $request->input('bohurt.suicide') + $request->input('bohurt.down') + $request->input('bohurt.last') + $request->input('bohurt.won'),
                'points' => ((($request->input('bohurt.won') * 2) + $request->input('bohurt.last')) - ($request->input('bohurt.suicide') * 3))
            ]
        );

        $this->addTotalPoints($request->input('fighterId'), $record->points);

        return $this->responseCreated('Fighter record updated');

    }

    protected function saveProfight(Request $request)
    {
        $record = Profight::create([
                'user_id' => $request->input('fighterId'),
                'win' => $request->input('profight.win'),
                'loss' => $request->input('profight.loss'),
                'ko' => $request->input('profight.ko'),
                'fc_1' => $request->input('profight.fc_1'),
                'fc_2' => $request->input('profight.fc_2'),
                'fc_3' => $request->input('profight.fc_3'),
                'points' => ($request->input('profight.fc_3') * 3) + ($request->input('profight.fc_2') * 6) + ($request->input('profight.fc_1') * 10) + ($request->input('profight.win') * 3) + ($request->input('profight.ko') * 4) + $request->input('bohurt.suicide')
            ]
        );

        $this->addTotalPoints($request->input('fighterId'), $record->points);

        return $this->responseCreated('Fighter record updated');

    }


    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    private function addTotalPoints($fighterId, $record){

        $user = User::find($fighterId);
        $user->update([
            'total_points' => ($user->total_points + $record)
        ]);
    }

}