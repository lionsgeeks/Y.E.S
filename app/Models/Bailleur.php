<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bailleur extends Model
{
    protected $fillable = [
        'nom','logo_path','type_institution','type_institution_autre','pays_origine','couverture_geographique','site_web','email_contact','telephone','reseaux_sociaux','contact_responsable','priorites_thematiques'
    ];

    protected $casts = [
        'pays_origine' => 'array',
        'couverture_geographique' => 'array',
        'reseaux_sociaux' => 'array',
        'contact_responsable' => 'array',
    ];

    public function shows()
    {
        return $this->morphMany(Show::class, 'showable');
    }
}


