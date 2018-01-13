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

class Profight extends BaseRanking {

    protected $table = 'profights';

    const   COL_FC_1_ID = 'fc_1',
            COL_FC_2_ID = 'fc_2',
            COL_FC_3_ID = 'fc_3',
        COL_EVENT_ID = 'event_id',
        COL_USER_ID = 'user_id',
            COL_KO = 'ko';


    protected $fillable=[
        self::COL_WIN,
        self::COL_LOSS,
        self::COL_USER_ID,
        self::COL_EVENT_ID,
        self::COL_FC_1_ID,
        self::COL_FC_2_ID,
        self::COL_FC_3_ID,
        self::COL_POINTS,
        self::COL_FIGHTS,
        self::COL_DATE,
        self::COL_KO
    ];

    public function eventAchievement()
    {
        return $this->belongsTo(EventAchievement::class,'event_id','event_id');
    }
    
    public function user()
    {
        return $this->belongsToMany(User::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}