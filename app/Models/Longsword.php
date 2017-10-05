<?php
/**
 * Created by PhpStorm.
 * User: Lukasz
 * Date: 28/01/2017
 * Time: 17:16
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Longsword extends BaseRanking {

    protected $table = 'longswords';

    protected $fillable = [
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