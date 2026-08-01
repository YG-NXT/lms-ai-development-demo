<?php

namespace App\Enums;

enum LessonType: string
{
    case VIDEO = 'VIDEO';
    case TEXT = 'TEXT';
    case FILE = 'FILE';
    case QUIZ = 'QUIZ';
    case LIVE = 'LIVE';
    case ASSIGNMENT = 'ASSIGNMENT';
    case PROGRAMMING = 'PROGRAMMING';
}
