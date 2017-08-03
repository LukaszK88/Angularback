<?php

namespace App\Models;

class Polearm extends BaseRanking
{
    protected $table = 'polearm';

    public function user()
    {
        return $this->belongsToMany(User::class);
    }
}
