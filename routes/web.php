<?php

use App\Http\Controllers\Guest\AuthController;
use App\Http\Controllers\Guest\HomeController;
use App\Http\Controllers\Guest\LocaleController;
use Illuminate\Support\Facades\Route;

Route::post('/webhooks/stripe', [\App\Http\Controllers\WebhookController::class, 'stripe'])->name('webhooks.stripe');

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/courses', [HomeController::class, 'courseIndex'])->name('courses.index');
Route::get('/courses/{course:slug}', [HomeController::class, 'show'])->name('courses.show');

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('login', [AuthController::class, 'storeLogin']);
    Route::get('register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('register', [AuthController::class, 'storeRegister']);
});

Route::post('logout', [AuthController::class, 'destroy'])->middleware('auth')->name('logout');

Route::get('locale/{locale}', [LocaleController::class, 'switch'])->name('locale.switch');

Route::get('/privacy-policy', [App\Http\Controllers\Guest\LegalPageController::class, 'show'])->defaults('slug', 'privacy-policy')->name('legal.privacy');
Route::get('/terms-and-conditions', [App\Http\Controllers\Guest\LegalPageController::class, 'show'])->defaults('slug', 'terms-and-conditions')->name('legal.terms');
Route::get('/about-us', [App\Http\Controllers\Guest\LegalPageController::class, 'show'])->defaults('slug', 'about-us')->name('legal.about');
Route::get('/contact-us', [App\Http\Controllers\Guest\ContactController::class, 'show'])->name('contact');

// Public Certificate Verification
Route::get('/verify-certificate', [App\Http\Controllers\Public\VerificationController::class, 'index'])->name('certificate.verify');

// Public Tutorials
Route::get('/tutorials', [App\Http\Controllers\Guest\TutorialController::class, 'index'])->name('tutorials.index');
Route::get('/tutorials/{tutorial:slug}', [App\Http\Controllers\Guest\TutorialController::class, 'show'])->name('tutorials.show');

Route::middleware(['auth'])->group(function () {
    // Enrollment
    Route::post('/courses/{course:slug}/enroll', [App\Http\Controllers\Student\EnrollmentController::class, 'store'])->name('enroll.store');

    // Reviews
    Route::post('/courses/{course:slug}/reviews', [App\Http\Controllers\Student\ReviewController::class, 'store'])->name('student.reviews.store');

    // Student Panel
    Route::prefix('student')->name('student.')->group(function () {
        Route::get('/courses', [App\Http\Controllers\Student\CourseController::class, 'index'])->name('courses.index');
        Route::get('/courses/{course:slug}', [App\Http\Controllers\Student\CourseController::class, 'show'])->name('courses.show');
        
        // Subscriptions
        Route::get('/subscriptions', [App\Http\Controllers\Student\SubscriptionController::class, 'index'])->name('subscriptions.index');
        Route::get('/subscriptions/{plan:slug}/checkout', [App\Http\Controllers\Student\SubscriptionController::class, 'checkout'])->name('subscriptions.checkout');
        Route::post('/subscriptions/{plan:slug}/purchase', [App\Http\Controllers\Student\SubscriptionController::class, 'purchase'])->name('subscriptions.purchase');
        Route::post('/subscriptions/callback', [App\Http\Controllers\Student\SubscriptionController::class, 'callback'])->name('subscriptions.callback');
        Route::post('/subscriptions/cancel', [App\Http\Controllers\Student\SubscriptionController::class, 'cancel'])->name('subscriptions.cancel');
        Route::post('/subscriptions/update/{plan:slug}', [App\Http\Controllers\Student\SubscriptionController::class, 'update'])->name('subscriptions.update');
    });
});
