<?php

namespace App\Services;

class RankingService
{

    public function calculateProfightPoints($record)
    {
        return (($record->win * 3) + ($record->ko * 4) + ($record->loss) + ($record->fc_1 * 10) + ($record->fc_2 * 6) + ($record->fc_3 * 3));
    }

    public function calculateBohurtPoints($record)
    {
        return ((($record->won * 2) + $record->last) - ($record->suicide * 3));
    }

    public function addProfightFights($record)
    {
        return $record->win + $record->ko + $record->loss;
    }

    public function addBohurtFights($record)
    {
        return $record->suicide + $record->down + $record->last + $record->won;
    }

}