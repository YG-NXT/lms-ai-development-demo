<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('live_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->longText('description')->nullable();
            $table->enum('provider', ['zoom', 'google_meet'])->default('zoom');
            $table->text('meeting_url');
            $table->dateTime('start_at');
            $table->dateTime('end_at');
            $table->string('timezone')->default('UTC');
            $table->integer('reminder_minutes_before')->default(30);
            $table->text('recording_url')->nullable();
            $table->enum('status', ['upcoming', 'live', 'finished', 'cancelled'])->default('upcoming');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('live_classes');
    }
};
