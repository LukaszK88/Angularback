<?php

namespace App\Services;

use App\Models\Bohurt;
use App\Models\Longsword;
use App\Models\Polearm;
use App\Models\Profight;
use App\Models\SwordBuckler;
use App\Models\SwordShield;
use App\Models\Triathlon;
use App\Models\User;

class RankingService
{
    const STANDARD_RANKING_COLUMNS = ['loss','fights','win','points'];
    const RANKING_CATEGORIES = ['bohurt','profight','triathlon','swordShield','swordBuckler','polearm','longsword'];

    protected   $bohurt,
        $profight,
        $swordShield,
        $swordBuckler,
        $longsword,
        $polearm,
        $triathlon;

    public function __construct(
        Bohurt $bohurt,
        Profight $profight,
        SwordShield $swordShield,
        SwordBuckler $swordBuckler,
        Longsword $longsword,
        Polearm $polearm,
        Triathlon $triathlon
    )
    {
        $this->bohurt = $bohurt;
        $this->profight = $profight;
        $this->swordShield = $swordShield;
        $this->swordBuckler = $swordBuckler;
        $this->longsword = $longsword;
        $this->polearm = $polearm;
        $this->triathlon = $triathlon;
    }

    public function updateRecord($data,$category,$recordId,$user)
    {
        $categoryToRelationship = $this->mapCategoryToRelationship();

        $relationship = $categoryToRelationship[$category];

        $oldRecord = $relationship->find($recordId);

        switch ($category){
            case 'bohurt':
                $user->update([User::COL_TOTAL_POINTS => $user->total_points - $this->calculateBohurtPoints($oldRecord)]);
                break;
            case 'profight':
                $user->update([User::COL_TOTAL_POINTS => $user->total_points - $this->calculateProfightPoints($oldRecord)]);
                break;
            default:
                $user->update([User::COL_TOTAL_POINTS => $user->total_points - $oldRecord->win]);
                break;
        }

        $newRecord = $relationship->updateOrCreate(['id' => $recordId], $data);

        switch ($category){
            case 'bohurt':
                $newRecord->update([
                    'fights' => $this->addBohurtFights($newRecord),
                    'points' => $this->calculateBohurtPoints($newRecord)
                ]);
                break;
            case 'profight':
                $newRecord->update([
                    'fights' => $this->addProfightFights($newRecord),
                    'points' => $this->calculateProfightPoints($newRecord)
                ]);
                break;
            default:
                $newRecord->update([
                    'fights' => $newRecord->win + $newRecord->loss,
                    'points' => $newRecord->win
                ]);
                break;
        }
        return $newRecord;
    }

    public function createRecord($request, $category)
    {
        $categoryToRelationship = $this->mapCategoryToRelationship();

        $relationship = $categoryToRelationship[$category];

        $savedRecord = $relationship->create($request->all());

        return $savedRecord;
    }

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

    public function prepareFightersDataForRanking($fighters)
    {
        foreach ($fighters as $key => $fighter){
           $this->prepareFighterDataForRanking($fighter);
        }
        return $fighters;
    }

    public function prepareFighterDataForRanking($fighter)
    {
        $fighter['bohurtTable'] = $this->sumCategoryRecords($fighter,'bohurt',['last','fights','won','suicide','points','down']);
        $fighter['profightTable'] = $this->sumCategoryRecords($fighter,'profight',['loss','fights','win','ko','fc_1','fc_2','fc_3','points']);
        $fighter['swordShieldTable'] = $this->sumCategoryRecords($fighter,'swordShield',self::STANDARD_RANKING_COLUMNS);
        $fighter['swordBucklerTable'] = $this->sumCategoryRecords($fighter,'swordBuckler',self::STANDARD_RANKING_COLUMNS);
        $fighter['longswordTable'] = $this->sumCategoryRecords($fighter,'longsword',self::STANDARD_RANKING_COLUMNS);
        $fighter['polearmTable'] = $this->sumCategoryRecords($fighter,'polearm',self::STANDARD_RANKING_COLUMNS);
        $fighter['triathlonTable'] = $this->sumCategoryRecords($fighter,'triathlon',self::STANDARD_RANKING_COLUMNS);
        $fighter['total_points'] = $this->sumTotalPoints($fighter);
        return $fighter;
    }

    public function sumTotalFights($fighter):int
    {
        $totalFights = 0;
        foreach (self::RANKING_CATEGORIES as $category){
            $totalFights += $this->sumCategoryRecords($fighter,$category,['fights'])['fights'];
        }
        return $totalFights;
    }

    public function sumTotalPoints($fighter)
    {
        $totalPoints = 0;
        foreach (self::RANKING_CATEGORIES as $category){
            $totalPoints += $fighter[$category]->sum('points');
        }
        return $totalPoints;
    }

    public function sumCategoryRecords($fighter,$relationship,Array $columns)
    {
        foreach ($columns as $key => $col){
            $columns[$col] = $fighter[$relationship]->sum($col);
            if(is_numeric($key)) unset($columns[$key]);
        }
        return $columns;
    }

    private function mapCategoryToRelationship()
    {
        return [
            'bohurt' => $this->bohurt,
            'profight' => $this->profight,
            'sword_shield' => $this->swordShield,
            'sword_buckler' => $this->swordBuckler,
            'longsword' => $this->longsword,
            'polearm' => $this->polearm,
            'triathlon' => $this->triathlon
        ];
    }

}