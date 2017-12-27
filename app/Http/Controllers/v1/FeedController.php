<?php
namespace App\Http\Controllers\v1;

use App\Models\Event;
use App\Models\Feed;
use Carbon\Carbon;

class FeedController extends ApiController
{
    public function getFeed()
    {
        $feed = Feed::
        where(Feed::COL_CREATED_AT,'>=',Carbon::today()->subMonths(1))
            ->with([
                'user',
                'event',
                'achievement',
                'club',
                'eventAttendance.eventAttendCategory',
                'eventAttendance.event',
                'bohurt.eventAchievement',
                'profight.eventAchievement',
                'swordShield.eventAchievement',
                'swordBuckler.eventAchievement',
                'polearm.eventAchievement',
                'longsword.eventAchievement',
                'triathlon.eventAchievement'
            ])
            ->orderBy(Feed::COL_CREATED_AT,'desc')
            ->get();

        return $this->respond($feed);
    }
}