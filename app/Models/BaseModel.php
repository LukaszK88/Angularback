<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model{

    const   COL_CREATED_AT = 'created_at',
            COL_UPDATED_AT = 'updated_at';

}