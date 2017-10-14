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
        self::COL_LOSS
    ];

    public function user()
    {
        return $this->belongsToMany(User::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
