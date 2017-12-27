<?php
namespace App\Contracts\Repositories;

interface EventRepositoryInterface
{
    public function getUserHosted($userId, $future);

    public function create($data);
}
