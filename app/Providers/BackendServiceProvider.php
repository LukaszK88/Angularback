<?php

namespace App\Providers;

use App\Contracts\Repositories\CategoryRepositoryInterface;
use App\Contracts\Repositories\ClubRepositoryInterface;
use App\Contracts\Repositories\EventRepositoryInterface;
use App\Contracts\Repositories\FighterRepositoryInterface;
use App\Contracts\Repositories\UserRepositoryInterface;
use App\Repositories\DbCategoryRepository;
use App\Repositories\DbClubRepository;
use App\Repositories\DbEventRepository;
use App\Repositories\DbFighterRepository;
use App\Repositories\DbUserRepository;
use Illuminate\Support\ServiceProvider;

class BackendServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(FighterRepositoryInterface::class,DbFighterRepository::class);
        $this->app->bind(ClubRepositoryInterface::class,DbClubRepository::class);
        $this->app->bind(UserRepositoryInterface::class,DbUserRepository::class);
        $this->app->bind(EventRepositoryInterface::class,DbEventRepository::class);
        $this->app->bind(CategoryRepositoryInterface::class,DbCategoryRepository::class);
    }
}