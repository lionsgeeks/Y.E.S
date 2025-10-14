<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MapVerification extends Model
{
    protected $fillable = [ 'name', 'email', 'code', 'expires_at', 'verified' ];
    protected $casts = [ 'verified' => 'boolean', 'expires_at' => 'datetime' ];
}


