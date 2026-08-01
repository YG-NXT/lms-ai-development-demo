<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class CodeExecutionService
{
    protected array $phpDisabledFunctions = [
        'exec', 'shell_exec', 'system', 'passthru', 'popen', 'proc_open',
        'pcntl_exec', 'pcntl_fork', 'pcntl_signal', 'pcntl_waitpid',
        'dl', 'ini_alter', 'ini_restore', 'ini_set', 'putenv',
        'chdir', 'chroot', 'posix_kill', 'posix_mkfifo', 'posix_getpwuid',
        'posix_setuid', 'posix_setgid', 'posix_setpgid', 'posix_setsid',
        'syslog', 'openlog', 'closelog',
    ];

    protected array $serverSideLanguages = ['php', 'sql'];

    protected array $clientSideLanguages = [
        'javascript', 'html', 'css',
        'python' => ['runtime' => 'pyodide', 'label' => 'Python (Pyodide/WASM)'],
        'c' => ['runtime' => 'wasm', 'label' => 'C/C++ (WebAssembly)'],
        'cpp' => ['runtime' => 'wasm', 'label' => 'C/C++ (WebAssembly)'],
        'rust' => ['runtime' => 'wasm', 'label' => 'Rust (WebAssembly)'],
        'java' => ['runtime' => 'jsvm', 'label' => 'Java (Browser JVM)'],
        'ruby' => ['runtime' => 'jsvm', 'label' => 'Ruby (Browser VM)'],
        'go' => ['runtime' => 'wasm', 'label' => 'Go (WebAssembly)'],
        'typescript' => ['runtime' => 'browser', 'label' => 'TypeScript (Browser)'],
        'kotlin' => ['runtime' => 'jsvm', 'label' => 'Kotlin (Browser JVM)'],
        'swift' => ['runtime' => 'wasm', 'label' => 'Swift (WebAssembly)'],
        'csharp' => ['runtime' => 'wasm', 'label' => 'C# (WebAssembly)'],
        'rust' => ['runtime' => 'wasm', 'label' => 'Rust (WebAssembly)'],
    ];

    public function execute(string $language, string $code, array $testCases = [], array $constraints = []): array
    {
        $normalized = strtolower(trim($language));

        if (in_array($normalized, $this->serverSideLanguages, true)) {
            return $this->executeServerSide($normalized, $code, $testCases, $constraints);
        }

        return $this->executeClientSide($normalized, $code, $testCases, $constraints);
    }

    public function executeInline(string $language, string $code, array $constraints = []): array
    {
        $normalized = strtolower(trim($language));

        if (in_array($normalized, $this->serverSideLanguages, true)) {
            return $this->executeServerSide($normalized, $code, [], $constraints);
        }

        return $this->executeClientSide($normalized, $code, [], $constraints);
    }

    public function executeTerminal(string $command, array $allowedCommands = []): array
    {
        $defaultAllowed = ['pwd', 'whoami', 'date', 'uname', 'php', 'artisan', 'composer', 'npm', 'node', 'git', 'ls', 'cat', 'head', 'tail', 'grep', 'find', 'wc', 'curl', 'df', 'du'];

        $commandName = trim(explode(' ', $command)[0]);

        if (! in_array($commandName, array_merge($defaultAllowed, $allowedCommands), true)) {
            return [
                'success' => false,
                'output' => '',
                'errors' => "Command '{$commandName}' is not allowed.",
                'exit_code' => 127,
            ];
        }

        $output = '';
        $errors = '';
        $exitCode = 0;

        $startTime = microtime(true);

        try {
            $descriptorspec = [
                0 => ['pipe', 'r'],
                1 => ['pipe', 'w'],
                2 => ['pipe', 'w'],
            ];

            $process = proc_open('cmd /c '.$command, $descriptorspec, $pipes);

            if (is_resource($process)) {
                fclose($pipes[0]);
                $output = stream_get_contents($pipes[1]);
                $errors = stream_get_contents($pipes[2]);
                fclose($pipes[1]);
                fclose($pipes[2]);
                $exitCode = proc_close($process);
            } else {
                $errors = 'Failed to open process.';
                $exitCode = 1;
            }
        } catch (\Throwable $e) {
            $errors = $e->getMessage();
            $exitCode = 1;
        }

        return [
            'success' => $exitCode === 0,
            'output' => trim($output),
            'errors' => trim($errors),
            'exit_code' => $exitCode,
            'execution_time_ms' => round((microtime(true) - $startTime) * 1000, 2),
        ];
    }

    public function executeServerSide(string $language, string $code, array $testCases = [], array $constraints = []): array
    {
        return match ($language) {
            'php' => $this->executePHP($code, $testCases, $constraints),
            'sql' => $this->executeSQL($code, $constraints),
            default => $this->executeUnsupported($language),
        };
    }

    public function executeClientSide(string $language, string $code, array $testCases = [], array $constraints = []): array
    {
        $normalized = strtolower(trim($language));
        $info = $this->getClientSideInfo($normalized);

        $label = $info['label'] ?? $normalized;

        return [
            'language' => $normalized,
            'success' => true,
            'output' => '',
            'errors' => [],
            'execution_time_ms' => 0,
            'memory_usage_mb' => 0,
            'test_results' => [],
            'passed' => true,
            'client_side' => true,
            'runtime' => $info['runtime'] ?? 'browser',
            'label' => $label,
            'message' => "{$label} code will be executed in the browser sandbox.",
        ];
    }

    public function executePHP(string $code, array $testCases = [], array $constraints = []): array
    {
        $filteredCode = $this->filterPHPCode($code);
        $output = '';
        $errors = '';
        $exitCode = 0;
        $executionTime = 0;
        $memoryUsage = 0;

        $startTime = microtime(true);
        $startMemory = memory_get_usage(true);

        $oldErrorHandler = set_error_handler(function ($severity, $message, $file, $line) use (&$errors) {
            $errors .= "PHP Error: {$message} in {$file} on line {$line}\n";
        });

        ob_start();
        try {
            $sandboxedCode = $this->phpSandboxWrapper($filteredCode);
            eval($sandboxedCode);
            $exitCode = 0;
        } catch (\Throwable $e) {
            $errors .= "Exception: {$e->getMessage()} in {$e->getFile()} on line {$e->getLine()}\n";
            $exitCode = 1;
        }
        $output = ob_get_clean();

        restore_error_handler();

        $endTime = microtime(true);
        $endMemory = memory_get_usage(true);

        $executionTime = round(($endTime - $startTime) * 1000, 2);
        $memoryUsage = round(($endMemory - $startMemory) / 1024 / 1024, 2);

        $results = [];
        if (! empty($testCases)) {
            $results = $this->runPHPTestCases($filteredCode, $testCases, $constraints);
        }

        return [
            'language' => 'php',
            'success' => $exitCode === 0,
            'output' => trim($output),
            'errors' => trim($errors),
            'exit_code' => $exitCode,
            'execution_time_ms' => $executionTime,
            'memory_usage_mb' => $memoryUsage,
            'test_results' => $results,
            'passed' => empty($results) || ! in_array(false, array_column($results, 'passed'), true),
        ];
    }

    public function executeSQL(string $code, array $constraints = []): array
    {
        $output = '';
        $errors = '';
        $exitCode = 0;
        $executionTime = 0;

        $startTime = microtime(true);

        try {
            $maxRows = $constraints['max_rows'] ?? 100;
            $timeout = $constraints['timeout_seconds'] ?? 10;

            DB::statement('SET max_execution_time = '.($timeout * 1000));

            $start = microtime(true);
            $results = DB::select($code);
            $executionTime = round((microtime(true) - $start) * 1000, 2);

            $formatted = array_map(function ($row) {
                return (array) $row;
            }, array_slice($results, 0, $maxRows));

            $output = json_encode($formatted, JSON_PRETTY_PRINT);
        } catch (\Throwable $e) {
            $errors = $e->getMessage();
            $exitCode = 1;
            $output = '';
        }

        return [
            'language' => 'sql',
            'success' => $exitCode === 0,
            'output' => trim($output),
            'errors' => trim($errors),
            'exit_code' => $exitCode,
            'execution_time_ms' => round($executionTime, 2),
            'memory_usage_mb' => 0,
            'test_results' => [],
            'passed' => true,
            'client_side' => false,
            'message' => 'SQL executed against the database. READ-ONLY queries are supported.',
        ];
    }

    public function executeUnsupported(string $language): array
    {
        return [
            'language' => $language,
            'success' => false,
            'output' => '',
            'errors' => "Execution for '{$language}' is not available on shared hosting.",
            'execution_time_ms' => 0,
            'memory_usage_mb' => 0,
            'test_results' => [],
            'passed' => false,
        ];
    }

    public function getSupportedLanguages(): array
    {
        return [
            'php' => ['runtime' => 'server', 'label' => 'PHP', 'server_side' => true],
            'sql' => ['runtime' => 'server', 'label' => 'SQL', 'server_side' => true],
            'javascript' => ['runtime' => 'browser', 'label' => 'JavaScript', 'server_side' => false],
            'html' => ['runtime' => 'browser', 'label' => 'HTML', 'server_side' => false],
            'css' => ['runtime' => 'browser', 'label' => 'CSS', 'server_side' => false],
            'typescript' => ['runtime' => 'browser', 'label' => 'TypeScript', 'server_side' => false],
            'python' => ['runtime' => 'pyodide', 'label' => 'Python', 'server_side' => false],
            'c' => ['runtime' => 'wasm', 'label' => 'C', 'server_side' => false],
            'cpp' => ['runtime' => 'wasm', 'label' => 'C++', 'server_side' => false],
            'rust' => ['runtime' => 'wasm', 'label' => 'Rust', 'server_side' => false],
            'go' => ['runtime' => 'wasm', 'label' => 'Go', 'server_side' => false],
            'java' => ['runtime' => 'jsvm', 'label' => 'Java', 'server_side' => false],
            'kotlin' => ['runtime' => 'jsvm', 'label' => 'Kotlin', 'server_side' => false],
            'ruby' => ['runtime' => 'jsvm', 'label' => 'Ruby', 'server_side' => false],
            'swift' => ['runtime' => 'wasm', 'label' => 'Swift', 'server_side' => false],
            'csharp' => ['runtime' => 'wasm', 'label' => 'C#', 'server_side' => false],
        ];
    }

    public function getClientSideInfo(string $language): array
    {
        $normalized = strtolower(trim($language));

        if (isset($this->clientSideLanguages[$normalized])) {
            return $this->clientSideLanguages[$normalized];
        }

        return ['runtime' => 'browser', 'label' => ucfirst($language)];
    }

    protected function filterPHPCode(string $code): string
    {
        $lines = explode("\n", $code);
        $filtered = [];
        foreach ($lines as $line) {
            $trimmed = trim($line);
            $isDisabled = false;
            foreach ($this->phpDisabledFunctions as $func) {
                if (preg_match('/\b'.preg_quote($func, '/').'\s*\(/', $trimmed)) {
                    $isDisabled = true;
                    break;
                }
            }
            if (! $isDisabled) {
                $filtered[] = $line;
            }
        }

        return implode("\n", $filtered);
    }

    protected function phpSandboxWrapper(string $code): string
    {
        return '
            $__sandbox_output = [];
            $__sandbox_vars = [];
            ob_start();
            try {
                extract($__sandbox_vars);
                '.$code.'
                $__sandbox_output["stdout"] = ob_get_clean();
            } catch (\Throwable $__e) {
                ob_end_clean();
                $__sandbox_output["errors"][] = $__e->getMessage();
            }
            return $__sandbox_output;
        ';
    }

    protected function runPHPTestCases(string $code, array $testCases, array $constraints): array
    {
        $results = [];
        foreach ($testCases as $index => $testCase) {
            $input = $testCase['input'] ?? null;
            $expected = $testCase['expected'] ?? null;
            $testName = $testCase['name'] ?? 'Test case '.($index + 1);

            $result = $this->runSinglePHPTestCase($code, $input, $expected);
            $result['name'] = $testName;
            $results[] = $result;
        }

        return $results;
    }

    protected function runSinglePHPTestCase(string $code, mixed $input, mixed $expected): array
    {
        $startTime = microtime(true);

        $output = '';
        $errors = '';
        $exitCode = 0;

        $oldErrorHandler = set_error_handler(function ($severity, $message, $file, $line) use (&$errors) {
            $errors .= "Error: {$message} on line {$line}\n";
        });

        ob_start();
        try {
            $wrapped = $this->phpSandboxWrapper($code);
            eval($wrapped);
            $exitCode = 0;
        } catch (\Throwable $e) {
            $errors .= $e->getMessage();
            $exitCode = 1;
        }
        $output = ob_get_clean();

        restore_error_handler();

        $elapsed = round((microtime(true) - $startTime) * 1000, 2);

        $passed = $exitCode === 0 && trim($output) === trim((string) $expected);

        return [
            'name' => '',
            'input' => $input,
            'expected' => $expected,
            'output' => trim($output),
            'errors' => trim($errors),
            'exit_code' => $exitCode,
            'execution_time_ms' => $elapsed,
            'passed' => $passed,
        ];
    }
}
