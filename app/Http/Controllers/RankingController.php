<?php

namespace App\Http\Controllers;

use App\Models\Bohurt;
use App\Http\Transformers\RankingTransformer;
use App\Models\Longsword;
use App\Models\Polearm;
use App\Models\Profight;
use App\Models\SwordBuckler;
use App\Models\SwordShield;
use App\Models\Triathlon;
use App\Models\User;

use Carbon\Carbon;
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

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index($id = null)
    {
        if(!$id) {
            $fighters = User::with('bohurt')
                ->with('profight')
                ->with('swordShield')
                ->with('longsword')
                ->with('swordBuckler')
                ->with('polearm')
                ->with('triathlon')
                ->where('name', '!=', '')
                ->get();
        }
        elseif ($id){
            $fighters = User::with('bohurt')
                ->with('profight')
                ->with('swordShield')
                ->with('longsword')
                ->with('swordBuckler')
                ->with('polearm')
                ->with('triathlon')
                ->where('id', $id)
                ->first();
        }
        $response = [
            'fighters' => $fighters
        ];

        return response()->json($response, 200);

    }

    public function saveBohurt(Request $request, Bohurt $bohurt)
    {
        $record = $this->saveTypeRecord($request, $bohurt);

        if($record){
            $record->update([
                'fights' => $record->suicide + $record->down + $record->last + $record->won,
                'points' => ((($record->won * 2) + $record->last) - ($record->suicide * 3))
            ]);

            $this->addTotalPoints($request->input('fighterId'), $record->points);
        }

        return $this->responseCreated('Fighter record updated');

    }

    protected function saveProfight(Profight $profight, Request $request)
    {
        $record = $this->saveTypeRecord($request, $profight);

        if($record){
            $record->update([
                'fights' => $record->win + $record->ko + $record->loss,
                'points' => (($record->win * 3) + ($record->ko * 4) + ($record->loss) + ($record->fc_1 * 10) + ($record->fc_2 * 6) + ($record->fc_3 * 3))
            ]);

            $this->addTotalPoints($request->input('fighterId'), $record->points);
        }

        return $this->responseCreated('Fighter record updated');

    }

    protected function saveSwordShield(Request $request, SwordShield $swordShield)
    {
        $record = $this->saveTypeRecord($request, $swordShield);

        if($record){
            $record->update([
                'fights' => $record->win + $record->loss,
                'points' => $record->win
            ]);

            $this->addTotalPoints($request->input('fighterId'), $record->points);
        }

        return $this->responseCreated('Fighter record updated');

    }

    protected function saveLongsword(Request $request, Longsword $longsword)
    {
        $record = $this->saveTypeRecord($request, $longsword);

        if($record){
            $record->update([
                'fights' => $record->win + $record->loss,
                'points' => $record->win
            ]);

            $this->addTotalPoints($request->input('fighterId'), $record->points);
        }

        return $this->responseCreated('Fighter record updated');

    }

    protected function saveSwordBuckler(Request $request, SwordBuckler $swordBuckler)
    {
        $record = $this->saveTypeRecord($request, $swordBuckler);

        if($record){
            $record->update([
                'fights' => $record->win + $record->loss,
                'points' => $record->win
            ]);

            $this->addTotalPoints($request->input('fighterId'), $record->points);
        }

        return $this->responseCreated('Fighter record updated');

    }

    protected function savePolearm(Request $request, Polearm $polearm)
    {
        $record = $this->saveTypeRecord($request, $polearm);

        if($record){
            $record->update([
                'fights' => $record->win + $record->loss,
                'points' => $record->win
            ]);

            $this->addTotalPoints($request->input('fighterId'), $record->points);
        }

        return $this->responseCreated('Fighter record updated');

    }

    protected function saveTriathlon(Request $request, Triathlon $triathlon)
    {
        $record = $this->saveTypeRecord($request, $triathlon);

        if($record){
            $record->update([
                'fights' => $record->win + $record->loss,
                'points' => $record->win
            ]);

            $this->addTotalPoints($request->input('fighterId'), $record->points);
        }

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

    private function saveTypeRecord($request, $class){

        foreach ($request->all() as $record => $value){
            $records[] = $record;
            $values[] = $value;
        }

        $fighterId = ['user_id' => $request->input($records[1])];

        $data = array_merge($values[0],$fighterId);

        $savedRecord = $class->create($data);

        return $savedRecord;
    }

    private function addTotalPoints($fighterId, $record){

        $user = User::find($fighterId);
        $user->update([
            'total_points' => ($user->total_points + $record)
        ]);
    }

}