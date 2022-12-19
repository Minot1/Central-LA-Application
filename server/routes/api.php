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
Route::post('addPost', [PostController::class, 'addPost']);
Route::get('listPost', [PostController::class, 'listPost']);
Route::delete('deletePost/{id}', [PostController::class, 'deletePost']);
Route::get('post/{id}', [PostController::class, 'getPost']);
Route::get('search/{key}',[PostController::class, 'search']);
Route::put('updatePost/{id}',[PostController::class, 'updatePost']);
Route::post('addApplication', [ApplicationController::class, 'addApplication']);
Route::put('updateApplication/{id}',[ApplicationController::class, 'updateApplication']);
Route::get('listApplication', [ApplicationController::class, 'listApplication']);
Route::delete('deleteApplication/{id}', [ApplicationController::class, 'deleteApplication']);
Route::get('application/{id}', [ApplicationController::class, 'getApplication']);
Route::get('listStudentApplication/{username}', [ApplicationController::class, 'listStudentApplication']);
Route::get('listPostApplication/{post_id}', [ApplicationController::class, 'listPostApplication']);
