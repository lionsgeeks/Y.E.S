<?php

namespace App\Http\Controllers;

use App\Models\ScientificCommittee;
use Illuminate\Http\Request;
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
            'position' => 'nullable|string|max:255',
            'linkedin_url' => 'nullable|url',
            'bio' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        ScientificCommittee::create([
            'name' => $request->name,
            'position' => $request->position,
            'linkedin_url' => $request->linkedin_url,
            'bio' => $request->bio,
            'order' => $request->order ?? 0,
            'is_active' => $request->is_active ?? true,
        ]);

        return redirect()->back()->with('success', 'Committee member created successfully.');
    }

    public function show(ScientificCommittee $scientificCommittee)
    {
        return response()->json($scientificCommittee);
    }

    public function update(Request $request, ScientificCommittee $scientificCommittee)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'linkedin_url' => 'nullable|url',
            'bio' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $scientificCommittee->update([
            'name' => $request->name,
            'position' => $request->position,
            'linkedin_url' => $request->linkedin_url,
            'bio' => $request->bio,
            'order' => $request->order ?? 0,
            'is_active' => $request->is_active ?? true,
        ]);

        return redirect()->back()->with('success', 'Committee member updated successfully.');
    }

    public function destroy(ScientificCommittee $scientificCommittee)
    {
        $scientificCommittee->delete();
        return redirect()->back()->with('success', 'Committee member deleted successfully.');
    }
}
