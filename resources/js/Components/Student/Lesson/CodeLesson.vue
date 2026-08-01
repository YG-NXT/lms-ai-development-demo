<template>
  <div class="code-lesson">
    <div class="code-editor-container">
      <div class="editor-toolbar">
        <div class="editor-toolbar-left">
          <select v-model="selectedLanguage" class="language-select" @change="onLanguageChange">
            <option v-for="(info, lang) in supportedLanguages" :key="lang" :value="lang">
              {{ info.label }}
            </option>
          </select>
          <span class="lesson-type-badge">PROGRAMMING</span>
          <span v-if="languageInfo.server_side" class="server-badge">Server</span>
          <span v-else class="client-badge">Client</span>
        </div>
        <div class="editor-toolbar-right">
          <button @click="runCode" :disabled="isRunning" class="btn btn-run">
            <span v-if="isRunning">Running...</span>
            <span v-else>Run Code</span>
          </button>
          <button @click="submitSolution" :disabled="isSubmitting || !canSubmit" class="btn btn-submit">
            <span v-if="isSubmitting">Submitting...</span>
            <span v-else>Submit Solution</span>
          </button>
        </div>
      </div>

      <div class="editor-body">
        <div class="editor-panel">
          <div class="editor-wrapper">
            <textarea
              v-model="code"
              class="code-textarea"
              spellcheck="false"
              :placeholder="placeholderText"
              @keydown.tab.prevent="insertTab"
            ></textarea>
          </div>
        </div>

        <div class="output-panel">
          <div class="output-tabs">
            <button
              v-for="tab in outputTabs"
              :key="tab.id"
              class="output-tab"
              :class="{ active: activeOutputTab === tab.id }"
              @click="activeOutputTab = tab.id"
            >
              {{ tab.label }}
              <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
            </button>
          </div>

          <div class="output-content">
            <div v-if="activeOutputTab === 'output'" class="output-stdout">
              <pre v-if="executionResult?.output">{{ executionResult.output }}</pre>
              <p v-else class="empty-state">Click "Run Code" to execute your program.</p>
            </div>

            <div v-if="activeOutputTab === 'errors'" class="output-errors">
              <pre v-if="hasErrors">{{ errorsDisplay }}</pre>
              <p v-else class="empty-state">No errors.</p>
            </div>

            <div v-if="activeOutputTab === 'tests' && testResults.length" class="output-tests">
              <div v-for="(result, idx) in testResults" :key="idx" class="test-result">
                <div class="test-header">
                  <span class="test-name">{{ result.name }}</span>
                  <span :class="['test-status', result.passed ? 'passed' : 'failed']">
                    {{ result.passed ? 'Passed' : 'Failed' }}
                  </span>
                </div>
                <div v-if="!result.passed" class="test-details">
                  <p v-if="result.expected !== undefined"><strong>Expected:</strong> {{ result.expected }}</p>
                  <p><strong>Got:</strong> {{ result.output || '(no output)' }}</p>
                  <p v-if="result.errors"><strong>Error:</strong> {{ result.errors }}</p>
                </div>
              </div>
            </div>

            <div v-if="activeOutputTab === 'tests' && !testResults.length" class="empty-state">
              No test cases defined for this exercise.
            </div>

            <div v-if="executionMessage && activeOutputTab !== 'output'" class="execution-message">
              {{ executionMessage }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="executionStats" class="editor-footer">
        <span v-if="executionStats.execution_time_ms">Time: {{ executionStats.execution_time_ms }}ms</span>
        <span v-if="executionStats.memory_usage_mb">Memory: {{ executionStats.memory_usage_mb }}MB</span>
        <span v-if="executionStats.passed !== null">Score: {{ Math.round(executionStats.passed * 100) }}%</span>
        <span v-if="testResults.length">Tests: {{ passedTests }}/{{ testResults.length }}</span>
      </div>
    </div>

    <div v-if="starterCode" class="starter-code-hint">
      <strong>Starter Code:</strong> A template has been provided. Modify it to solve the exercise.
    </div>

    <div v-if="constraints" class="constraints-hint">
      <strong>Constraints:</strong>
      <ul>
        <li v-for="(constraint, idx) in constraints" :key="idx">{{ constraint }}</li>
      </ul>
    </div>

    <div v-if="languageInfo.server_side === false" class="client-hint">
      <strong>Note:</strong> This code runs in your browser using {{ languageInfo.label }} runtime. No data is sent to the server.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';

const props = defineProps<{
  lesson: any;
  courseSlug: string;
}>();

const emit = defineEmits<{
  (e: 'completed'): void;
}>();

const page = usePage();
const user = page.props.auth?.user;

const selectedLanguage = ref('php');
const code = ref('');
const isRunning = ref(false);
const isSubmitting = ref(false);
const executionResult = ref<any>(null);
const testResults = ref<any[]>([]);
const executionStats = ref<any>(null);
const activeOutputTab = ref('output');
const canSubmit = ref(false);

const supportedLanguages = {
  php: { label: 'PHP', server_side: true },
  sql: { label: 'SQL', server_side: true },
  javascript: { label: 'JavaScript', server_side: false },
  html: { label: 'HTML', server_side: false },
  css: { label: 'CSS', server_side: false },
  typescript: { label: 'TypeScript', server_side: false },
  python: { label: 'Python (Pyodide)', server_side: false },
  c: { label: 'C (WASM)', server_side: false },
  cpp: { label: 'C++ (WASM)', server_side: false },
  rust: { label: 'Rust (WASM)', server_side: false },
  go: { label: 'Go (WASM)', server_side: false },
  java: { label: 'Java (JSVM)', server_side: false },
  kotlin: { label: 'Kotlin (JSVM)', server_side: false },
  ruby: { label: 'Ruby (JSVM)', server_side: false },
  swift: { label: 'Swift (WASM)', server_side: false },
  csharp: { label: 'C# (WASM)', server_side: false },
};

const languageInfo = computed(() => {
  return supportedLanguages[selectedLanguage.value] || { label: selectedLanguage.value, server_side: false };
});

const placeholderText = computed(() => {
  const starters: Record<string, string> = {
    php: '<?php',
    javascript: '// Write JavaScript here...',
    html: '<!DOCTYPE html>\n<html>',
    css: '/* Write CSS here... */',
    sql: 'SELECT * FROM table_name',
    python: '# Write Python here...',
    c: '// Write C code here...',
    cpp: '// Write C++ code here...',
    rust: '// Write Rust code here...',
    java: '// Write Java code here...',
    default: '// Write code here...',
  };
  return starters[selectedLanguage.value] || starters.default;
});

const starterCode = computed(() => props.lesson?.codingExercise?.starter_code ?? '');
const constraints = computed(() => props.lesson?.codingExercise?.constraints ?? []);
const timeLimit = computed(() => props.lesson?.codingExercise?.time_limit_seconds ?? 10);

const hasErrors = computed(() => {
  const result = executionResult.value;
  if (!result) return false;
  if (Array.isArray(result.errors) && result.errors.length > 0) return true;
  if (typeof result.errors === 'string' && result.errors.trim()) return true;
  return false;
});

const errorsDisplay = computed(() => {
  const result = executionResult.value;
  if (!result) return '';
  if (Array.isArray(result.errors)) return result.errors.join('\n');
  return result.errors || '';
});

const executionMessage = computed(() => {
  const result = executionResult.value;
  if (!result || result.client_side === false) return '';
  return result.message || '';
});

const passedTests = computed(() => {
  return testResults.value.filter((r: any) => r.passed).length;
});

const outputTabs = computed(() => {
  const tabs = [
    { id: 'output', label: 'Output' },
    { id: 'errors', label: 'Errors' },
  ];
  if (testResults.value.length) {
    tabs.push({
      id: 'tests',
      label: 'Test Cases',
      badge: `${passedTests.value}/${testResults.value.length}`,
    });
  }
  return tabs;
});

onMounted(() => {
  if (starterCode.value) {
    code.value = starterCode.value;
  }
});

function insertTab() {
  const textarea = document.querySelector('.code-textarea') as HTMLTextAreaElement;
  if (!textarea) return;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  code.value = code.value.substring(0, start) + '    ' + code.value.substring(end);
  textarea.selectionStart = textarea.selectionEnd = start + 4;
}

function onLanguageChange() {
  if (starterCode.value && selectedLanguage.value === 'php') {
    code.value = starterCode.value;
  } else if (selectedLanguage.value === 'javascript') {
    code.value = '// Write your code here\nconsole.log("Hello, World!");';
  } else if (selectedLanguage.value === 'python') {
    code.value = '# Write your Python here\nprint("Hello, World!")';
  } else if (selectedLanguage.value === 'sql') {
    code.value = '-- Write your SQL here\nSELECT 1;';
  } else {
    code.value = '';
  }
  executionResult.value = null;
  testResults.value = [];
  canSubmit.value = false;
  activeOutputTab.value = 'output';
}

async function runCode() {
  if (!code.value.trim()) return;

  isRunning.value = true;
  activeOutputTab.value = 'output';

  try {
    const response = await fetch(route('student.courses.lessons.execute', {
      course: props.courseSlug,
      lesson: props.lesson.id,
    }), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        code: code.value,
        language: selectedLanguage.value,
      }),
    });

    const data = await response.json();
    executionResult.value = data;
    testResults.value = data.test_results || [];
    executionStats.value = {
      execution_time_ms: data.execution_time_ms,
      memory_usage_mb: data.memory_usage_mb,
      passed: data.passed,
    };
    canSubmit.value = data.success && data.passed !== false;
    activeOutputTab.value = data.errors ? 'errors' : 'output';
  } catch (error) {
    executionResult.value = {
      success: false,
      errors: 'Failed to execute code. Please check your connection and try again.',
    };
    activeOutputTab.value = 'errors';
  } finally {
    isRunning.value = false;
  }
}

