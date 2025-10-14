<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('organizations')) {
            Schema::create('organizations', function (Blueprint $table) {
                $table->id();
                $table->string('name')->nullable();
                $table->string('logo')->nullable();
                $table->integer('creation_year')->nullable();
                $table->string('legal_status')->nullable();
                $table->string('other_legal_status')->nullable();
                $table->string('country')->nullable();
                $table->string('regions')->nullable();
                $table->string('website')->nullable();
                $table->boolean('social_facebook')->default(false);
                $table->boolean('social_twitter')->default(false);
                $table->boolean('social_linkedin')->default(false);
                $table->boolean('social_instagram')->default(false);
                $table->string('facebook_url')->nullable();
                $table->string('twitter_url')->nullable();
                $table->string('linkedin_url')->nullable();
                $table->string('instagram_url')->nullable();
                $table->string('main_email')->nullable();
                $table->string('phone')->nullable();
                $table->text('postal_address')->nullable();
                $table->string('contact_name')->nullable();
                $table->string('contact_function')->nullable();
                $table->string('contact_email')->nullable();
                $table->text('intervention_areas')->nullable();
                $table->text('target_groups')->nullable();
                $table->integer('annual_beneficiaries')->nullable();
                $table->string('program_title')->nullable();
                $table->text('program_description')->nullable();
                $table->text('methodological_approach')->nullable();
                $table->string('result1')->nullable();
                $table->string('result2')->nullable();
                $table->string('result3')->nullable();
                $table->text('technical_partners')->nullable();
                $table->text('financial_partners')->nullable();
                $table->decimal('lat', 15, 8)->nullable();
                $table->decimal('lng', 15, 8)->nullable();
                $table->boolean('is_approved')->default(false);
                $table->unsignedBigInteger('user_id')->nullable();
                $table->dateTime('created_at')->nullable();
                $table->dateTime('updated_at')->nullable();

                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('organizations')) {
            Schema::drop('organizations');
        }
    }
};


