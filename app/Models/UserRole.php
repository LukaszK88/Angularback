<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    protected $table = self::TABLE;

    const TABLE = 'user_roles';

    const   COL_ID = 'id',
            COL_ROLE = 'role';

    const   TCOL_ROLE = self::TABLE.'.'.self::COL_ROLE,
            TCOL_ID = self::TABLE.'.'.self::COL_ID;

    protected $fillable=[
        self::COL_ROLE
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
