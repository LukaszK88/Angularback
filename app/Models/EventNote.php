<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventNote extends Model
{
    protected $table = self::TABLE;

    const TABLE = 'event_notes';

    const   COL_ID = 'id',
        COL_USER_ID = 'user_id',
        COL_BODY = 'body',
        COL_EVENT_ID = 'event_id';

    const   TCOL_ID = self::TABLE.'.'.self::COL_ID,
        TCOL_BODY = self::TABLE.'.'.self::COL_BODY,
        TCOL_EVENT_TYPE_ID = self::TABLE.'.'.self::COL_EVENT_ID;

    protected $fillable=[
        self::COL_USER_ID,
        self::COL_BODY,
        self::COL_EVENT_ID
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
