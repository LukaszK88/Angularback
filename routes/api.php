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

Route::post('/user/recover','FightersController@passwordRecovery');
Route::resource('/user','UsersController');
Route::get('/user-roles','UsersController@getUserRoles');



Route::get('/fighters/{id?}',['uses' => 'RankingController@index']);
Route::get('/fighters-leaderboard',['uses' => 'RankingController@getTableData']);
Route::post('/fighters/bohurt',['uses' => 'RankingController@saveBohurt'] );
Route::post('/fighters/profight',['uses' => 'RankingController@saveProfight'] );
Route::post('/fighters/sword_shield',['uses' => 'RankingController@saveSwordShield'] );
Route::post('/fighters/longsword',['uses' => 'RankingController@saveLongsword'] );
Route::post('/fighters/sword_buckler',['uses' => 'RankingController@saveSwordBuckler'] );
Route::post('/fighters/polearm',['uses' => 'RankingController@savePolearm'] );
Route::post('/fighters/triathlon',['uses' => 'RankingController@saveTriathlon'] );

//TODO work on REST
Route::get('/achievement/{userId}','AchievementController@index');
Route::post('/achievement','AchievementController@store');
Route::put('/achievement/{achievementId}','AchievementController@update');
Route::get('/achievement/{userId}/{achievementId}','AchievementController@show');
Route::post('/achievement/{userId?}/{achievementId?}/delete','AchievementController@deleteAchievement');

////admin
Route::get('/admin/{type}','UsersController@showUsers');
Route::post('/admin/{userId}/{action}','UsersController@adminAction');
//FIGHTER INFO
Route::get('/fighter/event-info/{eventAttendId}/{userId}','FightersController@getUserEventInfo');
//EVENTS
Route::resource('/event','EventsController');
Route::resource('/event/notes','EventNotesController');

Route::get('/events/{type}','EventsController@getEventsByType');
Route::get('/event-types','EventsController@getEventTypes');
Route::post('/event-attend/{eventId}/{userId}','EventsController@attendEvent');
Route::post('/event-attend-categories/{eventAttendId}','EventsController@storeEventAttendedCategories');
Route::get('/event-attendees/{eventId}','EventsController@getEventAttendees');
Route::get('/event-attending/{userId}','EventsController@getEventsAttendedByUser');

//BLOG
Route::resource('/post','PostsController');
Route::get('/posts/{type}','PostsController@getPostsOfType');
Route::resource('/comment','CommentsController');
Route::resource('/comment-reply','CommentReplyController');
//POST TYPES
Route::resource('/types','PostTypesController');

//IMAGES
//todo can be one route
Route::post('/images/post/{postId}/{type}','ImagesController@storePostImages');
Route::post('/images/event/{eventId}/{type}','ImagesController@storeEventImages');
Route::resource('/images','ImagesController');

Route::resource('/video','VideoController');

Route::get('/images/gallery/{postId}','ImagesController@showGalleryById');
Route::post('/images/gallery/delete/{postId}','ImagesController@deleteGallery');


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
