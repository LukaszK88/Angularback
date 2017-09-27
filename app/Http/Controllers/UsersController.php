<?php

namespace App\Http\Controllers;

use App\Mail\AccountActivated;
use App\Mail\PasswordRecovery;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


/**
 * Class UsersController
 * @package App\Http\Controllers
 */
class UsersController extends ApiController
{
    //TODO split into AdminCtrl
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with('club','role')
        ->where('status',1)
            //->join(UserRole::TABLE,User::TCOL_USER_ROLE_ID,'=',UserRole::TCOL_ID)
            ->get();

        return $this->respond($users);
    }

    public function getCurrentUser(Request $request)
    {
        JWTAuth::setRequest($request);
        $token = JWTAuth::getToken();

        $user = JWTAuth::toUser($token);

        $user = User::with('club')->where(User::COL_ID,$user->id)->first();

        return response()->json($user);

    }

    public function updateUser(Request $request)
    {
        $token = JWTAuth::getToken();
        $user = JWTAuth::toUser($token);

        $newRecord = $user->update($request->all());

        if($newRecord) $updatedUser = $request->all();

        return $this->respondWithMessageAndData('Profile updated', $updatedUser);
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

    public function storeUserPhoto(Request $request, $id, User $user)
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

    public function getUserRoles()
    {
        $userRoles = UserRole::all();

        return $this->respond($userRoles);
    }

    public function getUserEventInfo($eventAttendId, $userId, User $user){

        $userEventInfo = $user->getUserWithCategoriesHeAttendsOnEvent($eventAttendId, $userId);

        return $this->respond($userEventInfo);
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

    public function show()
    {

    }

    public function showUsers()
    {
        $data = User::all();

        foreach ($data as $user){
            if($user['status'] == 0){
               $unauthorised[] = $user;
            }elseif ($user['status'] == 2){
                $blocked[] = $user;
            }
        }
        if(isset($unauthorised)){
            $users['unauthorised'] = $unauthorised;
        }
        if(isset($blocked)){
            $users['blocked'] = $blocked;
        }
        if(isset($users)){
            return $this->respond($users);
        }
    }

    public function adminAction($userId, $action)
    {
        $user = User::find($userId);
        if($user){
            if($action == 'block'){
                $user->update([
                    'status' => 2
                ]);
                return $this->responseCreated('User blocked');
            }
            if($action == 'approve'){
                $user->update([
                    'status' => 1
                ]);
                Mail::to($user->username)->send(new AccountActivated($user));
                return $this->responseCreated('User approved');
            }
            if($action == 'remove'){
                $user->delete();
                return $this->responseCreated('User removed');
            }
        }
    }

    public function passwordRecovery(Request $request)
    {
        $user = User::where('username',$request->input('username'))->first();

        if(!$user) return $this->responseNotFound('User does not exist in our records');

        $password = md5($request->input('username'));

        $user->update([
            User::COL_PASSWORD => bcrypt($password),
            User::COL_TEMP_PASSWORD => $password
        ]);

        //sent email
        Mail::to($user->username)->send(new PasswordRecovery($password));
        return $this->responseCreated('Recovery email sent!');
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
        $data = $request->all();

        $user = User::find($id);

        if($user){
            $user->update($data);
        }

        return $this->responseCreated('Role updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if($user){
            $user->delete();
        }

        return $this->responseDeleted('User Deleted');
    }
}
