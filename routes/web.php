<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\FormulaireController;
use App\Http\Controllers\ParticipantsController;
use App\Http\Controllers\SponsorController;
use App\Http\Controllers\MesageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home/home');
})->name('home');
Route::get('/contact', function () {
    return Inertia::render('contact/contact');
})->name('contact');
Route::get('/about', function () {
    return Inertia::render('about/index');
})->name('about');
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
Route::post("/participants",[ParticipantsController::class,"store"]);

Route::get('/sponsors', [SponsorController::class, 'index'])->name('sponsors.index');
Route::get('/articless', [ArticleController::class, 'show']);


Route::get('/articles', function () {
    return Inertia::render('articles/arcticles');
})->name('acticles');
Route::post('/messages', [MesageController::class,'store']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
