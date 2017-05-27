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

    public function transform($user){

            return [
                'name' => $user['name'],
                'total_points' => $user['total_points']
            ];


    }

}