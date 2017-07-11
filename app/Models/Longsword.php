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

class Longsword extends Model{

    protected $table = 'longswords';

    const COL_EVENT_ID = 'event_id';

    protected $fillable=[
        'user_id',
        'fights',
        'win',
        'loss',
        'points',
        self::COL_EVENT_ID
    ];
    
    public function user(){

        return $this->belongsToMany(User::class);

    }
}