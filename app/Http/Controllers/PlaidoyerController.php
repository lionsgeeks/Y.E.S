<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\PlaidoyerRecommendation;

class PlaidoyerController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'organization' => 'nullable|string|max:255',
            'role' => 'nullable|string|max:255',
            'email' => 'required|email',
            'country' => 'required|string|max:100',
            'recommendation' => 'required|string',
        ]);

        // Store recommendation first
        $record = PlaidoyerRecommendation::create($validated);

        // Send email to org inbox
        $emailOrg = 'contact@youthempowermentsummit.africa';
        Mail::raw(
            "Plaidoyer - Formulaire de Recommandation\n\n" .
            "Nom et Prénom: {$validated['full_name']}\n" .
            "Organisation/Affiliation: " . ($validated['organization'] ?? '-') . "\n" .
            "Titre/Rôle: " . ($validated['role'] ?? '-') . "\n" .
            "Email: {$validated['email']}\n" .
            "Pays: {$validated['country']}\n\n" .
            "Recommandation:\n{$validated['recommendation']}\n",
            function ($message) use ($emailOrg) {
                $message->to($emailOrg)->subject('Plaidoyer – Nouvelle Recommandation');
            }
        );

        return back();
    }
}


