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

    public function sumPointsAndFightsClubFighters($clubs, $year)
    {
        $total_points = 0;
        $total_fights = 0;

        foreach ($clubs as $club){
            $fighters = $this->fighter->getAllByDateAndClub($club->id,$year);
            foreach ($fighters as $fighter){
                $total_fights += $this->rankingService->sumCategoryRecords($fighter,'bohurt',['fights'])['fights'];
                $total_fights += $this->rankingService->sumCategoryRecords($fighter,'profight',['fights'])['fights'];
                $total_fights += $this->rankingService->sumCategoryRecords($fighter,'swordBuckler',['fights'])['fights'];
                $total_fights += $this->rankingService->sumCategoryRecords($fighter,'swordShield',['fights'])['fights'];
                $total_fights += $this->rankingService->sumCategoryRecords($fighter,'longsword',['fights'])['fights'];
                $total_fights += $this->rankingService->sumCategoryRecords($fighter,'triathlon',['fights'])['fights'];
                $total_fights += $this->rankingService->sumCategoryRecords($fighter,'polearm',['fights'])['fights'];
                $total_points += $this->rankingService->sumTotalPoints($fighter);
            }

            $club['fighters'] = $fighters->count();
            $club['total_fights'] = $total_fights;
            $club['total_points'] = $total_points;
            $total_points = 0;
            $total_fights = 0;
        }
        return $clubs;
    }

}