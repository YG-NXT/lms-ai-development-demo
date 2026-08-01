<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice #{{ $order->order_number }}</title>
    <style>
        body { font-family: 'Helvetica', sans-serif; color: #333; line-height: 1.5; margin: 0; padding: 0.5in; }
        .header { border-bottom: 2px solid #6366f1; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #6366f1; margin: 0; font-size: 28px; }
        .info-grid { width: 100%; margin-bottom: 30px; }
        .info-col { vertical-align: top; width: 50%; }
        .section-title { font-size: 10px; font-weight: bold; text-transform: uppercase; color: #94a3b8; margin-bottom: 5px; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .table th { background: #f8fafc; text-align: left; padding: 12px; font-size: 12px; border-bottom: 1px solid #e2e8f0; }
        .table td { padding: 12px; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
        .totals { float: right; width: 250px; }
        .total-row { padding: 5px 0; }
        .total-label { font-size: 14px; color: #64748b; }
        .total-value { font-size: 14px; font-weight: bold; text-align: right; }
        .grand-total { border-top: 1px solid #e2e8f0; margin-top: 10px; padding-top: 10px; }
        .grand-total .total-label { font-weight: bold; color: #334155; }
        .grand-total .total-value { font-size: 20px; color: #6366f1; }
        .footer { position: fixed; bottom: 0; font-size: 10px; color: #94a3b8; width: 100%; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <table style="width: 100%;">
            <tr>
                <td><h1>INVOICE</h1></td>
                <td style="text-align: right; color: #64748b;">
                    #{{ $order->order_number }}<br>
                    Issued on: {{ $order->created_at->format('M d, Y') }}
                </td>
            </tr>
        </table>
    </div>

    <table class="info-grid">
        <tr>
            <td class="info-col">
                <div class="section-title">Billed To</div>
                <div style="font-weight: bold; font-size: 16px;">{{ $order->user->name }}</div>
                <div style="font-size: 13px; color: #64748b;">{{ $order->user->email }}</div>
            </td>
            <td class="info-col" style="text-align: right;">
                <div class="section-title">Payment Method</div>
                <div style="font-weight: bold;">{{ strtoupper($order->payment_method->value) }}</div>
                <div style="font-size: 13px; color: #64748b;">Status: {{ strtoupper($order->status->value) }}</div>
            </td>
        </tr>
    </table>

    <table class="table">
        <thead>
            <tr>
                <th>Course Description</th>
                <th style="text-align: right; width: 100px;">Price</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ $order->course->title }}<br><small style="color: #94a3b8;">{{ $order->course->category->name }}</small></td>
                <td style="text-align: right;">${{ number_format($order->amount, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <div class="totals">
        <table style="width: 100%;">
            <tr class="total-row">
                <td class="total-label">Subtotal</td>
                <td class="total-value">${{ number_format($order->amount, 2) }}</td>
            </tr>
            <tr class="total-row">
                <td class="total-label">Discount</td>
                <td class="total-value">-$0.00</td>
            </tr>
            <tr class="total-row grand-total">
                <td class="total-label">Total Amount</td>
                <td class="total-value">${{ number_format($order->total_amount, 2) }}</td>
            </tr>
        </table>
    </div>

    <div class="footer">
        Thank you for choosing {{ config('app.name') }}. This is a computer-generated invoice.
    </div>
</body>
</html>
