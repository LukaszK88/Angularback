<?php

namespace App\Http\Controllers\v1;

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

    /**
     * @param null $clubId
     * @param $year
     * get all fighters records with ranking relationships
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFighters($clubId = null, $year)
    {
        $rawFightersData = $this->fighter->getAllByDateAndClub($clubId,$year);

        $data = $this->rankingService->prepareFightersDataForRanking($rawFightersData);

        return $this->respond($data);
    }

    /**
     * @param $id
     * get individual fighter record with ranking relationships plus age
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFighter($id)
    {
        $fighter = $this->fighter->getById($id);

        $fighter = $this->rankingService->prepareFighterDataForRanking($fighter);
        $fighter['age'] = Carbon::parse($fighter['age'])->diffInYears(Carbon::now('Europe/London'));

        return $this->respond($fighter);
    }

    /**
     * mine leaderboard table data
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLeaderboardTableData()
    {
        $data = [];
        $categories = ['bohurts','profights', 'sword_shield', 'sword_buckler', 'longswords', 'polearm', 'triathlon'];
        foreach ($categories as $category){
            $data[$category] = (array)$this->fighter->getMaxPointsPerCategory($category);
            $data[$category]['category'] = $category;
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

    /**
     * @param Request $request
     * @param $category
     * @param $recordId
     * @param $userId
     * update single fighter ranking record
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateRankingRecord(Request $request, $category, $recordId, $userId)
    {
        $data = $request->all();

        $user = User::find($userId);

        $this->rankingService->updateRecord($data,$category,$recordId,$user);

        return  $this->responseCreated('Record Updated');
    }

    /**
     * @param Request $request
     * @param $category
     * create ranking record
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveRankingRecord(Request $request, $category)
    {
        $record = $this->rankingService->createRecord($request, $category);

        if($record){
            $this->fighter->updateFightsAndPoints($record,$category);
        }
        return $this->responseCreated('Fighter record updated');
    }

}