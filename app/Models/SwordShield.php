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

class SwordShield extends Model{

    protected $table = 'sword_shield';

    protected $fillable=[
        'user_id',
        'fights',
        'win',
        'loss',
        'points',
    ];
    
    public function user(){

        return $this->belongsToMany(User::class);

    }
}