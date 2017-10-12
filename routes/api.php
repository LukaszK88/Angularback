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
Route::put('/user-update','UsersController@updateUser');
Route::put('/user-updatePassword','UsersController@updatePassword');
Route::post('/user-recover','UsersController@passwordRecovery');
Route::resource('/user','UsersController');
Route::get('/user-roles','UsersController@getUserRoles');
Route::post('/storePhoto/{id}', 'UsersController@storeUserPhoto');
Route::get('/user/event-info/{eventAttendId}/{userId}','UsersController@getUserEventInfo');


//AUTH
Route::post('/user-store','AuthController@store');
Route::post('/user/authenticate','AuthController@authenticate');
Route::post('/login/facebook','AuthController@facebook');
Route::post('/login-facebook','AuthController@facebook2');
Route::post('/login-google','AuthController@google2');
Route::post('/login/google', 'AuthController@google');

//RANKING
Route::get('/fighters/{clubId}/{date?}','RankingController@getFighters');
Route::get('/fighter/{id}','RankingController@getFighter');
Route::get('/fighters-leaderboard','RankingController@getTableData');
Route::post('/fighters/bohurt','RankingController@saveBohurt');
Route::post('/fighters/profight','RankingController@saveProfight');
Route::post('/fighters/sword_shield','RankingController@saveSwordShield');
Route::post('/fighters/longsword','RankingController@saveLongsword');
Route::post('/fighters/sword_buckler','RankingController@saveSwordBuckler');
Route::post('/fighters/polearm','RankingController@savePolearm');
Route::post('/fighters/triathlon','RankingController@saveTriathlon');

//TODO work on REST
Route::get('/achievement/{userId?}','AchievementController@index');
Route::post('/achievement','AchievementController@store');
Route::put('/achievement/{achievementId}','AchievementController@update');
Route::get('/achievement/{achievementId}','AchievementController@show');
Route::delete('/achievement/{achievementId?}','AchievementController@deleteAchievement');

////admin
Route::get('/admin','UsersController@showUsers');
Route::get('/admin/{userId}/{action}','UsersController@adminAction');

//EVENTS
Route::resource('/event','EventsController');
Route::resource('/event/notes','EventNotesController');

//EVENTS CAEGORIES
Route::resource('/event-categories','EventCategoriesController');


Route::get('/event-user/{userId}','EventsController@showUserEvents');

Route::get('/event-type/{type}','EventsController@getEventsByType2');
Route::get('/events/{type}','EventsController@getEventsByType');
Route::get('/event-types','EventsController@getEventTypes');
Route::post('/event-attend/{eventId}/{userId}','EventsController@attendEvent');
Route::post('/event-attend-categories/{eventAttendId}','EventsController@storeEventAttendedCategories');
Route::get('/event-attendees/{eventId}','EventsController@getEventAttendees');
Route::get('/event-attending/{userId}','EventsController@getEventsAttendedByUser');

//Clubs
Route::resource('/clubs','ClubsController');
Route::post('/club-logo/{id}','ClubsController@storeClubLogo');
Route::get('/clubs-all','ClubsController@getAllClubs');
Route::get('/clubs-by-country/{country}','ClubsController@getClubsByCountry');
Route::post('/club-action/{action}','ClubsController@takeClubAdminAction');
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
