<?php

use App\Enums\LessonType;
use App\Models\CodingExercise;
use App\Models\Lesson;
use App\Services\CodeExecutionService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('coding exercise can be created', function () {
    $lesson = Lesson::factory()->create([
        'type' => LessonType::PROGRAMMING,
    ]);

    $exercise = CodingExercise::factory()->create([
        'lesson_id' => $lesson->id,
    ]);

    expect($exercise->lesson_id)->toBe($lesson->id);
    expect($exercise->language)->toBe('php');
    expect($exercise->test_cases)->toBeArray();
    expect($exercise->time_limit_seconds)->toBe(10);
});

test('programming lesson type exists in enum', function () {
    expect(LessonType::PROGRAMMING->value)->toBe('PROGRAMMING');
});

test('code execution service exists and has execute method', function () {
    $service = new CodeExecutionService;
    expect($service)->toBeInstanceOf(CodeExecutionService::class);
    expect(method_exists($service, 'execute'))->toBeTrue();
    expect(method_exists($service, 'executePHP'))->toBeTrue();
    expect(method_exists($service, 'executeSQL'))->toBeTrue();
    expect(method_exists($service, 'executeClientSide'))->toBeTrue();
    expect(method_exists($service, 'getSupportedLanguages'))->toBeTrue();
});

test('code execution service supports all languages', function () {
    $service = new CodeExecutionService;
    $languages = $service->getSupportedLanguages();

    expect($languages)->toHaveKey('php');
    expect($languages)->toHaveKey('sql');
    expect($languages)->toHaveKey('javascript');
    expect($languages)->toHaveKey('html');
    expect($languages)->toHaveKey('css');
    expect($languages)->toHaveKey('typescript');
    expect($languages)->toHaveKey('python');
    expect($languages)->toHaveKey('c');
    expect($languages)->toHaveKey('cpp');
    expect($languages)->toHaveKey('rust');
    expect($languages)->toHaveKey('go');
    expect($languages)->toHaveKey('java');
    expect($languages)->toHaveKey('kotlin');
    expect($languages)->toHaveKey('ruby');
    expect($languages)->toHaveKey('swift');
    expect($languages)->toHaveKey('csharp');
});

test('code execution service executes PHP code', function () {
    $service = new CodeExecutionService;
    $result = $service->execute('php', 'echo "Hello, World!";');

    expect($result['success'])->toBeTrue();
    expect($result['output'])->toBe('Hello, World!');
    expect($result['exit_code'])->toBe(0);
    expect($result['client_side'])->toBeFalsy();
});

test('code execution service handles PHP errors', function () {
    $service = new CodeExecutionService;
    $result = $service->execute('php', 'invalid_php_code_here');

    expect($result['success'])->toBeFalse();
    expect($result['exit_code'])->toBe(1);
    expect($result['errors'])->not->toBeEmpty();
});

test('code execution service filters disabled PHP functions', function () {
    $service = new CodeExecutionService;
    $result = $service->execute('php', 'echo exec("ls");');

    expect($result['success'])->toBeTrue();
    expect($result['output'])->toBe('');
});

test('code execution service runs PHP test cases', function () {
    $service = new CodeExecutionService;
    $code = 'echo "42";';
    $testCases = [
        ['name' => 'Answer', 'input' => null, 'expected' => '42'],
    ];
    $result = $service->execute('php', $code, $testCases);

    expect($result['success'])->toBeTrue();
    expect($result['test_results'])->toBeArray();
    expect($result['test_results'])->not->toBeEmpty();
    expect($result['test_results'][0]['passed'])->toBeTrue();
});

test('client-side languages return browser metadata', function () {
    $service = new CodeExecutionService;

    $result = $service->execute('javascript', 'console.log("Hello");');
    expect($result['client_side'])->toBeTrue();
    expect($result['language'])->toBe('javascript');

    $result = $service->execute('python', 'print("Hello")');
    expect($result['client_side'])->toBeTrue();
    expect($result['language'])->toBe('python');

    $result = $service->execute('html', '<p>Test</p>');
    expect($result['client_side'])->toBeTrue();
    expect($result['rendered'])->toBeTrue();

    $result = $service->execute('css', 'body { color: red; }');
    expect($result['client_side'])->toBeTrue();
    expect($result['rendered'])->toBeTrue();
});

test('code execution service executes SQL', function () {
    $service = new CodeExecutionService;
    $result = $service->execute('sql', 'SELECT 1 AS answer');

    expect($result['success'])->toBeTrue();
    expect($result['client_side'])->toBeFalsy();
    expect($result['language'])->toBe('sql');
    expect($result['output'])->not->toBeEmpty();
});

test('code execution service handles SQL errors', function () {
    $service = new CodeExecutionService;
    $result = $service->execute('sql', 'INVALID SQL SYNTAX HERE');

    expect($result['success'])->toBeFalse();
    expect($result['exit_code'])->toBe(1);
    expect($result['errors'])->not->toBeEmpty();
});

test('unsupported language returns error', function () {
    $service = new CodeExecutionService;
    $result = $service->execute('assembly', 'NOP');

    expect($result['success'])->toBeFalse();
    expect($result['errors'])->toContain('not available');
});
