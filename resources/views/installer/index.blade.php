@extends('installer.app')

@section('content')
<div class="bg-white rounded-xl shadow-lg p-8">
    <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-800">Installation</h2>
        <p class="text-gray-600 mt-2">Fill in the form below to install YG SoftX LMS.</p>
    </div>

    @if (session('error'))
        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {{ session('error') }}
        </div>
    @endif

    @if (! $requirements['pass'])
        <div class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6">
            <strong class="font-medium">Warning:</strong> Some requirements are not met. Continue at your own risk.
        </div>
    @endif

    <form method="POST" action="{{ route('install.store') }}">
        @csrf

        <div class="space-y-8">
            {{-- Application Settings --}}
            <div>
                <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">Application Settings</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Application URL</label>
                        <input type="url" name="app_url" value="https://{{ request()->getHost() }}"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                               required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Admin Panel URL</label>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                /
                            </span>
                            <input type="text" name="admin_path" value="admin"
                                   class="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                   required>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">Your admin panel will be available at: /<span id="adminPathPreview">admin</span></p>
                    </div>
                </div>
            </div>

            {{-- Database Settings --}}
            <div>
                <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">Database Configuration</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Database Host (optional for SQLite)</label>
                        <input type="text" name="database_host" value="127.0.0.1"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Port (optional for SQLite)</label>
                        <input type="number" name="database_port" value="3306"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Database Name / Path *</label>
                        <input type="text" name="database_name"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                               required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Database Username (optional for SQLite)</label>
                        <input type="text" name="database_username"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Database Password (optional for SQLite)</label>
                        <input type="password" name="database_password"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                               autocomplete="new-password">
                    </div>
                </div>
            </div>

            {{-- Admin Account --}}
            <div>
                <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">Admin Account</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Admin Name *</label>
                        <input type="text" name="admin_name" value="Admin"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                               required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Admin Email *</label>
                        <input type="email" name="admin_email" value="admin@example.com"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                               required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                        <input type="password" name="admin_password"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                               required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                        <input type="password" name="admin_password_confirmation"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                               required>
                    </div>
                </div>
            </div>

            {{-- Requirements Summary --}}
            <div>
                <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">Server Requirements</h3>
                <div class="mt-4 space-y-2">
                    <div class="flex items-center">
                        <span class="w-6 h-6 rounded-full {{ $requirements['php_ok'] ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600' }} flex items-center justify-center mr-3">
                            {{ $requirements['php_ok'] ? '✓' : '✗' }}
                        </span>
                        <span class="{{ $requirements['php_ok'] ? 'text-green-700' : 'text-red-700' }}">
                            PHP {{ $requirements['php_version'] }} (>= {{ $requirements['php_required'] }})
                        </span>
                    </div>
                    @foreach ($requirements['extensions'] as $ext => $loaded)
                        <div class="flex items-center">
                            <span class="w-6 h-6 rounded-full {{ $loaded ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600' }} flex items-center justify-center mr-3">
                                {{ $loaded ? '✓' : '✗' }}
                            </span>
                            <span class="{{ $loaded ? 'text-green-700' : 'text-red-700' }}">
                                PHP Extension: {{ $ext }}
                            </span>
                        </div>
                    @endforeach
                    @foreach ($requirements['writable'] as $dir => $ok)
                        <div class="flex items-center">
                            <span class="w-6 h-6 rounded-full {{ $ok ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600' }} flex items-center justify-center mr-3">
                                {{ $ok ? '✓' : '✗' }}
                            </span>
                            <span class="{{ $ok ? 'text-green-700' : 'text-red-700' }}">
                                Writable: {{ $dir }}
                            </span>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>

        <div class="mt-8 pt-6 border-t">
            <button type="submit"
                    class="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 flex items-center justify-center">
                <span>Install YG SoftX</span>
            </button>
            <p class="text-center text-sm text-gray-500 mt-4">
                By clicking Install, you agree to the Terms and Conditions.
            </p>
        </div>
    </form>
</div>
@endsection

@push('scripts')
<script>
document.querySelector('input[name="admin_path"]').addEventListener('input', function(e) {
    document.getElementById('adminPathPreview').textContent = e.target.value;
});
</script>
@endpush
