<?php

use App\Http\Controllers\NgoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/ngos', [NgoController::class, 'index'])->name('admin.ngos.index');
    Route::get('/ngos/{formulaire}', [NgoController::class, 'show'])->name('admin.ngos.show');
    Route::post('/ngos/{formulaire}/toggle-invite', [NgoController::class, 'toggleInvite'])->name('admin.ngos.toggle-invite');
    Route::post('/ngos/{formulaire}/toggle-invite-app', [NgoController::class, 'toggleInviteApp'])->name('admin.ngos.toggle-invite-app');
});


