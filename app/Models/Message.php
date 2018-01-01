<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends BaseModel
{
    protected $table = self::TABLE;

    const TABLE = 'messages';

    const   COL_ID = 'id',
        COL_FROM = 'from',
        COL_CONVERSATION_ID = 'conversation_id',
        COL_BODY = 'body',
        COL_READ = 'read',
        COL_TO = 'to';

    protected $fillable = [
        self::COL_BODY,
        self::COL_FROM,
        self::COL_TO,
        self::COL_READ,
        self::COL_CONVERSATION_ID,
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
