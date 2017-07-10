<?php

namespace App\Models;
use App\Http\Middleware\TrimStrings;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    protected $table = self::TABLE;

    const TABLE = 'users';

    const COL_USER_ROLE_ID = 'user_role_id',
        COL_NAME = 'name',
        COL_FACEBOOK_IMG = 'facebook_picture',
        COL_GOOGLE_IMG = 'google_picture',
        COL_IMG = 'image',
        COL_USERNAME = 'username',
        COL_ID = 'id';

    const TCOL_USER_ROLE_ID = self::TABLE.'.'.self::COL_USER_ROLE_ID,
        TCOL_NAME = self::TABLE.'.'.self::COL_NAME,
        TCOL_FACEBOOK_IMG = self::TABLE.'.'.self::COL_FACEBOOK_IMG,
        TCOL_GOOGLE_IMG = self::TABLE.'.'.self::COL_GOOGLE_IMG,
        TCOL_IMG = self::TABLE.'.'.self::COL_IMG,
        TCOL_USERNAME = self::TABLE.'.'.self::COL_USERNAME,
        TCOL_ID = self::TABLE.'.'.self::COL_ID;

    protected $fillable=[
        'name',
        'username',
        'temp_password',
        'salt',
        'status',
        'age',
        'about',
        'quote',
        'password',
        'facebook',
        'facebook_picture',
        'google',
        'google_picture',
        self::COL_USER_ROLE_ID,
        'weight',
        'image',
        'total_points',
    ];

    public function getUserWithCategoriesHeAttendsOnEvent($eventAttendId,$userId)
    {
        return User::
            select(User::TCOL_ID, User::TCOL_USERNAME)
            ->where(self::TCOL_ID,$userId)
            ->with(['eventAttendCategory' => function ($query) use ($eventAttendId) {
                $query->where(EventAttendCategory::TCOL_EVENT_ATTEND_ID, '=', $eventAttendId);
            }])
            ->first();
    }

    public function note()
    {
        return $this->belongsTo(EventNote::class, 'user_id', 'id');
    }

    public function bohurt(){

        return $this->hasMany(Bohurt::class);
    }

    public function post(){

        return $this->hasMany(Post::class);
    }

    public function triathlon(){

        return $this->hasMany(Triathlon::class);
    }

    public function swordShield(){

        return $this->hasMany(SwordShield::class);
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

    public function swordBuckler(){

        return $this->hasMany(SwordBuckler::class);
    }

    public function achievement(){

        return $this->hasMany(Achievement::class);
    }

    public function event(){

        return $this->hasMany(Event::class);
    }

    public function role(){

        return $this->hasOne(UserRole::class);
    }

    public function eventAttendCategory()
    {
        return $this->hasManyThrough(
            EventAttendCategory::class,
            EventAttendence::class,
            'user_id', 'event_attend_id', 'id'
        );
    }

    public function attendence(){

        return $this->hasOne(EventAttendence::class, 'id', 'user_id');
    }
}
