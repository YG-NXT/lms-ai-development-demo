<?php

/**
 * Browser-based deployment script for cPanel shared hosting (no SSH/terminal access).
 * 
 * Usage: Upload this file to public/, then access:
 *   https://tutorial.bimstudies.com/deploy.php?token=YOUR_SECRET_TOKEN
 *
 * Security: Replace YOUR_SECRET_TOKEN with a strong random string,
 * then DELETE this file after deployment is complete.
 */

$token = $_GET['token'] ?? '';
$expectedToken = 'ygsoftx-deploy-9f3a7b2c';

if ($token !== $expectedToken) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized', 'hint' => 'Provide ?token=YOUR_SECRET_TOKEN']);
    exit;
}

$output = [];
$commands = [
    'php artisan clear-compiled',
    'php artisan config:clear',
    'php artisan route:clear',
    'php artisan view:clear',
    'php artisan migrate --force',
    'php artisan db:seed --force',
    'php artisan config:cache',
    'php artisan route:cache',
    'php artisan view:cache',
];

foreach ($commands as $command) {
    $start = microtime(true);
    $result = shell_exec($command . ' 2>&1');
    $duration = round(microtime(true) - $start, 2);

    $output[] = [
        'command' => $command,
        'duration' => $duration . 's',
        'output' => $result ?: '(no output)',
        'success' => $result !== null,
    ];
}

header('Content-Type: application/json');
echo json_encode($output, JSON_PRETTY_PRINT);

// Self-destruct hint
echo "\n\nDELETE deploy.php after successful deployment!";
