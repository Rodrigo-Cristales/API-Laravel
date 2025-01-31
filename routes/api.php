<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [UserController::class, 'logout']);
    Route::post('/refresh-token', [UserController::class, 'refreshToken']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);  // Mostrar todos los usuarios
    Route::get('/users/{id}', [UserController::class, 'show']);  // Mostrar un usuario por ID
    Route::post('/users', [UserController::class, 'store']);  // Crear un usuario
    Route::put('/users/{id}', [UserController::class, 'update']);  // Actualizar un usuario
    Route::delete('/users/{id}', [UserController::class, 'destroy']);  // Eliminar un usuario

    //Rutas para los estadisticas de los usuarios

    Route::get('users/stats/days', [UserController::class, 'UserDays']);
    Route::get('users/stats/week', [UserController::class, 'UsersByWeek']);
    Route::get('users/stats/month', [UserController::class, 'UsersByMonth']);
});
