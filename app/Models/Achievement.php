<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    protected $table = 'achievements';

    const COL_EVENT_ID = 'event_id';

    protected $fillable=[
        'user_id',
        'competition_name',
        'location',
        'category',
        self::COL_EVENT_ID,
        'place',
        'cup',
        'date'
    ];

    public function event(){

        return $this->belongsTo(Event::class);

    }

    public function user(){

        return $this->belongsToMany(User::class);

    }
}
