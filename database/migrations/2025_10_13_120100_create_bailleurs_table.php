<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('bailleurs')) {
            Schema::create('bailleurs', function (Blueprint $table) {
                $table->id();
                $table->string('nom')->nullable();
                $table->string('logo_path')->nullable();
                $table->string('type_institution')->nullable();
                $table->string('pays_origine')->nullable();
                $table->string('couverture_geographique');
                $table->string('site_web')->nullable();
                $table->boolean('twitter')->default(false);
                $table->boolean('linkedin')->default(false);
                $table->string('twitter_url2')->nullable();
                $table->string('linkedin_url2')->nullable();
                $table->string('email_contact')->nullable();
                $table->string('telephone')->nullable();
                $table->string('contact_responsable')->nullable();
                $table->text('priorites_thematiques')->nullable();
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
        if (Schema::hasTable('bailleurs')) {
            Schema::drop('bailleurs');
        }
    }
};


