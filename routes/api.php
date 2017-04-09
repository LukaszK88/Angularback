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

Route::get('/fighters',[
    'uses' => 'FightersController@index'
] );

Route::get('/fighters/bohurt',[
    'uses' => 'FightersController@bohurt'
] );


Route::post('/fighters/store',[
    'uses' => 'FightersController@store'
] );

Route::post('/fighters/authenticate',[
    'uses' => 'FightersController@authenticate'
] );