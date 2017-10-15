<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventCategories extends Model
{
    protected $table = self::TABLE;

    const TABLE = 'event_categories';

    const   COL_ID = 'id',
            COL_NAME = 'name',
            COL_EVENT_ID = 'event_id';

    const   TCOL_NAME = self::TABLE.'.'.self::COL_NAME;

    protected $fillable=[
        self::COL_NAME,
        self::COL_EVENT_ID
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
