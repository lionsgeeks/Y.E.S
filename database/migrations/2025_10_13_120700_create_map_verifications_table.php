<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('map_verifications')) {
            Schema::create('map_verifications', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email')->unique();
                $table->string('code');
                $table->dateTime('expires_at')->nullable();
                $table->boolean('verified')->default(false);
                $table->dateTime('created_at')->nullable();
                $table->dateTime('updated_at')->nullable();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('map_verifications')) {
            Schema::drop('map_verifications');
        }
    }
};


