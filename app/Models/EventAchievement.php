<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventAchievement extends Model
{

    protected $table = self::TABLE;

    const TABLE = 'event_achievement';

    const   COL_ID = 'id',
        COL_CLUB_ID = 'club_id',
        COL_EVENT_ID = 'event_id',
        COL_TITLE = 'title',
        COL_LOCATION = 'location',
        COL_UEAID = 'ueaid',
        COL_DATE = 'date';

    protected $fillable=[
        self::COL_CLUB_ID,
        self::COL_TITLE,
        self::COL_LOCATION,
        self::COL_DATE,
        self::COL_EVENT_ID,
        self::COL_UEAID,
    ];

    public function achievement()
    {
        return $this->hasMany(Achievement::class, 'event_id','event_id');
    }

    public function category()
    {
        return $this->hasMany(EventCategories::class, 'event_id', 'event_id');
    }

    public function club()
    {
        return $this->belongsTo(Club::class, self::COL_CLUB_ID,'id');
    }

    public function event()
    {
        return $this->belongsTo(Event::class, self::COL_EVENT_ID,'id');
    }
}
