<?php

/**
 * Browser-based deployment script for cPanel shared hosting (no SSH/terminal access).
 *
 * Usage: Access via browser after uploading files via ZIP:
 *   https://tutorial.bimstudies.com/deploy.php?token=ygsoftx-deploy-9f3a7b2c
 *
 * This script handles pre-installation setup only (key generation, cache, storage).
 * For database setup and migrations, visit /install after running this script.
 *
 * Security: DELETE this file after successful installation.
 */

$token = $_GET['token'] ?? '';
$expectedToken = 'ygsoftx-deploy-9f3a7b2c';

if ($token !== $expectedToken) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized', 'hint' => 'Provide ?token=' . $expectedToken]);
    exit;
}

header('Content-Type: text/plain; charset=utf-8');

chdir(__DIR__ . '/..');

// Check if vendor directory exists
if (! file_exists(__DIR__ . '/../vendor/autoload.php')) {
    echo "ERROR: vendor/autoload.php not found!\n\n";
    echo "You need to run 'composer install' before deployment.\n";
    echo "If you have cPanel Terminal access, run:\n";
    echo "  composer install --no-dev --prefer-dist --optimize-autoloader\n\n";
    echo "If you don't have Terminal access, ask your hosting provider to run it\n";
    echo "or use cPanel's 'Setup Node.js' app to create a custom PHP environment.\n";
    echo "Alternatively, use cPanel Git deployment which auto-runs composer install.\n";
    exit;
}

require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Check .env exists
$envPath = base_path('.env');
if (! file_exists($envPath)) {
    echo "ERROR: .env file not found!\n\n";
    echo "Create a .env file by copying .env.example:\n";
    echo "  cp .env.example .env\n";
    echo "Then edit .env with your database credentials.\n";
    exit;
}

$commands = [
    'Step 1' => 'key:generate',
    'Step 2' => 'config:clear',
    'Step 3' => 'route:clear',
    'Step 4' => 'view:clear',
    'Step 5' => 'cache:clear',
    'Step 6' => 'storage:link',
    'Step 7' => 'config:cache',
    'Step 8' => 'route:cache',
];

echo "YG SoftX Pre-Installation Setup\n";
echo str_repeat('=', 60) . "\n\n";

foreach ($commands as $step => $command) {
    $start = microtime(true);

    $parameters = $command === 'key:generate' ? ['--force' => true] : ['--force' => true];

    $returnCode = $kernel->call($command, $parameters);
    $output = $kernel->output();
    $duration = round(microtime(true) - $start, 2);

    echo "{$step}: php artisan {$command} --force ({$duration}s)\n";
    echo str_repeat('-', 60) . "\n";
    echo trim($output ?: '(no output)') . "\n\n";

    if ($returnCode !== 0) {
        echo "  WARNING: Command returned non-zero exit code: {$returnCode}\n\n";
    }
}

echo str_repeat('=', 60) . "\n";
echo "Pre-installation setup complete!\n\n";
echo "Next step: Visit https://" . $_SERVER['HTTP_HOST'] . "/install\n";
echo "Fill in the installation form to complete setup.\n\n";
echo "IMPORTANT: Delete deploy.php from public/ after successful installation!\n";
