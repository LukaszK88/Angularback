<?php

namespace App\Models;

class Polearm extends BaseRanking
{
    protected $table = 'polearm';

    protected $fillable = [
        self::COL_USER_ID,
        self::COL_EVENT_ID,
        self::COL_WIN,
        self::COL_POINTS,
        self::COL_FIGHTS,
        self::COL_DATE,
        self::COL_LOSS
    ];

    public function eventAchievement()
    {
        return $this->belongsTo(EventAchievement::class,'event_id','event_id');
    }

    public function user()
    {
        return $this->belongsToMany(User::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
