<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventType extends Model
{
    protected $table = self::TABLE;

    const TABLE = 'event_types';

    const   COL_ID = 'id',
        COL_TYPE = 'type';

    const   TCOL_TYPE = self::TABLE.'.'.self::COL_TYPE;

    protected $fillable=[
        self::COL_TYPE
    ];

    public function event(){

        return $this->belongsToMany(Event::class);

    }
}
