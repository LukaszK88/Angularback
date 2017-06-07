<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImageType extends Model
{
    protected $table = self::TABLE;

    const TABLE = 'image_types';

    const   COL_ID = 'id',
        COL_TYPE = 'type';

    const   TCOL_TYPE = self::TABLE.'.'.self::COL_TYPE;

    protected $fillable=[
        self::COL_TYPE
    ];

    public function image(){

        return $this->belongsToMany(Image::class);

    }
}
