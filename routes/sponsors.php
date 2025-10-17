<?php

use App\Http\Controllers\SponsorController;
use Illuminate\Support\Facades\Route;

Route::get('/sponsors', [SponsorController::class, 'index'])->name('sponsors.index');

Route::prefix('admin')->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {

        Route::get('sponsors', [SponsorController::class, 'index'])->name('admin.sponsors.index');
        Route::post('sponsors', [SponsorController::class, 'store'])->name('admin.sponsors.store');
        Route::post('sponsors/{sponsor}', [SponsorController::class, 'update'])->name('admin.sponsors.update');
        Route::delete('sponsors/{sponsor}', [SponsorController::class, 'destroy'])->name('admin.sponsors.destroy');
    });
});

