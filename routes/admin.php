<?php

use App\Http\Controllers\Admin\ActivityLogController;
use App\Http\Controllers\Admin\Auth\AuthController;
use App\Http\Controllers\Admin\BrandingController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('login', [AuthController::class, 'storeLogin']);
    Route::get('register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('register', [AuthController::class, 'storeRegister']);
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('users', UserController::class);
    Route::patch('users/{user}/status', [UserController::class, 'updateStatus'])->name('users.status');

    Route::resource('students', \App\Http\Controllers\Admin\StudentController::class)->only(['index', 'destroy', 'update']);
    Route::patch('students/{student}/status', [\App\Http\Controllers\Admin\StudentController::class, 'updateStatus'])->name('students.status');
    Route::post('students/{student}/assign-course', [\App\Http\Controllers\Admin\StudentController::class, 'assignCourse'])->name('students.assign-course');
    Route::get('students/{student}/available-courses', [\App\Http\Controllers\Admin\StudentController::class, 'availableCourses'])->name('students.available-courses');
    Route::get('students/{student}/enrollments', [\App\Http\Controllers\Admin\StudentController::class, 'enrollments'])->name('students.enrollments');

    Route::get('/branding', [BrandingController::class, 'index'])->name('branding.index');
    Route::put('/branding/{brand}', [BrandingController::class, 'update'])->name('branding.update');

    Route::resource('roles', RoleController::class);

    Route::get('/activity-logs', [ActivityLogController::class, 'index'])->name('activity_logs.index');
    Route::get('/activity-logs/{activityLog}', [ActivityLogController::class, 'show'])->name('activity_logs.show');

    Route::get('/profile', [App\Http\Controllers\Admin\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [App\Http\Controllers\Admin\ProfileController::class, 'update'])->name('profile.update');

    Route::get('/business/branding', [App\Http\Controllers\Admin\BusinessSettingController::class, 'index'])->name('business.branding');
    Route::post('/business/branding', [App\Http\Controllers\Admin\BusinessSettingController::class, 'update'])->name('business.update');

    Route::get('/business/legal', [App\Http\Controllers\Admin\LegalController::class, 'index'])->name('legal.index');
    Route::post('/business/legal', [App\Http\Controllers\Admin\LegalController::class, 'update'])->name('legal.update');

    Route::get('/business/settings', [App\Http\Controllers\Admin\BusinessLogicController::class, 'index'])->name('business.settings.index');
    Route::post('/business/settings', [App\Http\Controllers\Admin\BusinessLogicController::class, 'update'])->name('business.settings.update');

    // Branding Settings (Landing Page)
    Route::get('/business/branding-settings', [App\Http\Controllers\Admin\BrandingSettingController::class, 'index'])->name('business.branding-settings.index');
    Route::post('/business/branding-settings', [App\Http\Controllers\Admin\BrandingSettingController::class, 'update'])->name('business.branding-settings.update');

    // Notifications
    Route::get('/notifications', [App\Http\Controllers\Admin\NotificationController::class, 'index'])->name('notifications.index');
    Route::get('/notifications/recent', [App\Http\Controllers\Admin\NotificationController::class, 'recent'])->name('notifications.recent');
    Route::post('/notifications/{id}/read', [App\Http\Controllers\Admin\NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [App\Http\Controllers\Admin\NotificationController::class, 'markAllAsRead'])->name('notifications.read_all');
    Route::delete('/notifications/{id}', [App\Http\Controllers\Admin\NotificationController::class, 'destroy'])->name('notifications.destroy');

    // LMS
    Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class);
    Route::resource('courses', \App\Http\Controllers\Admin\CourseController::class);
    Route::post('courses/{course}/clone', [\App\Http\Controllers\Admin\CourseController::class, 'clone'])->name('courses.clone');
    Route::resource('coupons', \App\Http\Controllers\Admin\CouponController::class);
    Route::resource('webhooks', \App\Http\Controllers\Admin\WebhookController::class);
    Route::resource('course-performance', \App\Http\Controllers\Admin\CoursePerformanceController::class)->only(['index', 'show']);

    // Enrollments
    Route::get('enrollments', [App\Http\Controllers\Admin\EnrollmentController::class, 'index'])->name('enrollments.index');
    Route::patch('enrollments/{enrollment}/status', [App\Http\Controllers\Admin\EnrollmentController::class, 'updateStatus'])->name('enrollments.status');
    Route::delete('enrollments/{enrollment}', [App\Http\Controllers\Admin\EnrollmentController::class, 'destroy'])->name('enrollments.destroy');

    // Reviews
    Route::get('reviews', [App\Http\Controllers\Admin\ReviewController::class, 'index'])->name('reviews.index');
    Route::patch('reviews/{review}/status', [App\Http\Controllers\Admin\ReviewController::class, 'updateStatus'])->name('reviews.status');
    Route::delete('reviews/{review}', [App\Http\Controllers\Admin\ReviewController::class, 'destroy'])->name('reviews.destroy');

    // Live Classes
    Route::resource('live-classes', \App\Http\Controllers\Admin\LiveClassController::class);

    // Curriculum Builder
    Route::get('courses/{course}/curriculum', [App\Http\Controllers\Admin\CurriculumController::class, 'edit'])->name('courses.curriculum');
    Route::post('courses/{course}/sections', [App\Http\Controllers\Admin\CurriculumController::class, 'storeSection'])->name('courses.sections.store');
    Route::put('sections/{section}', [App\Http\Controllers\Admin\CurriculumController::class, 'updateSection'])->name('sections.update');
    Route::delete('sections/{section}', [App\Http\Controllers\Admin\CurriculumController::class, 'destroySection'])->name('sections.destroy');
    Route::post('sections/{section}/lessons', [App\Http\Controllers\Admin\CurriculumController::class, 'storeLesson'])->name('sections.lessons.store');
    Route::put('lessons/{lesson}', [App\Http\Controllers\Admin\CurriculumController::class, 'updateLesson'])->name('lessons.update');
    Route::delete('lessons/{lesson}', [App\Http\Controllers\Admin\CurriculumController::class, 'destroyLesson'])->name('lessons.destroy');

    // Certificates
    Route::get('certificates', [App\Http\Controllers\Admin\CertificateController::class, 'index'])->name('certificates.index');
    Route::get('certificates/{certificate}/download', [App\Http\Controllers\Admin\CertificateController::class, 'download'])->name('certificates.download');

    // Certificate Templates
    Route::get('certificate-template', [App\Http\Controllers\Admin\CertificateTemplateController::class, 'index'])->name('certificate-template.index');
    Route::post('certificate-template', [App\Http\Controllers\Admin\CertificateTemplateController::class, 'update'])->name('certificate-template.update');
    // Assignments (Course-first structure)
    Route::get('assignments', [App\Http\Controllers\Admin\AssignmentController::class, 'index'])->name('assignments.index');
    Route::get('assignments/course/{course}', [App\Http\Controllers\Admin\AssignmentController::class, 'show'])->name('assignments.show');
    Route::get('assignments/review/{assignment}', [App\Http\Controllers\Admin\AssignmentController::class, 'review'])->name('assignments.review');
    Route::put('assignments/{assignment}', [App\Http\Controllers\Admin\AssignmentController::class, 'update'])->name('assignments.update');

    // Orders
    Route::get('orders', [App\Http\Controllers\Admin\OrderController::class, 'index'])->name('orders.index');
    Route::get('orders/{order}', [App\Http\Controllers\Admin\OrderController::class, 'show'])->name('orders.show');
    Route::get('orders/{order}/invoice', [App\Http\Controllers\Admin\InvoiceController::class, 'download'])->name('orders.invoice');
    Route::post('orders/{order}/refund', [App\Http\Controllers\Admin\RefundController::class, 'store'])->name('orders.refund');

    // Payment Settings
    Route::get('payment-settings', [App\Http\Controllers\Admin\PaymentSettingController::class, 'index'])->name('payment-settings.index');
    Route::post('payment-settings', [App\Http\Controllers\Admin\PaymentSettingController::class, 'update'])->name('payment-settings.update');

    // Announcements
    Route::get('announcements/students/{course}', [\App\Http\Controllers\Admin\AnnouncementController::class, 'getStudentsByCourse'])->name('announcements.students');
    Route::resource('announcements', \App\Http\Controllers\Admin\AnnouncementController::class);

    // Tax Settings
    Route::get('tax-settings', [App\Http\Controllers\Admin\TaxSettingController::class, 'index'])->name('tax-settings.index');
    Route::post('tax-settings', [App\Http\Controllers\Admin\TaxSettingController::class, 'store'])->name('tax-settings.store');
    Route::put('tax-settings/{taxSetting}', [App\Http\Controllers\Admin\TaxSettingController::class, 'update'])->name('tax-settings.update');
    Route::delete('tax-settings/{taxSetting}', [App\Http\Controllers\Admin\TaxSettingController::class, 'destroy'])->name('tax-settings.destroy');

    // Tutorials
    Route::resource('tutorials', \App\Http\Controllers\Admin\TutorialController::class);
    Route::post('tutorials/import-khan-academy', [\App\Http\Controllers\Admin\TutorialController::class, 'importKhanAcademy'])->name('tutorials.import-khan-academy');

    // Co-Instructors (Multi-Instructor)
    Route::get('co-instructors', [\App\Http\Controllers\Admin\CoInstructorController::class, 'index'])->name('co-instructors.index');
    Route::get('co-instructors/{course}', [\App\Http\Controllers\Admin\CoInstructorController::class, 'show'])->name('co-instructors.show');
    Route::post('co-instructors/{course}/attach', [\App\Http\Controllers\Admin\CoInstructorController::class, 'attach'])->name('co-instructors.attach');
    Route::delete('co-instructors/{course}/{instructor}', [\App\Http\Controllers\Admin\CoInstructorController::class, 'detach'])->name('co-instructors.detach');
});
