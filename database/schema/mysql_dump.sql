-- MySQL dump for BimStudies LMS
-- Generated from SQLite schema (63 tables)
--
-- Import instructions:
-- 1. Create MySQL database (e.g. bimstudi_lms)
-- 2. Import this SQL file via phpMyAdmin or mysql client
-- 3. Set APP_INSTALLED=true in .env

SET FOREIGN_KEY_CHECKS=0;

-- Drop tables in reverse order
DROP TABLE IF EXISTS `webhooks`;
DROP TABLE IF EXISTS `webhook_deliveries`;
DROP TABLE IF EXISTS `waitlists`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `user_roles`;
DROP TABLE IF EXISTS `user_achievements`;
DROP TABLE IF EXISTS `tutorials`;
DROP TABLE IF EXISTS `tutorial_sections`;
DROP TABLE IF EXISTS `tutorial_lessons`;
DROP TABLE IF EXISTS `tutorial_enrollments`;
DROP TABLE IF EXISTS `tax_settings`;
DROP TABLE IF EXISTS `subscription_plans`;
DROP TABLE IF EXISTS `sessions`;
DROP TABLE IF EXISTS `roles`;
DROP TABLE IF EXISTS `role_permissions`;
DROP TABLE IF EXISTS `reviews`;
DROP TABLE IF EXISTS `refunds`;
DROP TABLE IF EXISTS `referrals`;
DROP TABLE IF EXISTS `permissions`;
DROP TABLE IF EXISTS `payments`;
DROP TABLE IF EXISTS `password_reset_tokens`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `offline_downloads`;
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `live_classes`;
DROP TABLE IF EXISTS `live_class_attendances`;
DROP TABLE IF EXISTS `lessons`;
DROP TABLE IF EXISTS `lesson_completions`;
DROP TABLE IF EXISTS `learning_reminders`;
DROP TABLE IF EXISTS `learning_paths`;
DROP TABLE IF EXISTS `learning_path_courses`;
DROP TABLE IF EXISTS `jobs`;
DROP TABLE IF EXISTS `job_batches`;
DROP TABLE IF EXISTS `installations`;
DROP TABLE IF EXISTS `failed_jobs`;
DROP TABLE IF EXISTS `enrollments`;
DROP TABLE IF EXISTS `customer_profiles`;
DROP TABLE IF EXISTS `courses`;
DROP TABLE IF EXISTS `course_transcripts`;
DROP TABLE IF EXISTS `course_sections`;
DROP TABLE IF EXISTS `course_prerequisites`;
DROP TABLE IF EXISTS `course_instructors`;
DROP TABLE IF EXISTS `course_bundles`;
DROP TABLE IF EXISTS `course_bundle_courses`;
DROP TABLE IF EXISTS `course_bookmarks`;
DROP TABLE IF EXISTS `coupons`;
DROP TABLE IF EXISTS `coding_exercises`;
DROP TABLE IF EXISTS `certificates`;
DROP TABLE IF EXISTS `certificate_templates`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `cache_locks`;
DROP TABLE IF EXISTS `cache`;
DROP TABLE IF EXISTS `business_settings`;
DROP TABLE IF EXISTS `brands`;
DROP TABLE IF EXISTS `badges`;
DROP TABLE IF EXISTS `announcements`;
DROP TABLE IF EXISTS `announcement_user`;
DROP TABLE IF EXISTS `ai_tutor_messages`;
DROP TABLE IF EXISTS `admin_profiles`;
DROP TABLE IF EXISTS `ad_zones`;
DROP TABLE IF EXISTS `ad_settings`;
DROP TABLE IF EXISTS `ad_impressions`;
DROP TABLE IF EXISTS `activity_logs`;
DROP TABLE IF EXISTS `migrations`;

-- Create tables

