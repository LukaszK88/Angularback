<?php

namespace App\Http\Controllers;

use App\Models\Bohurt;
use App\Mail\Registration;
use App\Models\User;
use App\Mail\PasswordRecovery;
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



}
