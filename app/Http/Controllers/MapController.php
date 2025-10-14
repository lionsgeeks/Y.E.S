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

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|string|in:organizations,bailleurs,entreprises,agences,publiques,academiques',
            'payload' => 'required|array',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        DB::transaction(function () use ($data) {
            $modelClass = [
                'organizations' => \App\Models\Organization::class,
                'bailleurs' => \App\Models\Bailleur::class,
                'entreprises' => \App\Models\Entreprise::class,
                'agences' => \App\Models\Agence::class,
                'publiques' => \App\Models\Publique::class,
                'academiques' => \App\Models\Academique::class,
            ][$data['type']];

            $payload = $data['payload'];

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

            // Whitelists per live schema to avoid inserting unknown columns
            $whitelists = [
                'organizations' => [
                    'name','logo','creation_year','legal_status','other_legal_status','country','regions','website',
                    'social_facebook','social_twitter','social_linkedin','social_instagram','facebook_url','twitter_url',
                    'linkedin_url','instagram_url','main_email','phone','postal_address','contact_name','contact_function',
                    'contact_email','intervention_areas','target_groups','annual_beneficiaries','program_title','program_description',
                    'methodological_approach','result1','result2','result3','technical_partners','financial_partners','lat','lng','is_approved','user_id'
                ],
                'bailleurs' => [
                    'nom','logo_path','type_institution','pays_origine','couverture_geographique','site_web','twitter','linkedin',
                    'twitter_url2','linkedin_url2','email_contact','telephone','contact_responsable','priorites_thematiques','lat','lng','user_id'
                ],
                'entreprises' => [
                    'nom','logo','secteur','taille','pays_siege','regions_afrique','site_web','twitter','linkedin','twitter_url','linkedin_url',
                    'email_contact','telephone','contact_rse','politique_inclusion','programmes_integration','postes_stages_annuels','dispositifs_formation',
                    'partenariats_osc','initiatives_mecenat','competences_pro_bono','profils_recherches','regions_recrutement','processus_integration','lat','lng','user_id'
                ],
                'agences' => [
                    'nom','logo','type_organisation','pays_representes','couverture_afrique','site_web','email_institutionnel','bureaux_afrique','contact_jeunesse',
                    'cadre_strategique','priorites_thematiques','budget','annee_debut','annee_fin','programmes_phares','outils_methodologiques','opportunites_financement',
                    'type_partenaires','mecanismes_collaboration','domaines_expertise','lat','lng','user_id'
                ],
                'publiques' => [
                    'institution_name','institution_type','country','website','logo_path','email','phone_code','phone_number','address','youth_contact_name',
                    'youth_contact_position','youth_contact_email','policy_framework','strategic_priorities','annual_budget','flagship_program','target_audience',
                    'support_mechanisms','expected_result_1','expected_result_2','expected_result_3','execution_partners','coordination_mechanism','involved_actors',
                    'monitoring_approach','technical_assistance','best_practices','lat','lng','cooperation_opportunities'
                ],
                'academiques' => [
                    'nom','logo_path','type_institution','pays','site_web','departement','email','telephone','contact_nom','contact_fonction','contact_email',
                    'axes_recherche','methodologies','zones_geographiques','programmes_formation','public_cible','modalites','certifications','partenaires_recherche',
                    'ressources_disponibles','expertise','opportunites_collaboration','conferences','ateliers','lat','lng','publications'
                ],
            ];

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

            // Whitelist attributes for the entity to avoid invalid column inserts
            $allowed = $whitelists[$data['type']] ?? array_keys($payload);
            $filtered = array_intersect_key($payload, array_flip($allowed));

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
            $record = MapVerification::where('email', $data['email'])->first();
            if (!$record || $record->code !== $data['code'] || ($record->expires_at && $record->expires_at->isPast())) {
                return back()->withErrors(['code' => 'Invalid or expired code']);
            }
            $record->forceFill(['verified' => true])->save();
            return back()->with('status', 'verified');
        } catch (\Throwable $e) {
            return back()->withErrors(['verify' => $e->getMessage()]);
        }
    }
}


