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

    const COL_EVENT_ID = 'event_id';

    protected $fillable=[
        'user_id',
        'fights',
        'won',
        'last',
        'down',
        'suicide',
        self::COL_EVENT_ID,
        'points'
    ];

    public function event(){

        return $this->belongsTo(Event::class);

    }
    
    public function user(){

        return $this->belongsToMany(User::class);

    }
}