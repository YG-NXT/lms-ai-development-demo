<?php

namespace App\Console\Commands;

use App\Services\KhanAcademyService;
use Illuminate\Console\Command;

class ImportKhanAcademyCommand extends Command
{
    protected $signature = 'import:khan-academy
        {--limit=10 : Number of courses to import}
        {--course= : Import a specific course by ID}';

    protected $description = 'Import courses from Khan Academy as free tutorials';

    public function handle(KhanAcademyService $service): int
    {
        $courseId = $this->option('course');
        $limit = (int) $this->option('limit');

        if ($courseId) {
            $this->info("Importing Khan Academy course: {$courseId}");
            $tutorial = $service->importCourse($courseId);

            if ($tutorial) {
                $this->info("Successfully imported: {$tutorial->title}");
            } else {
                $this->error('Failed to import course. Check the course ID.');
            }

            return self::SUCCESS;
        }

        $this->info("Fetching Khan Academy courses (limit: {$limit})...");
        $courses = $service->fetchCourses();

        if (empty($courses)) {
            $this->error('No courses found. The API may be unavailable.');

            return self::FAILURE;
        }

        $this->info(sprintf('Found %d available courses. Syncing up to %d...', count($courses), $limit));
        $count = $service->syncCourses($limit);

        $this->info(sprintf('Successfully imported %d courses.', $count));
        $this->info('Imported tutorials are available at /tutorials');

        return self::SUCCESS;
    }
}
