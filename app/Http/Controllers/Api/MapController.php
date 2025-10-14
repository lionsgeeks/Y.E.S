<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Show;
use App\Models\MapVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MapController extends Controller
{
    public function approved()
    {
        $shows = Show::with('showable')->where('approve', true)->get();
        $flat = $shows->map(function ($s) {
            $entity = $s->showable;
            $name = $s->showable_type === \App\Models\Organization::class
                ? ($entity->name ?? null)
                : ($s->showable_type === \App\Models\Publique::class
                    ? ($entity->institution_name ?? null)
                    : ($entity->nom ?? null));
            $logoCol = $entity->logo ?? $entity->logo_path ?? null;
            return [
                'id' => $s->showable_type . '-' . $s->showable_id,
                'type' => $s->showable_type,
                'lat' => $entity->lat ?? null,
                'lng' => $entity->lng ?? null,
                'name' => $name,
                'logo' => $logoCol,
                'showable' => $entity, // include full entity for details card
            ];
        })->filter(fn($m) => !is_null($m['lat']) && !is_null($m['lng']))->values();

        return response()->json($flat);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string|in:organizations,bailleurs,entreprises,agences,publiques,academiques',
            'payload' => 'required|array',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        return DB::transaction(function () use ($request) {
            $modelClass = [
                'organizations' => \App\Models\Organization::class,
                'bailleurs' => \App\Models\Bailleur::class,
                'entreprises' => \App\Models\Entreprise::class,
                'agences' => \App\Models\Agence::class,
                'publiques' => \App\Models\Publique::class,
                'academiques' => \App\Models\Academique::class,
            ][$request->string('type')];

            $payload = $request->input('payload');
            $payload['lat'] = $request->float('lat');
            $payload['lng'] = $request->float('lng');

            $entity = new $modelClass();
            foreach ($payload as $key => $value) {
                $entity->{$key} = $value;
            }
            $entity->save();

            $show = Show::create([
                'showable_id' => $entity->getKey(),
                'showable_type' => $modelClass,
                'approve' => true,
                'pending' => false,
            ]);

            return response()->json(['id' => $entity->getKey(), 'show_id' => $show->getKey()], 201);
        });
    }
}


