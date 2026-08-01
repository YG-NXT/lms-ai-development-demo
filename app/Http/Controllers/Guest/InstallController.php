<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;

class InstallController extends Controller
{
    protected array $requirements = [
        'php' => '8.2',
        'extensions' => ['pdo', 'mbstring', 'openssl', 'json', 'ctype', 'xml', 'fileinfo', 'curl'],
        'writable' => ['storage', 'bootstrap/cache'],
    ];

    public function index()
    {
        if (config('installer.installed', false)) {
            return redirect('/');
        }

        return view('installer.index', ['requirements' => $this->checkRequirements()]);
    }

    public function store(Request $request)
    {
        if (config('installer.installed', false)) {
            return redirect('/');
        }

        $validated = $request->validate([
            'app_url' => 'required|url',
            'admin_path' => 'required|string|max:50',
            'database_host' => 'required|string',
            'database_port' => 'required|numeric',
            'database_name' => 'required|string',
            'database_username' => 'required|string',
            'database_password' => 'nullable|string',
            'admin_name' => 'required|string|max:255',
            'admin_email' => 'required|email|max:255',
            'admin_password' => 'required|string|min:8|confirmed',
        ]);

        $requirements = $this->checkRequirements();
        if (! $requirements['pass']) {
            return back()->with('error', 'Server requirements not met. Please fix the issues and try again.');
        }

        try {
            $this->updateEnv($validated, false);

            Artisan::call('config:clear');
            Artisan::call('migrate:fresh', ['--force' => true]);

            $role = Role::where('name', 'superadmin')->first();

            $admin = User::updateOrCreate(
                ['email' => $validated['admin_email']],
                [
                    'name' => $validated['admin_name'],
                    'password' => Hash::make($validated['admin_password']),
                    'user_type' => $role ? $role->id : null,
                    'status' => 1,
                ]
            );

            if ($role) {
                $admin->roles()->sync([$role->id]);
            }

            // Mark as installed
            $this->updateEnv($validated, true);
            Artisan::call('config:cache');
            cache()->flush();

            return redirect()->route('install.success')
                ->with('admin_url', $validated['admin_path'])
                ->with('admin_email', $validated['admin_email']);
        } catch (\Exception $e) {
            return back()->with('error', 'Installation failed: '.$e->getMessage());
        }
    }

    public function success()
    {
        if (! config('installer.installed', false)) {
            return redirect()->route('install');
        }

        return view('installer.success');
    }

    protected function checkRequirements(): array
    {
        $phpOk = version_compare(PHP_VERSION, $this->requirements['php']) >= 0;

        $extensions = [];
        foreach ($this->requirements['extensions'] as $ext) {
            $extensions[$ext] = extension_loaded($ext);
        }
        $extensionOk = ! in_array(false, $extensions, true);

        $writable = [];
        foreach ($this->requirements['writable'] as $dir) {
            $path = base_path($dir);
            $writable[$dir] = is_writable($path);
        }
        $writableOk = ! in_array(false, $writable, true);

        return [
            'pass' => $phpOk && $extensionOk && $writableOk,
            'php_version' => PHP_VERSION,
            'php_required' => $this->requirements['php'],
            'php_ok' => $phpOk,
            'extensions' => $extensions,
            'extension_ok' => $extensionOk,
            'writable' => $writable,
            'writable_ok' => $writableOk,
        ];
    }

    protected function updateEnv(array $data, bool $setInstalled): void
    {
        $envPath = base_path('.env');
        $envContent = file_exists($envPath) ? file_get_contents($envPath) : '';

        $pairs = [
            'APP_URL' => $data['app_url'],
            'DB_HOST' => $data['database_host'],
            'DB_PORT' => $data['database_port'],
            'DB_DATABASE' => $data['database_name'],
            'DB_USERNAME' => $data['database_username'],
            'DB_PASSWORD' => $data['database_password'] ?? '',
            'ADMIN_PATH' => $data['admin_path'],
        ];

        if ($setInstalled) {
            $pairs['APP_INSTALLED'] = 'true';
        }

        foreach ($pairs as $key => $value) {
            if (str_contains($envContent, $key.'=')) {
                $envContent = preg_replace('/^'.$key.'=.*/m', $key.'='.$value, $envContent);
            } else {
                $envContent .= "\n".$key.'='.$value."\n";
            }
        }

        file_put_contents($envPath, $envContent);
    }
}
