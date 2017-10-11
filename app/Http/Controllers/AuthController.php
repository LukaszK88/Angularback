<?php

namespace App\Http\Controllers;

use App\Mail\NewRegistrationNotification;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Mail\Registration;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;


class AuthController extends ApiController
{

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users,username',
        ]);

        if ($validator->fails()) return $this->responseNotFound($validator->errors());

        $user = User::create([
            'username' => $request->input('email'),
            'password' => bcrypt($request->input('password'))
        ]);

        Mail::to($user->username)->send(new Registration($user));
        Mail::to(config('app.myEmail'))->send(new NewRegistrationNotification($user));
        return $this->responseCreated('Registration successful, you will hear back from us once your account is activated');
    }

    public function authenticate(Request $request)
    {
        $email = $request->input('username');
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

                $token = JWTAuth::attempt(['username'=>$email, 'password' => $password]);

                if ($token) {
                    $this->recordLogin($email);
                    return $this->tokenCreated($token, 'You are logged in!');

                } else {
                    return $this->responseNotFound('Wrong combination');
                }
            }
        }
    }

    public function facebook2(Request $request)
    {
        $data = $request->all();

        $user = User::where(User::COL_USERNAME,$data['profile']['email'])->first();
        if($user){
            $this->recordLogin($data['profile']['email']);
            return $this->tokenCreated(JWTAuth::fromUser($user), 'You are logged in with Facebook!');
        }else{

            $user = User::create([
                'username' => $data['profile']['email'],
                'facebook' => $data['profile']['id'],
                //'facebook_picture' => $data['picture']['data']['url'],
                'name' => $data['profile']['name']
            ]);
            //Mail::to($user->username)->send(new Registration($user));
            return $this->responseCreated('Registration successful, you will hear back from us once your account is activated');
        }
    }

    private function recordLogin($username)
    {//todo user timezone??
        User::where(User::COL_USERNAME,$username)->update([User::COL_LAST_LOGIN => Carbon::now()]);
    }

//    public function google2(Request $request)
//    {
//        $data = $request->all();
//
//        $user = User::where(User::COL_USERNAME,$data['email'])->first();
//        if($user){
//            return $this->tokenCreated(JWTAuth::fromUser($user), 'You are logged in with google!');
//        }else{
//
//            $user = User::create([
//                'username' => $data['email'],
//                'google' => $data['uid'],
//                'google_picture' => $data['image'],
//                'name' => $data['name']
//            ]);
//            Mail::to($user->username)->send(new Registration($user));
//            return $this->responseCreated('Registration successful, you will hear back from us once your account is activated');
//        }
//    }

}
