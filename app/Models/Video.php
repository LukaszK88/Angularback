<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $table = self::TABLE;

    const TABLE = 'videos';

    const   COL_ID = 'id',
        COL_URL = 'url',
        COL_VIDEO_TYPE_ID = 'video_type_id',
        COL_USER_ID = 'user_id',
        //COL_EVENT_ID = 'event_id',
        COL_POST_ID = 'post_id';

    const   TCOL_URL = self::TABLE . '.' . self::COL_URL,
        TCOL_VIDEO_TYPE_ID = self::TABLE . '.' . self::COL_VIDEO_TYPE_ID,
        TCOL_USER_ID = self::TABLE . '.' . self::COL_USER_ID,
        TCOL_POST_ID = self::TABLE . '.' . self::COL_POST_ID;
        //TCOL_EVENT_ID = self::TABLE . '.' . self::COL_EVENT_ID;


    protected $fillable = [
        self::COL_VIDEO_TYPE_ID,
        self::COL_POST_ID,
        self::COL_URL,
        self::COL_USER_ID,
        //self::COL_EVENT_ID
    ];

    public function post()
    {
        return $this->hasOne(Post::class, 'id', self::COL_POST_ID);
    }

//    public function event(){
//
//        return $this->hasOne(Event::class, 'id', self::COL_EVENT_ID);
//
//    }

    public function videoType(){

        return $this->hasMany(VideoType::class, 'id', self::COL_VIDEO_TYPE_ID);
    }

    public function user(){

        return $this->hasOne(User::class, 'id', self::COL_USER_ID);

    }
}
