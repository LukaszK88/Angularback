<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'post';

    const TABLE = 'post';

    const   COL_ID = 'id',
        COL_TITLE = 'title',
        COL_BODY = 'body',
        COL_POST_TYPE = 'post_type';

    const   TCOL_TITLE = self::TABLE.'.'.self::COL_TITLE,
            TCOL_BODY = self::TABLE.'.'.self::COL_BODY,
            TCOL_POST_TYPE = self::TABLE.'.'.self::COL_POST_TYPE;

    protected $fillable=[
        'user_id',
        'title',
        'body',
        'post_type'
    ];

    public function postType(){

        return $this->hasMany(PostType::class, 'id', 'post_type');
    }

    public function user(){

        return $this->belongsTo(User::class);

    }
}
