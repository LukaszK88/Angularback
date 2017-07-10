<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = self::TABLE;

    const TABLE = 'comments';

    const   COL_ID = 'id',
        COL_USER_ID = 'user_id',
        COL_BODY = 'body',
        COL_POST_ID = 'post_id';

    const   TCOL_ID = self::TABLE.'.'.self::COL_ID,
        TCOL_BODY = self::TABLE.'.'.self::COL_BODY,
        TCOL_POST_ID = self::TABLE.'.'.self::COL_POST_ID;

    protected $fillable=[
        self::COL_USER_ID,
        self::COL_BODY,
        self::COL_POST_ID
    ];

    public function replies()
    {
        return $this->hasMany(CommentReply::class);
    }

    public function post()
    {
        return $this->hasOne(Post::class, 'id', 'post_id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
