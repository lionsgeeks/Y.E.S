<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('academiques')) {
            Schema::create('academiques', function (Blueprint $table) {
                $table->id();
                $table->string('nom');
                $table->string('logo_path')->nullable();
                $table->string('type_institution')->nullable();
                $table->string('pays')->nullable();
                $table->string('site_web')->nullable();
                $table->string('departement')->nullable();
                $table->string('email')->nullable();
                $table->string('telephone')->nullable();
                $table->string('contact_nom')->nullable();
                $table->string('contact_fonction')->nullable();
                $table->string('contact_email')->nullable();
                $table->text('axes_recherche')->nullable();
                $table->text('methodologies')->nullable();
                $table->text('zones_geographiques')->nullable();
                $table->text('programmes_formation')->nullable();
                $table->text('public_cible')->nullable();
                $table->text('modalites')->nullable();
                $table->string('certifications')->nullable();
                $table->string('partenaires_recherche')->nullable();
                $table->text('ressources_disponibles')->nullable();
                $table->text('expertise')->nullable();
                $table->text('opportunites_collaboration')->nullable();
                $table->text('conferences')->nullable();
                $table->text('ateliers')->nullable();
                $table->decimal('lat', 15, 8)->nullable();
                $table->decimal('lng', 15, 8)->nullable();
                $table->string('publications')->nullable();
                $table->dateTime('created_at')->nullable();
                $table->dateTime('updated_at')->nullable();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('academiques')) {
            Schema::drop('academiques');
        }
    }
};


