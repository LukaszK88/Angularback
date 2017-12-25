<?php
namespace App\Repositories;

use App\Contracts\Repositories\CategoryRepositoryInterface;
use App\Models\EventCategories;

class DbCategoryRepository implements CategoryRepositoryInterface
{
    public function create($category, $eventId)
    {
        return EventCategories::create([
            EventCategories::COL_EVENT_ID => $eventId,
            EventCategories::COL_NAME => $category,
        ]);
    }
}