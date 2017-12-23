<?php

namespace App\Services;


use App\Contracts\Repositories\FighterRepositoryInterface;


class ClubService
{
    protected $rankingService,
            $fighter;

    public function __construct(RankingService $rankingService, FighterRepositoryInterface $fighter)
    {
        $this->rankingService = $rankingService;
        $this->fighter = $fighter;
    }

    public function getClubPageInfo($club)
    {
        $fighters = $this->fighter->getAllByDateAndClub($club->id);

        $totalFights = 0;
        $totalPoints = 0;
        $gold = 0;
        $silver = 0;
        $bronze = 0;
        foreach ($fighters as $fighter){

            $gold += $fighter->achievement->where('place','1st')->count();
            $silver += $fighter->achievement->where('place','2nd')->count();
            $bronze += $fighter->achievement->where('place','3rd')->count();
            $totalFights += $this->rankingService->sumTotalFights($fighter);
            $totalPoints += $this->rankingService->sumTotalPoints($fighter);
        }

        $club['fighters'] = $fighters;
        $club['total_points'] = $totalPoints;
        $club['total_fights'] = $totalFights;
        $club['gold'] = $gold;
        $club['silver'] = $silver;
        $club['bronze'] = $bronze;

        return $club;
    }

    public function sumPointsAndFightsClubFighters($clubs, $year)
    {
        $totalPoints = 0;
        $totalFights = 0;

        foreach ($clubs as $club){
            $fighters = $this->fighter->getAllByDateAndClub($club->id,$year);
            foreach ($fighters as $fighter){
                $totalFights += $this->rankingService->sumTotalFights($fighter);
                $totalPoints += $this->rankingService->sumTotalPoints($fighter);
            }

            $club['fighters'] = $fighters->count();
            $club['total_fights'] = $totalFights;
            $club['total_points'] = $totalPoints;
            $totalPoints = 0;
            $totalFights = 0;
        }
        return $clubs;
    }


}