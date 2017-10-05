<?php
/**
 * Created by PhpStorm.
 * User: lukas
 * Date: 19/04/17
 * Time: 07:19
 */

namespace App\Http\Transformers;

class RankingTransformer extends Transformers
{

    public function transform($fighter)
    {
        return [
            'id' => $fighter['id'],
            'name' => $fighter['name'],
            'club'  => $fighter['club'],
            'image' => $fighter['image'],
            'fb_image' => $fighter['facebook_picture'],
            'weight' => $fighter['weight'],
            'total_points' => $fighter['total_points'],
            'bohurtTable' => $fighter['bohurtTable'],
            'bohurt' => $fighter['bohurt'],
            'profightTable' => $fighter['profightTable'],
            'profight' => $fighter['profight'],
            'swordShieldTable' => $fighter['swordShieldTable'],
            'swordShield' => $fighter['sword_shield'],
            'swordBucklerTable' => $fighter['swordBucklerTable'],
            'swordBuckler' => $fighter['sword_buckler'],
            'longswordTable' => $fighter['longswordTable'],
            'longsword' => $fighter['longsword'],
            'polearmTable' => $fighter['polearmTable'],
            'polearm' => $fighter['polearm'],
            'triathlonTable' => $fighter['triathlonTable'],
            'triathlon' => $fighter['triathlon']
        ];
    }

}