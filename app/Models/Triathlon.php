<?php

namespace App\Models;


class Triathlon extends BaseRanking
{
    protected $table = 'triathlon';

    protected $fillable = [
        self::COL_USER_ID,
        self::COL_EVENT_ID,
        self::COL_WIN,
        self::COL_LOSS,
        self::COL_POINTS,
        self::COL_FIGHTS,

    ];

    public function user()
    {
        return $this->belongsToMany(User::class);
    }
}
