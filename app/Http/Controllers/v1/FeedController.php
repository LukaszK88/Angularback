<?php
namespace App\Http\Controllers\v1;

use App\Models\Event;
use App\Models\Feed;
use Carbon\Carbon;

class FeedController extends ApiController
{
    public function getFeed($feedOffset = 1)
    {
        $feedData = Feed::
        where(Feed::COL_CREATED_AT,'>=',Carbon::today()->subMonths($feedOffset))
            ->with([
                'user.club',
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

        $feed['data'] = $feedData;
        $feed['count'] = Feed::all()->count();

        return $this->respond($feed);
    }
}