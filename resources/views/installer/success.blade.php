@extends('installer.app')

@section('content')
<div class="bg-white rounded-xl shadow-lg p-8 text-center">
    <div class="mb-8">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-4xl text-green-600">✓</span>
        </div>
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Installation Successful!</h2>
        <p class="text-gray-600">YG SoftX has been installed successfully.</p>
    </div>

    <div class="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-gray-800 mb-4">Your Admin Credentials</h3>
        <p class="text-left space-y-2">
            <span class="block"><strong>Email:</strong> {{ session('admin_email', 'admin@example.com') }}</span>
            <span class="block"><strong>Password:</strong> (the password you set during installation)</span>
            <span class="block"><strong>Admin URL:</strong> /{{ session('admin_url', 'admin') }}</span>
        </p>
    </div>

    <div class="space-y-4">
        <a href="/{{ session('admin_url', 'admin') }}"
           class="block bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200">
            Go to Admin Panel
        </a>
        <a href="/"
           class="block bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition duration-200">
            Visit Frontend
        </a>
    </div>

    <div class="mt-8 pt-6 border-t">
        <p class="text-sm text-gray-500">
            <strong class="font-medium">Important:</strong> Delete the installer files and <code class="bg-gray-200 px-2 py-1 rounded">public/deploy.php</code> for security.
        </p>
    </div>
</div>
@endsection
