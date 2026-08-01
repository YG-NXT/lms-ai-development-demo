<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('coding_exercises', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained()->cascadeOnDelete();
            $table->string('language', 50);
            $table->text('starter_code')->nullable();
            $table->text('test_cases')->json();
            $table->text('constraints')->nullable();
            $table->integer('time_limit_seconds')->default(10);
            $table->integer('memory_limit_mb')->default(128);
            $table->boolean('enable_sandbox')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('coding_exercises');
    }
};
