<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventAttendence extends Model
{
    protected $table = self::TABLE;

    const TABLE = 'event_attend';

    const   COL_ID = 'id',
        COL_USER_ID = 'user_id',
        COL_GOING = 'going',
        COL_EVENT_ID = 'event_id';

    const   TCOL_ID = self::TABLE.'.'.self::COL_ID,
        TCOL_USER_ID = self::TABLE.'.'.self::COL_USER_ID,
        TCOL_EVENT_ID = self::TABLE.'.'.self::COL_EVENT_ID;

    protected $fillable=[
        self::COL_USER_ID,
        self::COL_GOING,
        self::COL_EVENT_ID
    ];

    public function getEventAttendees($eventId)
    {
        return User::join(self::TABLE,User::TCOL_ID,'=',self::TCOL_USER_ID)
            ->select(User::TCOL_GOOGLE_IMG, User::TCOL_USERNAME, User::TCOL_NAME, User::COL_IMG, User::COL_FACEBOOK_IMG)
            ->where(self::TCOL_EVENT_ID,$eventId)
            ->where(self::COL_GOING,1)
            ->get();
    }

    public function user(){

        return $this->belongsTo(User::class);

    }

    public function eventAttendCategory()
    {
        return $this->hasMany(EventAttendCategory::class, 'event_attend_id', 'id');
    }

    public function event(){

        return $this->belongsTo(Event::class);

    }
}
