<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Publique extends Model
{
    protected $fillable = [
        'institution_name','institution_type','country','website','email','phone_code','phone_number','address','youthContact','policyFramework','strategicPriorities','annualBudget','flagshipProgram','targetAudience','supportMechanisms','expectedResults','executionPartners','coordinationMechanism','involvedActors','monitoringApproach','technicalAssistance','bestPractices','cooperationOpportunities'
    ];

    protected $casts = [
        'youthContact' => 'array',
        'expectedResults' => 'array',
    ];

    public function shows()
    {
        return $this->morphMany(Show::class, 'showable');
    }
}


