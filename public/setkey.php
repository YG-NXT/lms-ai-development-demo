<?php

/**
 * Minimal key generator that bypasses Laravel bootstrap.
 * Run this to generate and set APP_KEY, then delete this file.
 */
$envFile = __DIR__.'/../.env';
if (! file_exists($envFile)) {
    exit("ERROR: .env file not found at $envFile\n");
}

$content = file_get_contents($envFile);

// Generate a valid 32-byte key and base64 encode it
$key = base64_encode(random_bytes(32));
$newKey = 'base64:'.$key;

// Check if APP_KEY exists in .env
if (preg_match('/^APP_KEY=/m', $content)) {
    $content = preg_replace('/^APP_KEY=.*$/m', 'APP_KEY='.$newKey, $content);
} else {
    $content .= "\nAPP_KEY=".$newKey."\n";
}

file_put_contents($envFile, $content);
echo "APP_KEY set to: $newKey\n";
echo 'Key length (base64 decoded): '.strlen(base64_decode($key))." bytes\n";
echo "Done. Delete this file after verifying your application works.\n";
