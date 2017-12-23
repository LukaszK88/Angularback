<?php
namespace App\Contracts\Repositories;


interface UserRepositoryInterface
{
    public function setUserAsClubAdmin($userId,$clubId);
}