async function submitSolution() {
  if (!canSubmit.value) return;

  isSubmitting.value = true;

  try {
    await fetch(route('student.courses.lessons.complete', {
      course: props.courseSlug,
      lesson: props.lesson.id,
    }), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify({
        code: code.value,
        language: selectedLanguage.value,
      }),
    });

    emit('completed');
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.code-lesson {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  max-width: 100%;
}

.code-editor-container {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  background: #1e1e2e;
}

.editor-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #181825;
  border-bottom: 1px solid #313244;
  flex-wrap: wrap;
  gap: 8px;
}

.editor-toolbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.language-select {
  background: #313244;
  color: #cdd6f4;
  border: 1px solid #45475a;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 13px;
  font-family: inherit;
  min-width: 160px;
}

.lesson-type-badge {
  background: #89b4fa;
  color: #1e1e2e;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.server-badge {
  background: #f9e2af;
  color: #1e1e2e;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}

.client-badge {
  background: #a6e3a1;
  color: #1e1e2e;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}

.editor-toolbar-right {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}

.btn-run {
  background: #a6e3a1;
  color: #1e1e2e;
}

.btn-run:disabled {
  background: #585b70;
  color: #a6adc8;
  cursor: not-allowed;
}

.btn-submit {
  background: #89b4fa;
  color: #1e1e2e;
}

.btn-submit:disabled {
  background: #585b70;
  color: #a6adc8;
  cursor: not-allowed;
}

.editor-body {
  display: flex;
  height: 500px;
}

.editor-panel {
  flex: 1;
  border-right: 1px solid #313244;
  min-width: 0;
}

.editor-wrapper {
  height: 100%;
}

.code-textarea {
  width: 100%;
  height: 100%;
  background: #1e1e2e;
  color: #cdd6f4;
  border: none;
  padding: 16px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: none;
  outline: none;
  tab-size: 4;
}

.output-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #181825;
  min-width: 0;
}

.output-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid #313244;
  overflow-x: auto;
}

