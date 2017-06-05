<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    protected $table = 'achievements';

    protected $fillable=[
        'user_id',
        'competition_name',
        'location',
        'category',
        'place',
        'cup',
        'date'
    ];

    public function user(){

        return $this->belongsToMany(User::class);

    }
}
