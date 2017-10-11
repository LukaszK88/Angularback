<?php
/**
 * Created by PhpStorm.
 * User: Lukasz
 * Date: 28/01/2017
 * Time: 17:16
 */
namespace App\Models;


class SwordShield extends BaseRanking {

    protected $table = 'sword_shield';

    protected $fillable=[
        self::COL_USER_ID,
        self::COL_EVENT_ID,
        self::COL_WIN,
        self::COL_POINTS,
        self::COL_FIGHTS,
        self::COL_LOSS
    ];

    public function user()
    {
        return $this->belongsToMany(User::class);
    }
}