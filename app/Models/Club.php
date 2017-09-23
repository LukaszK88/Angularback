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
        COL_COUNTRY = 'country';

    const TCOL_NAME = self::TABLE.'.'.self::COL_NAME;

    protected $fillable = [
        self::COL_NAME,
        self::COL_LOGO,
        self::COL_COUNTRY
    ];

    public function user()
    {
        return $this->belongsTo(User::class,'id','club_id');
    }
}
