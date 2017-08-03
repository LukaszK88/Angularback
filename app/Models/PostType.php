<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostType extends Model
{
    protected $table = 'post_types';

    const TABLE = 'post_types';

    const   COL_ID = 'id',
            COL_SLUG = 'slug',
            COL_TYPE = 'type';

    const   TCOL_SLUG = self::TABLE.'.'.self::COL_SLUG,
            TCOL_TYPE = self::TABLE.'.'.self::COL_TYPE;

    protected $fillable=[
        self::COL_SLUG,
        self::COL_TYPE
    ];

    public function post()
    {
        return $this->belongsToMany(Post::class);
    }
}
