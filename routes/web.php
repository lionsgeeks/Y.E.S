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
            $stats = [];
            // Wrap each in table-existence guards to avoid errors on fresh installs
            if (Schema::hasTable('users')) {
                $stats['users'] = \App\Models\User::count();
            }
            if (Schema::hasTable('organizations')) {
                $stats['organizations'] = \App\Models\Organization::count();
            }
            if (Schema::hasTable('bailleurs')) {
                $stats['bailleurs'] = \App\Models\Bailleur::count();
            }
            if (Schema::hasTable('entreprises')) {
                $stats['entreprises'] = \App\Models\Entreprise::count();
            }
            if (Schema::hasTable('agences')) {
                $stats['agences'] = \App\Models\Agence::count();
            }
            if (Schema::hasTable('publiques')) {
                $stats['publiques'] = \App\Models\Publique::count();
            }
            if (Schema::hasTable('academiques')) {
                $stats['academiques'] = \App\Models\Academique::count();
            }
            if (Schema::hasTable('shows')) {
                $stats['approved_markers'] = \App\Models\Show::where('approve', true)->count();
                $stats['pending_markers'] = \App\Models\Show::where('approve', false)->count();
            }
            if (Schema::hasTable('messages')) {
                $stats['messages'] = \App\Models\Message::count();
            }
            if (Schema::hasTable('articles')) {
                $stats['articles'] = \App\Models\Article::count();
            }
            if (Schema::hasTable('sponsors')) {
                $stats['sponsors'] = \App\Models\Sponsor::count();
            }

            $recent = [
                'messages' => Schema::hasTable('messages') ? \App\Models\Message::orderByDesc('created_at')->limit(5)->get(['id','name','email','created_at']) : [],
                'organizations' => Schema::hasTable('organizations') ? \App\Models\Organization::orderByDesc('created_at')->limit(5)->get(['id','name','country','created_at']) : [],
            ];

            return Inertia::render('dashboard', [
                'stats' => $stats,
                'recent' => $recent,
            ]);
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
require __DIR__ . '/ngos.php';
require __DIR__ . '/maps.php';
require __DIR__ . '/participants.php';
