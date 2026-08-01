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

header('Content-Type: text/plain; charset=utf-8');

// Bootstrap Laravel application
chdir(__DIR__.'/..');

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$commands = [
    'Step 1' => 'clear-compiled',
    'Step 2' => 'config:clear',
    'Step 3' => 'route:clear',
    'Step 4' => 'view:clear',
    'Step 5' => 'cache:clear',
    'Step 6' => 'migrate',
    'Step 7' => 'db:seed',
    'Step 8' => 'config:cache',
    'Step 9' => 'route:cache',
    'Step 10' => 'view:cache',
];

echo "YG SoftX Deployment Results\n";
echo str_repeat('=', 60)."\n\n";

foreach ($commands as $step => $command) {
    $start = microtime(true);

    $parameters = ['--force' => true];

    $returnCode = $kernel->call($command, $parameters);
    $output = $kernel->output();
    $duration = round(microtime(true) - $start, 2);

    echo "{$step}: php artisan {$command} --force ({$duration}s)\n";
    echo str_repeat('-', 60)."\n";
    echo trim($output ?: '(no output)')."\n\n";
}

echo str_repeat('=', 60)."\n";
echo "IMPORTANT: Delete deploy.php from public/ after successful deployment!\n";
