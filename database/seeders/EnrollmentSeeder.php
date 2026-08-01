<?php

namespace Database\Seeders;

use App\Enums\EnrollmentStatus;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\LessonCompletion;
use App\Models\User;
use Illuminate\Database\Seeder;

class EnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = User::where('email', 'like', 'student%@gmail.com')->get();
        $courses = Course::all();

        foreach ($students as $index => $student) {
            // Enroll each student in 2-3 courses
            $enrolledCourses = $courses->random(min(3, $courses->count()));

            foreach ($enrolledCourses as $courseIndex => $course) {
                $status = ($index + $courseIndex) % 3 === 0 ? EnrollmentStatus::COMPLETED : EnrollmentStatus::ACTIVE;

                $enrollment = Enrollment::updateOrCreate(
                    ['user_id' => $student->id, 'course_id' => $course->id],
                    [
                        'status' => $status,
                        'enrolled_at' => now()->subDays(rand(10, 30)),
                        'completed_at' => $status === EnrollmentStatus::COMPLETED ? now()->subDays(rand(1, 5)) : null,
                    ]
                );

                // Simulate progress: Mark some lessons as completed
                $lessons = $course->allLessons()->get();
                $lessonsToComplete = $status === EnrollmentStatus::COMPLETED
                    ? $lessons
                    : $lessons->random(min(rand(1, 3), $lessons->count()));

                foreach ($lessonsToComplete as $lesson) {
                    LessonCompletion::updateOrCreate(
                        ['user_id' => $student->id, 'lesson_id' => $lesson->id],
                        [
                            'completed_at' => now()->subDays(rand(1, 10)),
                            'obtained_mark' => $lesson->type->name === 'QUIZ' ? rand(15, 20) : null,
                        ]
                    );
                }
            }
        }
    }
}
