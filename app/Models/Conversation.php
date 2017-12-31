<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $table = self::TABLE;

    const TABLE = 'conversations';

    const   COL_ID = 'id',
        COL_FROM = 'from',
        COL_TO = 'to';

    protected $fillable=[
        self::COL_FROM,
        self::COL_TO,
    ];

    public function fromUser()
    {
        return $this->belongsTo(User::class,'from','id');
    }

    public function toUser()
    {
        return $this->belongsTo(User::class,'to','id');
    }
}
