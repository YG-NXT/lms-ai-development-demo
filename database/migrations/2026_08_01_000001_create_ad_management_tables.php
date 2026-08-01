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
        Schema::create('ad_zones', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Homepage Banner", "Course Sidebar"
            $table->string('zone_id')->unique(); // TheMoneytizer Zone ID
            $table->string('position'); // 'header', 'sidebar', 'footer', 'content', 'between_courses'
            $table->string('page_type')->default('all'); // 'all', 'home', 'courses', 'tutorials', 'course_detail', etc.
            $table->string('ad_type')->default('banner'); // 'banner', 'native', 'video', 'popup'
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('priority')->default(0); // Higher priority shows first
            $table->text('custom_code')->nullable(); // Custom HTML/JS code if needed
            $table->json('targeting_rules')->nullable(); // JSON for advanced targeting
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['position', 'page_type', 'is_active']);
        });
        
        Schema::create('ad_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // e.g., 'publisher_id', 'api_key'
            $table->text('value')->nullable();
            $table->timestamps();
        });
        
        Schema::create('ad_impressions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ad_zone_id')->constrained('ad_zones')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('session_id')->nullable();
            $table->string('page_url');
            $table->string('ip_address')->nullable();
            $table->enum('type', ['impression', 'click'])->default('impression');
            $table->decimal('revenue', 10, 4)->default(0);
            $table->timestamps();
            
            $table->index(['ad_zone_id', 'type', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ad_impressions');
        Schema::dropIfExists('ad_settings');
        Schema::dropIfExists('ad_zones');
    }
};
