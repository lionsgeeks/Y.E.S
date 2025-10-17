<?php

use App\Http\Controllers\MesageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/contact', function () {
    return Inertia::render('client/contact/contact');
})->name('contact');
Route::post('/messages', [MesageController::class, 'store']);

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/messages', [MesageController::class, 'index'])->name('admin.messages.index');
    Route::post('/messages/{message}', [MesageController::class, 'update'])->name('admin.messages.update');
    Route::delete('/messages/{message}', [MesageController::class, 'destroy'])->name('admin.messages.destroy');
});

