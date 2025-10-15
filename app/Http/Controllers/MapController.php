<?php

namespace App\Http\Controllers;

use App\Models\Show;
use App\Models\MapVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendVerificationCode;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

class MapController extends Controller
{

    public function index()
    {
        $shows = Show::with('showable')->where('approve', true)->get()->groupBy('showable_type');
        return inertia('maps/maps', [
            'approved' => $shows,
        ]);
    }

    // Former API: return flat approved markers list (for clients that still call it)
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
                'showable' => $entity,
            ];
        })->filter(fn($m) => !is_null($m['lat']) && !is_null($m['lng']))->values();

        return response()->json($flat);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|string|in:organizations,bailleurs,entreprises,agences,publiques,academiques',
            'payload' => 'required|array',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        DB::transaction(function () use ($data, $request) {
            $modelClass = [
                'organizations' => \App\Models\Organization::class,
                'bailleurs' => \App\Models\Bailleur::class,
                'entreprises' => \App\Models\Entreprise::class,
                'agences' => \App\Models\Agence::class,
                'publiques' => \App\Models\Publique::class,
                'academiques' => \App\Models\Academique::class,
            ][$data['type']];

            $payload = $data['payload'];

            // Normalize phone fields that come split as code + number from various forms
            $joinPhone = function($code, $number) {
                $c = is_string($code) ? trim($code) : '';
                $n = is_string($number) ? trim($number) : '';
                if ($c === '' && $n === '') return null;
                // Keep leading + in code, strip non digits otherwise
                $c = preg_replace('/[^0-9+]/', '', $c);
                $n = preg_replace('/[^0-9]/', '', $n);
                return ($c ?: '') . $n;
            };
            $combinedPhone = $joinPhone($payload['telephone_code'] ?? ($payload['phone_code'] ?? null), $payload['telephone_number'] ?? ($payload['phone_number'] ?? null));
            if ($combinedPhone) {
                // Common flat field used by some tables (e.g., bailleurs)
                $payload['telephone'] = $combinedPhone;
                // Embed inside known JSON contact fields when present
                if (isset($payload['contact_rse']) && is_array($payload['contact_rse'])) {
                    $payload['contact_rse']['telephone'] = $combinedPhone;
                }
                if (isset($payload['contact_jeunesse']) && is_array($payload['contact_jeunesse'])) {
                    $payload['contact_jeunesse']['telephone'] = $combinedPhone;
                }
                if (isset($payload['contact_responsable']) && is_array($payload['contact_responsable'])) {
                    $payload['contact_responsable']['telephone'] = $combinedPhone;
                }
            }
            // Clean transient UI fields
            unset($payload['telephone_code'], $payload['telephone_number'], $payload['phone_code'], $payload['phone_number']);

            // Handle uploaded logo files and normalize to 'logos/{filename}'
            $saveLogo = function($file) {
                if (!$file) return null;
                $name = preg_replace('/[^A-Za-z0-9._-]/', '_', $file->getClientOriginalName());
                \Illuminate\Support\Facades\Storage::disk('public')->putFileAs('images/logos', $file, $name);
                return 'logos/' . $name;
            };

            $uploadedLogo = $request->file('payload.logo') ?? $request->file('logo') ?? null;
            if ($uploadedLogo) {
                $payload['logo'] = $saveLogo($uploadedLogo);
            }
            $uploadedLogoPath = $request->file('payload.logo_path') ?? $request->file('logo_path') ?? null;
            if ($uploadedLogoPath) {
                $payload['logo_path'] = $saveLogo($uploadedLogoPath);
            }

            // If logo fields are strings with absolute paths, collapse to basename under logos/
            foreach (['logo','logo_path'] as $logoKey) {
                if (!empty($payload[$logoKey]) && is_string($payload[$logoKey])) {
                    $base = basename(str_replace('\\\\','/', $payload[$logoKey]));
                    if ($base && $base !== $payload[$logoKey]) {
                        $payload[$logoKey] = 'logos/' . $base;
                    }
                }
            }

            // Normalize payload per type to satisfy existing NOT NULL constraints and JSON columns
            $jsonDefaults = function(array $keys) use (&$payload) {
                foreach ($keys as $k) {
                    $value = $payload[$k] ?? [];
                    // Accept CSV or array; fallback to empty array
                    if (is_string($value)) {
                        $value = strlen(trim($value)) ? array_map('trim', explode(',', $value)) : [];
                    }
                    $payload[$k] = json_encode($value);
                }
            };

            // Per-type key mapping from form keys to DB column names
            $mapKeys = function(array $map, array $arr): array {
                foreach ($map as $from => $to) {
                    if (array_key_exists($from, $arr) && !array_key_exists($to, $arr)) {
                        $arr[$to] = $arr[$from];
                    }
                    unset($arr[$from]);
                }
                return $arr;
            };

            switch ($data['type']) {
                case 'organizations':
                    $jsonDefaults(['country','regions','intervention_areas']);
                    // map common aliases
                    $payload = $mapKeys(['nom' => 'name', 'institution_name' => 'name'], $payload);
                    $payload['social_facebook'] = (bool)($payload['social_facebook'] ?? false);
                    $payload['social_twitter'] = (bool)($payload['social_twitter'] ?? false);
                    $payload['social_linkedin'] = (bool)($payload['social_linkedin'] ?? false);
                    $payload['social_instagram'] = (bool)($payload['social_instagram'] ?? false);
                    break;
                case 'bailleurs':
                    $jsonDefaults(['pays_origine','couverture_geographique','reseaux_sociaux','contact_responsable','priorites_thematiques']);
                    break;
                case 'entreprises':
                    $jsonDefaults(['regions_afrique','reseaux_sociaux2','contact_rse','competences_pro_bono','regions_recrutement']);
                    break;
                case 'agences':
                    $jsonDefaults(['pays_representes','couverture_afrique','contact_jeunesse','programmes_phares','outils_methodologiques']);
                    break;
                case 'publiques':
                    $jsonDefaults(['youthContact','expectedResults']);
                    break;
                case 'academiques':
                    $jsonDefaults(['contact_chercheur','zones_geographiques','publications','public_cible','modalites','ressources_disponibles']);
                    break;
            }

            // Ensure required simple fields exist to avoid NOT NULL errors in legacy schema
            foreach (['nom','name','institution_name'] as $possibleName) {
                if (!isset($payload[$possibleName])) { $payload[$possibleName] = $payload[$possibleName] ?? 'N/A'; }
            }

            // Persist lat/lng on the entity (per live schema), not on shows
            $payload['lat'] = $data['lat'];
            $payload['lng'] = $data['lng'];

            // Determine allowed columns dynamically from the model's table
            $table = (new $modelClass())->getTable();
            $columns = Schema::getColumnListing($table);
            $filtered = array_intersect_key($payload, array_flip($columns));

            // Bypass mass-assignment differences by setting attributes directly
            $entity = new $modelClass();
            foreach ($filtered as $key => $value) {
                $entity->{$key} = $value;
            }
            $entity->save();

            // Create show row using approve flag (no lat/lng columns on shows)
            Show::create([
                'showable_id' => $entity->getKey(),
                'showable_type' => $modelClass,
                'approve' => true,
                'pending' => false,
            ]);
        });

        return redirect()->back()->with('success', 'Saved');
    }

    public function register(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email',
            ]);
            $data['email'] = strtolower(trim($data['email']));
            // Ensure verification table exists to avoid 500 on fresh DBs
            if (!Schema::hasTable('map_verifications')) {
                Schema::create('map_verifications', function (Blueprint $table) {
                    $table->id();
                    $table->string('name');
                    $table->string('email')->unique();
                    $table->string('code');
                    $table->timestamp('expires_at')->nullable();
                    $table->boolean('verified')->default(false);
                    $table->timestamps();
                });
            }
            $code = (string) random_int(100000, 999999);
            MapVerification::updateOrCreate(
                ['email' => $data['email']],
                ['name' => $data['name'], 'code' => $code, 'expires_at' => now()->addMinutes(10), 'verified' => false]
            );
            try { Mail::to($data['email'])->send(new SendVerificationCode($code)); } catch (\Throwable $e) { /* ignore mail failure in local */ }
            return back()->with('status', 'code-sent');
        } catch (\Throwable $e) {
            return back()->withErrors(['register' => $e->getMessage()]);
        }
    }

    public function verify(Request $request)
    {
        try {
            $data = $request->validate([
                'email' => 'required|email',
                'code' => 'required|string',
            ]);
            $email = strtolower(trim($data['email']));
            $code = trim($data['code']);
            $record = MapVerification::where('email', $email)->first();
            if (!$record || trim((string)$record->code) !== $code || ($record->expires_at && $record->expires_at->isPast())) {
                return back()->withErrors(['code' => 'Invalid or expired code']);
            }
            $record->forceFill(['verified' => true])->save();
            return back()->with('status', 'verified');
        } catch (\Throwable $e) {
            return back()->withErrors(['verify' => $e->getMessage()]);
        }
    }

    // Return DB columns for a given entity type so the frontend can render optional fields
    public function schema(string $type)
    {
        $map = [
            'organizations' => \App\Models\Organization::class,
            'bailleurs' => \App\Models\Bailleur::class,
            'entreprises' => \App\Models\Entreprise::class,
            'agences' => \App\Models\Agence::class,
            'publiques' => \App\Models\Publique::class,
            'academiques' => \App\Models\Academique::class,
        ];
        if (!isset($map[$type])) {
            return response()->json(['error' => 'Unknown type'], 404);
        }
        $model = new $map[$type]();
        $table = $model->getTable();
        // Use PRAGMA to fetch column names and types for SQLite
        $raw = \Illuminate\Support\Facades\DB::select("PRAGMA table_info('{$table}')");
        $hidden = ['id','created_at','updated_at','user_id','lat','lng'];
        $cols = [];
        foreach ($raw as $col) {
            $name = $col->name ?? '';
            if (in_array($name, $hidden, true)) continue;
            $cols[] = [
                'name' => $name,
                'type' => strtolower((string)($col->type ?? '')),
                'notnull' => (int)($col->notnull ?? 0) === 1,
            ];
        }
        return response()->json(['table' => $table, 'columns' => $cols]);
    }
}


