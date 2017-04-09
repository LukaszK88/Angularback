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

class Bohurt extends Model{

    protected $table = 'bohurts';

    protected $fillable=[
        'user_id',
        'fights',
        'won',
        'last',
        'down',
        'suicide',
        'points',
    ];
    
    public function user(){

        return $this->belongsToMany(User::class);

    }
}