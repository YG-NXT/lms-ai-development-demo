<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('xp')->default(0)->after('email');
            $table->integer('total_xp')->default(0)->after('xp');
            $table->integer('streak_count')->default(0)->after('total_xp');
            $table->date('last_learning_day')->nullable()->after('streak_count');
            $table->unsignedBigInteger('subscription_plan_id')->nullable()->after('last_learning_day');
            $table->date('subscription_starts_at')->nullable()->after('subscription_plan_id');
            $table->date('subscription_ends_at')->nullable()->after('subscription_starts_at');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['subscription_ends_at', 'subscription_starts_at', 'subscription_plan_id', 'xp', 'total_xp', 'streak_count', 'last_learning_day']);
        });
    }
};
