<?php
namespace App\Models;

class Feed extends BaseModel
{
    protected $table = self::TABLE;

    const TABLE = 'feed';

    const   COL_ID = 'id',
        COL_USER_ID = 'user_id',
        COL_BODY = 'body',
        COL_EVENT_ID = 'event_id',
        COL_CLUB_ID = 'club_id',
        COL_EVENT_ATTENDANCE_ID = 'event_attendance_id',
        COL_BOHURT_ID = 'bohurt_id',
        COL_LONGSWORD_ID = 'longsword_id',
        COL_POLEARM_ID = 'polearm_id',
        COL_TRIATHLON_ID = 'triathlon_id',
        COL_PROFIGHT_ID = 'profight_id',
        COL_SWORD_SHIELD_ID = 'sword_shield_id',
        COL_SWORD_BUCKLER_ID = 'sword_buckler_id',
        COL_CLUB_JOIN_ID = 'club_join_id',
        COL_ACHIEVEMENT_ID = 'achievement_id';

    protected $fillable=[
        self::COL_EVENT_ID,
        self::COL_ACHIEVEMENT_ID,
        self::COL_USER_ID,
        self::COL_BODY,
        self::COL_CLUB_ID,
        self::COL_EVENT_ATTENDANCE_ID,
        self::COL_SWORD_BUCKLER_ID,
        self::COL_SWORD_SHIELD_ID,
        self::COL_PROFIGHT_ID,
        self::COL_TRIATHLON_ID,
        self::COL_POLEARM_ID,
        self::COL_LONGSWORD_ID,
        self::COL_BOHURT_ID,
        self::COL_CLUB_JOIN_ID,
    ];

    public function swordBuckler()
    {
        return $this->belongsTo(SwordBuckler::class,self::COL_SWORD_BUCKLER_ID,'id');
    }

    public function swordShield()
    {
        return $this->belongsTo(SwordShield::class,self::COL_SWORD_SHIELD_ID,'id');
    }

    public function profight()
    {
        return $this->belongsTo(Profight::class,self::COL_PROFIGHT_ID,'id');
    }

    public function triathlon()
    {
        return $this->belongsTo(Triathlon::class,self::COL_TRIATHLON_ID,'id');
    }

    public function polearm()
    {
        return $this->belongsTo(Polearm::class,self::COL_POLEARM_ID,'id');
    }

    public function longsword()
    {
        return $this->belongsTo(Longsword::class,self::COL_LONGSWORD_ID,'id');
    }

    public function bohurt()
    {
        return $this->belongsTo(Bohurt::class,self::COL_BOHURT_ID,'id');
    }

    public function eventAttendance()
    {
        return $this->belongsTo(EventAttendence::class,self::COL_EVENT_ATTENDANCE_ID,'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function achievement()
    {
        return $this->belongsTo(Achievement::class);
    }

    public function club()
    {
        return $this->belongsTo(Club::class);
    }
}