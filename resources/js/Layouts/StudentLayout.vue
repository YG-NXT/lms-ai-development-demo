<script setup lang="ts">
import Toast from '@/Components/Common/Toast.vue';
import StudentHeader from '@/Components/Student/Header.vue';
import StudentSidebar from '@/Components/Student/Sidebar.vue';
import { onMounted, ref } from 'vue';

const isSidebarCollapsed = ref(false);
const isMobileSidebarOpen = ref(false);

const toggleSidebarSize = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const toggleMobileSidebar = () => {
    isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
};

onMounted(() => {
    const direction = localStorage.getItem('direction') || 'ltr';
    document.documentElement.setAttribute('dir', direction);
});
</script>

<template>
    <div
        class="flex min-h-screen bg-admin-content font-sans text-slate-900 transition-colors duration-300 dark:bg-admin-content-dark dark:text-slate-100"
    >
        <Toast />

        <!-- Mobile Backdrop -->
        <div
            v-if="isMobileSidebarOpen"
            class="fixed inset-0 z-40 bg-slate-900/40 lg:hidden dark:bg-black/60"
            @click="isMobileSidebarOpen = false"
        ></div>

        <!-- Sidebar -->
        <StudentSidebar
            :isCollapsed="isSidebarCollapsed"
            :class="{
                'translate-x-0': isMobileSidebarOpen,
                'ltr:-translate-x-full rtl:translate-x-full': !isMobileSidebarOpen,
                'lg:translate-x-0!': true, // Always visible on desktop
            }"
            class="fixed top-0 z-50 h-screen lg:sticky"
            @toggleCollapse="toggleSidebarSize"
        />

        <!-- Main Content -->
        <div class="flex min-h-screen min-w-0 flex-1 flex-col">
            <StudentHeader @toggleSidebar="toggleMobileSidebar" @toggleSidebarSize="toggleSidebarSize" />

            <!-- Workspace -->
            <main class="flex-1 space-y-6 overflow-y-auto p-4 lg:p-6">
                <slot />
            </main>
        </div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');

body {
    font-family: var(--main-font);
    -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar {
    width: 4px;
}
::-webkit-scrollbar-track {
    background: transparent;
}
::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}
.dark ::-webkit-scrollbar-thumb {
    background: #475569;
}
</style>
