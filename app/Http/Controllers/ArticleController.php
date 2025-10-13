<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::all();
        return Inertia::render('admin/articles/index' , [
            'articles' => $articles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function create()
    {
        return Inertia::render('admin/articles/partials/CreateArticle');
    }
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function edit($id)
    {
        $article = Article::find($id);
        return Inertia::render('admin/articles/partials/EditArticle' , [
            'article' => $article
        ]);
    }
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
