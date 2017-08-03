<?php
/**
 * Created by PhpStorm.
 * User: Lukasz
 * Date: 28/01/2017
 * Time: 17:16
 */
namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Profight extends BaseRanking {

    protected $table = 'profights';

    const   COL_FC_1_ID = 'fc_1',
            COL_FC_2_ID = 'fc_2',
            COL_FC_3_ID = 'fc_3',
            COL_KO = 'ko';


    protected $fillable=[
        self::COL_FC_1_ID,
        self::COL_FC_2_ID,
        self::COL_FC_3_ID,
        self::COL_KO
    ];
    
    public function user()
    {
        return $this->belongsToMany(User::class);
    }
}