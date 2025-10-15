<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plaidoyer_recommendations', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('organization')->nullable();
            $table->string('role')->nullable();
            $table->string('email');
            $table->string('country');
            $table->longText('recommendation');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plaidoyer_recommendations');
    }
};


