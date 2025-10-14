<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('entreprises')) {
            Schema::create('entreprises', function (Blueprint $table) {
                $table->id();
                $table->string('nom');
                $table->string('logo')->nullable();
                $table->string('secteur')->nullable();
                $table->string('taille')->nullable();
                $table->string('pays_siege')->nullable();
                $table->string('regions_afrique')->nullable();
                $table->string('site_web')->nullable();
                $table->boolean('twitter')->default(false);
                $table->boolean('linkedin')->default(false);
                $table->string('twitter_url')->nullable();
                $table->string('linkedin_url')->nullable();
                $table->string('email_contact')->nullable();
                $table->string('telephone')->nullable();
                $table->string('contact_rse')->nullable();
                $table->text('politique_inclusion')->nullable();
                $table->text('programmes_integration')->nullable();
                $table->integer('postes_stages_annuels')->default(0);
                $table->text('dispositifs_formation')->nullable();
                $table->text('partenariats_osc')->nullable();
                $table->text('initiatives_mecenat')->nullable();
                $table->string('competences_pro_bono')->nullable();
                $table->text('profils_recherches')->nullable();
                $table->string('regions_recrutement')->nullable();
                $table->text('processus_integration')->nullable();
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
        if (Schema::hasTable('entreprises')) {
            Schema::drop('entreprises');
        }
    }
};


