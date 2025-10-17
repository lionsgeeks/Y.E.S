<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\PlaidoyerController;
use App\Models\Sponsor;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Article;

Route::get('/', function () {
    $sponsors = [];
    if (Schema::hasTable('sponsors')) {
        $sponsors = Sponsor::where('type', '!=', 'organizer')->get();
    }

    $articles = Article::all();
    return Inertia::render('client/home/home', [
        'sponsors' => $sponsors,
        'articles' => $articles,
    ]);
})->name('home');

Route::get('/about', function () {
    $sponsors = Sponsor::all();
    $committee = [];
    if (Schema::hasTable('scientific_committees')) {
        $committee = \App\Models\ScientificCommittee::where('is_active', true)->orderBy('order')->orderBy('name')->get();
    }
    return Inertia::render('client/about/index', [
        'sponsors' => $sponsors,
        'committee' => $committee,
    ]);
})->name('about');

// Plaidoyer – Formulaire de Recommandation
Route::get('/plaidoyer', function () {
    return Inertia::render('client/plaidoyer/index');
})->name('plaidoyer');
Route::post('/plaidoyer', [PlaidoyerController::class, 'store'])->name('plaidoyer.store');




// Admin routes
Route::prefix('admin')->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');
        Route::get('users', [UserController::class, 'index'])->name('admin.users.index');
        Route::post('users', [UserController::class, 'store'])->name('admin.users.store');
        Route::post('users/{user}', [UserController::class, 'update'])->name('admin.users.update');
        Route::delete('users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');
        Route::post('users/{user}/resend-password', [UserController::class, 'resendPassword'])->name('admin.users.resend-password');
    });
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/articles.php';
require __DIR__ . '/messages.php';
require __DIR__ . '/sponsors.php';
require __DIR__ . '/scientific-committees.php';
