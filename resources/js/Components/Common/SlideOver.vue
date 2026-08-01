<script setup lang="ts">
import { X } from 'lucide-vue-next';
import { onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: '',
    },
    maxWidth: {
        type: String,
        default: 'md', // sm, md, lg, xl, 2xl
    },
});

const emit = defineEmits(['close']);

const close = () => {
    emit('close');
};

const maxWidthClass = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
}[props.maxWidth];

// Handle Escape key
const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.show) {
        close();
    }
};

// Prevent Body Scroll
watch(
    () => props.show,
    (value) => {
        if (value) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    },
);

onMounted(() => {
    document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape);
    document.body.style.overflow = 'auto';
});
</script>

<template>
    <Teleport to="body">
        <div
            class="fixed inset-0 z-100 overflow-hidden"
            :class="{ 'pointer-events-none': !show }"
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
        >
            <div class="absolute inset-0 overflow-hidden">
                <!-- Backdrop -->
                <transition
                    enter-active-class="ease-out duration-300 transition-opacity"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-200 transition-opacity"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div v-if="show" class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="close"></div>
                </transition>

                <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <transition
                        enter-active-class="transform transition ease-out duration-300 sm:duration-500"
                        enter-from-class="translate-x-full"
                        enter-to-class="translate-x-0"
                        leave-active-class="transform transition ease-in duration-200 sm:duration-300"
                        leave-from-class="translate-x-0"
                        leave-to-class="translate-x-full"
                    >
                        <div v-if="show" class="pointer-events-auto w-screen" :class="maxWidthClass">
                            <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl dark:bg-slate-800">
                                <!-- Header -->
                                <div class="border-b border-slate-100 bg-slate-50/50 px-4 py-6 sm:px-6 dark:border-slate-700 dark:bg-slate-800/50">
                                    <div class="flex items-start justify-between">
                                        <h2 id="slide-over-title" class="text-lg font-extrabold text-slate-900 dark:text-white">
                                            {{ title }}
                                        </h2>
                                        <div class="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                class="inline-flex rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:hover:bg-slate-700"
                                                @click="close"
                                            >
                                                <span class="sr-only">Close panel</span>
                                                <X class="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Content -->
                                <div class="relative flex-1 px-4 py-6 sm:px-6">
                                    <slot />
                                </div>

                                <!-- Footer -->
                                <div v-if="$slots.footer" class="border-t border-slate-100 px-4 py-4 sm:px-6 dark:border-slate-700">
                                    <slot name="footer" />
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </Teleport>
</template>
