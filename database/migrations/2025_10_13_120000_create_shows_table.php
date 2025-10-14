<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('shows')) {
            Schema::create('shows', function (Blueprint $table) {
                $table->id();
                $table->string('showable_type');
                $table->unsignedBigInteger('showable_id');
                $table->boolean('pending')->default(false);
                $table->boolean('approve')->default(false);
                $table->dateTime('created_at')->nullable();
                $table->dateTime('updated_at')->nullable();
                $table->index(['showable_type', 'showable_id']);
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('shows')) {
            Schema::drop('shows');
        }
    }
};


