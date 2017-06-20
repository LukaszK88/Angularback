<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = self::TABLE;

    const TABLE = 'events';

    const   COL_ID = 'id',
        COL_USER_ID = 'user_id',
        COL_TITLE = 'title',
        COL_BODY = 'body',
        COL_LOCATION = 'location',
        COL_DATE = 'date',
        COL_EVENT_TYPE_ID = 'event_type_id';

    const   TCOL_ID = self::TABLE.'.'.self::COL_ID,
        TCOL_TITLE = self::TABLE.'.'.self::COL_TITLE,
        TCOL_BODY = self::TABLE.'.'.self::COL_BODY,
        TCOL_EVENT_TYPE_ID = self::TABLE.'.'.self::COL_EVENT_TYPE_ID;

    protected $fillable=[
        self::COL_USER_ID,
        self::COL_TITLE,
        self::COL_BODY,
        self::COL_LOCATION,
        self::COL_DATE,
        self::COL_EVENT_TYPE_ID
    ];

    public function eventType(){

        return $this->hasOne(EventType::class, 'id', 'event_type_id');
    }

    public function image(){

        return $this->hasMany(Image::class, 'event_id', 'id');
    }

    public function category(){

        return $this->hasMany(EventCategories::class, 'event_id', 'id');
    }

    public function user(){

        return $this->belongsTo(User::class);

    }
}
