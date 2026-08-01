<?php

use App\Http\Controllers\Student\BookmarkController;
use App\Http\Controllers\Student\CourseController;
use App\Http\Controllers\Student\DashboardController;
use App\Http\Controllers\Student\LearningPathController;
use App\Http\Controllers\Student\NotificationController;
use App\Http\Controllers\Student\ProfileController;
use App\Http\Controllers\Student\TutorialController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'customer'])->prefix('student')->name('student.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/learning-dashboard', [DashboardController::class, 'learningDashboard'])->name('dashboard.learning');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('/courses/{course:slug}', [CourseController::class, 'show'])->name('courses.show');
    Route::post('/courses/{course}/lessons/{lesson}/complete', [CourseController::class, 'markLessonAsComplete'])->name('courses.lessons.complete');
    Route::post('/courses/{course}/lessons/{lesson}/recheck', [CourseController::class, 'requestRecheck'])->name('courses.lessons.recheck');
    Route::post('/courses/{course}/lessons/{lesson}/execute', [CourseController::class, 'executeCode'])->name('courses.lessons.execute');
    Route::post('/courses/{course}/complete', [CourseController::class, 'markCourseAsCompleted'])->name('courses.complete');

    // Bookmarks
    Route::get('/bookmarks', [BookmarkController::class, 'index'])->name('bookmarks.index');
    Route::post('/courses/{course}/bookmark', [BookmarkController::class, 'toggle'])->name('courses.bookmark.toggle');

    // Gamification
    Route::get('/gamification', [App\Http\Controllers\Student\GamificationController::class, 'index'])->name('gamification.index');

    // Learning Paths
    Route::get('/learning-paths', [LearningPathController::class, 'index'])->name('learning-paths.index');
    Route::get('/learning-paths/{learningPath:slug}', [LearningPathController::class, 'show'])->name('learning-paths.show');
    Route::post('/learning-paths/{learningPath}/enroll', [LearningPathController::class, 'enroll'])->name('learning-paths.enroll');

    // Course Bundles
    Route::get('/bundles', [App\Http\Controllers\Student\BundleController::class, 'index'])->name('bundles.index');
    Route::get('/bundles/{bundle:slug}', [App\Http\Controllers\Student\BundleController::class, 'show'])->name('bundles.show');
    Route::post('/bundles/{bundle}/enroll', [App\Http\Controllers\Student\BundleController::class, 'enroll'])->name('bundles.enroll');

    // Subscriptions
    Route::get('/subscriptions', [App\Http\Controllers\Student\SubscriptionController::class, 'index'])->name('subscriptions.index');
    Route::post('/subscriptions/{plan}/subscribe', [App\Http\Controllers\Student\SubscriptionController::class, 'subscribe'])->name('subscriptions.subscribe');

    // AI Tutor
    Route::get('/courses/{course:slug}/ai-tutor', [App\Http\Controllers\Student\AiTutorController::class, 'show'])->name('courses.ai-tutor');
    Route::post('/courses/{course}/ai-tutor/ask', [App\Http\Controllers\Student\AiTutorController::class, 'ask'])->name('courses.ai-tutor.ask');

    // Checkout with Coupons
    Route::post('/checkout/{course}/validate-coupon', [App\Http\Controllers\Student\CheckoutController::class, 'validateCoupon'])->name('checkout.validate-coupon');

    // Live Classes
    Route::get('/live-classes/{liveClass}/join', [App\Http\Controllers\Student\LiveClassController::class, 'join'])->name('live-classes.join');

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::get('/notifications/recent', [NotificationController::class, 'recent'])->name('notifications.recent');
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.read_all');
    Route::delete('/notifications/{id}', [NotificationController::class, 'destroy'])->name('notifications.destroy');

    // Certificates
    Route::get('/certificates', [App\Http\Controllers\Student\CertificateController::class, 'index'])->name('certificates.index');
    Route::get('/certificates/{certificate}/download', [App\Http\Controllers\Student\CertificateController::class, 'download'])->name('certificates.download');

    // Checkout
    Route::get('/checkout/callback', [App\Http\Controllers\Student\CheckoutController::class, 'callback'])->name('checkout.callback');
    Route::get('/checkout/{course:slug}', [App\Http\Controllers\Student\CheckoutController::class, 'show'])->name('checkout.show');
    Route::post('/checkout/{course}', [App\Http\Controllers\Student\CheckoutController::class, 'store'])->name('checkout.store');

    // Order History
    Route::get('/orders', [App\Http\Controllers\Student\OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [App\Http\Controllers\Student\OrderController::class, 'show'])->name('orders.show');
    Route::get('/orders/{order}/invoice', [App\Http\Controllers\Student\OrderController::class, 'downloadInvoice'])->name('orders.invoice');

    // Announcements
    Route::get('/announcements', [\App\Http\Controllers\Student\AnnouncementController::class, 'index'])->name('announcements.index');
    Route::get('/announcements/{announcement}', [\App\Http\Controllers\Student\AnnouncementController::class, 'show'])->name('announcements.show');
    Route::post('/announcements/{announcement}/read', [\App\Http\Controllers\Student\AnnouncementController::class, 'markAsRead'])->name('announcements.read');

    // Learning Reminders
    Route::get('/reminders', [App\Http\Controllers\Student\LearningReminderController::class, 'index'])->name('reminders.index');
    Route::post('/reminders/{course}', [App\Http\Controllers\Student\LearningReminderController::class, 'store'])->name('reminders.store');
    Route::delete('/reminders/{reminder}', [App\Http\Controllers\Student\LearningReminderController::class, 'destroy'])->name('reminders.destroy');

    // Course Transcripts
    Route::get('/lessons/{lesson}/transcripts', [App\Http\Controllers\Student\CourseTranscriptController::class, 'index'])->name('lessons.transcripts');
    Route::post('/lessons/{lesson}/transcripts', [App\Http\Controllers\Student\CourseTranscriptController::class, 'store'])->name('lessons.transcripts.store');

    // Offline Downloads
    Route::get('/downloads', [App\Http\Controllers\Student\OfflineDownloadController::class, 'index'])->name('downloads.index');
    Route::post('/lessons/{lesson}/download', [App\Http\Controllers\Student\OfflineDownloadController::class, 'store'])->name('lessons.download');
    Route::delete('/downloads/{download}', [App\Http\Controllers\Student\OfflineDownloadController::class, 'destroy'])->name('downloads.destroy');

    // Waitlist
    Route::get('/waitlist', [App\Http\Controllers\Student\WaitlistController::class, 'index'])->name('waitlist.index');
    Route::post('/waitlist/{course}', [App\Http\Controllers\Student\WaitlistController::class, 'store'])->name('waitlist.store');
    Route::delete('/waitlist/{waitlist}', [App\Http\Controllers\Student\WaitlistController::class, 'destroy'])->name('waitlist.destroy');

    // Affiliate/Referral
    Route::get('/referral', [App\Http\Controllers\Student\ReferralController::class, 'index'])->name('referral.index');
    Route::post('/referral', [App\Http\Controllers\Student\ReferralController::class, 'store'])->name('referral.store');
    Route::post('/referral/complete', [App\Http\Controllers\Student\ReferralController::class, 'complete'])->name('referral.complete');

    // Tutorials
    Route::get('/tutorials', [TutorialController::class, 'index'])->name('tutorials.index');
    Route::get('/tutorials/{tutorial:slug}', [TutorialController::class, 'show'])->name('tutorials.show');
    Route::post('/tutorials/{tutorial}/enroll', [TutorialController::class, 'enroll'])->name('tutorials.enroll');

    // Inline Code Execution (like W3Schools)
    Route::post('/execute', [App\Http\Controllers\Student\InlineCodeController::class, 'execute'])->name('code.execute');
    Route::post('/terminal', [App\Http\Controllers\Student\InlineCodeController::class, 'terminal'])->name('code.terminal');
});
