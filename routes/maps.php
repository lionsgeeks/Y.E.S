<?php

use App\Http\Controllers\MapController as PagesMapController;
use Illuminate\Support\Facades\Route;

Route::get('/maps', [PagesMapController::class, 'index'])->name('maps');
Route::get('/admin/maps', [PagesMapController::class, 'admin'])->name('admin.maps');
Route::post('/admin/maps/{show}/approve', [PagesMapController::class, 'adminApprove'])->name('admin.maps.approve');
Route::post('/admin/maps/{show}/deny', [PagesMapController::class, 'adminDeny'])->name('admin.maps.deny');
Route::get('/map/details/{type}/{id}', [PagesMapController::class, 'details'])->name('map.details');
Route::get('/admin/map/details/{type}/{id}', [PagesMapController::class, 'adminDetails'])->name('admin.map.details');
Route::post('/admin/map/details/{type}/{id}/update-location', [PagesMapController::class, 'updateLocation'])->name('admin.map.update-location');
Route::post('/maps', [PagesMapController::class, 'store'])->name('maps.store');
Route::post('/maps/register', [PagesMapController::class, 'register'])->name('maps.register');
Route::post('/maps/verify', [PagesMapController::class, 'verify'])->name('maps.verify');
Route::get('/maps/schema/{type}', [PagesMapController::class, 'schema'])->name('maps.schema');
// Legacy endpoints moved from API for client compatibility
Route::match(['get','post'], '/approved', [PagesMapController::class, 'approved']);
