<?php

namespace Tests\Feature;

use Tests\TestCase;

class InstallControllerTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        config(['installer.installed' => false]);
    }

    protected function tearDown(): void
    {
        putenv('APP_INSTALLED=true');
        $_ENV['APP_INSTALLED'] = 'true';
        $_SERVER['APP_INSTALLED'] = 'true';
        putenv('SESSION_DRIVER=array');
        $_ENV['SESSION_DRIVER'] = 'array';
        $_SERVER['SESSION_DRIVER'] = 'array';

        parent::tearDown();
    }

    public function test_installer_index_page_loads_when_not_installed()
    {
        $response = $this->get('/install');

        $response->assertOk();
        $response->assertViewIs('installer.index');
    }

    public function test_installer_redirects_when_installed()
    {
        config(['installer.installed' => true]);

        $response = $this->get('/install');

        $response->assertRedirect('/');
    }

    public function test_installer_form_validates_required_fields()
    {
        $response = $this->from('/install')
            ->post('/install', [
                'app_url' => 'not-a-url',
                'admin_path' => '',
                'database_name' => '',
                'admin_name' => '',
                'admin_email' => 'not-an-email',
                'admin_password' => 'short',
                'admin_password_confirmation' => 'different',
            ]);

        $response->assertRedirect('/install');
        $response->assertSessionHasErrors([
            'app_url',
            'admin_path',
            'database_name',
            'admin_name',
            'admin_email',
            'admin_password',
        ]);
    }

    public function test_installer_success_page_redirects_when_not_installed()
    {
        $response = $this->get('/install/success');

        $response->assertRedirect('/install');
    }

    public function test_session_driver_is_file_when_not_installed()
    {
        putenv('APP_INSTALLED=false');
        $_ENV['APP_INSTALLED'] = 'false';
        $_SERVER['APP_INSTALLED'] = 'false';
        putenv('SESSION_DRIVER=database');
        $_ENV['SESSION_DRIVER'] = 'database';
        $_SERVER['SESSION_DRIVER'] = 'database';
        putenv('CACHE_STORE=database');
        $_ENV['CACHE_STORE'] = 'database';
        $_SERVER['CACHE_STORE'] = 'database';
        putenv('QUEUE_CONNECTION=database');
        $_ENV['QUEUE_CONNECTION'] = 'database';
        $_SERVER['QUEUE_CONNECTION'] = 'database';

        $this->refreshApplication();

        $response = $this->withExceptionHandling()
            ->get('/install');

        $response->assertOk();
    }
}
