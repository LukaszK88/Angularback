<?php
/**
 * Created by PhpStorm.
 * User: Lukasz
 * Date: 28/01/2017
 * Time: 17:16
 */
namespace App;


use App\User;
use Illuminate\Database\Eloquent\Model;

class Profight extends Model{

    protected $table = 'profights';

    protected $fillable=[
        'user_id',
        'fc_1',
        'fc_2',
        'fc_3',
        'win',
        'loss',
        'ko',
        'points',
    ];
    
    public function user(){

        return $this->belongsToMany(User::class);

    }
}