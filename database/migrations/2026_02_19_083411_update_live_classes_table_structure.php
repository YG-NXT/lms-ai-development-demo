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
        Schema::table('live_classes', function (Blueprint $table) {
            $table->enum('type', ['daily', 'specific'])->default('specific')->after('description');
            $table->date('class_date')->nullable()->after('type'); // Only for 'specific' type
            $table->time('start_time')->nullable()->after('class_date');
            $table->time('end_time')->nullable()->after('start_time');
        });

        // Migrate existing data
        DB::table('live_classes')->get()->each(function ($class) {
            if ($class->start_at && $class->end_at) {
                DB::table('live_classes')->where('id', $class->id)->update([
                    'type' => 'specific',
                    'class_date' => Carbon\Carbon::parse($class->start_at)->format('Y-m-d'),
                    'start_time' => Carbon\Carbon::parse($class->start_at)->format('H:i:s'),
                    'end_time' => Carbon\Carbon::parse($class->end_at)->format('H:i:s'),
                ]);
            }
        });

        // Make start_time and end_time not nullable after migration
        Schema::table('live_classes', function (Blueprint $table) {
            $table->time('start_time')->nullable(false)->change();
            $table->time('end_time')->nullable(false)->change();

            $table->dropColumn(['start_at', 'end_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('live_classes', function (Blueprint $table) {
            $table->dateTime('start_at')->nullable();
            $table->dateTime('end_at')->nullable();
        });

        // Reverse migration (approximate) - assume specific date + time
        DB::table('live_classes')->get()->each(function ($class) {
            if ($class->type === 'specific' && $class->class_date) {
                DB::table('live_classes')->where('id', $class->id)->update([
                    'start_at' => Carbon\Carbon::parse($class->class_date.' '.$class->start_time)->format('Y-m-d H:i:s'),
                    'end_at' => Carbon\Carbon::parse($class->class_date.' '.$class->end_time)->format('Y-m-d H:i:s'),
                ]);
            } else {
                // For 'daily', we can't perfectly reverse to a single datetime.
                // We'll just use today's date + time as a default fallback or leave null.
                // This is lossy for 'daily' type but acceptable for down migration.
                $today = now()->format('Y-m-d');
                DB::table('live_classes')->where('id', $class->id)->update([
                    'start_at' => Carbon\Carbon::parse($today.' '.$class->start_time)->format('Y-m-d H:i:s'),
                    'end_at' => Carbon\Carbon::parse($today.' '.$class->end_time)->format('Y-m-d H:i:s'),
                ]);
            }
        });

        Schema::table('live_classes', function (Blueprint $table) {
            $table->dateTime('start_at')->nullable(false)->change();
            $table->dateTime('end_at')->nullable(false)->change();

            $table->dropColumn(['type', 'class_date', 'start_time', 'end_time']);
        });
    }
};
