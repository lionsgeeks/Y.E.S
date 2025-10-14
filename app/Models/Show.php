<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Show extends Model
{
    protected $fillable = [
        'showable_id',
        'showable_type',
        'pending',
        'approve',
    ];

    protected $casts = [
        'pending' => 'boolean',
        'approve' => 'boolean',
    ];

    public function showable()
    {
        return $this->morphTo();
    }
}


