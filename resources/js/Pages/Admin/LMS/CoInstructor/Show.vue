<script setup lang="ts">
import { attach as coInstructorAttach, detach as coInstructorDetach } from '@/actions/App/Http/Controllers/Admin/CoInstructorController';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { Plus, Trash2, User, UserCheck } from 'lucide-vue-next';
import { PropType } from 'vue';

const props = defineProps({
    course: {
        type: Object as PropType<any>,
        required: true,
    },
    availableInstructors: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
});

const attachForm = useForm({
    instructor_id: null as number | null,
    role: 'instructor',
});

const attachInstructor = () => {
    if (!attachForm.instructor_id) return;

    attachForm.post(coInstructorAttach.url(props.course.id), {
        onSuccess: () => {
            attachForm.reset();
            window.location.reload();
        },
    });
};

const detachInstructor = (instructorId: number) => {
    if (!confirm('Remove this co-instructor?')) return;

    coInstructorDetach.delete(coInstructorDetach.url(props.course.id, instructorId), {
        onSuccess: () => {
            window.location.reload();
        },
    });
};
</script>

<template>
    <Head :title="__('Manage Co-Instructors')" />

    <AdminLayout>
        <div class="animate-fade-in mx-auto max-w-6xl space-y-6">
            <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <h1 class="flex items-center gap-3 text-xl font-extrabold text-slate-900 dark:text-white">
                        <UserCheck class="text-primary-500" :size="28" />
                        {{ __('Manage Co-Instructors') }}
                    </h1>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {{ __('Course:') }} <span class="font-medium">{{ course.title }}</span>
                    </p>
                </div>
            </div>

            <div class="grid gap-6 lg:grid-cols-2">
                <div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <h2 class="mb-4 text-lg font-bold text-slate-900 dark:text-white">{{ __('Add Co-Instructor') }}</h2>

                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                {{ __('Select Instructor') }}
                            </label>
                            <select
                                v-model="attachForm.instructor_id"
                                class="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-800 dark:bg-slate-900"
                            >
                                <option :value="null" disabled>{{ __('Choose an instructor...') }}</option>
                                <option
                                    v-for="instructor in availableInstructors"
                                    :key="instructor.id"
                                    :value="instructor.id"
                                >
                                    {{ instructor.name }} ({{ instructor.email }})
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                {{ __('Role') }}
                            </label>
                            <input
                                v-model="attachForm.role"
                                type="text"
                                placeholder="e.g. Assistant Instructor"
                                class="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-800 dark:bg-slate-900"
                            />
                        </div>

                        <button
                            @click="attachInstructor"
                            :disabled="!attachForm.instructor_id || attachForm.processing"
                            class="w-full rounded-xl bg-primary-500 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110 disabled:opacity-50"
                        >
                            {{ __('Add Co-Instructor') }}
                        </button>
                    </div>
                </div>

                <div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <h2 class="mb-4 text-lg font-bold text-slate-900 dark:text-white">{{ __('Assigned Co-Instructors') }}</h2>

                    <div
                        v-if="course.instructors && course.instructors.length > 0"
                        class="space-y-3"
                    >
                        <div
                            v-for="instructor in course.instructors"
                            :key="instructor.id"
                            class="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-800"
                        >
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800"
                                >
                                    <User :size="18" />
                                </div>
                                <div>
                                    <span class="block text-sm font-bold text-slate-900 dark:text-white">{{ instructor.name }}</span>
                                    <span class="block text-xs text-slate-500 dark:text-slate-400">{{ instructor.email }}</span>
                                    <span
                                        v-if="instructor.pivot.role"
                                        class="block text-xs text-slate-400"
                                    >Role: {{ instructor.pivot.role }}</span>
                                </div>
                            </div>
                            <button
                                @click="detachInstructor(instructor.id)"
                                class="rounded-xl p-2 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/10"
                                :title="__('Remove')"
                            >
                                <Trash2 :size="16" />
                            </button>
                        </div>
                    </div>

                    <div
                        v-else
                        class="py-8 text-center text-slate-400"
                    >
                        <UserCheck :size="48" class="mx-auto mb-2 opacity-30" />
                        <p>{{ __('No co-instructors assigned to this course yet.') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
