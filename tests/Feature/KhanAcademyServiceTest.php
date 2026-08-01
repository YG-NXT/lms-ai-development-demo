<?php

use App\Models\Category;
use App\Models\Tutorial;
use App\Models\TutorialLesson;
use App\Models\TutorialSection;
use App\Models\User;
use App\Services\KhanAcademyService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;

uses(RefreshDatabase::class);

beforeEach(function () {
    Category::factory()->create(['name' => 'Web Development', 'is_active' => true]);
    $this->user = User::factory()->create(['type' => 'super-admin']);
    $this->service = new KhanAcademyService;
});

test('fetchCourses returns empty array when API fails', function () {
    Http::fake([
        'khan-api.herokuapp.com/*' => Http::response(['error' => 'Server Error'], 500),
    ]);

    $result = $this->service->fetchCourses();

    expect($result)->toBeArray()->toBeEmpty();
});
test('fetchCourses returns courses from API response', function () {
    Http::fake([
        'khan-api.herokuapp.com/*' => Http::response([
            'courses' => [
                ['id' => 'math', 'title' => 'Mathematics', 'description' => 'Learn math'],
            ],
        ]),
    ]);

    $result = cache()->flush() ? $this->service->fetchCourses() : [];

    expect($result)->toBeArray()
        ->and($result)->toHaveCount(1)
        ->and($result[0]['id'])->toBe('math')
        ->and($result[0]['title'])->toBe('Mathematics');
});

test('fetchCourse returns course details when API succeeds', function () {
    Http::fake([
        'khan-api.herokuapp.com/course/math' => Http::response([
            'id' => 'math',
            'title' => 'Mathematics',
            'description' => 'Complete math course',
            'topics' => [
                [
                    'id' => 'arithmetic',
                    'title' => 'Arithmetic',
                    'description' => 'Basic arithmetic',
                    'exercises' => [
                        ['title' => 'Addition', 'slug' => 'addition'],
                    ],
                    'videos' => [
                        ['title' => 'Intro to Addition', 'slug' => 'intro-addition'],
                    ],
                ],
            ],
        ]),
    ]);

    cache()->flush();
    $course = $this->service->fetchCourse('math');

    expect($course)->not->toBeNull()
        ->and($course['title'])->toBe('Mathematics')
        ->and($course['topics'])->toHaveCount(1);
});

test('fetchCourse returns null when API fails', function () {
    Http::fake([
        'khan-api.herokuapp.com/*' => Http::response(['error' => 'Not found'], 404),
    ]);

    $result = $this->service->fetchCourse('invalid_course');

    expect($result)->toBeNull();
});

test('importCourse creates tutorial with sections and lessons', function () {
    Http::fake([
        'khan-api.herokuapp.com/course/math' => Http::response([
            'id' => 'math',
            'title' => 'Mathematics',
            'description' => 'Complete math course',
            'topics' => [
                [
                    'id' => 'arithmetic',
                    'title' => 'Arithmetic',
                    'description' => 'Basic arithmetic',
                    'exercises' => [
                        ['title' => 'Addition', 'description' => 'Adding numbers'],
                    ],
                    'videos' => [
                        ['title' => 'Intro to Addition', 'description' => 'Learn addition', 'duration' => 300],
                    ],
                ],
            ],
        ]),
        'khan-api.herokuapp.com/topic/*' => Http::response([
            'id' => 'arithmetic',
            'title' => 'Arithmetic',
            'description' => 'Basic arithmetic',
            'exercises' => [
                ['title' => 'Addition', 'description' => 'Adding numbers'],
            ],
            'videos' => [
                ['title' => 'Intro to Addition', 'description' => 'Learn addition', 'duration' => 300],
            ],
        ]),
    ]);

    cache()->flush();
    $tutorial = $this->service->importCourse('math', 1, $this->user->id);

    expect($tutorial)->not->toBeNull()
        ->and($tutorial->title)->toBe('Mathematics')
        ->and($tutorial->is_free)->toBeTrue()
        ->and($tutorial->status)->toBe('published')
        ->and($tutorial->source)->toBe('khan_academy')
        ->and($tutorial->source_id)->toBe('math');

    $sections = TutorialSection::where('tutorial_id', $tutorial->id)->get();
    expect($sections)->toHaveCount(1)
        ->and($sections[0]->title)->toBe('Arithmetic');

    $lessons = TutorialLesson::where('tutorial_section_id', $sections[0]->id)->get();
    expect($lessons)->toHaveCount(2)
        ->and($lessons[0]->title)->toBe('Addition')
        ->and($lessons[0]->content_type)->toBe('exercise')
        ->and($lessons[1]->title)->toBe('Intro to Addition')
        ->and($lessons[1]->content_type)->toBe('video');
});

test('importCourse returns null when course does not exist', function () {
    Http::fake([
        'khan-api.herokuapp.com/*' => Http::response(['error' => 'Not found'], 404),
    ]);

    $result = $this->service->importCourse('nonexistent_course');

    expect($result)->toBeNull();
});

test('importCourse does not create duplicate on reimport', function () {
    Http::fake([
        'khan-api.herokuapp.com/course/math' => Http::response([
            'id' => 'math',
            'title' => 'Mathematics',
            'description' => 'Complete math course',
            'topics' => [],
        ]),
    ]);

    cache()->flush();
    $tutorial1 = $this->service->importCourse('math', 1, $this->user->id);
    $tutorial2 = $this->service->importCourse('math', 1, $this->user->id);

    expect($tutorial1->id)->toBe($tutorial2->id)
        ->and(Tutorial::where('source', 'khan_academy')->count())->toBe(1);
});

test('searchCourses filters courses by keyword', function () {
    Http::fake([
        'khan-api.herokuapp.com/*' => Http::response([
            'courses' => [
                ['id' => 'math', 'title' => 'Mathematics'],
                ['id' => 'physics', 'title' => 'Physics'],
            ],
        ]),
    ]);

    cache()->flush();
    $results = $this->service->searchCourses('math');

    expect($results)->toHaveCount(1)
        ->and($results[0]['title'])->toBe('Mathematics');
});

test('getImportedTutorials returns only Khan Academy tutorials', function () {
    Tutorial::factory()->create([
        'source' => 'khan_academy',
        'source_id' => 'math1',
        'status' => 'published',
    ]);
    Tutorial::factory()->create([
        'source' => null,
        'source_id' => null,
        'status' => 'published',
    ]);

    $result = $this->service->getImportedTutorials();

    expect($result)->toHaveCount(1)
        ->and($result[0]['source'])->toBe('khan_academy');
});

test('mapCategoryForCourse returns correct category for math subjects', function () {
    $categoryId = $this->service->mapCategoryForCourse(['id' => 'math', 'title' => 'Calculus']);

    expect($categoryId)->toBe(1);
});
