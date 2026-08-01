<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case STRIPE = 'stripe';
    case PAYPAL = 'paypal';
    case LOCAL = 'local';
    case FREE = 'free';
    case BKASH = 'bkash';
}
