<?php
/**
 * Created by PhpStorm.
 * User: lukas
 * Date: 19/04/17
 * Time: 07:19
 */

namespace App\Http\Transformers;

abstract class Transformers
{

    public function transformCollection($items)
    {
        return array_map([$this, 'transform'],$items->toArray());
    }

    public abstract function transform($item);

}