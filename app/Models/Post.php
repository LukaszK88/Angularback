<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = self::TABLE;

    const TABLE = 'post';

    const   COL_ID = 'id',
            COL_USER_ID = 'user_id',
            COL_TITLE = 'title',
            COL_BODY = 'body',
            COL_GALLERY = 'gallery',
            COL_POST_TYPE = 'post_type';

    const   TCOL_ID = self::TABLE.'.'.self::COL_ID,
            TCOL_TITLE = self::TABLE.'.'.self::COL_TITLE,
            TCOL_BODY = self::TABLE.'.'.self::COL_BODY,
            TCOL_POST_TYPE = self::TABLE.'.'.self::COL_POST_TYPE;

    protected $fillable=[
        self::COL_USER_ID,
        self::COL_TITLE,
        self::COL_BODY,
        self::COL_POST_TYPE,
        self::COL_GALLERY
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function postType()
    {
        return $this->hasMany(PostType::class, 'id', self::COL_POST_TYPE);
    }

    public function image()
    {
        return $this->hasMany(Image::class, Image::COL_POST_ID, 'id');
    }

    public function video()
    {
        return $this->hasMany(Video::class, Video::COL_POST_ID, 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
