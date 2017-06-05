<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostType extends Model
{
    protected $table = 'post_types';

    const TABLE = 'post_types';

    const   COL_ID = 'id',
            COL_TYPE = 'type';

    const TCOL_TYPE = self::TABLE.'.'.self::COL_TYPE;

    protected $fillable=[
        'type'
    ];

    public function post(){

        return $this->belongsToMany(Post::class);

    }
}
