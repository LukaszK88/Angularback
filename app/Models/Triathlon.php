<?php

namespace App\Models;


class Triathlon extends BaseRanking
{
    protected $table = 'triathlon';

    public function user()
    {
        return $this->belongsToMany(User::class);
    }
}
