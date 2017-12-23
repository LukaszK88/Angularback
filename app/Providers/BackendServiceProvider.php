<?php

namespace App\Providers;

use App\Contracts\Repositories\ClubRepositoryInterface;
use App\Contracts\Repositories\FighterRepositoryInterface;
use App\Repositories\DbClubRepository;
use App\Repositories\DbFighterRepository;
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
    }
}