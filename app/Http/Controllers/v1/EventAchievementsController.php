<?php

namespace App\Http\Controllers\v1;

use App\Models\EventAchievement;

class EventAchievementsController extends ApiController
{
    public function index()
    {
        $eventsAchievements = EventAchievement::all();

        return $this->respond($eventsAchievements);
    }

}
