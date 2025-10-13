<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/articles', [ArticleController::class , 'index'])->name('acticles');

Route::get('/articles/{id}', [ArticleController::class, 'show'])->name('article.show');

