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
Route::get('/user-current','UsersController@getCurrentUser')->middleware('jwt.auth');
Route::put('/user/update','UsersController@updateUser');
Route::put('/user/updatePassword','UsersController@updatePassword');
Route::post('/user/recover','UsersController@passwordRecovery');
Route::resource('/user','UsersController');
Route::get('/user-roles','UsersController@getUserRoles');
Route::post('/storePhoto/{id}', 'UsersController@storeUserPhoto');
Route::get('/user/event-info/{eventAttendId}/{userId}','UsersController@getUserEventInfo');

//AUTH
Route::post('/user/store','AuthController@store');
Route::post('/user/authenticate','AuthController@authenticate');
Route::post('/login/facebook','AuthController@facebook');
Route::post('/login/google', 'AuthController@google');

//RANKING
Route::get('/ranking/{id?}','RankingController@getFighters');
Route::get('/ranking-leaderboard','RankingController@getTableData');
Route::post('/ranking/bohurt','RankingController@saveBohurt');
Route::post('/ranking/profight','RankingController@saveProfight');
Route::post('/ranking/sword_shield','RankingController@saveSwordShield');
Route::post('/ranking/longsword','RankingController@saveLongsword');
Route::post('/ranking/sword_buckler','RankingController@saveSwordBuckler');
Route::post('/ranking/polearm','RankingController@savePolearm');
Route::post('/ranking/triathlon','RankingController@saveTriathlon');

//TODO work on REST
Route::get('/achievement/{userId}','AchievementController@index');
Route::post('/achievement','AchievementController@store');
Route::put('/achievement/{achievementId}','AchievementController@update');
Route::get('/achievement/{userId}/{achievementId}','AchievementController@show');
Route::post('/achievement/{userId?}/{achievementId?}/delete','AchievementController@deleteAchievement');

////admin
Route::get('/admin/{type}','UsersController@showUsers');
Route::post('/admin/{userId}/{action}','UsersController@adminAction');

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

//Email
Route::post('/send', 'EmailController@send');
