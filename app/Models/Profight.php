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

class Profight extends Model{

    protected $table = 'profights';

    const COL_EVENT_ID = 'event_id';

    protected $fillable=[
        'user_id',
        'fights',
        'fc_1',
        'fc_2',
        'fc_3',
        'win',
        'loss',
        'ko',
        'points',
        self::COL_EVENT_ID
    ];
    
    public function user(){

        return $this->belongsToMany(User::class);

    }
}