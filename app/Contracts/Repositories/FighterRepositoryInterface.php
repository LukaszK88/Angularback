<?php
namespace App\Contracts\Repositories;


interface FighterRepositoryInterface
{
    public function getAllByDateAndClub($clubId,$year = 0);

    public function getById($id);

    public function updateFightsAndPoints($record, $category);

    public function getMaxPointsPerCategory($category);

    public function getBestBohurtStandingRatio();
}