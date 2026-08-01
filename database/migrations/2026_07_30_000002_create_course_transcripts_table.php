<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('course_transcripts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained()->cascadeOnDelete();
            $table->string('locale')->default('en');
            $table->string('language_name');
            $table->text('content');
            $table->string('format')->default('vtt');
            $table->string('file_path')->nullable();
            $table->integer('word_count')->default(0);
            $table->boolean('is_auto_generated')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_transcripts');
    }
};
