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
    
    public function user()
    {
        return $this->belongsToMany(User::class);
    }
}