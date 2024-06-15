<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TraineeController;

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

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::get("/RoleUserCounter", [UserController::class,"roleCount"]);
Route::apiResource('/roles',RoleController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('services', ServiceController::class);
Route::get('/getSuer', [UserController::class,"getUser"]);
Route::apiResource('/trainees', TraineeController::class);





// Verb	    URI	            Action	Route Name
// GET	    /users	        index	users.index
// POST	    /users	        store	users.store
// GET	    /users/{user}	show	users.show
// PUT	    /users/{user}	update	users.update
// DELETE	/users/{user}	destroy	users.destroy



require __DIR__.'/auth.php';
