<?php

namespace App\Enums;

enum AnnouncementStatus: string
{
    case DRAFT = 'draft';
    case BROADCAST = 'broadcast';
    case SCHEDULED = 'scheduled';
}
