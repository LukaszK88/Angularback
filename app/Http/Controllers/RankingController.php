<?php

namespace App\Http\Controllers;

use App\Contracts\Repositories\FighterRepositoryInterface;
use App\Http\Transformers\RankingTransformer;
use App\Models\User;
use App\Services\RankingService;
use Carbon\Carbon;
use Illuminate\Http\Request;


class RankingController extends ApiController
{
    protected $rankingTransformer;

    protected $fighter;

    protected $rankingService;

    public function __construct(
        FighterRepositoryInterface $fighterRepository,
        RankingService $rankingService,
        RankingTransformer $rankingTransformer
        )
    {
        $this->fighter = $fighterRepository;
        $this->rankingService = $rankingService;
        $this->rankingTransformer = $rankingTransformer;
    }

    public function getFighters($clubId = null, $year)
    {
        $rawFightersData = $this->fighter->getAllByDateAndClub($clubId,$year);

        $data = $this->rankingService->prepareFightersDataForRanking($rawFightersData);

        return $this->respond($data);
    }

    public function getFighter($id)
    {
        $fighter = $this->fighter->getById($id);

        $fighter = $this->rankingService->prepareFighterDataForRanking($fighter);
        $fighter['age'] = Carbon::parse($fighter['age'])->diffInYears(Carbon::now('Europe/London'));

        return $this->respond($fighter);
    }

    public function getLeaderboardTableData()
    {
        $data = [];
        $leaderBoardTables = ['bohurts','profights', 'sword_shield', 'sword_buckler', 'longswords', 'polearm', 'triathlon'];
        foreach ($leaderBoardTables as $leaderBoardTable){
            $data[$leaderBoardTable] = (array)$this->fighter->getMaxPointsPerCategory($leaderBoardTable);
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

        $data['The Rock'] = $this->fighter->getBestBohurtStandingRatio();
        $data['The Rock']->fb_picture = $data['The Rock']->facebook_picture;
        unset($data['The Rock']->facebook_picture);
        $data['The Rock']->max_points = substr($data['The Rock']->max_points,0,2).' %';
        $data['The Rock']->category = 'The Rock';

        return $this->respond($data);
    }

    public function updateRankingRecord(Request $request, $category, $recordId, $userId)
    {
        $data = $request->all();

        $user = User::find($userId);

        $newRecord = $this->rankingService->updateRecord($data,$category,$recordId,$user);
        $this->fighter->addTotalPoints($newRecord->user_id, $newRecord->points);

        return  $this->responseCreated('Record Updated');
    }

    public function saveRankingRecord(Request $request, $category)
    {
        $record = $this->rankingService->createRecord($request, $category);

        if($record){
            $this->fighter->updateFightsAndPoints($record,$category);
            $this->fighter->addTotalPoints($record->user_id, $record->points);
        }
        return $this->responseCreated('Fighter record updated');
    }

}