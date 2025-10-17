<?php

namespace App\Http\Controllers;

use App\Models\ScientificCommittee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ScientificCommitteeController extends Controller
{
    public function index()
    {
        $scientificCommittees = ScientificCommittee::orderBy('order')->orderBy('name')->get();

        return Inertia::render('admin/scientific-committees/index', [
            'scientificCommittees' => $scientificCommittees,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable',
            'linkedin_url' => 'nullable',
            'bio' => 'nullable',
            'order' => 'nullable|integer',
            'photo_path' => 'nullable|image',
        ]);
        // dd($request->all());

        $data = [
            'name' => $request->name,
            'position' => $request->position,
            'linkedin_url' => $request->linkedin_url,
            'bio' => $request->bio,
            'order' => $request->order ?? 0,
            'is_active' => 1,
        ];

        if ($request->hasFile('photo_path')) {
            $compressedPath = $this->compressImage(
                $request->file('photo_path'),
                'images/comittee-scientifique',
                null,   // auto filename
                75,     // quality
                800,   // max width
                800    // max height
            );
            $data['photo_path'] = str_replace('images/', '', $compressedPath);
        }


        ScientificCommittee::create($data);

        return redirect()->back()->with('success', 'Committee member created successfully.');
    }

    public function show(ScientificCommittee $scientificCommittee)
    {
        return response()->json($scientificCommittee);
    }

    public function update(Request $request, ScientificCommittee $scientificCommittee)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'position' => 'nullable',
            'linkedin_url' => 'nullable',
            'bio' => 'nullable',
            'order' => 'nullable|integer',
            'photo_path' => 'nullable|image',
        ]);

        $data = [
            'name' => $request->name,
            'position' => $request->position,
            'linkedin_url' => $request->linkedin_url,
            'bio' => $request->bio,
            'order' => $request->order ?? 0,
            'is_active' => 1,
        ];
        if ($request->hasFile('photo_path')) {
            if ($scientificCommittee->photo_path && Storage::disk('public')->exists('images/' . $scientificCommittee->photo_path)) {
                Storage::disk('public')->delete('images/' . $scientificCommittee->photo_path);
            }


            // Compress and store the new image
            $compressedPath = $this->compressImage(
                $request->file('photo_path'),
                'images/comittee-scientifique',
                null,   // auto filename
                75,     // quality
                800,   // max width
                800    // max height
            );

            // Save path without the "images/" prefix
            $data['photo_path'] = str_replace('images/', '', $compressedPath);
        }

        // Update the record
        $scientificCommittee->update($data);


        return redirect()->back()->with('success', 'Committee member updated successfully.');
    }

    public function destroy(ScientificCommittee $scientificCommittee)
    {
        // Delete the image if it exists
        if ($scientificCommittee->photo_path && Storage::disk('public')->exists('images/' . $scientificCommittee->photo_path)) {
            Storage::disk('public')->delete('images/' . $scientificCommittee->photo_path);
        }

        // Delete the record
        $scientificCommittee->delete();

        return redirect()->back()->with('success', 'Committee member deleted successfully.');
    }
}
