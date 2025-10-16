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
            'title_en' => 'required|string',
            'title_ar' => 'required|string',
            'description_en' => 'required|string',
            'description_ar' => 'required|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'image' => 'required|file|image|max:20480',
        ]);

        // ✅ Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/articles', 'public');
        } else {
            return back()->withErrors(['image' => 'Image upload failed']);
        }

        // ✅ Save the article (adjust model/DB fields as needed)
        // Cast string inputs to objects to match Article casts (title/description/tags as object)
        $article = Article::create([
            'title' => [ 'en' => $validated['title_en'], 'ar' => $validated['title_ar'] ],
            'description' => [ 'en' => $validated['description_en'], 'ar' => $validated['description_ar'] ],
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
            'title_en' => 'sometimes|string',
            'title_ar' => 'sometimes|string',
            'description_en' => 'sometimes|string',
            'description_ar' => 'sometimes|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'image' => 'nullable|file|image|max:20480',
        ]);

        $imagePath = $article->image; // keep existing relative path
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/articles', 'public');
        }

        // normalize access for array|object values from old records
        $getFromMixed = function ($value, string $key, $default = '') {
            if (is_array($value)) {
                return $value[$key] ?? $default;
            }
            if (is_object($value)) {
                return $value->{$key} ?? $default;
            }
            return $default;
        };

        $existingTitle = $article->title;
        $existingDescription = $article->description;

        $newTitle = [
            'en' => $validated['title_en'] ?? $getFromMixed($existingTitle, 'en', ''),
            'ar' => $validated['title_ar'] ?? $getFromMixed($existingTitle, 'ar', ''),
        ];
        $newDescription = [
            'en' => $validated['description_en'] ?? $getFromMixed($existingDescription, 'en', ''),
            'ar' => $validated['description_ar'] ?? $getFromMixed($existingDescription, 'ar', ''),
        ];

        // normalize existing tags from array|object|string
        $normalizeTagsList = function ($val) {
            if (is_array($val)) {
                return array_values(array_filter(array_map('trim', $val), fn($v) => $v !== ''));
            }
            if (is_string($val)) {
                // split by comma or arabic comma
                $parts = preg_split('/[\,\x{060C}]/u', $val);
                $parts = array_map('trim', $parts ?: []);
                return array_values(array_filter($parts, fn($v) => $v !== ''));
            }
            return [];
        };

        $existingTags = $article->tags;
        $existingTagsEn = $normalizeTagsList(is_object($existingTags) ? ($existingTags->en ?? []) : (is_array($existingTags) ? ($existingTags['en'] ?? []) : $existingTags));
        $existingTagsAr = $normalizeTagsList(is_object($existingTags) ? ($existingTags->ar ?? []) : (is_array($existingTags) ? ($existingTags['ar'] ?? []) : $existingTags));

        $newTagsEn = isset($validated['tags']) ? array_values($validated['tags']) : $existingTagsEn;
        $newTagsAr = isset($validated['tags']) ? array_values($validated['tags']) : $existingTagsAr;

        $article->update([
            'title' => $newTitle,
            'description' => $newDescription,
            'image' => $imagePath,
            'tags' => [
                'en' => $newTagsEn,
                'ar' => $newTagsAr,
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
