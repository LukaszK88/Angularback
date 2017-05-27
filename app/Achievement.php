<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    protected $table = 'achievements';

    protected $fillable=[
        'user_id',
        'competition_name',
        'location',
        'category',
        'place',
        'date'
    ];

    public function user(){

        return $this->belongsToMany(User::class);

    }
}
