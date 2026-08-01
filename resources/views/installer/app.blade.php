<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>YG SoftX Installer</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="icon" href="/favicon.ico">
</head>
<body class="bg-gray-50 min-h-screen flex items-center justify-center font-sans">
    <div class="w-full max-w-3xl mx-auto py-12 px-4">
        <div class="flex justify-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800">YG SoftX</h1>
            <span class="text-gray-400 mx-2">—</span>
            <span class="text-lg text-gray-500">Installer</span>
        </div>

        @yield('content')
    </div>
</body>
</html>
