<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Triathlon extends Model
{
    protected $table = 'triathlon';

    protected $fillable=[
        'user_id',
        'fights',
        'win',
        'loss',
        'points',
    ];

    public function user(){

        return $this->belongsToMany(User::class);

    }
}
