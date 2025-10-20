<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Inertia\Inertia;

class ParticipantController extends Controller
{
    public function index()
    {
        $participants = Participant::orderByDesc('created_at')->get();
        return Inertia::render('admin/participants/index', [
            'participants' => $participants,
        ]);
    }
}



