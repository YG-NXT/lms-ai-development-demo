<script setup lang="ts">
import { onClickOutside, useElementBounding, useWindowScroll } from '@vueuse/core';
import { Check, ChevronDown, Search, X } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';

interface Option {
    id: string | number;
    name: string;
    [key: string]: any;
}

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: '',
    },
    options: {
        type: Array as () => Option[],
        default: () => [],
    },
    placeholder: {
        type: String,
        default: 'Select an option',
    },
    label: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    triggerClass: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue', 'change']);

const isOpen = ref(false);
const searchQuery = ref('');
const containerRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const highlightedIndex = ref(-1);

const { bottom, left, width, top, height } = useElementBounding(triggerRef);
const { y: windowY } = useWindowScroll();

const dropdownStyle = computed(() => {
    return {
        position: 'fixed' as const,
        top: `${bottom.value + 4}px`,
        left: `${left.value}px`,
        width: `${width.value}px`,
        zIndex: 9999,
    };
});

const selectedOption = computed(() => {
    return props.options.find((opt) => opt.id == props.modelValue);
});

const filteredOptions = computed(() => {
    if (!searchQuery.value) return props.options;
    const query = searchQuery.value.toLowerCase();
    return props.options.filter((opt) => opt.name.toLowerCase().includes(query));
});

const toggleDropdown = () => {
    if (props.disabled) return;
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
        searchQuery.value = '';
        highlightedIndex.value = -1;
    }
};

const selectOption = (option: Option) => {
    emit('update:modelValue', option.id);
    emit('change', option);
    isOpen.value = false;
    searchQuery.value = '';
};

const clearSelection = (e: Event) => {
    e.stopPropagation();
    emit('update:modelValue', '');
    emit('change', null);
};

onClickOutside(containerRef, () => {
    isOpen.value = false;
});

// Keyboard Navigation
const handleKeydown = (e: KeyboardEvent) => {
    if (props.disabled) return;

    if (!isOpen.value && (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        isOpen.value = true;
        return;
    }

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            highlightedIndex.value = (highlightedIndex.value + 1) % filteredOptions.value.length;
            break;
        case 'ArrowUp':
            e.preventDefault();
            highlightedIndex.value = (highlightedIndex.value - 1 + filteredOptions.value.length) % filteredOptions.value.length;
            break;
        case 'Enter':
            e.preventDefault();
            if (highlightedIndex.value >= 0 && highlightedIndex.value < filteredOptions.value.length) {
                selectOption(filteredOptions.value[highlightedIndex.value]);
            }
            break;
        case 'Escape':
            isOpen.value = false;
            break;
        case 'Tab':
            isOpen.value = false;
            break;
    }
};

// Close on scroll to prevent floating dropdown
watch(windowY, () => {
    if (isOpen.value) isOpen.value = false;
});

watch(isOpen, (val) => {
    if (val) {
        highlightedIndex.value = filteredOptions.value.findIndex((opt) => opt.id === props.modelValue);
    }
});
</script>

<template>
    <div ref="containerRef" class="relative w-full text-start">
        <label v-if="label" class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
            {{ label }}
        </label>

        <div class="relative">
            <button
                ref="triggerRef"
                type="button"
                @click="toggleDropdown"
                @keydown="handleKeydown"
                :disabled="disabled"
                class="flex w-full items-center justify-between rounded-2xl border bg-slate-50 px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:bg-slate-900/50"
                :class="[
                    error ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700/60',
                    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                    triggerClass,
                ]"
            >
                <span v-if="selectedOption" class="truncate font-medium text-slate-900 dark:text-white">
                    {{ selectedOption.name }}
                </span>
                <span v-else class="truncate text-slate-400">
                    {{ placeholder }}
                </span>

                <div class="flex items-center gap-2">
                    <X v-if="selectedOption && !disabled" @click="clearSelection" :size="14" class="text-slate-400 hover:text-rose-500" />
                    <ChevronDown :size="18" class="text-slate-400 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" />
                </div>
            </button>

            <!-- Error Message -->
            <p v-if="error" class="mt-2 text-xs font-medium text-rose-500">{{ error }}</p>

            <!-- Dropdown -->
            <Teleport to="body">
                <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                    <div
                        v-if="isOpen"
                        ref="containerRef"
                        :style="dropdownStyle"
                        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800"
                    >
                        <!-- Search Input -->
                        <div class="relative border-b border-slate-100 p-2 dark:border-slate-700">
                            <div class="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                                <Search :size="14" class="text-slate-400" />
                            </div>
                            <input
                                v-model="searchQuery"
                                type="text"
                                class="w-full rounded-xl border-none bg-slate-50 py-2 pr-4 pl-9 text-xs focus:ring-0 focus:outline-none dark:bg-slate-900/50"
                                :placeholder="__('Search...')"
                                @keydown="handleKeydown"
                                autoFocus
                            />
                        </div>

                        <!-- Options List -->
                        <div class="custom-scrollbar max-h-60 overflow-y-auto p-1">
                            <div
                                v-for="(option, index) in filteredOptions"
                                :key="option.id"
                                @click="selectOption(option)"
                                @mouseenter="highlightedIndex = index"
                                class="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-xs transition-colors"
                                :class="[
                                    option.id == modelValue
                                        ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                                        : highlightedIndex === index
                                          ? 'bg-slate-50 text-slate-900 dark:bg-slate-700/50 dark:text-white'
                                          : 'text-slate-600 dark:text-slate-400',
                                ]"
                            >
                                <span class="truncate font-medium">{{ option.name }}</span>
                                <Check v-if="option.id == modelValue" :size="14" />
                            </div>

                            <div v-if="filteredOptions.length === 0" class="px-3 py-8 text-center">
                                <p class="text-xs text-slate-400">{{ __('No results found') }}</p>
                            </div>
                        </div>
                    </div>
                </transition>
            </Teleport>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #334155;
}
</style>
