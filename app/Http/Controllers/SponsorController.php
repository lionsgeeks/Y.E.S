<?php

namespace App\Http\Controllers;

use App\Models\Sponsor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SponsorController extends Controller
{
    public function index()
    {
        $sponsors = Sponsor::orderBy('name')->get();
        
        if (request()->expectsJson()) {
            return response()->json($sponsors);
        }
        
        return Inertia::render('admin/sponsors/index', [
            'sponsors' => $sponsors,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:sponsor,organizer,technical_partner',
            'website_url' => 'nullable|url',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $path = '';
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('assets/images/sponsors'), $filename);
            $path = $filename;
        }

        Sponsor::create([
            'name' => $request->name,
            'type' => $request->type,
            'website_url' => $request->website_url,
            'description' => $request->description,
            'path' => $path,
        ]);

        return redirect()->back()->with('success', 'Sponsor created successfully.');
    }

    public function show(Sponsor $sponsor)
    {
        return response()->json($sponsor);
    }

    public function update(Request $request, Sponsor $sponsor)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:sponsor,organizer,technical_partner',
            'website_url' => 'nullable|url',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $path = $sponsor->path; // Keep existing path by default
        
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($sponsor->path && file_exists(public_path('assets/images/sponsors/' . $sponsor->path))) {
                unlink(public_path('assets/images/sponsors/' . $sponsor->path));
            }
            
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('assets/images/sponsors'), $filename);
            $path = $filename;
        }

        $sponsor->update([
            'name' => $request->name,
            'type' => $request->type,
            'website_url' => $request->website_url,
            'description' => $request->description,
            'path' => $path,
        ]);

        return redirect()->back()->with('success', 'Sponsor updated successfully.');
    }

    public function destroy(Sponsor $sponsor)
    {
        // Delete associated image file
        if ($sponsor->path && file_exists(public_path('assets/images/sponsors/' . $sponsor->path))) {
            unlink(public_path('assets/images/sponsors/' . $sponsor->path));
        }
        
        $sponsor->delete();
        return redirect()->back()->with('success', 'Sponsor deleted successfully.');
    }
}


