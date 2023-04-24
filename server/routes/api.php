<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ApplicationController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [UserController::class, 'login']);
Route::post('serviceValidate', [UserController::class, 'serviceValidate']);
Route::get('instructors', [UserController::class, 'instructors']);
Route::get('students', [UserController::class, 'students']);
Route::post('addPost', [PostController::class, 'addPost']);
Route::delete('deletePost/{id}', [PostController::class, 'deletePost']);
Route::put('updatePost/{id}',[PostController::class, 'updatePost']);
Route::get('listPostApplication/{post_id}', [ApplicationController::class, 'listPostApplication']);
Route::get('listPost', [PostController::class, 'listPost']);
Route::get('post/{id}', [PostController::class, 'getPost']);
Route::get('search/{key}',[PostController::class, 'search']);
Route::get('listApplication', [ApplicationController::class, 'listApplication']);
Route::get('application/{id}', [ApplicationController::class, 'getApplication']);
Route::post('getGrade/{id}', [ApplicationController::class, 'getGrade']);
Route::get('listStudentApplication/{username}', [ApplicationController::class, 'listStudentApplication']);
Route::post('addApplication', [ApplicationController::class, 'addApplication']);
Route::put('updateApplication/{id}',[ApplicationController::class, 'updateApplication']);
Route::delete('deleteApplication/{id}', [ApplicationController::class, 'deleteApplication']);

Route::middleware(['jwt'])->group(function(){

});

Route::middleware(['jwt.student'])->group(function(){

});

Route::middleware(['jwt.instructor'])->group(function(){

});