<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = self::TABLE;

    const TABLE = 'events';

    const   COL_ID = 'id',
            COL_USER_ID = 'user_id',
            COL_TITLE = 'title',
            COL_BODY = 'body',
            COL_LOCATION = 'location',
            COL_DATE = 'date',
            COL_CLUB_ID = 'club_id',
            COL_GLOBAL = 'global',
            COL_MAKE_PAGE = 'make_page',
            COL_END = 'end',
            COL_LAT = 'lat',
            COL_LNG = 'lng',
            COL_EVENT_TYPE_ID = 'event_type_id';

    const   TCOL_ID = self::TABLE.'.'.self::COL_ID,
            TCOL_TITLE = self::TABLE.'.'.self::COL_TITLE,
            TCOL_LOCATION = self::TABLE.'.'.self::COL_LOCATION,
            TCOL_BODY = self::TABLE.'.'.self::COL_BODY,
            TCOL_EVENT_TYPE_ID = self::TABLE.'.'.self::COL_EVENT_TYPE_ID;

    protected $fillable=[
        self::COL_END,
        self::COL_MAKE_PAGE,
        self::COL_LAT,
        self::COL_LNG,
        self::COL_USER_ID,
        self::COL_TITLE,
        self::COL_BODY,
        self::COL_LOCATION,
        self::COL_DATE,
        self::COL_EVENT_TYPE_ID,
        self::COL_CLUB_ID,
        self::COL_GLOBAL
    ];


    public function getAttendingEvents($userId)
    {
        return Event::
            join(EventAttendence::TABLE,self::TCOL_ID,'=',EventAttendence::TCOL_EVENT_ID)
            //->join(EventAttendCategory::TABLE,EventAttendCategory::TCOL_EVENT_ATTEND_ID,'=',EventAttendence::TCOL_ID)
            ->select(self::TABLE.'.*',EventAttendence::TCOL_ID.' AS eventAttendId')
            ->where(EventAttendence::TCOL_USER_ID,$userId)
            ->where(EventAttendence::COL_GOING,1)
            ->with(['note','note.user'])
            ->get();
    }

    public function club()
    {
        return $this->belongsTo(Club::class, self::COL_CLUB_ID,'id');
    }

    public function eventType()
    {
        return $this->hasOne(EventType::class, 'id', self::COL_EVENT_TYPE_ID);
    }

    public function achievement()
    {
        return $this->hasMany(Achievement::class, 'event_id','id');
    }

    public function attendance()
    {
        return $this->hasMany(EventAttendence::class, 'event_id','id');
    }

    public function note()
    {
        return $this->hasMany(EventNote::class, 'event_id','id');
    }

    public function image()
    {
        return $this->hasMany(Image::class, 'event_id', 'id');
    }

    public function category()
    {
        return $this->hasMany(EventCategories::class, 'event_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
