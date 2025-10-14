<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('agences')) {
            Schema::create('agences', function (Blueprint $table) {
                $table->id();
                $table->string('nom')->nullable();
                $table->string('logo')->nullable();
                $table->string('type_organisation')->nullable();
                $table->string('pays_representes')->nullable();
                $table->string('couverture_afrique')->nullable();
                $table->string('site_web')->nullable();
                $table->string('email_institutionnel');
                $table->text('bureaux_afrique')->nullable();
                $table->string('contact_jeunesse')->nullable();
                $table->string('cadre_strategique')->nullable();
                $table->text('priorites_thematiques')->nullable();
                $table->decimal('budget', 15, 2)->nullable();
                $table->integer('annee_debut')->nullable();
                $table->integer('annee_fin')->nullable();
                $table->string('programmes_phares')->nullable();
                $table->string('outils_methodologiques')->nullable();
                $table->text('opportunites_financement')->nullable();
                $table->string('type_partenaires')->nullable();
                $table->string('mecanismes_collaboration')->nullable();
                $table->text('domaines_expertise')->nullable();
                $table->decimal('lat', 15, 8)->nullable();
                $table->decimal('lng', 15, 8)->nullable();
                $table->unsignedBigInteger('user_id')->nullable();
                $table->dateTime('created_at')->nullable();
                $table->dateTime('updated_at')->nullable();

                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('agences')) {
            Schema::drop('agences');
        }
    }
};


