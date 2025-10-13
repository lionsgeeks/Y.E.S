<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sponsor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type', 
        'website_url',
        'description',
        'path',
    ];
    protected $casts = [
        'description' => 'array',
    ];
}
