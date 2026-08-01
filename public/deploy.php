<?php

/**
 * Browser-based deployment script for cPanel shared hosting (no SSH/terminal access).
 *
 * Usage: Access via browser after Git deployment:
 *   https://tutorial.bimstudies.com/deploy.php?token=ygsoftx-deploy-9f3a7b2c
 *
 * Security: DELETE this file after successful deployment.
 */
$token = $_GET['token'] ?? '';
$expectedToken = 'ygsoftx-deploy-9f3a7b2c';

if ($token !== $expectedToken) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized', 'hint' => 'Provide ?token=YOUR_SECRET_TOKEN']);
    exit;
}

/**
 * Run an Artisan command using the best method available.
 * Tries shell_exec, proc_open, and exec as fallbacks.
 */
function runCommand($command)
{
    // Method 1: shell_exec (most common on shared hosting)
    if (function_exists('shell_exec') && ! in_array('shell_exec', explode(',', ini_get('disable_functions')))) {
        $output = @shell_exec($command.' 2>&1');

        return $output ?: '';
    }

    // Method 2: proc_open (works when shell_exec is disabled)
    if (function_exists('proc_open') && ! in_array('proc_open', explode(',', ini_get('disable_functions')))) {
        $descriptors = [
            0 => ['pipe', 'r'],
            1 => ['pipe', 'w'],
            2 => ['pipe', 'w'],
        ];
        $process = @proc_open($command, $descriptors, $pipes);
        if (is_resource($process)) {
            fclose($pipes[0]);
            $output = stream_get_contents($pipes[1]);
            fclose($pipes[1]);
            fclose($pipes[2]);
            proc_close($process);

            return $output;
        }
    }

    // Method 3: exec
    if (function_exists('exec') && ! in_array('exec', explode(',', ini_get('disable_functions')))) {
        $output = [];
        @exec($command.' 2>&1', $output, $returnCode);

        return implode("\n", $output);
    }

    // Method 4: Use Laravel's internal Process component
    return '';
}

// Ensure we're in the Laravel root
chdir(__DIR__.'/..');

$output = [];
$commands = [
    'Step 1' => 'php artisan clear-compiled',
    'Step 2' => 'php artisan config:clear',
    'Step 3' => 'php artisan route:clear',
    'Step 4' => 'php artisan view:clear',
    'Step 5' => 'php artisan migrate --force',
    'Step 6' => 'php artisan db:seed --force',
    'Step 7' => 'php artisan config:cache',
    'Step 8' => 'php artisan route:cache',
    'Step 9' => 'php artisan view:cache',
    'Step 10' => 'php artisan storage:link',
];

foreach ($commands as $step => $command) {
    $start = microtime(true);
    $result = runCommand($command);
    $duration = round(microtime(true) - $start, 2);

    $output[] = [
        'step' => $step,
        'command' => $command,
        'duration' => $duration.'s',
        'output' => $result ?: '(no output)',
    ];
}

header('Content-Type: text/plain; charset=utf-8');
echo "YG SoftX Deployment Results\n";
echo str_repeat('=', 60)."\n\n";

foreach ($output as $result) {
    echo "{$result['step']}: {$result['command']} ({$result['duration']})\n";
    echo str_repeat('-', 60)."\n";
    echo $result['output']."\n\n";
}

echo str_repeat('=', 60)."\n";
echo "IMPORTANT: DELETE deploy.php from public/ after successful deployment!\n";