--
-- Table structure for `migrations`
--
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `migration` varchar(255) NOT NULL, `batch` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `activity_logs`
--
DROP TABLE IF EXISTS `activity_logs`;
CREATE TABLE `activity_logs` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `user_id` bigint UNSIGNED NULL, `subject_type` varchar(255) NULL, `subject_id` bigint UNSIGNED NULL, `event` varchar(255) NOT NULL, `description` text NOT NULL, `properties` text NULL, `ip_address` varchar(45) NULL, `user_agent` varchar(255) NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `activity_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `ad_impressions`
--
DROP TABLE IF EXISTS `ad_impressions`;
CREATE TABLE `ad_impressions` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `ad_zone_id` bigint UNSIGNED NOT NULL, `user_id` bigint UNSIGNED NULL, `session_id` varchar(255) NULL, `page_url` varchar(255) NOT NULL, `ip_address` varchar(45) NULL, `type` varchar(255) NOT NULL DEFAULT 'impression', `revenue` decimal(10,2) NOT NULL DEFAULT '0', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `ad_impressions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL, CONSTRAINT `ad_impressions_ad_zone_id_foreign` FOREIGN KEY (`ad_zone_id`) REFERENCES `ad_zones` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `ad_settings`
--
DROP TABLE IF EXISTS `ad_settings`;
CREATE TABLE `ad_settings` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `key` varchar(255) NOT NULL, `value` text NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `ad_zones`
--
DROP TABLE IF EXISTS `ad_zones`;
CREATE TABLE `ad_zones` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `zone_id` varchar(255) NOT NULL, `position` varchar(255) NOT NULL, `page_type` varchar(255) NOT NULL DEFAULT 'all', `ad_type` varchar(255) NOT NULL DEFAULT 'banner', `width` bigint UNSIGNED NULL, `height` bigint UNSIGNED NULL, `is_active` tinyint UNSIGNED NOT NULL DEFAULT '1', `priority` bigint UNSIGNED NOT NULL DEFAULT '0', `custom_code` text NULL, `targeting_rules` text NULL, `created_at` datetime NULL, `updated_at` datetime NULL, `deleted_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `admin_profiles`
--
DROP TABLE IF EXISTS `admin_profiles`;
CREATE TABLE `admin_profiles` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `user_id` bigint UNSIGNED NOT NULL, `employee_id` varchar(255) NULL, `department` varchar(255) NULL, `designation` varchar(255) NULL, `phone` varchar(255) NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `admin_profiles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `ai_tutor_messages`
--
DROP TABLE IF EXISTS `ai_tutor_messages`;
CREATE TABLE `ai_tutor_messages` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `user_id` bigint UNSIGNED NOT NULL, `course_id` bigint UNSIGNED NOT NULL, `message` text NOT NULL, `response` text NULL, `responded_at` datetime NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `ai_tutor_messages_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE, CONSTRAINT `ai_tutor_messages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `announcement_user`
--
DROP TABLE IF EXISTS `announcement_user`;
CREATE TABLE `announcement_user` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `announcement_id` bigint UNSIGNED NOT NULL, `user_id` bigint UNSIGNED NOT NULL, `viewed_at` datetime NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `announcement_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE, CONSTRAINT `announcement_user_announcement_id_foreign` FOREIGN KEY (`announcement_id`) REFERENCES `announcements` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `announcements`
--
DROP TABLE IF EXISTS `announcements`;
CREATE TABLE `announcements` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `content` text NOT NULL, `scope` varchar(255) NOT NULL DEFAULT 'global', `course_id` bigint UNSIGNED NULL, `status` varchar(255) NOT NULL DEFAULT 'draft', `scheduled_at` datetime NULL, `published_at` datetime NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `announcements_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `badges`
--
DROP TABLE IF EXISTS `badges`;
CREATE TABLE `badges` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `description` varchar(255) NULL, `icon` varchar(255) NULL, `color` varchar(255) NOT NULL DEFAULT '#6366f1', `xp_required` bigint UNSIGNED NOT NULL DEFAULT '0', `is_hidden` tinyint UNSIGNED NOT NULL DEFAULT '0', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `brands`
--
DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `logo` varchar(255) NULL, `settings` text NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `business_settings`
--
DROP TABLE IF EXISTS `business_settings`;
CREATE TABLE `business_settings` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `key` varchar(255) NOT NULL, `value` text NULL, `type` varchar(255) NOT NULL DEFAULT 'string', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `cache`
--
DROP TABLE IF EXISTS `cache`;
CREATE TABLE `cache` (`key` varchar(255) NOT NULL, `value` text NOT NULL, `expiration` bigint UNSIGNED NOT NULL, PRIMARY KEY (`key`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `cache_locks`
--
DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE `cache_locks` (`key` varchar(255) NOT NULL, `owner` varchar(255) NOT NULL, `expiration` bigint UNSIGNED NOT NULL, PRIMARY KEY (`key`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `categories`
--
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `icon` varchar(255) NULL, `description` text NULL, `is_active` tinyint UNSIGNED NOT NULL DEFAULT '1', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `certificate_templates`
--
DROP TABLE IF EXISTS `certificate_templates`;
CREATE TABLE `certificate_templates` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `body_text` text NOT NULL, `instructor_name_label` varchar(255) NULL, `organization_name` varchar(255) NULL, `logo_url` varchar(255) NULL, `background_url` varchar(255) NULL, `signature_url` varchar(255) NULL, `is_active` tinyint UNSIGNED NOT NULL DEFAULT '1', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `certificates`
--
DROP TABLE IF EXISTS `certificates`;
CREATE TABLE `certificates` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `certificate_id` varchar(255) NOT NULL, `user_id` bigint UNSIGNED NOT NULL, `course_id` bigint UNSIGNED NOT NULL, `verification_code` varchar(255) NOT NULL, `issued_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `template_id` bigint UNSIGNED NULL, `file_path` varchar(255) NULL, `status` varchar(255) NOT NULL DEFAULT 'issued', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `certificates_template_id_foreign` FOREIGN KEY (`template_id`) REFERENCES `certificate_templates` (`id`) ON DELETE SET NULL, CONSTRAINT `certificates_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE, CONSTRAINT `certificates_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `coding_exercises`
--
DROP TABLE IF EXISTS `coding_exercises`;
CREATE TABLE `coding_exercises` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `lesson_id` bigint UNSIGNED NOT NULL, `language` varchar(255) NOT NULL, `starter_code` text NULL, `test_cases` text NOT NULL, `constraints` text NULL, `time_limit_seconds` bigint UNSIGNED NOT NULL DEFAULT '10', `memory_limit_mb` bigint UNSIGNED NOT NULL DEFAULT '128', `enable_sandbox` tinyint UNSIGNED NOT NULL DEFAULT '1', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `coding_exercises_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `coupons`
--
DROP TABLE IF EXISTS `coupons`;
CREATE TABLE `coupons` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `code` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, `value` decimal(10,2) NOT NULL DEFAULT '0', `max_discount` decimal(10,2) NULL, `max_uses` bigint UNSIGNED NULL, `used_count` bigint UNSIGNED NOT NULL DEFAULT '0', `is_active` tinyint UNSIGNED NOT NULL DEFAULT '1', `valid_from` date NULL, `valid_until` date NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `course_bookmarks`
--
DROP TABLE IF EXISTS `course_bookmarks`;
CREATE TABLE `course_bookmarks` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `user_id` bigint UNSIGNED NOT NULL, `course_id` bigint UNSIGNED NOT NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `course_bookmarks_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE, CONSTRAINT `course_bookmarks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `course_bundle_courses`
--
DROP TABLE IF EXISTS `course_bundle_courses`;
CREATE TABLE `course_bundle_courses` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `course_bundle_id` bigint UNSIGNED NOT NULL, `course_id` bigint UNSIGNED NOT NULL, `sort_order` bigint UNSIGNED NOT NULL DEFAULT '0', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `course_bundle_courses_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE, CONSTRAINT `course_bundle_courses_course_bundle_id_foreign` FOREIGN KEY (`course_bundle_id`) REFERENCES `course_bundles` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `course_bundles`
--
DROP TABLE IF EXISTS `course_bundles`;
CREATE TABLE `course_bundles` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `description` text NULL, `thumbnail` varchar(255) NULL, `original_price` decimal(10,2) NOT NULL DEFAULT '0', `bundle_price` decimal(10,2) NOT NULL DEFAULT '0', `sort_order` bigint UNSIGNED NOT NULL DEFAULT '0', `is_active` tinyint UNSIGNED NOT NULL DEFAULT '1', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `course_instructors`
--
DROP TABLE IF EXISTS `course_instructors`;
CREATE TABLE `course_instructors` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `course_id` bigint UNSIGNED NOT NULL, `user_id` bigint UNSIGNED NOT NULL, `role` varchar(255) NOT NULL DEFAULT 'instructor', `is_primary` tinyint UNSIGNED NOT NULL DEFAULT '0', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `course_instructors_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE, CONSTRAINT `course_instructors_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `course_prerequisites`
--
DROP TABLE IF EXISTS `course_prerequisites`;
CREATE TABLE `course_prerequisites` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `course_id` bigint UNSIGNED NOT NULL, `prerequisite_course_id` bigint UNSIGNED NOT NULL, `required` tinyint UNSIGNED NOT NULL DEFAULT '1', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `course_prerequisites_prerequisite_course_id_foreign` FOREIGN KEY (`prerequisite_course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE, CONSTRAINT `course_prerequisites_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `course_sections`
--
DROP TABLE IF EXISTS `course_sections`;
CREATE TABLE `course_sections` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `course_id` bigint UNSIGNED NOT NULL, `title` varchar(255) NOT NULL, `order` bigint UNSIGNED NOT NULL DEFAULT '0', `created_at` datetime NULL, `updated_at` datetime NULL, `has_unlock_date` tinyint UNSIGNED NOT NULL DEFAULT '0', `unlock_date` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `course_sections_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `course_transcripts`
--
DROP TABLE IF EXISTS `course_transcripts`;
CREATE TABLE `course_transcripts` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `lesson_id` bigint UNSIGNED NOT NULL, `locale` varchar(255) NOT NULL DEFAULT 'en', `language_name` varchar(255) NOT NULL, `content` text NOT NULL, `format` varchar(255) NOT NULL DEFAULT 'vtt', `file_path` varchar(255) NULL, `word_count` bigint UNSIGNED NOT NULL DEFAULT '0', `is_auto_generated` tinyint UNSIGNED NOT NULL DEFAULT '0', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `course_transcripts_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `courses`
--
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `category_id` bigint UNSIGNED NOT NULL, `user_id` bigint UNSIGNED NOT NULL, `title` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `thumbnail` varchar(255) NULL, `description` text NULL, `level` varchar(255) NOT NULL DEFAULT 'beginner', `language` varchar(255) NOT NULL DEFAULT 'English', `price` decimal(10,2) NOT NULL DEFAULT '0', `discount_price` decimal(10,2) NULL, `is_free` tinyint UNSIGNED NOT NULL DEFAULT '0', `status` varchar(255) NOT NULL DEFAULT 'draft', `meta_title` varchar(255) NULL, `meta_description` text NULL, `created_at` datetime NULL, `updated_at` datetime NULL, `start_date` date NULL, `end_date` date NULL, `instructor_name` varchar(255) NULL, `has_timeline` tinyint UNSIGNED NOT NULL DEFAULT '0', `last_enrollment_date` date NULL, `duration` varchar(255) NULL, `source` varchar(255) NULL, `source_id` varchar(255) NULL, PRIMARY KEY (`id`), CONSTRAINT `courses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE, CONSTRAINT `courses_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `customer_profiles`
--
DROP TABLE IF EXISTS `customer_profiles`;
CREATE TABLE `customer_profiles` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `user_id` bigint UNSIGNED NOT NULL, `phone` varchar(255) NULL, `address` text NULL, `city` varchar(255) NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `customer_profiles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `enrollments`
--
DROP TABLE IF EXISTS `enrollments`;
CREATE TABLE `enrollments` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `user_id` bigint UNSIGNED NOT NULL, `course_id` bigint UNSIGNED NOT NULL, `status` varchar(255) NOT NULL DEFAULT 'active', `enrolled_at` datetime NULL, `completed_at` datetime NULL, `created_at` datetime NULL, `updated_at` datetime NULL, `order_id` bigint UNSIGNED NULL, `xp_earned` bigint UNSIGNED NOT NULL DEFAULT '0', PRIMARY KEY (`id`), CONSTRAINT `enrollments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL, CONSTRAINT `enrollments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE, CONSTRAINT `enrollments_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `failed_jobs`
--
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `uuid` varchar(255) NOT NULL, `connection` text NOT NULL, `queue` text NOT NULL, `payload` longtext NOT NULL, `exception` text NOT NULL, `failed_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `installations`
--
DROP TABLE IF EXISTS `installations`;
CREATE TABLE `installations` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `app_url` varchar(255) NOT NULL, `admin_path` varchar(255) NOT NULL DEFAULT 'admin', `database_host` varchar(255) NOT NULL, `database_port` varchar(255) NOT NULL DEFAULT '3306', `database_name` varchar(255) NOT NULL, `database_username` varchar(255) NOT NULL, `database_password` varchar(255) NULL, `admin_name` varchar(255) NOT NULL, `admin_email` varchar(255) NOT NULL, `admin_password` varchar(255) NOT NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `job_batches`
--
DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE `job_batches` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `total_jobs` bigint UNSIGNED NOT NULL, `pending_jobs` bigint UNSIGNED NOT NULL, `failed_jobs` bigint UNSIGNED NOT NULL, `failed_job_ids` text NOT NULL, `options` text NULL, `cancelled_at` bigint UNSIGNED NULL, `created_at` bigint UNSIGNED NOT NULL, `finished_at` bigint UNSIGNED NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `jobs`
--
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `queue` varchar(255) NOT NULL, `payload` longtext NOT NULL, `attempts` bigint UNSIGNED NOT NULL, `reserved_at` bigint UNSIGNED NULL, `available_at` bigint UNSIGNED NOT NULL, `created_at` bigint UNSIGNED NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `learning_path_courses`
--
DROP TABLE IF EXISTS `learning_path_courses`;
CREATE TABLE `learning_path_courses` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `learning_path_id` bigint UNSIGNED NOT NULL, `course_id` bigint UNSIGNED NOT NULL, `sort_order` bigint UNSIGNED NOT NULL DEFAULT '0', `is_required` tinyint UNSIGNED NOT NULL DEFAULT '1', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `learning_path_courses_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE, CONSTRAINT `learning_path_courses_learning_path_id_foreign` FOREIGN KEY (`learning_path_id`) REFERENCES `learning_paths` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `learning_paths`
--
DROP TABLE IF EXISTS `learning_paths`;
CREATE TABLE `learning_paths` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `description` text NULL, `thumbnail` varchar(255) NULL, `badge` text NULL, `sort_order` bigint UNSIGNED NOT NULL DEFAULT '0', `is_active` tinyint UNSIGNED NOT NULL DEFAULT '1', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `learning_reminders`
--
DROP TABLE IF EXISTS `learning_reminders`;
CREATE TABLE `learning_reminders` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `user_id` bigint UNSIGNED NOT NULL, `course_id` bigint UNSIGNED NOT NULL, `reminder_at` datetime NOT NULL, `type` varchar(255) NOT NULL DEFAULT 'daily_streak', `is_sent` tinyint UNSIGNED NOT NULL DEFAULT '0', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `learning_reminders_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE, CONSTRAINT `learning_reminders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `lesson_completions`
--
DROP TABLE IF EXISTS `lesson_completions`;
CREATE TABLE `lesson_completions` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `user_id` bigint UNSIGNED NOT NULL, `lesson_id` bigint UNSIGNED NOT NULL, `completed_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `created_at` datetime NULL, `updated_at` datetime NULL, `meta` text NULL, `obtained_mark` decimal(10,2) NULL, `feedback` text NULL, `graded_by` bigint UNSIGNED NULL, `graded_at` datetime NULL, `grading_status` varchar(255) NOT NULL DEFAULT 'pending', `is_edited` tinyint UNSIGNED NOT NULL DEFAULT '0', `edited_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `lesson_completions_graded_by_foreign` FOREIGN KEY (`graded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL, CONSTRAINT `lesson_completions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE, CONSTRAINT `lesson_completions_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `lessons`
--
DROP TABLE IF EXISTS `lessons`;
CREATE TABLE `lessons` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `course_section_id` bigint UNSIGNED NOT NULL, `title` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `type` varchar(255) NOT NULL DEFAULT 'VIDEO', `content` text NULL, `video_url` varchar(255) NULL, `file_path` varchar(255) NULL, `duration` bigint UNSIGNED NULL, `is_preview` tinyint UNSIGNED NOT NULL DEFAULT '0', `order` bigint UNSIGNED NOT NULL DEFAULT '0', `created_at` datetime NULL, `updated_at` datetime NULL, `total_marks` bigint UNSIGNED NULL DEFAULT '0', `deadline` datetime NULL, `video_provider` varchar(255) NULL, `video_id` varchar(255) NULL, `release_date` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `lessons_course_section_id_foreign` FOREIGN KEY (`course_section_id`) REFERENCES `course_sections` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `live_class_attendances`
--
DROP TABLE IF EXISTS `live_class_attendances`;
CREATE TABLE `live_class_attendances` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `user_id` bigint UNSIGNED NOT NULL, `live_class_id` bigint UNSIGNED NOT NULL, `joined_at` datetime NOT NULL, `left_at` datetime NULL, `status` varchar(255) NOT NULL DEFAULT 'joined', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `live_class_attendances_live_class_id_foreign` FOREIGN KEY (`live_class_id`) REFERENCES `live_classes` (`id`) ON DELETE CASCADE, CONSTRAINT `live_class_attendances_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `live_classes`
--
DROP TABLE IF EXISTS `live_classes`;
CREATE TABLE `live_classes` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `course_id` bigint UNSIGNED NOT NULL, `title` varchar(255) NOT NULL, `description` text NULL, `provider` varchar(255) NOT NULL DEFAULT 'zoom', `meeting_url` text NOT NULL, `timezone` varchar(255) NOT NULL DEFAULT 'UTC', `reminder_minutes_before` bigint UNSIGNED NOT NULL DEFAULT '30', `recording_url` text NULL, `status` varchar(255) NOT NULL DEFAULT 'upcoming', `created_at` datetime NULL, `updated_at` datetime NULL, `reminder_sent_at` datetime NULL, `type` varchar(255) NOT NULL DEFAULT 'specific', `class_date` date NULL, `start_time` time NOT NULL, `end_time` time NOT NULL, PRIMARY KEY (`id`), CONSTRAINT `live_classes_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `notifications`
--
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `user_id` bigint UNSIGNED NOT NULL, `type` varchar(255) NOT NULL, `title` varchar(255) NOT NULL, `description` text NULL, `data` text NULL, `action_url` varchar(255) NULL, `read_at` datetime NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `offline_downloads`
--
DROP TABLE IF EXISTS `offline_downloads`;
CREATE TABLE `offline_downloads` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `enrollment_id` bigint UNSIGNED NOT NULL, `lesson_id` bigint UNSIGNED NOT NULL, `course_title` varchar(255) NOT NULL, `lesson_title` varchar(255) NOT NULL, `content_type` varchar(255) NOT NULL, `file_path` varchar(255) NULL, `file_size` varchar(255) NULL, `download_token` varchar(255) NOT NULL, `is_expired` tinyint UNSIGNED NOT NULL DEFAULT '0', `expires_at` datetime NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `offline_downloads_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE, CONSTRAINT `offline_downloads_enrollment_id_foreign` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `orders`
--
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `user_id` bigint UNSIGNED NOT NULL, `course_id` bigint UNSIGNED NOT NULL, `order_number` varchar(255) NOT NULL, `amount` decimal(10,2) NOT NULL, `discount_amount` decimal(10,2) NOT NULL DEFAULT '0', `total_amount` decimal(10,2) NOT NULL, `status` varchar(255) NOT NULL DEFAULT 'pending', `payment_method` varchar(255) NULL, `metadata` text NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `orders_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE, CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `password_reset_tokens`
--
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens` (`email` varchar(255) NOT NULL, `token` varchar(255) NOT NULL, `created_at` datetime NULL, PRIMARY KEY (`email`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `payments`
--
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `order_id` bigint UNSIGNED NOT NULL, `transaction_id` varchar(255) NULL, `amount` decimal(10,2) NOT NULL, `status` varchar(255) NOT NULL DEFAULT 'pending', `payment_method` varchar(255) NOT NULL, `gateway_response` text NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `payments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `permissions`
--
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `referrals`
--
DROP TABLE IF EXISTS `referrals`;
CREATE TABLE `referrals` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `referrer_id` bigint UNSIGNED NOT NULL, `referred_id` bigint UNSIGNED NULL, `referral_code` varchar(255) NOT NULL, `source` varchar(255) NOT NULL DEFAULT 'link', `is_converted` tinyint UNSIGNED NOT NULL DEFAULT '0', `converted_at` datetime NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `referrals_referred_id_foreign` FOREIGN KEY (`referred_id`) REFERENCES `users` (`id`) ON DELETE SET NULL, CONSTRAINT `referrals_referrer_id_foreign` FOREIGN KEY (`referrer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `refunds`
--
DROP TABLE IF EXISTS `refunds`;
CREATE TABLE `refunds` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `order_id` bigint UNSIGNED NOT NULL, `user_id` bigint UNSIGNED NOT NULL, `amount` decimal(10,2) NOT NULL, `reason` text NULL, `status` varchar(255) NOT NULL DEFAULT 'completed', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `refunds_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE, CONSTRAINT `refunds_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `reviews`
--
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `user_id` bigint UNSIGNED NOT NULL, `course_id` bigint UNSIGNED NOT NULL, `rating` bigint UNSIGNED NOT NULL, `comment` text NULL, `status` varchar(255) NOT NULL DEFAULT 'pending', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `reviews_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE, CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `role_permissions`
--
DROP TABLE IF EXISTS `role_permissions`;
CREATE TABLE `role_permissions` (`role_id` bigint UNSIGNED NOT NULL, `permission_id` bigint UNSIGNED NOT NULL, PRIMARY KEY (`role_id`, `permission_id`), CONSTRAINT `role_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE, CONSTRAINT `role_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `roles`
--
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `created_at` datetime NULL, `updated_at` datetime NULL, `permissions` text NULL, `description` text NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `sessions`
--
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (`id` varchar(255) NOT NULL, `user_id` bigint UNSIGNED NULL, `ip_address` varchar(45) NULL, `user_agent` text NULL, `payload` longtext NOT NULL, `last_activity` bigint UNSIGNED NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `subscription_plans`
--
DROP TABLE IF EXISTS `subscription_plans`;
CREATE TABLE `subscription_plans` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `description` varchar(255) NULL, `monthly_price` decimal(10,2) NOT NULL DEFAULT '0', `yearly_price` decimal(10,2) NOT NULL DEFAULT '0', `max_courses` bigint UNSIGNED NULL, `is_active` tinyint UNSIGNED NOT NULL DEFAULT '1', `sort_order` bigint UNSIGNED NOT NULL DEFAULT '0', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `tax_settings`
--
DROP TABLE IF EXISTS `tax_settings`;
CREATE TABLE `tax_settings` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `type` varchar(255) NOT NULL DEFAULT 'percentage', `rate` decimal(10,2) NOT NULL DEFAULT '0', `scope` varchar(255) NOT NULL DEFAULT 'global', `is_active` tinyint UNSIGNED NOT NULL DEFAULT '1', `rules` text NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `tutorial_enrollments`
--
DROP TABLE IF EXISTS `tutorial_enrollments`;
CREATE TABLE `tutorial_enrollments` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `user_id` bigint UNSIGNED NOT NULL, `tutorial_id` bigint UNSIGNED NOT NULL, `status` varchar(255) NOT NULL DEFAULT 'active', `progress` bigint UNSIGNED NOT NULL DEFAULT '0', `completed_at` datetime NULL, `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `tutorial_enrollments_tutorial_id_foreign` FOREIGN KEY (`tutorial_id`) REFERENCES `tutorials` (`id`) ON DELETE CASCADE, CONSTRAINT `tutorial_enrollments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `tutorial_lessons`
--
DROP TABLE IF EXISTS `tutorial_lessons`;
CREATE TABLE `tutorial_lessons` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `tutorial_section_id` bigint UNSIGNED NOT NULL, `title` varchar(255) NOT NULL, `slug` varchar(255) NULL, `description` text NULL, `content` text NULL, `video_url` varchar(255) NULL, `content_type` varchar(255) NOT NULL DEFAULT 'video', `order` bigint UNSIGNED NOT NULL DEFAULT '0', `duration` bigint UNSIGNED NULL, `is_free` tinyint UNSIGNED NOT NULL DEFAULT '0', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `tutorial_lessons_tutorial_section_id_foreign` FOREIGN KEY (`tutorial_section_id`) REFERENCES `tutorial_sections` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `tutorial_sections`
--
DROP TABLE IF EXISTS `tutorial_sections`;
CREATE TABLE `tutorial_sections` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `tutorial_id` bigint UNSIGNED NOT NULL, `title` varchar(255) NOT NULL, `description` text NULL, `order` bigint UNSIGNED NOT NULL DEFAULT '0', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `tutorial_sections_tutorial_id_foreign` FOREIGN KEY (`tutorial_id`) REFERENCES `tutorials` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `tutorials`
--
DROP TABLE IF EXISTS `tutorials`;
CREATE TABLE `tutorials` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `category_id` bigint UNSIGNED NULL, `user_id` bigint UNSIGNED NOT NULL, `instructor_name` varchar(255) NULL, `title` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `thumbnail` varchar(255) NULL, `duration` varchar(255) NULL, `description` text NULL, `level` varchar(255) NOT NULL DEFAULT 'beginner', `language` varchar(255) NOT NULL DEFAULT 'English', `price` decimal(10,2) NOT NULL DEFAULT '0', `discount_price` decimal(10,2) NULL, `is_free` tinyint UNSIGNED NOT NULL DEFAULT '0', `status` varchar(255) NOT NULL DEFAULT 'draft', `meta_title` varchar(255) NULL, `meta_description` varchar(255) NULL, `start_date` date NULL, `end_date` date NULL, `has_timeline` tinyint UNSIGNED NOT NULL DEFAULT '0', `is_tutorial` tinyint UNSIGNED NOT NULL DEFAULT '1', `created_at` datetime NULL, `updated_at` datetime NULL, `source` varchar(255) NULL, `source_id` varchar(255) NULL, PRIMARY KEY (`id`), CONSTRAINT `tutorials_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE, CONSTRAINT `tutorials_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `user_achievements`
--
DROP TABLE IF EXISTS `user_achievements`;
CREATE TABLE `user_achievements` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `user_id` bigint UNSIGNED NOT NULL, `badge_id` bigint UNSIGNED NOT NULL, `xp_earned` bigint UNSIGNED NOT NULL DEFAULT '0', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `user_achievements_badge_id_foreign` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`id`) ON DELETE CASCADE, CONSTRAINT `user_achievements_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `user_roles`
--
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles` (`user_id` bigint UNSIGNED NOT NULL, `role_id` bigint UNSIGNED NOT NULL, PRIMARY KEY (`user_id`, `role_id`), CONSTRAINT `user_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE, CONSTRAINT `user_roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `users`
--
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `email_verified_at` datetime NULL, `password` varchar(255) NOT NULL, `remember_token` varchar(100) NULL, `created_at` datetime NULL, `updated_at` datetime NULL, `brand_id` bigint UNSIGNED NULL, `profile_image` varchar(255) NULL, `status` varchar(255) NOT NULL DEFAULT 'active', `type` varchar(255) NOT NULL DEFAULT 'customer', `xp` bigint UNSIGNED NOT NULL DEFAULT '0', `total_xp` bigint UNSIGNED NOT NULL DEFAULT '0', `streak_count` bigint UNSIGNED NOT NULL DEFAULT '0', `last_learning_day` date NULL, `subscription_plan_id` bigint UNSIGNED NULL, `subscription_starts_at` date NULL, `subscription_ends_at` date NULL, `locale` varchar(255) NOT NULL DEFAULT 'en', PRIMARY KEY (`id`), CONSTRAINT `users_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `waitlists`
--
DROP TABLE IF EXISTS `waitlists`;
CREATE TABLE `waitlists` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `course_id` bigint UNSIGNED NOT NULL, `user_id` bigint UNSIGNED NOT NULL, `position` bigint UNSIGNED NOT NULL DEFAULT '1', `notification_method` varchar(255) NOT NULL DEFAULT 'email', `notified` tinyint UNSIGNED NOT NULL DEFAULT '0', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `waitlists_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE, CONSTRAINT `waitlists_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `webhook_deliveries`
--
DROP TABLE IF EXISTS `webhook_deliveries`;
CREATE TABLE `webhook_deliveries` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `webhook_id` bigint UNSIGNED NOT NULL, `event` varchar(255) NOT NULL, `payload` longtext NOT NULL, `response_code` bigint UNSIGNED NULL, `response_body` text NULL, `success` tinyint UNSIGNED NOT NULL DEFAULT '0', `delivered_at` datetime NULL, `attempts` bigint UNSIGNED NOT NULL DEFAULT '0', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`), CONSTRAINT `webhook_deliveries_webhook_id_foreign` FOREIGN KEY (`webhook_id`) REFERENCES `webhooks` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for `webhooks`
--
DROP TABLE IF EXISTS `webhooks`;
CREATE TABLE `webhooks` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `url` varchar(255) NOT NULL, `secret` varchar(255) NULL, `events` text NULL, `is_active` tinyint UNSIGNED NOT NULL DEFAULT '1', `timeout` bigint UNSIGNED NOT NULL DEFAULT '30', `created_at` datetime NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Indexes (non-unique)

CREATE INDEX `activity_logs_user_id_index` ON `activity_logs` (`user_id`);
CREATE INDEX `activity_logs_subject_type_subject_id_index` ON `activity_logs` (`subject_type`, `subject_id`);
CREATE INDEX `activity_logs_event_index` ON `activity_logs` (`event`);
CREATE INDEX `activity_logs_created_at_index` ON `activity_logs` (`created_at`);
CREATE INDEX `ad_impressions_ad_zone_id_type_created_at_index` ON `ad_impressions` (`ad_zone_id`, `type`, `created_at`);
CREATE INDEX `ad_zones_position_page_type_is_active_index` ON `ad_zones` (`position`, `page_type`, `is_active`);
CREATE INDEX `cache_expiration_index` ON `cache` (`expiration`);
CREATE INDEX `cache_locks_expiration_index` ON `cache_locks` (`expiration`);
CREATE INDEX `jobs_queue_index` ON `jobs` (`queue`);
CREATE INDEX `notifications_created_at_index` ON `notifications` (`created_at`);
CREATE INDEX `notifications_user_id_read_at_index` ON `notifications` (`user_id`, `read_at`);
CREATE INDEX `sessions_last_activity_index` ON `sessions` (`last_activity`);
CREATE INDEX `sessions_user_id_index` ON `sessions` (`user_id`);
CREATE INDEX `tutorials_category_id_index` ON `tutorials` (`category_id`);
CREATE INDEX `tutorials_status_index` ON `tutorials` (`status`);
CREATE INDEX `tutorials_slug_index` ON `tutorials` (`slug`);

-- Unique indexes

CREATE UNIQUE INDEX `ad_settings_key_unique` ON `ad_settings` (`key`);
CREATE UNIQUE INDEX `ad_zones_zone_id_unique` ON `ad_zones` (`zone_id`);
CREATE UNIQUE INDEX `badges_slug_unique` ON `badges` (`slug`);
CREATE UNIQUE INDEX `business_settings_key_unique` ON `business_settings` (`key`);
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);
CREATE UNIQUE INDEX `certificates_verification_code_unique` ON `certificates` (`verification_code`);
CREATE UNIQUE INDEX `certificates_user_id_course_id_unique` ON `certificates` (`user_id`, `course_id`);
CREATE UNIQUE INDEX `coupons_code_unique` ON `coupons` (`code`);
CREATE UNIQUE INDEX `course_bookmarks_user_id_course_id_unique` ON `course_bookmarks` (`user_id`, `course_id`);
CREATE UNIQUE INDEX `course_bundle_courses_course_bundle_id_course_id_unique` ON `course_bundle_courses` (`course_bundle_id`, `course_id`);
CREATE UNIQUE INDEX `course_bundles_slug_unique` ON `course_bundles` (`slug`);
CREATE UNIQUE INDEX `course_instructors_course_id_user_id_unique` ON `course_instructors` (`course_id`, `user_id`);
CREATE UNIQUE INDEX `course_prerequisites_course_id_prerequisite_course_id_unique` ON `course_prerequisites` (`course_id`, `prerequisite_course_id`);
CREATE UNIQUE INDEX `courses_slug_unique` ON `courses` (`slug`);
CREATE UNIQUE INDEX `failed_jobs_uuid_unique` ON `failed_jobs` (`uuid`);
CREATE UNIQUE INDEX `learning_path_courses_learning_path_id_course_id_unique` ON `learning_path_courses` (`learning_path_id`, `course_id`);
CREATE UNIQUE INDEX `learning_paths_slug_unique` ON `learning_paths` (`slug`);
CREATE UNIQUE INDEX `lesson_completions_user_id_lesson_id_unique` ON `lesson_completions` (`user_id`, `lesson_id`);
CREATE UNIQUE INDEX `lessons_section_slug_unique` ON `lessons` (`course_section_id`, `slug`);
CREATE UNIQUE INDEX `offline_downloads_download_token_unique` ON `offline_downloads` (`download_token`);
CREATE UNIQUE INDEX `orders_order_number_unique` ON `orders` (`order_number`);
CREATE UNIQUE INDEX `payments_transaction_id_unique` ON `payments` (`transaction_id`);
CREATE UNIQUE INDEX `permissions_name_unique` ON `permissions` (`name`);
CREATE UNIQUE INDEX `referrals_referral_code_unique` ON `referrals` (`referral_code`);
CREATE UNIQUE INDEX `roles_slug_unique` ON `roles` (`slug`);
CREATE UNIQUE INDEX `roles_name_unique` ON `roles` (`name`);
CREATE UNIQUE INDEX `subscription_plans_slug_unique` ON `subscription_plans` (`slug`);
CREATE UNIQUE INDEX `tutorial_enrollments_user_id_tutorial_id_unique` ON `tutorial_enrollments` (`user_id`, `tutorial_id`);
CREATE UNIQUE INDEX `tutorials_slug_unique` ON `tutorials` (`slug`);
CREATE UNIQUE INDEX `user_achievements_user_id_badge_id_unique` ON `user_achievements` (`user_id`, `badge_id`);
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
CREATE UNIQUE INDEX `waitlists_course_id_user_id_unique` ON `waitlists` (`course_id`, `user_id`);

-- Migration records

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (1, '0001_01_01_000000_create_users_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (2, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (3, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (4, '2026_02_01_105747_create_activity_logs_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (5, '2026_02_01_105747_create_brands_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (6, '2026_02_01_105747_create_roles_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (7, '2026_02_01_105748_add_role_id_to_users_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (8, '2026_02_02_094807_add_profile_image_to_users_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (9, '2026_02_02_104129_add_permissions_to_roles_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (10, '2026_02_02_110423_add_role_and_profile_image_to_users_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (11, '2026_02_02_115937_add_status_to_users_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (12, '2026_02_02_120447_create_business_settings_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (13, '2026_02_03_043728_update_auth_structure_for_centralized_access', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (14, '2026_02_03_061045_update_activity_logs_table_schema', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (15, '2026_02_03_121355_create_notifications_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (16, '2026_02_09_102851_create_categories_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (17, '2026_02_09_102852_create_courses_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (18, '2026_02_09_102853_create_course_sections_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (19, '2026_02_09_102854_create_lessons_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (20, '2026_02_09_102855_create_enrollments_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (21, '2026_02_10_033932_add_dates_to_courses_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (22, '2026_02_10_043122_add_instructor_name_to_courses_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (23, '2026_02_10_050715_create_reviews_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (24, '2026_02_10_090916_add_timeline_fields_to_courses_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (25, '2026_02_15_040919_create_live_classes_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (26, '2026_02_15_040920_create_live_class_attendances_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (27, '2026_02_15_041824_add_reminder_sent_at_to_live_classes_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (28, '2026_02_15_043548_create_certificate_templates_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (29, '2026_02_15_043548_create_certificates_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (30, '2026_02_15_051453_create_lesson_completions_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (31, '2026_02_15_054937_add_meta_to_lesson_completions_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (32, '2026_02_15_064502_add_assignment_management_fields', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (33, '2026_02_15_085726_update_lessons_slug_unique_constraint_to_section_wise', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (34, '2026_02_15_094129_create_orders_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (35, '2026_02_15_094129_create_payments_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (36, '2026_02_15_094130_create_refunds_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (37, '2026_02_15_094153_add_order_id_to_enrollments_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (38, '2026_02_17_034254_add_deadline_to_lessons_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (39, '2026_02_17_083445_add_unlock_fields_to_course_sections_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (40, '2026_02_17_085618_create_announcements_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (41, '2026_02_17_085623_create_announcement_user_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (42, '2026_02_17_095925_add_duration_to_courses_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (43, '2026_02_17_111749_add_video_provider_to_lessons_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (44, '2026_02_19_083411_update_live_classes_table_structure', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (45, '2026_02_20_090000_create_coding_exercises_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (46, '2026_02_21_100000_create_course_prerequisites_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (47, '2026_02_21_110000_create_course_bookmarks_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (48, '2026_02_21_120000_create_badges_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (49, '2026_02_21_130000_create_user_achievements_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (50, '2026_02_21_140000_add_gamification_fields_to_users_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (51, '2026_02_21_150000_add_xp_earned_to_enrollments_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (52, '2026_02_21_160000_create_learning_paths_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (53, '2026_02_21_170000_create_learning_path_courses_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (54, '2026_02_21_180000_create_coupons_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (55, '2026_02_21_190000_add_release_date_to_lessons_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (56, '2026_02_21_200000_create_course_bundles_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (57, '2026_02_21_210000_create_course_bundle_courses_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (58, '2026_02_21_220000_create_webhooks_tables', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (59, '2026_02_21_230000_add_locale_language_support', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (60, '2026_02_22_000000_create_subscription_plans_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (61, '2026_02_22_010000_create_ai_tutor_messages_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (62, '2026_07_30_000001_create_learning_reminders_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (63, '2026_07_30_000002_create_course_transcripts_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (64, '2026_07_30_000003_create_offline_downloads_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (65, '2026_07_30_000004_create_waitlists_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (66, '2026_07_30_000005_create_tax_settings_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (67, '2026_07_30_000006_create_referrals_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (68, '2026_07_30_000007_create_tutorials_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (69, '2026_07_30_000008_create_tutorial_sections_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (70, '2026_07_30_000009_create_tutorial_lessons_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (71, '2026_07_30_000010_create_tutorial_enrollments_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (72, '2026_07_30_000011_create_course_instructors_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (73, '2026_07_31_000001_add_source_fields_to_tutorials_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (74, '2026_07_31_230947_add_source_fields_to_courses_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (75, '2026_08_01_000001_create_ad_management_tables', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (76, '2026_08_01_013508_add_billing_cycles_to_subscription_plans_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (77, '2026_08_01_175828_create_installations_table', 2);

SET FOREIGN_KEY_CHECKS=1;
