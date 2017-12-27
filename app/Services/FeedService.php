<?php

namespace App\Services;

use App\Models\Feed;

class FeedService
{
    const CREATED_EVENT = ' created Event ';
    const ACHIEVEMENT = ' earned achievement ';
    const CLUB_JOIN = ' joined club ';
    const ATTENDING = ' is attending ';
    const RANKING_RECORD = ' gained ';

    public static function feedEntry($body,Array $info)
    {
        $data = [Feed::COL_BODY => $body];
        foreach ($info as $column => $value){
           $data[$column] = $value;
        }
        return Feed::create($data);
    }
}