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
            $table->integer('total_marks')->nullable()->default(0)->after('duration');
        });

        Schema::table('lesson_completions', function (Blueprint $table) {
            $table->decimal('obtained_mark', 8, 2)->nullable()->after('meta');
            $table->text('feedback')->nullable()->after('obtained_mark');
            $table->foreignId('graded_by')->nullable()->constrained('users')->nullOnDelete()->after('feedback');
            $table->timestamp('graded_at')->nullable()->after('graded_by');
            $table->string('grading_status')->default('pending')->after('graded_at'); // pending, graded, recheck_requested, recheck_reviewed
            $table->boolean('is_edited')->default(false)->after('grading_status');
            $table->timestamp('edited_at')->nullable()->after('is_edited');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->dropColumn('total_marks');
        });

        Schema::table('lesson_completions', function (Blueprint $table) {
            $table->dropForeign(['graded_by']);
            $table->dropColumn([
                'obtained_mark',
                'feedback',
                'graded_by',
                'graded_at',
                'grading_status',
                'is_edited',
                'edited_at',
            ]);
        });
    }
};
