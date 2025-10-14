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
        return Inertia::render('admin/articles/index', [
            'articles' => $articles,
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
        // ✅ Validate all required fields
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'image' => 'required|file|image|max:20480',
        ]);

        // ✅ Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('articles', 'public');
        } else {
            return back()->withErrors(['image' => 'Image upload failed']);
        }

        // ✅ Save the article (adjust model/DB fields as needed)
        // Cast string inputs to objects to match Article casts (title/description/tags as object)
        $article = Article::create([
            'title' => [ 'en' => $validated['title'] ],
            'description' => [ 'en' => $validated['description'] ],
            // store relative path in DB
            'image' => $imagePath,
            // store localized tags as arrays for en/ar
            'tags' => [
                'en' => isset($validated['tags']) ? array_values($validated['tags']) : [],
                'ar' => isset($validated['tags']) ? array_values($validated['tags']) : [],
            ],
        ]);

        // ✅ Attach tags if your Article model uses a relation
        // If there is a relation later, we can sync here. For now we persist tags JSON on the model.

        // ✅ Redirect with success message (Inertia-friendly)
        return redirect()->route('admin.articles')
            ->with('success', 'Article created successfully!');
    }


    // /**
    //  * Display the specified resource.
    //  */
    // public function show() {}

    // /**
    //  * Update the specified resource in storage.
    //  */
    public function edit($id)
    {
        $article = Article::find($id);
        return Inertia::render('admin/articles/partials/EditArticle', [
            'article' => $article
        ]);
    }
    public function update(Request $request, string $id)
    {
        $article = Article::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'image' => 'nullable|file|image|max:20480',
        ]);

        $imagePath = $article->image; // keep existing relative path
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('articles', 'public');
        }

        $article->update([
            'title' => [ 'en' => $validated['title'] ],
            'description' => [ 'en' => $validated['description'] ],
            'image' => $imagePath,
            'tags' => [
                'en' => isset($validated['tags']) ? array_values($validated['tags']) : (is_array($article->tags) ? ($article->tags['en'] ?? []) : []),
                'ar' => isset($validated['tags']) ? array_values($validated['tags']) : (is_array($article->tags) ? ($article->tags['ar'] ?? []) : []),
            ],
        ]);

        return redirect()->route('admin.articles')->with('success', 'Article updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $article = Article::find($id);
        $article->delete();
        return redirect()->back()->with('success', 'Deleted article successfully');
    }
}
