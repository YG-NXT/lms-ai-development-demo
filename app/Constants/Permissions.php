<?php

namespace App\Constants;

class Permissions
{
    // Section: System
    public const SECTION_SYSTEM = 'system_section';

    public const DASHBOARD_VIEW = 'dashboard_view';

    public const ACTIVITY_LOG = 'activity_log';

    // Section: Account
    public const SECTION_ACCOUNT = 'account_section';

    public const MEMBER_DIRECTORY = 'member_directory';

    public const ACCESS_ROLES = 'access_roles';

    // Section: Business
    public const SECTION_BUSINESS = 'business_settings';

    public const BUSINESS_BRANDING = 'business_branding';

    public const LEGAL_MANAGEMENT = 'legal_management';

    public const BUSINESS_LOGIC = 'business_logic';

    public const PAYMENT_SETTINGS = 'payment_settings';

    public const BRANDING_SETTINGS = 'branding_settings';

    // Section: LMS
    public const SECTION_LMS = 'lms_section';

    public const COURSE_MANAGEMENT = 'course_management';

    public const CATEGORY_MANAGEMENT = 'category_management';

    public const ENROLLMENT_MANAGEMENT = 'enrollment_management';

    public const LIVE_CLASS_MANAGEMENT = 'live_class_management';

    public const REVIEW_MODERATION = 'review_moderation';

    public const CERTIFICATE_MANAGEMENT = 'certificate_management';

    public const CERTIFICATE_TEMPLATE_MANAGEMENT = 'certificate_template_management';

    public const TUTORIAL_MANAGEMENT = 'tutorial_management';

    public const MULTI_INSTRUCTOR_MANAGEMENT = 'multi_instructor_management';

    public const ASSIGNMENT_MANAGEMENT = 'assignment_management';

    public const ORDER_MANAGEMENT = 'order_management';

    public const ANNOUNCEMENT_MANAGEMENT = 'announcement_management';

