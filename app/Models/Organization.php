<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    protected $fillable = [
        'name','logo','creation_year','legal_status','other_legal_status','country','regions','website','social_facebook','social_twitter','social_linkedin','social_instagram','facebook_url','twitter_url','linkedin_url','instagram_url','main_email','phone','postal_address','contact_name','contact_function','contact_email','intervention_areas','target_groups','annual_beneficiaries','program_title','technical_partners','financial_partners'
    ];

    protected $casts = [
        'country' => 'array',
        'regions' => 'array',
        'intervention_areas' => 'array',
        'social_facebook' => 'boolean',
        'social_twitter' => 'boolean',
        'social_linkedin' => 'boolean',
        'social_instagram' => 'boolean',
    ];

    public function shows()
    {
        return $this->morphMany(Show::class, 'showable');
    }
}


