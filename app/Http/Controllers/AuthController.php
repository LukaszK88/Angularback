<?php

namespace App\Http\Controllers;

use App\Mail\NewRegistrationNotification;
use App\Models\User;
use App\Services\AuthService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\MessageBag;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Mail\Registration;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;


class AuthController extends ApiController
{

    public function store(Request $request, AuthService $authService)
    {
        $user = $authService->registerUser($request,$request->input('email'),$request->input('password'));
        if($user instanceof MessageBag) return $this->responseNotFound($user);

        Mail::to($user->username)->send(new Registration($user));
        Mail::to(config('app.myEmail'))->send(new NewRegistrationNotification($user));
        return $this->responseCreated('Registration successful, you will hear back from us once your account is activated');
    }

    public function authenticateLogin(Request $request)
    {
        $email = $request->input('username');
        $user = User::where('username', '=', $email)->first();

        if (!$user)
        {
            return $this->responseNotFound('Wrong username');
        }else {

            if ($user->status == 0) {
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

                if (!$user->password || !isset($user->password)) {
                    return $this->respond(['password' => 1]);
                }
            }

            return $this->respond(['password' => 0]);
        }
    }

    public function authenticatePassword(Request $request, bool $createPassword)
    {
        $password = $request->input('password');
        $username = $request->input('username');

        if ($createPassword){
            User::where('username',$username)->update([
                'password' => bcrypt($password)
            ]);
        }

        $token = JWTAuth::attempt(['username' => $username, 'password' => $password]);

        if ($token) {
            $this->recordLogin($request->input('username'));
            return $this->tokenCreated($token, 'You are logged in!');
        }
        return $this->responseNotFound('Wrong combination');

    }

    public function facebook2(Request $request)
    {
        $data = $request->all();

        $user = User::where(User::COL_USERNAME,$data['profile']['email'])->first();
        if($user) {
            if ($user->status == 0) {
                return $this->responseNotFound('Your account is not active');
            } elseif ($user->status == 2) {
                return $this->responseNotFound('Your account is blocked');
            } else
                $this->recordLogin($data['profile']['email']);
            return $this->tokenCreated(JWTAuth::fromUser($user), 'You are logged in with Facebook!');

        }else{

            $user = User::create([
                'username' => $data['profile']['email'],
                'facebook' => $data['profile']['id'],
                //'facebook_picture' => $data['picture']['data']['url'],
                'name' => $data['profile']['name']
            ]);
            Mail::to($user->username)->send(new Registration($user));
            Mail::to(config('app.myEmail'))->send(new NewRegistrationNotification($user));
            return $this->responseCreated('Registration successful, you will hear back from us once your account is activated');
        }
    }

    private function recordLogin($username)
    {//todo user timezone??
        User::where(User::COL_USERNAME,$username)->update([User::COL_LAST_LOGIN => Carbon::now()]);
    }

}
