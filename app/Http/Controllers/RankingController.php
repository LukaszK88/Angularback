<?php

namespace App\Http\Controllers;

use App\Models\Bohurt;
use App\Http\Transformers\RankingTransformer;
use App\Models\Club;
use App\Models\Longsword;
use App\Models\Polearm;
use App\Models\Profight;
use App\Models\SwordBuckler;
use App\Models\SwordShield;
use App\Models\Triathlon;
use App\Models\User;
use App\Services\RankingService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;



class RankingController extends ApiController
{

    protected $rankingTransformer;

    protected $rankingService;

    protected   $bohurt,
                $profight,
                $swordShield,
                $swordBuckler,
                $longsword,
                $polearm,
                $triathlon;

    public function __construct(
        RankingService $rankingService,
        RankingTransformer $rankingTransformer,
        Bohurt $bohurt,
        Profight $profight,
        SwordShield $swordShield,
        SwordBuckler $swordBuckler,
        Longsword $longsword,
        Polearm $polearm,
        Triathlon $triathlon
        )
    {
        $this->rankingService = $rankingService;
        $this->rankingTransformer = $rankingTransformer;
        $this->bohurt = $bohurt;
        $this->profight = $profight;
        $this->swordShield = $swordShield;
        $this->swordBuckler = $swordBuckler;
        $this->longsword = $longsword;
        $this->polearm = $polearm;
        $this->triathlon = $triathlon;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function getFighters($clubId, $date = null)
    {
        $rawFighters = User::with('bohurt.event')
            ->with('profight.event')
            ->with('swordShield.event')
            ->with('longsword.event')
            ->with('swordBuckler.event')
            ->with('polearm.event')
            ->with('triathlon.event')
            ->with('club')
            ->whereNotNull('name')
            ->where(User::COL_CLUB_ID,'!=',0);

        if($date === '2017'){
            //start date range in 2018
        }

        if(empty($clubId)){
            $rawFightersData = $rawFighters->get();
        }else{
            $rawFightersData = $rawFighters->where('club_id',$clubId)->get();
        }

        $data = $this->prepareFightersDataForRanking($rawFightersData);
        //return $this->respond($data);
        //$fighters = $this->rankingTransformer->transformCollection($data);

        return $this->respond($data);
    }

    public function getFighter($id, User $user)
    {
        $fighter = User::with('bohurt')
            ->with('profight')
            ->with('swordShield')
            ->with('longsword')
            ->with('swordBuckler')
            ->with('polearm')
            ->with('club')
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

        $fighter['age'] = Carbon::parse($fighter['age'])->diffInYears(Carbon::now('Europe/London'));

        return $this->respond($fighter);
    }

    private function prepareFightersDataForRanking($fighters)
    {
        foreach ($fighters as $key => $fighter){
            $fighter['total_points'] = intval($fighter->total_points);
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
        foreach ($leaderBoardTables as $leaderBoardTable){
            $data[$leaderBoardTable] = (array)$this->getMaxPointsPerRankingTable($leaderBoardTable);
            $data[$leaderBoardTable]['category'] = $leaderBoardTable;
        }

        $data = array_map(function($data){
            return[
                'id' => $data['id'],
                'club' => $data['club'],
                'image' => $data['image'],
                'fb_image' => $data['facebook_picture'],
                'created_at' => $data['created_at'],
                'name' => $data['name'],
                'max_points' => $data['max_points'],
                'category' => ucfirst(str_replace('_',' ',$data['category']))
            ];
        },$data);

        $data['The Rock'] = DB::table('bohurts')
            ->join('users','users.id','=','bohurts.user_id')
            ->join('clubs','clubs.id','=','users.club_id')
            ->select(DB::raw('(abs(((sum(suicide) + sum(down)) / sum(fights) *100)-100)) as max_points'),
                'bohurts.created_at',
                'users.name',
                User::TCOL_ID,
                User::TCOL_FACEBOOK_IMG,
                User::TCOL_IMG,
                Club::TCOL_NAME.' as club'
            )
            ->groupBy('bohurts.user_id')
            ->orderBy('max_points','desc')
            ->first();
        $data['The Rock']->fb_picture = $data['The Rock']->facebook_picture;
        unset($data['The Rock']->facebook_picture);
        $data['The Rock']->max_points = substr($data['The Rock']->max_points,0,2).' %';
        $data['The Rock']->category = 'The Rock';

        return $this->respond($data);
    }

    public function updateRankingRecord(Request $request, $category, $recordId, $userId )
    {
        $data = $request->all();

        $user = User::find($userId);

        $categoriesTables = [
            'bohurt' => $this->bohurt,
            'profight' => $this->profight,
            'sword_shield' => $this->swordShield,
            'sword_buckler' => $this->swordBuckler,
            'longsword' => $this->longsword,
            'polearm' => $this->polearm,
            'triathlon' => $this->triathlon
        ];

        foreach ($categoriesTables as $cat => $table){
            if($cat == $category){
                $oldRecord = $table->find($recordId);

                switch ($cat){
                    case 'bohurt':
                        $user->update([User::COL_TOTAL_POINTS => $user->total_points - $this->rankingService->calculateBohurtPoints($oldRecord)]);
                        break;
                    case 'profight':
                        $user->update([User::COL_TOTAL_POINTS => $user->total_points - $this->rankingService->calculateProfightPoints($oldRecord)]);
                        break;
                    default:
                        $user->update([User::COL_TOTAL_POINTS => $user->total_points - $oldRecord->win]);
                        break;
                }

                $newRecord = $table->updateOrCreate(['id' => $recordId], $data);

                switch ($cat){
                    case 'bohurt':
                        $newRecord->update([
                            'fights' => $this->rankingService->addBohurtFights($newRecord),
                            'points' => $this->rankingService->calculateBohurtPoints($newRecord)
                       ]);
                        break;
                    case 'profight':
                        $newRecord->update([
                            'fights' => $this->rankingService->addProfightFights($newRecord),
                            'points' => $this->rankingService->calculateProfightPoints($newRecord)
                        ]);
                        break;
                    default:
                        $newRecord->update([
                            'fights' => $newRecord->win + $newRecord->loss,
                            'points' => $newRecord->win
                        ]);
                        break;

                }
                $this->addTotalPoints($newRecord->user_id, $newRecord->points);
            }
        }

        return  $this->responseCreated('Record Updated');
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
                ->join('clubs','clubs.id','=','users.club_id')
                ->select(
                    ''.$table.'.created_at',
                    User::TCOL_NAME,
                    User::TCOL_ID,
                    User::TCOL_FACEBOOK_IMG,
                    User::TCOL_IMG,
                    Club::TCOL_NAME.' as club',
                    DB::raw('sum(points) as max_points'))
                ->groupBy(''.$table.'.user_id')
                ->orderBy('max_points','desc')
                ->first();
    }

}