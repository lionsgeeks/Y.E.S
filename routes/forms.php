<?php

use App\Http\Controllers\FormulaireController;
use App\Http\Controllers\MesageController;
use App\Http\Controllers\ParticipantsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/form', function () {
    return Inertia::render('client/formulaire/formulaire');
})->name('form');
Route::get('/formulaire', function () {
    return Inertia::render('client/formulaire/partials/form');
})->name('formulaire');
Route::get('/participants', function () {
    return Inertia::render('client/formulaire/sponsorsForm');
})->name('participants');



Route::post('/formulaire', [FormulaireController::class, 'store']);
Route::post("/participants", [ParticipantsController::class, "store"]);
