<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

defineProps<{
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}>();
</script>

<template>
    <div v-if="links.length > 3" class="flex justify-end">
        <div class="flex space-x-1">
            <Link
                v-for="(link, key) in links"
                :key="key"
                :href="link.url || '#'"
                v-html="link.label"
                class="rounded-lg border border-transparent px-3 py-1 text-xs transition-colors"
                :class="
                    link.active
                        ? 'bg-primary-600 text-white'
                        : link.url
                          ? 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
                          : 'pointer-events-none text-slate-300'
                "
                :preserve-state="true"
                :preserve-scroll="true"
            />
        </div>
    </div>
</template>
