<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BaseRanking extends Model{

    const   COL_EVENT_ID = 'event_id',
            COL_USER_ID = 'user_id',
            COL_FIGHTS = 'fights',
            COL_LOSS = 'loss',
            COL_WIN = 'win',
            COL_POINTS = 'points';

    protected $fillable=[
        self::COL_USER_ID,
        self::COL_FIGHTS,
        self::COL_LOSS,
        self::COL_POINTS,
        self::COL_WIN,
        self::COL_EVENT_ID
    ];

}