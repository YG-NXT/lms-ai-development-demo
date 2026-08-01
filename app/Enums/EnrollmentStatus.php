<?php

namespace App\Enums;

enum EnrollmentStatus: string
{
    case ACTIVE = 'active';
    case PENDING = 'pending';
    case REJECTED = 'rejected';
    case COMPLETED = 'completed';
    case REFUNDED = 'refunded';
}
