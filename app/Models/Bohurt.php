<?php
/**
 * Created by PhpStorm.
 * User: Lukasz
 * Date: 28/01/2017
 * Time: 17:16
 */
namespace App\Models;


use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Bohurt extends Model{

    protected $table = 'bohurts';

    const   COL_EVENT_ID = 'event_id',
            COL_ID = 'id',
            COL_USER_ID = 'user_id',
            COL_FIGHTS = 'fights',
            COL_WON = 'won',
            COL_LAST = 'last',
            COL_DOWN = 'down',
            COL_SUICIDE = 'suicide',
            COL_POINTS = 'points';


    protected $fillable=[
        self::COL_USER_ID,
        self::COL_ID,
        self::COL_FIGHTS,
        self::COL_WON,
        self::COL_LAST,
        self::COL_DOWN,
        self::COL_SUICIDE,
        self::COL_EVENT_ID,
        self::COL_POINTS
    ];

    public function eventAchievement()
    {
        return $this->belongsTo(EventAchievement::class,'event_id','event_id');
    }

    public function event()
    {
        return $this->belongsTo(Event::class,'event_id','id');
    }
    
    public function user()
    {
        return $this->belongsToMany(User::class);
    }
}