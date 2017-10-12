<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    protected $table = self::TABLE;

    const TABLE = 'clubs';

    const COL_ID = 'id',
        COL_NAME = 'name',
        COL_LOGO = 'logo',
        COL_FB = 'fb',
        COL_MOTTO = 'motto',
        COL_DESCRIPTION = 'description',
        COL_FOUNDATION = 'foundation',
        COL_ACTIVE = 'active',
        COL_FOUNDER = 'founder',
        COL_COUNTRY = 'country';

    const TCOL_NAME = self::TABLE.'.'.self::COL_NAME;

    protected $fillable = [
        self::COL_DESCRIPTION,
        self::COL_FB,
        self::COL_FOUNDATION,
        self::COL_MOTTO,
        self::COL_NAME,
        self::COL_ACTIVE,
        self::COL_LOGO,
        self::COL_FOUNDER,
        self::COL_COUNTRY
    ];

    public function users()
    {
        return $this->hasMany(User::class,'club_id','id');
    }
}
