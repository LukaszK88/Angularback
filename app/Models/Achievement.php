<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    protected $table = 'achievements';

    const   COL_EVENT_ID = 'event_id',
            COL_USER_ID = 'user_id',
            COL_COMPETITION_NAME = 'competition_name',
            COL_LOCATION = 'location',
            COL_CATEGORY = 'category',
            COL_PLACE = 'place',
            COL_CUP = 'cup',
            COL_DATE = 'date';

    protected $fillable=[
        self::COL_USER_ID,
        self::COL_COMPETITION_NAME,
        self::COL_LOCATION,
        self::COL_CATEGORY,
        self::COL_EVENT_ID,
        self::COL_PLACE,
        self::COL_CUP,
        self::COL_DATE
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function user()
    {
        return $this->belongsToMany(User::class);
    }
}
