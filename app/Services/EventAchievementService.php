<?php

namespace App\Services;



use App\Models\EventAchievement;

class EventAchievementService
{

    public function generateUeaid($event)
    {
        return (str_replace(' ', '',trim(strtolower($event->title))).trim(strtolower($event->location)).substr($event->date,0,4));
    }

    public function createEntry($event)
    {
        if(!EventAchievement::where(EventAchievement::COL_UEAID,$this->generateUeaid($event))->first()){
            EventAchievement::create([
                EventAchievement::COL_UEAID => $this->generateUeaid($event),
                EventAchievement::COL_LOCATION => $event->location,
                EventAchievement::COL_TITLE => $event->title,
                EventAchievement::COL_CLUB_ID => $event->clulb_id ?? null,
                EventAchievement::COL_DATE => $event->date,
                EventAchievement::COL_EVENT_ID => $event->id,
            ]);
        }
    }
}