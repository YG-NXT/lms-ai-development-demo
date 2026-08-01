<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Installation extends Model
{
    protected $fillable = [
        'app_url',
        'admin_path',
        'database_host',
        'database_port',
        'database_name',
        'database_username',
        'database_password',
        'admin_name',
        'admin_email',
        'admin_password',
    ];

    protected $hidden = [
        'database_password',
        'admin_password',
    ];

    public static function isInstalled(): bool
    {
        return self::exists();
    }
}
