<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MapController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/approved', [MapController::class, 'approved']);
Route::get('/approved', [MapController::class, 'approved']);
Route::post('/map/store', [MapController::class, 'store']);


