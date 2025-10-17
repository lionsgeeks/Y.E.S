<?php

use App\Http\Controllers\MapController as PagesMapController;
use Illuminate\Support\Facades\Route;

Route::get('/maps', [PagesMapController::class, 'index'])->name('maps');
Route::post('/maps', [PagesMapController::class, 'store'])->name('maps.store');
Route::post('/maps/register', [PagesMapController::class, 'register'])->name('maps.register');
Route::post('/maps/verify', [PagesMapController::class, 'verify'])->name('maps.verify');
Route::get('/maps/schema/{type}', [PagesMapController::class, 'schema'])->name('maps.schema');
// Legacy endpoints moved from API for client compatibility
Route::match(['get','post'], '/approved', [PagesMapController::class, 'approved']);
