<?php

namespace App\Http\Controllers\v1;

use App\Contracts\Repositories\ClubRepositoryInterface;
use App\Contracts\Repositories\UserRepositoryInterface;
use App\Mail\ClubActivated;
use App\Mail\ClubCaptainRegistration;
use App\Mail\ClubFighterRegistration;
use App\Mail\ClubRegistration;
use App\Models\Club;
use App\Models\Feed;
use App\Models\User;
use App\Services\AuthService;
use App\Services\ClubService;
use App\Services\FeedService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\MessageBag;

class ClubsController extends ApiController
{
    protected $clubService,
            $club,
            $user;

    public function __construct(ClubService $clubService, ClubRepositoryInterface $club, UserRepositoryInterface $user)
    {
        $this->clubService = $clubService;
        $this->club = $club;
        $this->user = $user;
    }

    /**
     * @param $country
     * @param $year
     * get all active clubs by country and club if specified,
     * with calculated total points and fights
     * @return \Illuminate\Http\JsonResponse
     */
    public function getClubs($country = 0, $year = 0)
    {
        $clubs = $this->club->getClubsByCountry($country);

        $this->clubService->sumPointsAndFightsClubFighters($clubs,$year);

        return $this->respond($clubs);
    }

    /**
     * get all clubs for admin purposes
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllClubs()
    {
        $clubs = $this->club->getAll();

        return $this->respond($clubs);
    }

    /**
     * @param $action
     * @param Request $request
     * approve/decline incoming club request
     * @return \Illuminate\Http\JsonResponse
     */
    public function takeClubAdminAction($action, Request $request)
    {
        // todo pass id trough api param?
        $club = $request->all();

        if($action == 'approve'){
            $this->club->setActive(1,$club['id']);
            //email
            Mail::to($club['founder'])->send(new ClubActivated($club));
        }else if($action == 'decline'){
            $this->club->setActive(null,$club['id']);
        }
        return $this->respond('Action taken');
    }

    /**
     * @param Request $request
     * @param AuthService $authService
     * register new club fighter
     * @return \Illuminate\Http\JsonResponse
     */
    public function registerClubFighter(Request $request, AuthService $authService)
    {
        $clubFighter = $authService->registerClubUser($request);
        if($clubFighter instanceof MessageBag) return $this->responseNotFound($clubFighter);

        // email fighter
        Mail::to($clubFighter->username)->send(new ClubFighterRegistration($clubFighter));
        return $this->responseCreated('Fighter added');
    }

    public function removeFighterFromClub($userId)
    {
        $this->user->removeFromClub($userId);

        return $this->responseCreated('Fighter removed');
    }

    public function replaceClubCaptain($userId, $captainId)
    {
        $this->user->replaceCaptain($userId,$captainId);

        return $this->responseCreated('Captain changed');
    }

    /**
     * @param Request $request
     * @param AuthService $authService
     * save new club, register captain and set him as club admin
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, AuthService $authService)
    {
        $data = $request->all();
        $club = $this->club->findByName($data['name']);

        if($club) return $this->respondWithError('Club already exists');

        $data['founder'] = $data['email'];

        $club = $this->club->create($data);

        $captain = $authService->registerUser($request,$data['email'],$data['password'],$club->id);
        if($captain instanceof MessageBag) return $this->responseNotFound($captain);

        $this->user->setUserAsClubAdmin($captain->id,$club->id);

        FeedService::feedEntry(
            FeedService::CLUB_JOIN_RANKING,
            [Feed::COL_CLUB_JOIN_ID => $club->id ?? 0, Feed::COL_USER_ID => $captain->id]);

        //email captain
        Mail::to($data['email'])->send(new ClubCaptainRegistration($data));
        Mail::to(config('app.myEmail'))->send(new ClubRegistration($data));

        return $this->responseCreated('Club Registered, we will get back to you with confirmation soon...');
    }

    /**
     * @param $id
     * get club with fighters and all relevant club page info
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $club = Club::where(Club::COL_ID,$id)->first();

        $this->clubService->getClubPageInfo($club);

        return $this->respond($club);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();

        $this->club->update($id,$data);

        return $this->respondWithMessage('Club Info Updated!');
    }

    public function storeClubLogo(Request $request, $id, Club $club)
    {

        $file = $request->file('file');

        $name = $file->getClientOriginalName();

        Storage::disk('local')->put('public/club-assets/'.$id.'/'.$name , file_get_contents($file->getRealPath()));

        $imageUrl = config('app.url').'/storage/club-assets/'.$id.'/'.$name;

        $club->updateOrCreate(['id'=> $id]
            ,['logo' => $imageUrl]);

        $response = [
            'message' => 'Photo Uploaded',
            'imageUrl' => $imageUrl
        ];

        return response()->json($response, 200);

    }
}