.output-tab {
  padding: 8px 16px;
  background: transparent;
  border: none;
  color: #a6adc8;
  cursor: pointer;
  font-size: 13px;
  font-family: inherit;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
}

.output-tab.active {
  color: #cdd6f4;
  border-bottom-color: #89b4fa;
}

.tab-badge {
  background: #a6e3a1;
  color: #1e1e2e;
  padding: 1px 6px;
  border-radius: 10px;
  font-size: 11px;
  margin-left: 6px;
}

.output-content {
  flex: 1;
  padding: 12px 16px;
  overflow-y: auto;
  color: #cdd6f4;
  font-size: 13px;
}

.output-stdout pre,
.output-errors pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.empty-state {
  color: #6c7086;
  font-style: italic;
  text-align: center;
  padding: 20px;
}

.test-result {
  margin-bottom: 12px;
  padding: 8px 12px;
  background: #1e1e2e;
  border-radius: 4px;
  border-left: 3px solid #6c7086;
}

.test-result.passed {
  border-left-color: #a6e3a1;
}

.test-result.failed {
  border-left-color: #f38ba8;
}

.test-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.test-name {
  font-weight: 600;
}

.test-status.passed {
  color: #a6e3a1;
  font-weight: 600;
}

.test-status.failed {
  color: #f38ba8;
  font-weight: 600;
}

.test-details {
  margin-top: 8px;
  font-size: 12px;
}

.test-details p {
  margin: 4px 0;
}

.output-errors {
  color: #f38ba8;
}

.editor-footer {
  display: flex;
  gap: 20px;
  padding: 8px 16px;
  background: #181825;
  border-top: 1px solid #313244;
  font-size: 12px;
  color: #a6adc8;
  flex-wrap: wrap;
}

.starter-code-hint,
.constraints-hint {
  margin-top: 12px;
  padding: 12px 16px;
  background: #fef3c7;
  border: 1px solid #fbbf24;
  border-radius: 6px;
  font-size: 13px;
}

.constraints-hint ul {
  margin: 8px 0 0 0;
  padding-left: 20px;
}

.constraints-hint li {
  margin-bottom: 4px;
}

.client-hint {
  margin-top: 12px;
  padding: 12px 16px;
  background: #dbeafe;
  border: 1px solid #93c5fd;
  border-radius: 6px;
  font-size: 13px;
  color: #1e40af;
}

.execution-message {
  color: #a6adc8;
  font-style: italic;
  padding: 8px 0;
}

@media (max-width: 768px) {
  .editor-body {
    flex-direction: column;
    height: 400px;
  }

  .editor-panel {
    flex: 1;
    border-right: none;
    border-bottom: 1px solid #313244;
  }
}
</style>