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
            'password' => bcrypt($password),
            'club_id' => $request->input('club_id') ?? 0
        ]);

        return $user;
    }

    public function registerClubUser($request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users,username',
        ]);

        if ($validator->fails()) return $validator->errors();

        $user = User::create([
            'name' => $request->input('name'),
            'username' => $request->input('email'),
            'club_id' => $request->input('club_id')
        ]);

        return $user;
    }
}