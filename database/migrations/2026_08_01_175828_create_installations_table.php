<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('installations', function (Blueprint $table) {
            $table->id();
            $table->string('app_url');
            $table->string('admin_path')->default('admin');
            $table->string('database_host');
            $table->string('database_port')->default('3306');
            $table->string('database_name');
            $table->string('database_username');
            $table->string('database_password')->nullable();
            $table->string('admin_name');
            $table->string('admin_email');
            $table->string('admin_password');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('installations');
    }
};
