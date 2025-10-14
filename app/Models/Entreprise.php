<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    protected $fillable = [
        'nom','logo','secteur','taille','pays_siege','regions_afrique','site_web','reseaux_sociaux2','twitter_url','linkedin_url','contact_rse','politique_inclusion','programmes_integration','postes_stages_annuels','dispositifs_formation','partenariats_osc','initiatives_mecenat','competences_pro_bono','profils_recherches','regions_recrutement','processus_integration'
    ];

    protected $casts = [
        'regions_afrique' => 'array',
        'reseaux_sociaux2' => 'array',
        'contact_rse' => 'array',
        'competences_pro_bono' => 'array',
        'regions_recrutement' => 'array',
    ];

    public function shows()
    {
        return $this->morphMany(Show::class, 'showable');
    }
}


