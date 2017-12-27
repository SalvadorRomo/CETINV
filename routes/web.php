<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('cetiindex');
});

Route::post('/insert', 'InsertRecordsProductsControllers@insertProduct')->middleware('jwt.auth')->middleware('isUserInvent');
Route::post('/insertMultipleRecords', 'InsertRecordsProductsControllers@insertMultipleProduct')->middleware('jwt.auth')->middleware('isUserInvent');
Route::get('/getRecordsCount' ,'InsertRecordsProductsControllers@getProductCount')->middleware('jwt.auth','isUserInvent');
Route::post('/validation' ,'authController@authenticate');
Route::post('/login' ,'authController@getAuthenticatedUser');
Route::post('/register' ,'authController@registerUser')->middleware('jwt.auth')->middleware('isUserMaster');
Route::post('/conncect','AccessNotificationController@register')->middleware('jwt.auth');
Route::get('/getUsersType','authController@getTypesData')->middleware('jwt.auth')->middleware('isUserMaster');
Route::post('/assign','InsertRecordsProductsControllers@assignManager');