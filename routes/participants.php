<?php

use App\Http\Controllers\ParticipantController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/participants', [ParticipantController::class, 'index'])->name('admin.participants.index');
});



