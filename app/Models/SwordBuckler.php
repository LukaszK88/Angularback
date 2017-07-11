<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class SwordBuckler extends Model
{
    protected $table = 'sword_buckler';

    const COL_EVENT_ID = 'event_id';

    protected $fillable=[
        'user_id',
        'fights',
        'win',
        'loss',
        'points',
        self::COL_EVENT_ID
    ];

    public function user(){

        return $this->belongsToMany(User::class);

    }
}
