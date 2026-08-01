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
        Schema::table('lessons', function (Blueprint $table) {
            // Drop the existing global unique constraint on slug
            $table->dropUnique('lessons_slug_unique');

            // Add a composite unique constraint for slug + course_section_id
            // This allows the same slug in different sections
            $table->unique(['course_section_id', 'slug'], 'lessons_section_slug_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            // Drop the section-wise unique constraint
            $table->dropUnique('lessons_section_slug_unique');

            // Restore the global unique constraint
            $table->unique('slug', 'lessons_slug_unique');
        });
    }
};
