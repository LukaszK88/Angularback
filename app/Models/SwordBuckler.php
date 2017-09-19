<?php

namespace App\Models;

class SwordBuckler extends BaseRanking
{
    protected $table = 'sword_buckler';

    protected $fillable=[
        self::COL_USER_ID,
        self::COL_EVENT_ID,
        self::COL_WIN,
        self::COL_POINTS,
        self::COL_LOSS
    ];

    public function user()
    {
        return $this->belongsToMany(User::class);
    }
}
