<?php

namespace App\Repositories;

use App\Contracts\Repositories\FighterRepositoryInterface;
use App\Models\Club;
use App\Models\User;
use App\Services\RankingService;
use Illuminate\Support\Facades\DB;

class DbFighterRepository implements FighterRepositoryInterface
{
    protected $rankingService;

    public function __construct(RankingService $rankingService)
    {
        $this->rankingService = $rankingService;
    }

    public function getBestBohurtStandingRatio()
    {
        return DB::table('bohurts')
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
    }

    public function getMaxPointsPerCategory($category)
    {
        return DB::table($category)
            ->join('users','users.id','=',''.$category.'.user_id')
            ->join('clubs','clubs.id','=','users.club_id')
            ->select(
                ''.$category.'.created_at',
                User::TCOL_NAME,
                User::TCOL_ID,
                User::TCOL_FACEBOOK_IMG,
                User::TCOL_IMG,
                Club::TCOL_NAME.' as club',
                DB::raw('sum(points) as max_points'))
            ->groupBy(''.$category.'.user_id')
            ->orderBy('max_points','desc')
            ->first();
    }

    public function updateFightsAndPoints($record, $category)
    {
        switch ($category){
            case 'bohurt':
                $fights = $this->rankingService->addBohurtFights($record);
                $points = $this->rankingService->calculateBohurtPoints($record);
                break;
            case 'profight':
                $fights = $this->rankingService->addProfightFights($record);
                $points = $this->rankingService->calculateProfightPoints($record);
                break;
            default:
                $fights = $record->win + $record->loss;
                $points = $record->win;
                break;
        }

        $record->update([
            'fights' => $fights,
            'points' => $points
        ]);
    }

    public function getById($id)
    {
        return User::with(User::RREL_BOHURT_EVENT)
            ->with(User::RREL_PROFIGHT_EVENT)
            ->with(User::RREL_SWORD_SHIELD_EVENT)
            ->with(User::RREL_LONGSWORD_EVENT)
            ->with(User::RREL_SWORD_BUCKLER_EVENT)
            ->with(User::RREL_POLEARM_EVENT)
            ->with(User::RREL_TRIATHLON_EVENT)
            ->with(User::REL_CLUB)
            ->findOrFail($id);
    }

    public function getAllByDateAndClub($clubId,$year)
    {
        return $this->getAllFighters($clubId,$year)->get();
    }

    /**
     * @param $clubId
     * @param $year
     * get all fighters with all necessary relationships for ranking display
     * @return mixed
     */
    private function getAllFighters($clubId, $year)
    {
       return User::with([User::REL_BOHURT => function($query) use ($year){
           $query->with(User::REL_EVENT);
           $query->whereRaw('year(`created_at`) = '.$year.'');

       }])
        ->with([User::REL_PROFIGHT => function($query) use ($year){
            $query->with(User::REL_EVENT);
            $query->whereRaw('year(`created_at`) = '.$year.'');
        }])
       ->with([User::REL_SWORD_SHIELD => function($query) use ($year){
           $query->with(User::REL_EVENT);
           $query->whereRaw('year(`created_at`) = '.$year.'');
       }])
       ->with([User::REL_LONGSWORD => function($query) use ($year){
           $query->with(User::REL_EVENT);
           $query->whereRaw('year(`created_at`) = '.$year.'');
       }])
       ->with([User::REL_SWORD_BUCKLER => function($query) use ($year){
           $query->with(User::REL_EVENT);
           $query->whereRaw('year(`created_at`) = '.$year.'');
       }])
       ->with([User::REL_POLEARM => function($query) use ($year){
           $query->with(User::REL_EVENT);
           $query->whereRaw('year(`created_at`) = '.$year.'');
       }])
       ->with([User::REL_TRIATHLON => function($query) use ($year){
           $query->with(User::REL_EVENT);
           $query->whereRaw('year(`created_at`) = '.$year.'');
       }])
       ->with(User::REL_CLUB)
       ->whereNotNull(User::COL_NAME)
       ->when($clubId, function ($q) use ($clubId) {
           return $q->where(User::COL_CLUB_ID, $clubId);
       });

    }

}