<?php

namespace App\Http\Controllers;

use App\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class FightersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

            $fighters = User::all();
            $response = [
                'fighters' => $fighters
            ];

            return response()->json($response,200);

    }

    public function bohurt()
    {

        $fighters = User::with('bohurt')->get();

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
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|max:64|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {

            return response()->json([ 'errors' => $validator->errors()], 201);

        }

        if (auth()->attempt(['username' => $request->input('username'), 'password' => $request->input('password')])) {

            return response()->json([ 'message' => 'you are logged in'], 201);

        }else{

            return response()->json([ 'errors' => [
                'message' => 'Please double check your credentials'
                ]
            ], 201);

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


            return response()->json([ 'errors' => $validator->errors()], 201);

        }

        $fighter = User::create([
            'username' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
        ]);

        return response()->json([ 'message' => 'Account successfully crated'], 201);
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
}
