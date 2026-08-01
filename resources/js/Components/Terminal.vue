<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

defineProps<{
    initialCommand?: string;
}>();

const emit = defineEmits<{
    (e: 'command', command: string): void;
}>();

const terminalOutput = ref<string[]>([]);
const input = ref('');
const terminalRef = ref<HTMLElement | null>(null);
const isReady = ref(false);

const scrollToBottom = () => {
    if (terminalRef.value) {
        terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
    }
};

const sendCommand = () => {
    const cmd = input.value.trim();
    if (!cmd) return;

    terminalOutput.value.push('$ ' + cmd);
    emit('command', cmd);
    input.value = '';

    setTimeout(scrollToBottom, 50);
};

const addOutput = (text: string) => {
    terminalOutput.value.push(text);
    scrollToBottom();
};

onMounted(() => {
    isReady.value = true;
    terminalOutput.value.push('Terminal ready. Type commands and press Enter.');
});

onBeforeUnmount(() => {
    isReady.value = false;
});
</script>

<template>
    <div class="terminal border border-slate-200 rounded-xl overflow-hidden bg-slate-900 dark:border-slate-800">
        <div class="flex items-center gap-2 bg-slate-800 px-4 py-2">
            <div class="flex gap-1.5">
                <div class="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                <div class="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                <div class="h-2.5 w-2.5 rounded-full bg-green-500"></div>
            </div>
            <span class="text-xs text-slate-400">Terminal</span>
        </div>

        <div ref="terminalRef" class="max-h-64 overflow-y-auto p-4 font-mono text-sm leading-relaxed">
            <div v-for="(line, i) in terminalOutput" :key="i" :class="line.startsWith('$') ? 'text-primary-400' : 'text-slate-300'">
                {{ line }}
            </div>
        </div>

        <div class="flex items-center border-t border-slate-700 bg-slate-800 px-4 py-2">
            <span class="mr-2 text-sm text-primary-400">$</span>
            <input
                v-model="input"
                type="text"
                class="flex-1 bg-transparent text-sm text-slate-200 outline-none placeholder-slate-500"
                placeholder="Type a command..."
                @keyup.enter="sendCommand"
            />
        </div>
    </div>
</template>