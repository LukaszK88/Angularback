<?php
namespace App\Repositories;

use App\Contracts\Repositories\UserRepositoryInterface;
use App\Models\User;

class DbUserRepository implements UserRepositoryInterface
{
    public function setUserAsClubAdmin($userId, $clubId)
    {
        return  User::where(User::COL_ID,$userId)
                ->update([
                    User::COL_CLUB_ADMIN_ID => $clubId,
                    User::COL_CLUB_ID => $clubId
                ]);
    }

    public function removeFromClub($userId)
    {
        return  User::where(User::COL_ID,$userId)
            ->update([
                User::COL_CLUB_ID => 0
            ]);
    }
}