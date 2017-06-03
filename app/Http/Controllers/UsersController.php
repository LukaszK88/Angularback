<?php

namespace App\Http\Controllers;

use App\Mail\PasswordRecovery;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class UsersController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showUnauthorized()
    {
        $users = User::where('role',0)->get();

        return $this->respond($users);
    }

    public function passwordRecovery(Request $request)
    {

        $user = User::where('username',$request->input('username'))->first();

        if($user){
            $password = md5($request->input('username'));

            $user->update([
                'password' => '',
                'temp_password' => $password
            ]);


            //sent email
           Mail::to($user->username)->send(new PasswordRecovery($password));
            return $this->responseCreated('Recovery email sent!');
        }

        return $this->responseNotFound('User does not exist in our records');
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
}
