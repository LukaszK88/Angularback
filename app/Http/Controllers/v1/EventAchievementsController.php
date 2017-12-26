<?php

namespace App\Http\Controllers\v1;

use App\Models\EventAchievement;

class EventAchievementsController extends ApiController
{
    public function index()
    {
        $eventsAchievements = EventAchievement::with(['event.eventType','category'])->get();

        return $this->respond($eventsAchievements);
    }

}
