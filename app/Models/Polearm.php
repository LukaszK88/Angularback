<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Polearm extends Model
{
    protected $table = 'polearm';

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
