<?php

namespace App\Http\Controllers;

use App\Models\Sponsor;
use Illuminate\Http\Request;


class SponsorController extends Controller
{
    public function index()
    {
        return response()->json(
            Sponsor::orderBy('name')->where("type" ,"!=" , "organizer")->get()
        );
    }

    public function store(Request $request)
    {

    }

    public function show(Sponsor $sponsor)
    {
    }

    public function update(Request $request, Sponsor $sponsor)
    {

    }

    public function destroy(Sponsor $sponsor)
    {
    }
}


