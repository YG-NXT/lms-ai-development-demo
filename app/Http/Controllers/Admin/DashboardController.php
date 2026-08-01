<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalStudents = \App\Models\User::where('type', \App\Enums\UserType::CUSTOMER)->count();
        $totalCourses = \App\Models\Course::count();
        $totalEnrollments = \App\Models\Enrollment::count();

        // Total revenue from completed orders
        $totalRevenue = \App\Models\Order::where('status', \App\Enums\OrderStatus::COMPLETED)->sum('total_amount');

        // Recent orders with customer and course info
        $recentOrders = \App\Models\Order::with(['user', 'course'])
            ->latest()
            ->limit(5)
            ->get();

        // Top 5 courses by enrollment count
        $topCourses = \App\Models\Course::withCount('enrollments')
            ->orderBy('enrollments_count', 'desc')
            ->limit(5)
            ->get();

        // Latest 5 registered students
        $recentStudents = \App\Models\User::where('type', \App\Enums\UserType::CUSTOMER)
            ->latest()
            ->limit(5)
            ->get();

        // Simple 7-day sales trend (revenue)
        $salesTrend = \App\Models\Order::where('status', \App\Enums\OrderStatus::COMPLETED)
            ->where('created_at', '>=', now()->subDays(6))
            ->selectRaw('DATE(created_at) as date, SUM(total_amount) as total')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('Admin/Pages/Dashboard', [
            'stats' => [
                'total_students' => $totalStudents,
                'total_courses' => $totalCourses,
                'total_revenue' => (float) $totalRevenue,
                'total_enrollments' => $totalEnrollments,
            ],
            'recentOrders' => $recentOrders,
            'topCourses' => $topCourses,
            'recentStudents' => $recentStudents,
            'salesTrend' => $salesTrend,
        ]);
    }
}