    public static function getAll(): array
    {
        return [
            self::SECTION_SYSTEM => [
                'label' => 'System',
                'icon' => 'LayoutDashboard',
                'sub_modules' => [
                    self::DASHBOARD_VIEW => [
                        'label' => 'Dashboard',
                        'description' => 'View system health and metrics',
                        'route' => 'admin.dashboard',
                        'icon' => 'Activity',
                    ],
                    self::ACTIVITY_LOG => [
                        'label' => 'Activity Logs',
                        'description' => 'View system activity logs and audit trail',
                        'route' => 'admin.activity_logs.index',
                        'icon' => 'History',
                    ],
                ],
            ],
            self::SECTION_LMS => [
                'label' => 'Learning Management',
                'icon' => 'Grid',
                'sub_modules' => [
                    self::COURSE_MANAGEMENT => [
                        'label' => 'Courses',
                        'description' => 'Create and manage online courses',
                        'route' => 'admin.courses.index',
                        'icon' => 'BookOpen',
                    ],
                    self::CATEGORY_MANAGEMENT => [
                        'label' => 'Categories',
                        'description' => 'Organize courses into categories',
                        'route' => 'admin.categories.index',
                        'icon' => 'Tag',
                    ],
                    self::ENROLLMENT_MANAGEMENT => [
                        'label' => 'Enrollments',
                        'description' => 'Manage student enrollments and progress',
                        'route' => 'admin.enrollments.index',
                        'icon' => 'ClipboardList',
                    ],
                    self::LIVE_CLASS_MANAGEMENT => [
                        'label' => 'Live Class',
                        'description' => 'Schedule and manage live sessions',
                        'route' => 'admin.live-classes.index',
                        'icon' => 'MonitorPlay',
                    ],
                    self::REVIEW_MODERATION => [
                        'label' => 'Reviews',
                        'description' => 'Moderate course reviews and ratings',
                        'route' => 'admin.reviews.index',
                        'icon' => 'MessageSquare',
                    ],
                    self::CERTIFICATE_MANAGEMENT => [
                        'label' => 'Certificates',
                        'description' => 'Design and issue course certificates',
                        'route' => 'admin.certificates.index',
                        'icon' => 'FileBadge',
                    ],
                    self::CERTIFICATE_TEMPLATE_MANAGEMENT => [
                        'label' => 'Certificate Templates',
                        'description' => 'Design and manage certificate templates',
                        'route' => 'admin.certificate-template.index',
                        'icon' => 'Palette',
                    ],
                    self::TUTORIAL_MANAGEMENT => [
                        'label' => 'Tutorials',
                        'description' => 'Create and manage video tutorials',
                        'route' => 'admin.tutorials.index',
                        'icon' => 'MonitorPlay',
                    ],
                    self::MULTI_INSTRUCTOR_MANAGEMENT => [
                        'label' => 'Co-Instructors',
                        'description' => 'Manage additional instructors for courses',
                        'route' => 'admin.co-instructors.index',
                        'icon' => 'Users',
                    ],
                    'student_performance' => [
                        'label' => 'Student Performance',
                        'description' => 'View course-wise student academic summary',
                        'route' => 'admin.course-performance.index',
                        'icon' => 'BarChart2',
                    ],
                    self::ASSIGNMENT_MANAGEMENT => [
                        'label' => 'Assignments',
                        'description' => 'Review and grade student assignments',
                        'route' => 'admin.assignments.index',
                        'icon' => 'ClipboardList',
                        'url' => '/admin/assignments',
                    ],
                    self::ORDER_MANAGEMENT => [
                        'label' => 'Orders',
                        'description' => 'Manage system transactions and enrollments',
                        'route' => 'admin.orders.index',
                        'icon' => 'Package',
                    ],
                    self::ANNOUNCEMENT_MANAGEMENT => [
                        'label' => 'Announcements',
                        'description' => 'Broadcast messages to all or targeted students',
                        'route' => 'admin.announcements.index',
                        'icon' => 'Megaphone',
                    ],
                ],
            ],
            self::SECTION_ACCOUNT => [
                'label' => 'Account',
                'icon' => 'UserCircle',
                'sub_modules' => [
                    self::MEMBER_DIRECTORY => [
                        'label' => 'Admin Users',
                        'description' => 'Manage member identities and access levels',
                        'route' => 'admin.users.index',
                        'icon' => 'UserCog',
                    ],
                    'student_management' => [
                        'label' => 'Students',
                        'description' => 'Manage students and their enrollments',
                        'route' => 'admin.students.index',
                        'icon' => 'GraduationCap',
                    ],
                    self::ACCESS_ROLES => [
                        'label' => 'Access Roles',
                        'description' => 'Configure roles and security boundaries',
                        'route' => 'admin.roles.index',
                        'icon' => 'ShieldCheck',
                    ],
                ],
            ],
            self::SECTION_BUSINESS => [
                'label' => 'Business Settings',
                'icon' => 'Briefcase',
                'sub_modules' => [
                    self::BUSINESS_BRANDING => [
                        'label' => 'Branding',
                        'description' => 'Manage organization visual identity',
                        'route' => 'admin.business.branding', // Check route name
                        'icon' => 'Palette',
                    ],
                    self::LEGAL_MANAGEMENT => [
                        'label' => 'Legal Management',
                        'description' => 'Manage legal documents (Privacy, Terms, etc.)',
                        'route' => 'admin.legal.index',
                        'icon' => 'Scale',
                    ],
                    self::BUSINESS_LOGIC => [
                        'label' => 'Business Settings',
                        'description' => 'Manage business settings (Currency, Timezone, Country)',
                        'route' => 'admin.business.settings.index',
                        'icon' => 'Settings',
                    ],
                    self::PAYMENT_SETTINGS => [
                        'label' => 'Payment Settings',
                        'description' => 'Toggle and configure payment gateways',
                        'route' => 'admin.payment-settings.index',
                        'icon' => 'Landmark',
                    ],
                    self::BRANDING_SETTINGS => [
                        'label' => 'Landing Page',
                        'description' => 'Customize landing page branding and content',
                        'route' => 'admin.business.branding-settings.index',
                        'icon' => 'Sparkles',
                        'url' => '/admin/business/branding-settings',
                    ],
                ],
            ],
        ];
    }
}
