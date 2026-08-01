<?php

namespace App\Http\Controllers\Student;

use App\Enums\EnrollmentStatus;
use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use App\Services\BusinessSettingService;
use App\Services\NotificationService;
use App\Services\Payments\PaymentManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function __construct(
        protected PaymentManager $paymentManager,
        protected BusinessSettingService $settingService,
        protected NotificationService $notificationService
    ) {}

    /**
     * Display the checkout page.
     */
    public function show(Course $course): Response
    {
        $settings = $this->settingService->getSettings([
            'stripe_enabled', 'paypal_enabled', 'bkash_enabled',
        ]);

        $availableMethods = [];

        if (($settings['stripe_enabled'] ?? '0') == '1') {
            $availableMethods[] = ['id' => 'stripe', 'name' => 'Stripe', 'icon' => 'CreditCard'];
        }
        if (($settings['paypal_enabled'] ?? '0') == '1') {
            $availableMethods[] = ['id' => 'paypal', 'name' => 'PayPal', 'icon' => 'Wallet'];
        }
        if (($settings['bkash_enabled'] ?? '0') == '1') {
            $availableMethods[] = ['id' => 'bkash', 'name' => 'bKash', 'icon' => 'Smartphone'];
        }

        // Always allow local/bank for now, or make it configurable too
        $availableMethods[] = ['id' => 'local', 'name' => 'Local / Bank Transfer', 'icon' => 'Landmark'];

        return Inertia::render('Student/Checkout/Show', [
            'course' => $course->load('category')->append(['effective_price', 'discount_amount']),
            'methods' => $availableMethods,
        ]);
    }

    /**
     * Start the payment process by creating an order.
     */
    public function store(Request $request, Course $course)
    {
        $request->validate([
            'payment_method' => 'required|string|in:stripe,paypal,bkash,local',
        ]);

        // Verify if the selected method is enabled
        if ($request->payment_method !== 'local') {
            $enabled = $this->settingService->getSettings([$request->payment_method.'_enabled'])
                ->get($request->payment_method.'_enabled');

            if ($enabled != '1') {
                return back()->with('error', 'The selected payment method is currently disabled.');
            }
        }

        $user = Auth::user();

        // Check if already enrolled
        if ($user->enrollments()->where('course_id', $course->id)->where('status', EnrollmentStatus::ACTIVE)->exists()) {
            return back()->with('error', 'You are already enrolled in this course.');
        }

        // Create Order
        $order = Order::create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'order_number' => 'ORD-'.strtoupper(Str::random(10)),
            'amount' => $course->price,
            'discount_amount' => $course->discount_amount,
            'total_amount' => $course->effective_price,
            'status' => OrderStatus::PENDING,
            'payment_method' => $request->payment_method,
        ]);

        // Notify all admins about new order
        $this->notifyAdminsAboutOrder($order, $course, $user);

        // Initiate Payment
        $provider = $this->paymentManager->driver($request->payment_method);
        $redirectUrl = $provider->pay($order);

        return Inertia::location($redirectUrl);
    }

    /**
     * Handle payment callback.
     */
    public function callback(Request $request)
    {
        $orderId = $request->order_id;
        $order = Order::findOrFail($orderId);

        // Idempotency: Check if order is already completed
        if ($order->status === OrderStatus::COMPLETED) {
            return redirect()->route('student.courses.show', $order->course->slug)
                ->with('info', 'You already have access to this course.');
        }

        $provider = $this->paymentManager->driver($order->payment_method->value);

        if ($provider->verify($request)) {
            $paymentData = $provider->handleCallback($request);
            $isPending = ($paymentData['paypal_status'] ?? '') === 'PENDING' || ($paymentData['status'] ?? '') === 'pending';

            // Record payment only if not already recorded
            $exists = $order->payments()
                ->where('transaction_id', $paymentData['transaction_id'] ?? null)
                ->exists();

            if (! $exists) {
                Payment::create([
                    'order_id' => $order->id,
                    'transaction_id' => $paymentData['transaction_id'] ?? null,
                    'amount' => $order->total_amount,
                    'status' => $isPending ? PaymentStatus::PENDING : PaymentStatus::COMPLETED,
                    'payment_method' => $order->payment_method,
                    'gateway_response' => $paymentData,
                ]);
            }

            if ($order->payment_method->value === 'local' || $isPending) {
                // Update Order to stay pending if payment is pending
                if ($order->payment_method->value === 'local') {
                    $order->update(['status' => OrderStatus::PENDING]);
                } elseif ($isPending) {
                    $order->update(['status' => OrderStatus::PENDING]);
                }

                // For local/bank transfer or pending online payments, we keep access PENDING
                Enrollment::updateOrCreate(
                    ['user_id' => $order->user_id, 'course_id' => $order->course_id],
                    [
                        'order_id' => $order->id,
                        'status' => EnrollmentStatus::PENDING,
                        'enrolled_at' => now(),
                    ]
                );

                $msg = $isPending
                    ? 'Payment is pending (Review). Your access will be active once cleared.'
                    : 'Purchase request submitted! Your access is pending admin approval.';

                return redirect()->route('student.courses.show', $order->course->slug)
                    ->with('success', $msg);
            }

            // Update Order
            $order->update(['status' => OrderStatus::COMPLETED]);

            // Auto-enroll user for online payments that are COMPLETED
            Enrollment::updateOrCreate(
                ['user_id' => $order->user_id, 'course_id' => $order->course_id],
                [
                    'order_id' => $order->id,
                    'status' => EnrollmentStatus::ACTIVE,
                    'enrolled_at' => now(),
                ]
            );

            return redirect()->route('student.courses.show', $order->course->slug)
                ->with('success', 'Payment successful and course enrolled!');
        }

        // Handle failure
        $order->update(['status' => OrderStatus::CANCELLED]);

        return redirect()->route('courses.show', $order->course->slug)
            ->with('error', 'Payment failed. Please try again.');
    }

    /**
     * Validate a coupon code and return discount details.
     */
    public function validateCoupon(Request $request, Course $course): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $coupon = Coupon::where('code', strtoupper($request->code))
            ->where('is_active', true)
            ->first();

        if (! $coupon) {
            return response()->json([
                'valid' => false,
                'message' => __('Invalid coupon code.'),
            ]);
        }

        // Check date validity
        if ($coupon->valid_from && now()->lt($coupon->valid_from)) {
            return response()->json([
                'valid' => false,
                'message' => __('This coupon is not yet valid.'),
            ]);
        }

        if ($coupon->valid_until && now()->gt($coupon->valid_until)) {
            return response()->json([
                'valid' => false,
                'message' => __('This coupon has expired.'),
            ]);
        }

        // Check max uses
        if ($coupon->max_uses && $coupon->used_count >= $coupon->max_uses) {
            return response()->json([
                'valid' => false,
                'message' => __('This coupon has reached its maximum usage limit.'),
            ]);
        }

        // Calculate discount
        $price = $course->effective_price;
        $discount = 0;

        if ($coupon->type === 'percentage') {
            $discount = $price * ($coupon->value / 100);
            if ($coupon->max_discount && $discount > $coupon->max_discount) {
                $discount = $coupon->max_discount;
            }
        } elseif ($coupon->type === 'fixed') {
            $discount = $coupon->value;
            if ($discount > $price) {
                $discount = $price;
            }
        }

        $discount = round($discount, 2);
        $total = max(0, $price - $discount);

        return response()->json([
            'valid' => true,
            'coupon' => [
                'code' => $coupon->code,
                'type' => $coupon->type,
                'value' => $coupon->value,
                'discount' => $discount,
                'total' => $total,
            ],
            'message' => __('Coupon applied successfully!'),
        ]);
    }

    /**
     * Notify all admins about new order.
     */
    protected function notifyAdminsAboutOrder(Order $order, Course $course, User $student): void
    {
        // Get all admin and super admin users
        $adminUsers = User::whereIn('type', [UserType::ADMIN, UserType::SUPER_ADMIN])->get();

        foreach ($adminUsers as $admin) {
            $this->notificationService->info(
                $admin->id,
                'New Order',
                "<strong>{$student->name}</strong> placed an order for <em>{$course->title}</em> (Order: {$order->order_number}, Amount: \${$order->total_amount})",
                null,
                route('admin.orders.show', $order->id)
            );
        }
    }
}
