<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommentReply extends Model
{
    protected $table = self::TABLE;

    const TABLE = 'comment_reply';

    const   COL_ID = 'id',
        COL_USER_ID = 'user_id',
        COL_BODY = 'body',
        COL_COMMENT_ID = 'comment_id';

    const   TCOL_ID = self::TABLE.'.'.self::COL_ID,
        TCOL_BODY = self::TABLE.'.'.self::COL_BODY,
        TCOL_COMMENT_ID = self::TABLE.'.'.self::COL_COMMENT_ID;

    protected $fillable=[
        self::COL_USER_ID,
        self::COL_BODY,
        self::COL_COMMENT_ID
    ];

    public function comment()
    {
        return $this->hasOne(Comment::class, 'id', 'comment_id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
