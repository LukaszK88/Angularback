<?php

namespace App\Http\Controllers;

use App\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;


class FightersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

            $fighters = User::where('name','!=','')->orderBy('total_points','desc')->get();
            $response = [
                'fighters' => $fighters
            ];

            return response()->json($response,200);

    }

    public function user()
    {
        $token = JWTAuth::getToken();

        $user = JWTAuth::toUser($token);


        return response()->json($user);

    }

    public function bohurt()
    {

        $fighters = User::with('bohurt')->where('name','!=','')->get();

        $response = [
            'fighters' => $fighters
        ];

        return response()->json($response,200);

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
            return response()->json(['error' => 'Wrong username'], 401);
        }else {

            $token = JWTAuth::attempt(['username' => $request->input('username'), 'password' => $request->input('password')]);

            if ($token) {
                return response()->json(['token' => $token]);
            } else {
                return response()->json(['error' => 'Wrong email and/or password'], 401);
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
            'email' => 'required|unique:users,username|max:64|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {


            return response()->json([ 'errors' => $validator->errors()], 400);

        }

        $user = User::create([
            'username' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
        ]);


        return response()->json([ 'token' => JWTAuth::fromUser($user)], 201);
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
    public function update(Request $request, $id)
    {
        //
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


        $user = User::where('username', '=', $profile['id']);

        if ($user->first()) {
            return response()->json(['token' => JWTAuth::fromUser($user->first())]);
        }

        $user = User::firstOrCreate(['username' => $profile['email']],
            ['facebook' => $profile['id'],
                'facebook_picture' => $profile['picture']['data']['url'],
            ]);


            return response()->json(['token' => JWTAuth::fromUser($user)]);


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
                return response()->json(['token' => JWTAuth::fromUser($user->first())]);
            }

            $user = User::firstOrCreate(['username' => $profile['email']],
                    ['google' => $profile['sub'],
                        'google_picture' => $profile['picture'],
                ]);

            return response()->json(['token' => JWTAuth::fromUser($user)]);

    }
}
