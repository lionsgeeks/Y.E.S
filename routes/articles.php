<?php

use App\Http\Controllers\ArticleController;
use App\Models\Article;
use App\Http\Resources\ArticleResource;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/articles', [ArticleController::class, 'index'])->name('admin.articles');
    Route::get('/article/create', [ArticleController::class, 'create'])->name('admin.articles.create');
    Route::post('/article/store', [ArticleController::class, 'store'])->name('admin.articles.store');
    Route::get('/article/edit/{id}', [ArticleController::class, 'edit'])->name('admin.articles.edit');
    Route::post('/article/update/{id}', [ArticleController::class, 'update'])->name('admin.articles.update');
    Route::delete('/article/destroy/{id}', [ArticleController::class, 'destroy'])->name('admin.articles.destroy');
});

Route::get('/articles', function () {
    $articles = Article::all();
    return Inertia::render('client/articles/index', [
        'articles' => ArticleResource::collection($articles)->resolve(),
    ]);
})->name('acticles');

Route::get('/articles/{id}', function ($id) {
    $article = Article::find($id);
    $articles = Article::all();

    return Inertia::render('client/articles/[id]', [
        'article' => (new ArticleResource($article))->resolve(),
        'articles' => ArticleResource::collection($articles)->resolve(),
    ]);
})->name('article.show');
