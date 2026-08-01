<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LiveClass\StoreLiveClassRequest;
use App\Http\Requests\Admin\LiveClass\UpdateLiveClassRequest;
use App\Models\Course;
use App\Models\LiveClass;
use App\Services\LiveClassService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LiveClassController extends Controller
{
    public function __construct(
        protected LiveClassService $liveClassService
    ) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', LiveClass::class);

        $filters = $request->only(['search', 'course_id', 'status']);
        $liveClasses = $this->liveClassService->getAll($filters);

        return Inertia::render('Admin/LMS/LiveClass/Index', [
            'liveClasses' => $liveClasses,
            'filters' => $filters,
            'courses' => Course::active()->get(['id', 'title']),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', LiveClass::class);

        return Inertia::render('Admin/LMS/LiveClass/Create', [
            'courses' => Course::active()->get(['id', 'title']),
        ]);
    }

    public function store(StoreLiveClassRequest $request): RedirectResponse
    {
        $this->authorize('create', LiveClass::class);

        $this->liveClassService->create($request->validated());

        return redirect()->route('admin.live-classes.index')
            ->with('success', 'Live class scheduled successfully');
    }

    public function edit(LiveClass $liveClass): Response
    {
        $this->authorize('update', $liveClass);

        return Inertia::render('Admin/LMS/LiveClass/Edit', [
            'liveClass' => $liveClass,
            'courses' => Course::active()->get(['id', 'title']),
        ]);
    }

    public function update(UpdateLiveClassRequest $request, LiveClass $liveClass): RedirectResponse
    {
        $this->authorize('update', $liveClass);

        $this->liveClassService->update($liveClass, $request->validated());

        return redirect()->route('admin.live-classes.index')
            ->with('success', 'Live class updated successfully');
    }

    public function destroy(LiveClass $liveClass): RedirectResponse
    {
        $this->authorize('delete', $liveClass);

        $this->liveClassService->delete($liveClass);

        return back()->with('success', 'Live class deleted successfully');
    }
}
