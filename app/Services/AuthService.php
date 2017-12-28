<?php

namespace App\Services;

use App\Http\Controllers\ApiController;
use App\Models\Feed;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AuthService
{
    public function registerUser($request,$username,$password, $clubId = 1)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users,username',
        ]);

        if ($validator->fails()) return $validator->errors();

        $user = User::create([
            'username' => $username,
            'password' => bcrypt($password),
            'club_id' => $request->input('club_id') ?? $clubId ?? 1
        ]);

        FeedService::feedEntry(
            FeedService::CLUB_JOIN,
            [Feed::COL_CLUB_ID => $request->input('club_id') ??  $clubId ?? 1, Feed::COL_USER_ID => $user->id]);

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

        FeedService::feedEntry(
            FeedService::CLUB_JOIN,
            [Feed::COL_CLUB_ID => $request->input('club_id'), Feed::COL_USER_ID => $user->id]);

        return $user;
    }
}