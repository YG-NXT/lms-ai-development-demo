<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Response;

class InvoiceController extends Controller
{
    /**
     * Download the invoice for the specified order.
     */
    public function download(Order $order): Response
    {
        $order->load(['user', 'course.category', 'payments']);

        $pdf = Pdf::loadView('admin.lms.order.invoice', [
            'order' => $order,
        ]);

        return $pdf->download("invoice-{$order->order_number}.pdf");
    }
}
