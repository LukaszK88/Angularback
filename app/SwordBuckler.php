<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SwordBuckler extends Model
{
    protected $table = 'sword_buckler';

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
