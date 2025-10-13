<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\FormulaireController;
use App\Http\Controllers\ParticipantsController;
use App\Http\Controllers\SponsorController;
use App\Http\Controllers\ScientificCommitteeController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\MesageController;
use App\Models\Sponsor;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $sponsors = \App\Models\Sponsor::where('type', '!=', 'organizer')->get();
    return Inertia::render('home/home', [
        'sponsors' => $sponsors
    ]);
})->name('home');
Route::get('/contact', function () {
    return Inertia::render('contact/contact');
})->name('contact');
Route::get('/about', function () {
    $sponsors = Sponsor::all();
    return Inertia::render('about/index',[
        'sponsors' => $sponsors
    ]);
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



// Admin routes
Route::prefix('admin')->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');
        // Sponsors CRUD
        Route::get('sponsors', [SponsorController::class, 'index'])->name('admin.sponsors.index');
        Route::post('sponsors', [SponsorController::class, 'store'])->name('admin.sponsors.store');
        Route::post('sponsors/{sponsor}', [SponsorController::class, 'update'])->name('admin.sponsors.update');
        Route::delete('sponsors/{sponsor}', [SponsorController::class, 'destroy'])->name('admin.sponsors.destroy');

        // Scientific Committee CRUD
        Route::get('scientific-committees', [ScientificCommitteeController::class, 'index'])->name('admin.scientific-committees.index');
        Route::post('scientific-committees', [ScientificCommitteeController::class, 'store'])->name('admin.scientific-committees.store');
        Route::post('scientific-committees/{scientificCommittee}', [ScientificCommitteeController::class, 'update'])->name('admin.scientific-committees.update');
        Route::delete('scientific-committees/{scientificCommittee}', [ScientificCommitteeController::class, 'destroy'])->name('admin.scientific-committees.destroy');

        // User Management
        Route::get('users', [UserController::class, 'index'])->name('admin.users.index');
        Route::post('users', [UserController::class, 'store'])->name('admin.users.store');
        Route::post('users/{user}', [UserController::class, 'update'])->name('admin.users.update');
        Route::delete('users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');
        Route::post('users/{user}/resend-password', [UserController::class, 'resendPassword'])->name('admin.users.resend-password');
    });
});


Route::post('/formulaire', [FormulaireController::class, 'store']);
Route::post("/participants", [ParticipantsController::class, "store"]);

Route::get('/sponsors', [SponsorController::class, 'index'])->name('sponsors.index');


Route::post('/messages', [MesageController::class, 'store']);

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/articles.php';
