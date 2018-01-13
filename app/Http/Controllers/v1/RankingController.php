<?php

namespace App\Http\Controllers\v1;

use App\Contracts\Repositories\FighterRepositoryInterface;
use App\Http\Transformers\RankingTransformer;
use App\Models\Bohurt;
use App\Models\Feed;
use App\Models\Longsword;
use App\Models\Polearm;
use App\Models\Profight;
use App\Models\SwordBuckler;
use App\Models\SwordShield;
use App\Models\Triathlon;
use App\Models\User;
use App\Services\FeedService;
use App\Services\RankingService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

use Illuminate\Support\Facades\Cache;

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
        $bohurts = Bohurt::all();
        foreach ($bohurts as $bohurt){
            if(!$bohurt->date){
                $bohurt->update(['date' => $bohurt->created_at]);
            }
        }

        $profights = Profight::all();
        foreach ($profights as $profight){
            if(!$profight->date){
                $profight->update(['date' => $profight->created_at]);
            }
        }
        $polearms = Polearm::all();
        foreach ($polearms as $polearm){
            if(!$polearm->date){
                $polearm->update(['date' => $polearm->created_at]);
            }
        }
        $longswords = Longsword::all();
        foreach ($longswords as $longsword){
            if(!$longsword->date){
                $longsword->update(['date' => $longsword->created_at]);
            }
        }
        $swordShields = SwordShield::all();
        foreach ($swordShields as $shield){
            if(!$shield->date){
                $shield->update(['date' => $shield->created_at]);
            }
        }
        $swordBuklers = SwordBuckler::all();
        foreach ($swordBuklers as $bukler){
            if(!$bukler->date){
                $bukler->update(['date' => $bukler->created_at]);
            }
        }
        $triathlons = Triathlon::all();
        foreach ($triathlons as $triathlon){
            if(!$triathlon->date){
                $triathlon->update(['date' => $triathlon->created_at]);
            }
        }

        // yar must be optional
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

        FeedService::feedEntry(
            FeedService::RANKING_RECORD,
            [$category.'_id' => $record->id ?? 0, Feed::COL_USER_ID => $request->input('user_id')]);

        return $this->responseCreated('Fighter record updated');
    }

}