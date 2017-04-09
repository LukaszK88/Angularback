<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $table = 'users';

    protected $fillable=[
        'name',
        'username',
        'temp_password',
        'salt',
        'password',
        'role',
        'weight',
        'image',
        'total_points',
    ];

    public function setTempPassword($password){

        $this->update([
            'password' => '',
            'temp_password' => md5($password)
        ]);

    }

    public function setPassword($password){

        $this->update([
            'password' => password_hash($password, PASSWORD_DEFAULT),
            'temp_password' => ''
        ]);

    }

    public function bohurt(){

        return $this->hasMany(Bohurt::class);
    }

    public function triathlon(){

        return $this->hasMany(Triathlon::class);
    }

    public function sword(){

        return $this->hasMany(Sword::class);
    }

    public function longsword(){

        return $this->hasMany(Longsword::class);
    }

    public function polearm(){

        return $this->hasMany(Polearm::class);
    }

    public function profight(){

        return $this->hasMany(Profight::class);
    }

    public function achievement(){

        return $this->hasMany(Achievements::class);
    }
}
