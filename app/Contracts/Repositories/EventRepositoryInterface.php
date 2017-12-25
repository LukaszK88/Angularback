<?php
namespace App\Contracts\Repositories;

interface EventRepositoryInterface
{
    public function getUserHosted($userId);

    public function create($data);
}
