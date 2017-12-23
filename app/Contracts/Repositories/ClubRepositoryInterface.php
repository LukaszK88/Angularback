<?php
namespace App\Contracts\Repositories;


interface ClubRepositoryInterface
{
    /**
     * @param $country
     * @return mixed
     */
    public function getClubsByCountry($country);

    /**
     * @return mixed
     */
    public function getAll();

    /**
     * @param $value
     * @param $clubId
     * @return mixed
     */
    public function setActive($value, $clubId);

    /**
     * @param String $name
     * @return mixed
     */
    public function findByName(String $name);

    /**
     * @param $data
     * @return mixed
     */
    public function create($data);

    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function update($id, $data);

}
