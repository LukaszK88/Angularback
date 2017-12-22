<?php
namespace App\Contracts\Repositories;


interface FighterRepositoryInterface
{
    public function getAllByDateAndClub($clubId,$year);

    public function getById($id);

    public function addTotalPoints($userId, $points);

    public function updateFightsAndPoints($record, $category);

    public function getMaxPointsPerCategory($category);

    public function getBestBohurtStandingRatio();
}