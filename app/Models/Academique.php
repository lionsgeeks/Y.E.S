<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Academique extends Model
{
    protected $fillable = [
        'nom','logo_path','type_institution','pays','site_web','departement','email','telephone_code','telephone_number','contact_chercheur','axes_recherche','methodologies','zones_geographiques','publications','programmes_formation','public_cible','modalites','certifications','partenaires_recherche','ressources_disponibles','expertise','opportunites_collaboration','conferences','ateliers'
    ];

    protected $casts = [
        'contact_chercheur' => 'array',
        'zones_geographiques' => 'array',
        'publications' => 'array',
        'public_cible' => 'array',
        'modalites' => 'array',
        'ressources_disponibles' => 'array',
    ];

    public function shows()
    {
        return $this->morphMany(Show::class, 'showable');
    }
}


