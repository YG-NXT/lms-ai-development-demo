<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of orders for the student.
     */
    public function index(): Response
    {
        $orders = Order::where('user_id', Auth::id())
            ->with(['course.category', 'course.certificates' => function ($query) {
                $query->where('user_id', Auth::id());
            }])
            ->latest()
            ->paginate(10);

        return Inertia::render('Student/Order/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Display the specified order (Invoice/Receipt).
     */
    public function show(Order $order): Response
    {
        // Ensure student owns the order
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Student/Order/Show', [
            'order' => $order->load(['course.category', 'payments', 'user']),
        ]);
    }

    /**
     * Download the invoice for the order.
     */
    public function downloadInvoice(Order $order): \Illuminate\Http\Response
    {
        // Ensure student owns the order
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        $order->load(['user', 'course.category', 'payments']);

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('admin.lms.order.invoice', [
            'order' => $order,
        ]);

        return $pdf->download("invoice-{$order->order_number}.pdf");
    }
}
