<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agence extends Model
{
    protected $fillable = [
        'nom','logo','type_organisation','email_institutionnel','pays_representes','couverture_afrique','site_web','bureaux_afrique','contact_jeunesse','cadre_strategique','priorites_thematiques','budget','annee_debut','annee_fin','programmes_phares','outils_methodologiques','opportunites_financement','mecanismes_collaboration','type_partenaires','domaines_expertise'
    ];

    protected $casts = [
        'pays_representes' => 'array',
        'couverture_afrique' => 'array',
        'contact_jeunesse' => 'array',
        'programmes_phares' => 'array',
        'outils_methodologiques' => 'array',
    ];

    public function shows()
    {
        return $this->morphMany(Show::class, 'showable');
    }
}


