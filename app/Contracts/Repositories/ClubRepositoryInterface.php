<?php
namespace App\Contracts\Repositories;


interface ClubRepositoryInterface
{
    public function getClubsByCountry($country);
}
