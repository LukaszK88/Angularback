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


//USER
Route::get('/fighter',[
    'uses' => 'FightersController@user'
] )->middleware('jwt.auth');

Route::post('/user/recover','UsersController@passwordRecovery');
Route::resource('/user','UsersController');



Route::get('/fighters/{id?}',['uses' => 'RankingController@index']);
Route::post('/fighters/bohurt',['uses' => 'RankingController@saveBohurt'] );
Route::post('/fighters/profight',['uses' => 'RankingController@saveProfight'] );
Route::post('/fighters/sword_shield',['uses' => 'RankingController@saveSwordShield'] );
Route::post('/fighters/longsword',['uses' => 'RankingController@saveLongsword'] );
Route::post('/fighters/sword_buckler',['uses' => 'RankingController@saveSwordBuckler'] );
Route::post('/fighters/polearm',['uses' => 'RankingController@savePolearm'] );
Route::post('/fighters/triathlon',['uses' => 'RankingController@saveTriathlon'] );

// work on REST
Route::get('/achievement/{userId}','AchievementController@index');
Route::post('/achievement/{userId?}/{achievementId?}','AchievementController@store');
Route::get('/achievement/{userId}/{achievementId}','AchievementController@show');
Route::post('/achievement/{userId?}/{achievementId?}/delete','AchievementController@deleteAchievement');

////admin
Route::get('/admin/{type}','UsersController@showUsers');
Route::post('/admin/{userId}/{action}','UsersController@adminAction');

//BLOG
Route::resource('/post','PostsController');
Route::get('/posts/{type}','PostsController@getPostsOfType');

//POST TYPES
Route::resource('/types','PostTypesController');

//IMAGES
Route::post('/images/post/{postId}/{type}','ImagesController@storePostImages');
Route::resource('/images','ImagesController');

Route::get('/images/gallery/{postId}','ImagesController@showGalleryById');

Route::post('/fighters/store',['uses' => 'FightersController@store'] );

Route::put('/fighters/updatePassword',['uses' => 'FightersController@updatePassword'
] );
Route::put('/fighters/update',[
    'uses' => 'FightersController@update'
] );

Route::post('/send', 'EmailController@send');

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
