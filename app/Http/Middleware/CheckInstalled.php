<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckInstalled
{
    public function handle(Request $request, Closure $next): Response
    {
        $installed = env('APP_INSTALLED', false);

        if (! $installed && ! $request->is('install*')) {
            return redirect()->route('install');
        }

        if ($installed && $request->is('install*')) {
            return redirect('/');
        }

        return $next($request);
    }
}
