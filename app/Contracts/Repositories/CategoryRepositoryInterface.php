<?php
namespace App\Contracts\Repositories;

interface CategoryRepositoryInterface
{
    public function create($category,$eventId);
}
