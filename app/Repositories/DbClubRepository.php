<?php
namespace App\Repositories;

use App\Contracts\Repositories\ClubRepositoryInterface;
use App\Models\Club;

class DbClubRepository implements ClubRepositoryInterface
{
    public function getClubsByCountry($country)
    {
        return Club::where(Club::COL_ACTIVE,1)
            ->when($country, function ($q) use ($country) {
                 $q->where(Club::COL_COUNTRY, $country);
            })
            ->get();
    }
}