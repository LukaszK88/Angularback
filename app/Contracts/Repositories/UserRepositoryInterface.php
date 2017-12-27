<?php
namespace App\Contracts\Repositories;


interface UserRepositoryInterface
{
    public function setUserAsClubAdmin($userId,$clubId);

    public function removeFromClub($userId);

    public function replaceCaptain($userId,$captainId);
}