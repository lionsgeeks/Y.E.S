<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScientificCommittee extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'photo_path',
        'linkedin_url',
        'position',
        'bio',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
