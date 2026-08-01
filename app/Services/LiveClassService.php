<?php

namespace App\Services;

use App\Models\LiveClass;
use App\Traits\LogsActivity;

class LiveClassService
{
    use LogsActivity;

    public function getAll(array $filters = [], int $perPage = 10)
    {
        return LiveClass::query()
            ->with(['course'])
            ->when(! empty($filters['search']), function ($query) use ($filters) {
                $search = $filters['search'];
                $query->where('title', 'like', "%{$search}%");
            })
            ->when(! empty($filters['course_id']), function ($query) use ($filters) {
                $query->where('course_id', $filters['course_id']);
            })
            ->when(! empty($filters['status']), function ($query) use ($filters) {
                $status = $filters['status'];
                $now = now();
                $currentTime = $now->format('H:i:s');
                $currentDate = $now->format('Y-m-d');

                $query->where(function ($q) use ($status, $currentTime, $currentDate) {
                    if ($status === 'upcoming') {
                        // Specific: Future date OR (Today AND Start Time > Now)
                        $q->where(function ($sq) use ($currentDate, $currentTime) {
                            $sq->where('type', 'specific')
                                ->where(function ($ssq) use ($currentDate, $currentTime) {
                                    $ssq->where('class_date', '>', $currentDate)
                                        ->orWhere(function ($sssq) use ($currentDate, $currentTime) {
                                            $sssq->where('class_date', '=', $currentDate)
                                                ->where('start_time', '>', $currentTime);
                                        });
                                });
                        })
                        // Daily: Start Time > Now (assuming daily implies *today's* occurrence is strictly time-based)
                            ->orWhere(function ($sq) use ($currentTime) {
                                $sq->where('type', 'daily')
                                    ->where('start_time', '>', $currentTime);
                            });
                    } elseif ($status === 'live' || $status === 'running') {
                        // Specific: Today AND Start <= Now AND End >= Now
                        $q->where(function ($sq) use ($currentDate, $currentTime) {
                            $sq->where('type', 'specific')
                                ->where('class_date', '=', $currentDate)
                                ->where('start_time', '<=', $currentTime)
                                ->where('end_time', '>=', $currentTime);
                        })
                        // Daily: Start <= Now AND End >= Now
                            ->orWhere(function ($sq) use ($currentTime) {
                                $sq->where('type', 'daily')
                                    ->where('start_time', '<=', $currentTime)
                                    ->where('end_time', '>=', $currentTime);
                            });
                    } elseif ($status === 'finished' || $status === 'expired') {
                        // Specific: Past date OR (Today AND End Time < Now)
                        $q->where(function ($sq) use ($currentDate, $currentTime) {
                            $sq->where('type', 'specific')
                                ->where(function ($ssq) use ($currentDate, $currentTime) {
                                    $ssq->where('class_date', '<', $currentDate)
                                        ->orWhere(function ($sssq) use ($currentDate, $currentTime) {
                                            $sssq->where('class_date', '=', $currentDate)
                                                ->where('end_time', '<', $currentTime);
                                        });
                                });
                        })
                        // Daily: End Time < Now
                            ->orWhere(function ($sq) use ($currentTime) {
                                $sq->where('type', 'daily')
                                    ->where('end_time', '<', $currentTime);
                            });
                    }
                });
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data): LiveClass
    {
        $liveClass = LiveClass::create($data);
        $this->logActivity('create_live_class', "Created live class: {$liveClass->title}");

        return $liveClass;
    }

    public function update(LiveClass $liveClass, array $data): LiveClass
    {
        $liveClass->update($data);
        $this->logActivity('update_live_class', "Updated live class: {$liveClass->title}");

        return $liveClass;
    }

    public function delete(LiveClass $liveClass): bool
    {
        $this->logActivity('delete_live_class', "Deleted live class: {$liveClass->title}");

        return $liveClass->delete();
    }
}
