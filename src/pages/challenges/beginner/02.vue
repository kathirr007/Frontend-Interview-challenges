<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'Challenge02',
})

useHead({
  title: () => 'Challenge #2: Counter App - Beginner Vue Challenges',
})

const activeTab = ref<'instructions' | 'solution'>('instructions')
const userCode = ref(`// Write your Vue component code here
<template>
  <div>
    <!-- Your counter UI here -->
  </div>
</template>

<script setup>
// Your reactive data and logic here
<\/script>`)

const showSolution = ref(false)

const challenge = {
  id: 2,
  title: 'Counter App',
  difficulty: 'beginner',
  description: 'Build a counter application with increment, decrement, and reset functionality.',
  objectives: [
    'Create reactive state for counter value',
    'Implement increment function (+1)',
    'Implement decrement function (-1)',
    'Implement reset function (set to 0)',
    'Display current count value',
    'Add event handlers to buttons',
  ],
  hints: [
    'Use ref(0) to initialize the counter',
    'Create functions that modify the .value property',
    'Use @click to bind click events to buttons',
    'Consider disabling decrement when count is 0',
  ],
  topics: ['Event Handling', 'Reactive State', 'Methods'],
}

function resetCode() {
  userCode.value = `// Write your Vue component code here
<template>
  <div>
    <!-- Your counter UI here -->
  </div>
</template>

<script setup>
// Your reactive data and logic here
<\/script>`
}

function viewSolution() {
  showSolution.value = true
  activeTab.value = 'solution'
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8">
    <!-- Breadcrumb Navigation -->
    <nav class="mb-6 flex items-center gap-2 text-sm">
      <RouterLink to="/" class="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400">
        Home
      </RouterLink>
      <span class="text-gray-400">/</span>
      <RouterLink to="/beginner" class="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400">
        Beginner
      </RouterLink>
      <span class="text-gray-400">/</span>
      <span class="text-green-600 dark:text-green-400 font-semibold">Challenge #{{ challenge.id }}</span>
    </nav>

    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-start justify-between mb-4">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <span class="rounded bg-green-100 px-3 py-1 text-sm text-green-700 font-semibold dark:bg-green-900 dark:text-green-300">
              Beginner
            </span>
            <span class="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              #{{ challenge.id }}
            </span>
          </div>
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
            {{ challenge.title }}
          </h1>
        </div>

        <div class="flex gap-3">
          <button
            class="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 dark:hover:border-green-400 text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-all"
            @click="resetCode"
          >
            Reset Code
          </button>
          <button
            class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-colors"
            @click="viewSolution"
          >
            View Solution
          </button>
        </div>
      </div>

      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
        {{ challenge.description }}
      </p>
    </div>

    <!-- Tabs -->
    <div class="mb-6 border-b border-gray-200 dark:border-gray-700">
      <nav class="-mb-px flex space-x-8">
        <button
          class="whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors"
          :class="[
            activeTab === 'instructions'
              ? 'border-green-500 text-green-600 dark:text-green-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
          ]"
          @click="activeTab = 'instructions'"
        >
          Instructions & Objectives
        </button>
        <button
          v-if="showSolution"
          class="whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors"
          :class="[
            activeTab === 'solution'
              ? 'border-green-500 text-green-600 dark:text-green-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
          ]"
          @click="activeTab = 'solution'"
        >
          Solution
        </button>
      </nav>
    </div>

    <!-- Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Left Panel: Instructions/Solution -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div v-if="activeTab === 'instructions'">
          <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Learning Objectives
          </h2>

          <ul class="space-y-3 mb-6">
            <li
              v-for="(objective, index) in challenge.objectives"
              :key="index"
              class="flex items-start gap-3"
            >
              <div i-carbon-checkmark class="text-green-500 mt-1 flex-shrink-0" />
              <span class="text-gray-700 dark:text-gray-300">{{ objective }}</span>
            </li>
          </ul>

          <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            Topics Covered
          </h3>

          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="topic in challenge.topics"
              :key="topic"
              class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
            >
              {{ topic }}
            </span>
          </div>

          <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            💡 Hints
          </h3>

          <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
            <ul class="space-y-2">
              <li
                v-for="(hint, index) in challenge.hints"
                :key="index"
                class="text-gray-700 dark:text-gray-300 text-sm"
              >
                <span class="font-semibold text-yellow-700 dark:text-yellow-400">Hint {{ index + 1 }}:</span> {{ hint }}
              </li>
            </ul>
          </div>
        </div>

        <div v-else-if="activeTab === 'solution'">
          <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            ✅ Solution
          </h2>

          <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
            <p class="text-green-800 dark:text-green-300 text-sm">
              Here's one way to solve this challenge:
            </p>
          </div>

          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre class="text-green-400 text-sm"><code>&lt;template&gt;
  &lt;div class="counter"&gt;
    &lt;h2&gt;Count: &#123;&#123; count &#125;&#125;&lt;/h2&gt;
    &lt;div class="buttons"&gt;
      &lt;button @click="decrement" :disabled="count === 0"&gt;-&lt;/button&gt;
      &lt;button @click="increment"&gt;+&lt;/button&gt;
      &lt;button @click="reset"&gt;Reset&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}

function decrement() {
  if (count.value > 0) {
    count.value--
  }
}

function reset() {
  count.value = 0
}
&lt;/script&gt;</code></pre>
          </div>

          <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 class="font-semibold text-blue-800 dark:text-blue-300 mb-2">
              Explanation:
            </h4>
            <ul class="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <li>• <code class="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">ref(0)</code> initializes counter at 0</li>
              <li>• Functions modify <code class="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">count.value</code> directly</li>
              <li>• <code class="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">@click</code> binds button clicks to functions</li>
              <li>• <code class="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">:disabled</code> prevents negative counts</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Right Panel: Code Editor -->
      <div class="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
        <div class="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
          <span class="text-gray-300 text-sm font-mono">Your Solution</span>
          <div class="flex gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500" />
            <div class="w-3 h-3 rounded-full bg-yellow-500" />
            <div class="w-3 h-3 rounded-full bg-green-500" />
          </div>
        </div>

        <textarea
          v-model="userCode"
          class="w-full h-[500px] bg-gray-900 text-gray-100 font-mono text-sm p-4 resize-none focus:outline-none"
          spellcheck="false"
        />

        <div class="bg-gray-800 px-4 py-3 border-t border-gray-700 flex items-center justify-between">
          <span class="text-gray-400 text-xs">Vue 3 • Composition API</span>
          <button class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors">
            Run Code
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation Footer -->
    <div class="mt-8 flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
      <RouterLink
        to="/challenges/beginner/01"
        class="flex items-center gap-2 text-gray-600 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
      >
        <div i-carbon-arrow-left />
        Previous Challenge
      </RouterLink>

      <RouterLink
        to="/challenges/beginner/03"
        class="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
      >
        Next Challenge
        <div i-carbon-arrow-right />
      </RouterLink>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
