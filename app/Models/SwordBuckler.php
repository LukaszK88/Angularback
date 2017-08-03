<?php

namespace App\Models;

class SwordBuckler extends BaseRanking
{
    protected $table = 'sword_buckler';

    public function user()
    {
        return $this->belongsToMany(User::class);
    }
}
