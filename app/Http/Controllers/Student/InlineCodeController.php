<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Services\CodeExecutionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InlineCodeController extends Controller
{
    public function execute(Request $request, CodeExecutionService $service): JsonResponse
    {
        $request->validate([
            'language' => 'required|string',
            'code' => 'required|string',
        ]);

        $language = $request->input('language');
        $code = $request->input('code');

        $normalized = strtolower(trim($language));

        if (in_array($normalized, ['php', 'sql'])) {
            $result = $service->executeServerSide($normalized, $code);
        } else {
            $result = $service->executeClientSide($normalized, $code);
        }

        return response()->json($result);
    }

    public function terminal(Request $request, CodeExecutionService $service): JsonResponse
    {
        $request->validate([
            'command' => 'required|string',
        ]);

        $command = trim($request->input('command'));

        $result = $service->executeTerminal($command);

        return response()->json($result);
    }
}
