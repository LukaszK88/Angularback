<?php
/**
 * Created by PhpStorm.
 * User: lukas
 * Date: 19/04/17
 * Time: 07:19
 */

namespace App\Http\Transformers;

class UserTransformer extends Transformers
{

    public function transform($user){



            return [
                'id' => $user['id'],
                'name' => $user['name'],
                'weight' => $user['weight'],
                'age' => $user['age'],
                'about' => $user['about'],
                'password' => $user['password'],
                'role' => $user['role'],
                'quote' => $user['quote'],
                'username' => $user['username'],
                'google_picture' => $user['google_picture'],
                'facebook_picture' => $user['facebook_picture'],
                'total_points' => $user['total_points'],
            ];


    }

}