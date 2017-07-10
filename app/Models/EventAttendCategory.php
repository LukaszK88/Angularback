<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventAttendCategory extends Model
{
    protected $table = self::TABLE;

    const TABLE = 'event_attend_categories';

    const ALL = self::TABLE.'.*';

    const   COL_ID = 'id',
        COL_NAME = 'name',
        COL_EVENT_ATTEND_ID = 'event_attend_id';

    const   TCOL_ID = self::TABLE.'.'.self::COL_ID,
        TCOL_EVENT_ATTEND_ID = self::TABLE.'.'.self::COL_EVENT_ATTEND_ID;

    protected $fillable=[
        self::COL_NAME,
        self::COL_EVENT_ATTEND_ID
    ];

    public function eventAttend(){

        return $this->belongsTo(EventAttendence::class);

    }

}
