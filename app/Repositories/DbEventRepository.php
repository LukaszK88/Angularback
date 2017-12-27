<?php
namespace App\Repositories;

use App\Contracts\Repositories\EventRepositoryInterface;
use App\Models\Event;
use App\Models\EventType;
use Carbon\Carbon;

class DbEventRepository implements EventRepositoryInterface
{
    public function getUserHosted($userId, $future)
    {
        return Event::join(EventType::TABLE,EventType::TABLE.'.'.EventType::COL_ID,'=',Event::TCOL_EVENT_TYPE_ID)
            ->select('events.*',EventType::TCOL_TYPE)
            ->where(Event::TCOL_USER_ID,$userId)
            ->with(['category','attendance','club'])
            ->when(($future === 'true'),function ($query) {
                return $query->where(Event::TCOL_DATE,'>',Carbon::today());
            }, function ($query) {
                return $query->where(Event::TCOL_DATE,'<',Carbon::today());
            })
            ->get();
    }

    public function create($data)
    {
        return Event::create($data);
    }
}