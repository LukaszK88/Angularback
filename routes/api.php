<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/user',[
    'uses' => 'FightersController@user'
] )->middleware('jwt.auth');

Route::get('/fighters',[
    'uses' => 'FightersController@index'
] );

Route::get('/fighters/bohurt',[
    'uses' => 'FightersController@bohurt'
] );


Route::post('/fighters/store',[
    'uses' => 'FightersController@store'
] );

Route::put('/fighters/update',[
    'uses' => 'FightersController@update'
] );

Route::post('/fighters/authenticate',[
    'uses' => 'FightersController@authenticate'
] );

Route::post('/login/facebook', [
    'uses' => 'FightersController@facebook'
]);

Route::post('/login/google', [
    'uses' => 'FightersController@google'
]);

Route::post('/storePhoto/{id}', [
    'uses' => 'FightersController@storePhoto'
]);
