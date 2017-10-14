<?php

namespace App\Services;

use App\Http\Controllers\ApiController;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AuthService
{
    public function registerUser($request,$username,$password)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users,username',
        ]);

        if ($validator->fails()) return $validator->errors();

        $user = User::create([
            'username' => $username,
            'password' => bcrypt($password)
        ]);

        return $user;
    }
}