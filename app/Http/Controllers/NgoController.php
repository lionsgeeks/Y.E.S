<?php

namespace App\Http\Controllers;

use App\Models\Formulaire;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NgoController extends Controller
{
    public function index()
    {
        $formulaires = Formulaire::orderByDesc('created_at')->get();
        return Inertia::render('admin/ngos/index', [
            'formulaires' => $formulaires,
        ]);
    }

    public function toggleInvite(Formulaire $formulaire)
    {
        $formulaire->is_invited = !$formulaire->is_invited;
        $formulaire->save();
        return back();
    }

    public function toggleInviteApp(Formulaire $formulaire)
    {
        $formulaire->is_invited_app = !$formulaire->is_invited_app;
        $formulaire->save();
        return back();
    }

    public function show(Formulaire $formulaire)
    {
        return Inertia::render('admin/ngos/show', [
            'formulaire' => $formulaire,
        ]);
    }
}


