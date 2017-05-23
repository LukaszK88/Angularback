<?php

namespace App\Http\Controllers;

use App\Bohurt;
use App\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Transformers\UserTransformer;
use Illuminate\Support\Facades\Storage;


class FightersController extends ApiController
{
    protected $userTransformer;
    /**
     * FightersController constructor.
     */
    public function __construct(UserTransformer $userTransformer)
    {
        $this->userTransformer = $userTransformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

            $users = User::where('name','!=','')->orderBy('total_points','desc')->get();
            $response = [
                'fighters' => $this->userTransformer->transformCollection($users)
            ];

            return response()->json($response,200);

    }

    public function storePhoto(Request $request, $id, User $user)
    {
        $file = $request->file('file');

        $name = $file->getClientOriginalName();

        Storage::disk('local')->put('public/'.$id.'/'.$name , file_get_contents($file->getRealPath()));

        $user->updateOrCreate(['id'=> $id]
        ,['image' => config('app.url').'/storage/'.$id.'/'.$name]);



          return 'done';

    }

    public function user()
    {
        $token = JWTAuth::getToken();

        $user = JWTAuth::toUser($token);


        return response()->json($user);

    }

    public function bohurt()
    {

        $fighters = User::with('bohurt')->with('profight')->where('name','!=','')->get();

        $response = [
            'fighters' => $fighters
        ];

        return response()->json($response,200);

    }

    public function saveBohurt(Request $request)
    {
        //$bohurtRecord = Bohurt::where('user_id',$request->input('fighterId'))->first();

        $record = Bohurt::create([
            'user_id' => $request->input('fighterId'),
            'won' => $request->input('bohurt.won'),
            'last' => $request->input('bohurt.last'),
            'down' => $request->input('bohurt.down'),
            'suicide' => $request->input('bohurt.suicide'),
            'fights' => $request->input('bohurt.suicide') + $request->input('bohurt.down') + $request->input('bohurt.last') + $request->input('bohurt.won'),
            'points' => ((($request->input('bohurt.won') * 2) + $request->input('bohurt.last')) - ($request->input('bohurt.suicide') * 3) )
            ]
        );

        $user = User::find($request->input('fighterId'));
        $user->update([
            'total_points' => ($user->total_points + $record->points)
        ]);

        return $this->responseCreated('Fighter record updated');

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {  $email = $request->input('username');
        $password = $request->input('password');
        $user = User::where('username', '=', $email)->first();

        if (!$user)
        {
            return $this->responseNotFound('Wrong username');
        }else {

            $token = JWTAuth::attempt(['username' => $request->input('username'), 'password' => $request->input('password')]);

            if ($token) {
                return $this->tokenCreated($token, 'You are logged in!');

            } else {
                return $this->responseNotFound('Wrong combination');
            }

        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users,username',
        ]);

        if ($validator->fails()) {

            return $this->responseNotFound($validator->errors());

        }

        $user = User::create([
            'username' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
        ]);

        return $this->tokenCreated(JWTAuth::fromUser($user),'Registration succesful');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $token = JWTAuth::getToken();

        $user = JWTAuth::toUser($token);


        $user->update($request->all());


        return $this->responseCreated('Profile updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function facebook(Request $request)
    {
        $client = new \GuzzleHttp\Client();
        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'redirect_uri' => $request->input('redirectUri'),
            'client_secret' => Config::get('app.facebook_secret')
        ];
        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('GET', 'https://graph.facebook.com/v2.5/oauth/access_token', [
            'query' => $params
        ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true);
        // Step 2. Retrieve profile information about the current user.
        $fields = 'id,email,first_name,last_name,link,name,picture';
        $profileResponse = $client->request('GET', 'https://graph.facebook.com/v2.5/me', [
            'query' => [
                'access_token' => $accessToken['access_token'],
                'fields' => $fields
            ]
        ]);
        $profile = json_decode($profileResponse->getBody(), true);


        $user = User::where('username', '=', $profile['email']);

        if ($user->first()) {
            return $this->tokenCreated(JWTAuth::fromUser($user->first()),'You are logged in with Facebook redirecting...!');
        }

        $user = User::firstOrCreate(['username' => $profile['email']],
            ['facebook' => $profile['id'],
                'facebook_picture' => $profile['picture']['data']['url'],
            ]);


        return $this->tokenCreated(JWTAuth::fromUser($user),'You are logged in with Facebook redirecting...!');


    }

    /**
     * Login with Google.
     */
    public function google(Request $request)
    {
        $client = new \GuzzleHttp\Client();
        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'client_secret' => Config::get('app.google_secret'),
            'redirect_uri' => $request->input('redirectUri'),
            'grant_type' => 'authorization_code',
        ];
        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('POST', 'https://accounts.google.com/o/oauth2/token', [
            'form_params' => $params
        ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true);
        // Step 2. Retrieve profile information about the current user.
        $profileResponse = $client->request('GET', 'https://www.googleapis.com/plus/v1/people/me/openIdConnect', [
            'headers' => array('Authorization' => 'Bearer ' . $accessToken['access_token'])
        ]);
        $profile = json_decode($profileResponse->getBody(), true);

        // Step 3b. Create a new user account or return an existing one.

            $user = User::where('username', '=', $profile['email']);
            if ($user->first())
            {
                return $this->tokenCreated(JWTAuth::fromUser($user->first()),'You are logged in with Gmail redirecting...!');

            }

            $user = User::firstOrCreate(['username' => $profile['email']],
                    ['google' => $profile['sub'],
                        'google_picture' => $profile['picture'],
                ]);

        return $this->tokenCreated(JWTAuth::fromUser($user),'You are logged in with Gmail redirecting...!');

    }
}
