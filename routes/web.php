<?php

use App\Http\Controllers\FormulaireController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home/home');
})->name('home');
Route::get('/contact', function () {
    return Inertia::render('contact/contact');
})->name('contact');
Route::get('/form', function () {
    return Inertia::render('formulaire/formulaire');
})->name('form');
Route::get('/formulaire', function () {
    return Inertia::render('formulaire/partials/form');
})->name('formulaire');
Route::get('/participants', function () {
    return Inertia::render('formulaire/sponsorsForm');
})->name('participants');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::post('/formulaire', [FormulaireController::class, 'store']);


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
