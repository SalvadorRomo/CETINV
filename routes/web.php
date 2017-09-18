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
Route::post('/insert', 'InsertRecordsProductsControllers@insertProduct');
Route::post('/insertMultipleRecords', 'InsertRecordsProductsControllers@insertMultipleProduct');
Route::get('/getRecordsCount' ,'InsertRecordsProductsControllers@getProductCount');
