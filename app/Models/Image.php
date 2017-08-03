<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $table = self::TABLE;

    const TABLE = 'images';

    const   COL_ID = 'id',
            COL_URL = 'url',
            COL_LINK = 'link',
            COL_THUMBNAIL = 'thumbnail',
            COL_MEDIUM = 'medium',
            COL_IMAGE_TYPE_ID = 'image_type_id',
            COL_USER_ID = 'user_id',
            COL_EVENT_ID = 'event_id',
            COL_POST_ID = 'post_id';

    const   TCOL_URL = self::TABLE . '.' . self::COL_URL,
            TCOL_LINK = self::TABLE . '.' . self::COL_LINK,
            TCOL_THUMBNAIL = self::TABLE . '.' . self::COL_THUMBNAIL,
            TCOL_MEDIUM = self::TABLE . '.' . self::COL_MEDIUM,
            TCOL_IMAGE_TYPE_ID = self::TABLE . '.' . self::COL_IMAGE_TYPE_ID,
            TCOL_USER_ID = self::TABLE . '.' . self::COL_USER_ID,
            TCOL_POST_ID = self::TABLE . '.' . self::COL_POST_ID,
            TCOL_EVENT_ID = self::TABLE . '.' . self::COL_EVENT_ID;


    protected $fillable = [
        self::COL_IMAGE_TYPE_ID,
        self::COL_LINK,
        self::COL_MEDIUM,
        self::COL_POST_ID,
        self::COL_THUMBNAIL,
        self::COL_URL,
        self::COL_USER_ID,
        self::COL_EVENT_ID
    ];

    public function post()
    {
        return $this->hasOne(Post::class, 'id', self::COL_POST_ID);
    }

    public function event()
    {
        return $this->hasOne(Event::class, 'id', self::COL_EVENT_ID);
    }

    public function imageType()
    {
        return $this->hasMany(ImageType::class, 'id', self::COL_IMAGE_TYPE_ID);
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', self::COL_USER_ID);
    }
}
