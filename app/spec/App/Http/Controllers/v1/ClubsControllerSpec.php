<?php

namespace spec\App\Http\Controllers\v1;

use App\Http\Controllers\v1\ClubsController;
use App\Models\Bohurt;
use App\Models\Longsword;
use App\Models\Polearm;
use App\Models\Profight;
use App\Models\SwordBuckler;
use App\Models\SwordShield;
use App\Models\Triathlon;
use App\Models\User;
use App\Repositories\DbClubRepository;
use App\Repositories\DbFighterRepository;
use App\Repositories\DbUserRepository;
use App\Services\ClubService;
use App\Services\RankingService;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use spec\PhpSpec\Formatter\Presenter\TaggingPresenterSpec;


class ClubsControllerSpec extends ObjectBehavior
{
    function let()
    {
        $rankingService = new RankingService(
            new Bohurt(),
            new Profight(),
            new SwordShield(),
            new SwordBuckler(),
            new Longsword(),
            new Polearm(),
            new Triathlon()
        );
        $clubService = new ClubService($rankingService, new DbFighterRepository($rankingService));
        $this->beConstructedWith( $clubService, new DbClubRepository(), new DbUserRepository());
    }


    function it_is_initializable()
    {
        $this->shouldHaveType(ClubsController::class);
    }

    function it_returns_clubs_based_on_country()
    {
        $this->getClubs(0,0)->shoulReturn(null);
    }
}
