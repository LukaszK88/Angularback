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
use Illuminate\Support\Facades\DB;



class RankingController extends ApiController
{

    protected $rankingTransformer;

    public function __construct(RankingTransformer $rankingTransformer)
    {
        $this->rankingTransformer = $rankingTransformer;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function getFighters($id = null, User $user)
    {
        if(!$id) {
            $rawFightersData = User::with('bohurt')
                ->with('profight')
                ->with('swordShield')
                ->with('longsword')
                ->with('swordBuckler')
                ->with('polearm')
                ->with('triathlon')
                ->where('name', '!=', '')
                ->get();

            $data = $this->prepareFightersDataForRanking($rawFightersData);

            $fighters = $this->rankingTransformer->transformCollection($data);
        }
        elseif ($id) {
            $fighter = User::with('bohurt')
                ->with('profight')
                ->with('swordShield')
                ->with('longsword')
                ->with('swordBuckler')
                ->with('polearm')
                ->with('triathlon')
                ->where('id', $id)
                ->first();

            $fighter['bohurtTable'] = [
                'lastMan' => $fighter->bohurt->sum('last'),
                'fights' => $fighter->bohurt->sum('fights'),
                'won' => $fighter->bohurt->sum('won'),
                'suicide' => $fighter->bohurt->sum('suicide'),
                'points' => $fighter->bohurt->sum('points'),
                'down' => $fighter->bohurt->sum('down')
            ];
            $fighter['profightTable'] = [
                'loss' => $fighter->profight->sum('loss'),
                'fights' => $fighter->profight->sum('fights'),
                'win' => $fighter->profight->sum('win'),
                'ko' => $fighter->profight->sum('ko'),
                'fc1' => $fighter->profight->sum('fc_1'),
                'fc2' => $fighter->profight->sum('fc_2'),
                'fc3' => $fighter->profight->sum('fc_3'),
                'points' => $fighter->profight->sum('points')
            ];
            $fighter['swordShieldTable'] = $this->standardTableData($fighter,'swordShield');
            $fighter['swordBucklerTable'] = $this->standardTableData($fighter,'swordBuckler');
            $fighter['longswordTable'] = $this->standardTableData($fighter,'longsword');
            $fighter['polearmTable'] = $this->standardTableData($fighter,'polearm');
            $fighter['triathlonTable'] = $this->standardTableData($fighter,'triathlon');

            $fighters = $fighter;


            $fighters['age'] = Carbon::parse($fighters['age'])->diffInYears(Carbon::now('Europe/London'));
        }

        return $this->respond($fighters);
    }

    private function prepareFightersDataForRanking($fighters)
    {
        foreach ($fighters as $key => $fighter){
            $fighter['bohurtTable'] = [
                'lastMan' => $fighter->bohurt->sum('last'),
                'fights' => $fighter->bohurt->sum('fights'),
                'won' => $fighter->bohurt->sum('won'),
                'suicide' => $fighter->bohurt->sum('suicide'),
                'points' => $fighter->bohurt->sum('points'),
                'down' => $fighter->bohurt->sum('down')
            ];
            $fighter['profightTable'] = [
                'loss' => $fighter->profight->sum('loss'),
                'fights' => $fighter->profight->sum('fights'),
                'win' => $fighter->profight->sum('win'),
                'ko' => $fighter->profight->sum('ko'),
                'fc1' => $fighter->profight->sum('fc_1'),
                'fc2' => $fighter->profight->sum('fc_2'),
                'fc3' => $fighter->profight->sum('fc_3'),
                'points' => $fighter->profight->sum('points')
            ];
            $fighter['swordShieldTable'] = $this->standardTableData($fighter,'swordShield');
            $fighter['swordBucklerTable'] = $this->standardTableData($fighter,'swordBuckler');
            $fighter['longswordTable'] = $this->standardTableData($fighter,'longsword');
            $fighter['polearmTable'] = $this->standardTableData($fighter,'polearm');
            $fighter['triathlonTable'] = $this->standardTableData($fighter,'triathlon');

        }

        return $fighters;
    }

    private function standardTableData($fighter,$table)
    {
        $columns=['loss','fights','win','points'];
        foreach ($columns as $key => $col){
            $columns[$col] = $fighter[$table]->sum($col);
            if(is_numeric($key)) unset($columns[$key]);
        }
        return $columns;
    }

    //leaderboard
    public function getTableData()
    {
        $data = [];
        $leaderBoardTables = ['bohurts','profights', 'sword_shield', 'sword_buckler', 'longswords', 'polearm', 'triathlon'];
        foreach ($leaderBoardTables as $key => $leaderBoardTable){
            $data[$leaderBoardTable] = $this->getMaxPointsPerRankingTable($leaderBoardTable);
            $data[$leaderBoardTable]->category = $leaderBoardTable;
        }

        $data = array_map(function($data){
            return[
                'created_at' => $data->created_at,
                'name' => $data->name,
                'max_points' => $data->max_points,
                'category' => ucfirst(str_replace('_',' ',$data->category))
            ];
        },$data);

        $data['The Rock'] = DB::table('bohurts')
            ->join('users','users.id','=','bohurts.user_id')
            ->select(DB::raw('(abs(((sum(suicide) + sum(down)) / sum(fights) *100)-100)) as max_points'),'bohurts.created_at','users.name')
            ->groupBy('bohurts.user_id')
            ->orderBy('max_points','desc')
            ->first();
        $data['The Rock']->max_points = substr($data['The Rock']->max_points,0,2).' %';
        $data['The Rock']->category = 'The Rock';

        return $this->respond($data);
    }

    public function saveBohurt(Request $request, Bohurt $bohurt)
    {
        $record = $this->saveTypeRecord($request, $bohurt);

        if($record){
            $record->update([
                'fights' => $record->suicide + $record->down + $record->last + $record->won,
                'points' => ((($record->won * 2) + $record->last) - ($record->suicide * 3))
            ]);

            $this->addTotalPoints($record->user_id, $record->points);
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

            $this->addTotalPoints($record->user_id, $record->points);
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

            $this->addTotalPoints($record->user_id, $record->points);
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

            $this->addTotalPoints($record->user_id, $record->points);
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

            $this->addTotalPoints($record->user_id, $record->points);
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

            $this->addTotalPoints($record->user_id, $record->points);
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

            $this->addTotalPoints($record->user_id, $record->points);
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

        $savedRecord = $class->create($request->all());

        return $savedRecord;
    }

    private function addTotalPoints($fighterId, $record){

        $user = User::find($fighterId);
        $user->update([
            'total_points' => ($user->total_points + $record)
        ]);
    }

    private function getMaxPointsPerRankingTable($table)
    {
        return DB::table($table)
                ->join('users','users.id','=',''.$table.'.user_id')
                ->select(''.$table.'.created_at','users.name',DB::raw('sum(points) as max_points'))
                ->groupBy(''.$table.'.user_id')
                ->orderBy('max_points','desc')
                ->first();
    }

}