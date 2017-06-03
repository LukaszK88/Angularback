<?php

namespace App\Http\Controllers;

use App\Bohurt;
use App\Mail\Registration;
use App\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
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


    public function storePhoto(Request $request, $id, User $user)
    {
        $file = $request->file('file');

        $name = $file->getClientOriginalName();

        Storage::disk('local')->put('public/'.$id.'/'.$name , file_get_contents($file->getRealPath()));

        $imageUrl = config('app.url').'/storage/'.$id.'/'.$name;

        $user->updateOrCreate(['id'=> $id]
        ,['image' => $imageUrl]);

        $response = [
            'message' => 'Photo Uploaded',
            'imageUrl' => $imageUrl
        ];

        return response()->json($response, 200);

    }

    public function user()
    {
        $token = JWTAuth::getToken();

        $user = JWTAuth::toUser($token);


        return response()->json($user);

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

            if($user->status == 0){
                return $this->responseNotFound('Your account is not active');
            }elseif ($user->status == 2){
                return $this->responseNotFound('Your account is blocked');
            }else {

                if (!empty($user->facebook) && empty($user->password)) {
                    return $this->responseNotFound('There is a Facebook acount assocciated with this email, 
                                                 use your Facebook account to log in');
                }
                if (!empty($user->google) && empty($user->password)) {
                    return $this->responseNotFound('There is a Google acount assocciated with this email, 
                                                 use your Google account to log in');
                }

                $token = JWTAuth::attempt(['username' => $request->input('username'), 'password' => $request->input('password')]);

                if ($token) {
                    return $this->tokenCreated($token, 'You are logged in!');

                } else {
                    return $this->responseNotFound('Wrong combination');
                }
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
            'password' => bcrypt($request->input('password'))
        ]);
        Mail::to($user->username)->send(new Registration($user));
        return $this->tokenCreated(JWTAuth::fromUser($user),'Registration succesful, you will hear back from us once your account is activated');
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

    public function updatePassword(Request $request)
    {
        $token = JWTAuth::getToken();

        $user = JWTAuth::toUser($token);

        if($user->password){


            $valid = Auth::attempt(['username' => $user->username, 'password' => $request->input('currentPassword')]);

            if(!$valid){
                return $this->responseNotFound('Current Password do not match our record');
            }

        }

        $user->update([
            'password' => bcrypt($request->input('newPassword'))
        ]);

        return $this->responseCreated('Password updated');
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


        $user = User::where('username', '=', $profile['email'])->first();

        if ($user) {
            if($user->status == 0){
                return $this->responseNotFound('Your account is not active');
            }elseif ($user->status == 2){
                return $this->responseNotFound('Your account is blocked');
            }else {
                return $this->tokenCreated(JWTAuth::fromUser($user), 'You are logged in with Facebook redirecting...!');
            }
        }

        $user = User::create([
            'username' => $profile['email'],
            'facebook' => $profile['id'],
            'facebook_picture' => $profile['picture']['data']['url'],
            ]);


        return $this->responseCreated('Registration succesful, you will hear back from us once your account is activated');



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

            $user = User::where('username', '=', $profile['email'])->first();
            if ($user)
            {
                if($user->status == 0){
                    return $this->responseNotFound('Your account is not active');
                }elseif ($user->status == 2){
                    return $this->responseNotFound('Your account is blocked');
                }else {
                    return $this->tokenCreated(JWTAuth::fromUser($user), 'You are logged in with Gmail redirecting...!');
                }
            }

            $user = User::create([
                'username' => $profile['email'],
                'google' => $profile['sub'],
                'google_picture' => $profile['picture'],
                ]);
        return $this->responseCreated('Registration succesful, you will hear back from us once your account is activated');


    }

    private function isActive($user){
        if($user->status == 0){
            return $this->responseNotFound('Your account is not active');
        }elseif ($user->status == 2){
            return $this->responseNotFound('Your account is blocked');
        }else {
            return true;
        }
    }
}
