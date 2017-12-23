<?php
namespace App\Repositories;

use App\Contracts\Repositories\ClubRepositoryInterface;
use App\Models\Club;

class DbClubRepository implements ClubRepositoryInterface
{
    /**
     * @param $country
     * @return mixed
     */
    public function getClubsByCountry($country)
    {
        return Club::where(Club::COL_ACTIVE,1)
            ->when($country, function ($q) use ($country) {
                 $q->where(Club::COL_COUNTRY, $country);
            })
            ->get();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getAll()
    {
        return Club::all();
    }

    /**
     * @param $value
     * @param $clubId
     * @return mixed
     */
    public function setActive($value, $clubId)
    {
        return Club::where(Club::COL_ID,$clubId)->update([Club::COL_ACTIVE => $value]);
    }

    /**
     * @param String $name
     * @return mixed
     */
    public function findByName(String $name)
    {
        return Club::where(Club::COL_NAME,$name)->first();
    }

    /**
     * @param $data
     * @return mixed
     */
    public function create($data)
    {
       return Club::create($data);
    }

    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function update($id, $data)
    {
        return Club::where(Club::COL_ID,$id)->update($data);
    }
}