<?php

use App\Http\Controllers\Guest\InstallController;
use Illuminate\Support\Facades\Route;

Route::get('/install', [InstallController::class, 'index'])->name('install');
Route::post('/install', [InstallController::class, 'store'])->name('install.store');
Route::get('/install/success', [InstallController::class, 'success'])->name('install.success');
