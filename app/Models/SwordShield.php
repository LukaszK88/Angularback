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

    public function user()
    {
        return $this->belongsToMany(User::class);
    }
}