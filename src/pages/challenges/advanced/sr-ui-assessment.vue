<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from 'vue'

defineOptions({
  name: 'SrUIAssessmentChallenge',
})

useHead({
  title: () => 'Sr.UI Developer Skills Assessment Challenge',
})

// ==========================================
// TYPE DEFINITIONS (TypeScript - Skill #8)
// TODO: Candidate should review and fix type definitions
// ==========================================
interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: 'admin' | 'user' | 'moderator'
}

interface FilterState {
  search: string
  role: string
  sortBy: 'name' | 'email' | 'role'
  sortOrder: 'asc' | 'desc'
}

// ==========================================
// STATE MANAGEMENT (Pinia - Skill #9)
// TODO: Candidate should integrate Pinia store properly
// ==========================================
// const userStore = useUserStore()

// ==========================================
// REACTIVE STATE
// TODO: Candidate should identify reactivity issues
// ==========================================
const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)
const selectedUser = shallowRef<User | null>(null)
const showDetails = ref(false)
const theme = ref<'light' | 'dark'>('light')
const activeTab = ref<'html-css' | 'responsive' | 'api' | 'migration' | 'a11y' | 'performance' | 'built-in' | 'typescript' | 'state' | 'lifecycle'>('html-css')

// Filter state
const filters = ref<FilterState>({
  search: '',
  role: 'all',
  sortBy: 'name',
  sortOrder: 'asc',
})

// ==========================================
// COMPUTED PROPERTIES (Performance - Skill #6)
// TODO: Candidate should optimize computed properties
// ==========================================
const _filteredUsers = computed(() => {
  let result = [...users.value]

  if (filters.value.search) {
    const searchLower = filters.value.search.toLowerCase()
    result = result.filter(user =>
      user.name.toLowerCase().includes(searchLower)
      || user.email.toLowerCase().includes(searchLower),
    )
  }

  if (filters.value.role !== 'all') {
    result = result.filter(user => user.role === filters.value.role)
  }

  result.sort((a, b) => {
    const aValue = a[filters.value.sortBy].toLowerCase()
    const bValue = b[filters.value.sortBy].toLowerCase()
    return filters.value.sortOrder === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue)
  })

  return result
})

// ==========================================
// API INTEGRATION WITH DEBOUNCING (Skill #3)
// TODO: Candidate should implement proper debouncing
// ==========================================
async function fetchUsers(page: number = 1) {
  loading.value = true
  error.value = null

  try {
    await new Promise(resolve => setTimeout(resolve, 800))

    const mockData: User[] = [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', avatar: '👩‍💼', role: 'admin' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', avatar: '👨‍💻', role: 'user' },
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', avatar: '👨‍🎨', role: 'moderator' },
      { id: 4, name: 'Diana Prince', email: 'diana@example.com', avatar: '👩‍🚀', role: 'admin' },
      { id: 5, name: 'Eve Davis', email: 'eve@example.com', avatar: '👩‍🔬', role: 'user' },
      { id: 6, name: 'Frank Miller', email: 'frank@example.com', avatar: '👨‍🏫', role: 'user' },
      { id: 7, name: 'Grace Lee', email: 'grace@example.com', avatar: '👩‍⚕️', role: 'moderator' },
      { id: 8, name: 'Henry Wilson', email: 'henry@example.com', avatar: '👨‍🔧', role: 'user' },
    ]

    users.value = mockData
    totalPages.value = Math.ceil(mockData.length / 10)
    currentPage.value = page
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch users'
  }
  finally {
    loading.value = false
  }
}

// TODO: Candidate should implement debounced search
function _handleSearch(searchTerm: string) {
  // BUG: No debouncing - API called on every keystroke
  filters.value.search = searchTerm
  fetchUsers(1)
}

// ==========================================
// LIFECYCLE HOOKS (Skill #10)
// TODO: Candidate should fix lifecycle hook issues
// ==========================================
onMounted(() => {
  console.log('[Lifecycle] Component mounted')
  fetchUsers()

  // BUG: Event listener never cleaned up
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleThemeChange = (e: MediaQueryListEvent) => {
    theme.value = e.matches ? 'dark' : 'light'
  }

  mediaQuery.addEventListener('change', handleThemeChange)
  // Missing: cleanup in onUnmounted
})

// ==========================================
// METHODS
// ==========================================
function _selectUser(user: User) {
  selectedUser.value = user
  showDetails.value = true
}

function _closeDetails() {
  showDetails.value = false
  selectedUser.value = null
}

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function _resetFilters() {
  filters.value = {
    search: '',
    role: 'all',
    sortBy: 'name',
    sortOrder: 'asc',
  }
  fetchUsers(1)
}

// Challenge metadata
const challenge = {
  title: 'Sr.UI Developer Skills Assessment',
  description: 'Fix the issues in each section to demonstrate your expertise as a Senior UI Developer.',
  sections: [
    {
      id: 'html-css',
      title: '1. HTML/CSS & SCSS Issues',
      skill: 'HTML/CSS & SCSS',
      tasks: [
        'Fix semantic HTML structure (improper heading hierarchy)',
        'Replace inline styles with CSS classes',
        'Add proper SCSS nesting and variables',
        'Fix CSS specificity issues',
        'Implement CSS custom properties for theming',
      ],
    },
    {
      id: 'responsive',
      title: '2. Responsive Design Problems',
      skill: 'Responsive Design',
      tasks: [
        'Fix mobile layout issues (elements overflow on small screens)',
        'Add proper breakpoints for tablet and desktop',
        'Implement responsive images with srcset',
        'Fix touch target sizes for mobile (< 44px)',
        'Add viewport meta tag if missing',
      ],
    },
    {
      id: 'api',
      title: '3. API Integration & Throttling',
      skill: 'API Integration',
      tasks: [
        'Implement debounced search (300ms delay)',
        'Add proper error handling with retry mechanism',
        'Implement loading states for async operations',
        'Add request cancellation for outdated requests',
        'Handle edge cases (empty results, network errors)',
      ],
    },
    {
      id: 'migration',
      title: '4. Vue 2 to Vue 3 Migration',
      skill: 'Vue Migration',
      tasks: [
        'Convert Options API patterns to Composition API',
        'Fix deprecated lifecycle hooks (beforeDestroy → beforeUnmount)',
        'Update v-model syntax for Vue 3',
        'Replace filters with computed properties',
        'Migrate event bus to provide/inject or Pinia',
      ],
    },
    {
      id: 'a11y',
      title: '5. Web Accessibility Issues',
      skill: 'Accessibility',
      tasks: [
        'Add ARIA labels to interactive elements',
        'Fix color contrast ratios (must meet WCAG AA)',
        'Add keyboard navigation support',
        'Implement focus management for modal',
        'Add screen reader announcements for dynamic content',
        'Fix heading hierarchy (h1 → h2 → h3)',
      ],
    },
    {
      id: 'performance',
      title: '6. Performance Optimization',
      skill: 'Performance',
      tasks: [
        'Optimize computed properties (avoid unnecessary recalculations)',
        'Implement lazy loading for images',
        'Add virtual scrolling for large lists',
        'Use shallowRef for large objects',
        'Implement code splitting for routes',
        'Add caching strategy for API responses',
      ],
    },
    {
      id: 'built-in',
      title: '7. Vue 3 Built-in Components',
      skill: 'Built-in Components',
      tasks: [
        'Add Transition for modal animations',
        'Implement TransitionGroup for list updates',
        'Use Teleport for modal rendering',
        'Add Suspense for async components',
        'Implement KeepAlive for cached views',
      ],
    },
    {
      id: 'typescript',
      title: '8. TypeScript Improvements',
      skill: 'TypeScript',
      tasks: [
        'Add proper type annotations for all functions',
        'Create interfaces for API responses',
        'Implement type guards for runtime checks',
        'Fix any types and use strict typing',
        'Add generic types for reusable functions',
        'Implement discriminated unions for state',
      ],
    },
    {
      id: 'state',
      title: '9. State Management',
      skill: 'State Management',
      tasks: [
        'Integrate Pinia store for global state',
        'Separate local vs global state properly',
        'Implement state persistence (localStorage)',
        'Add state validation and sanitization',
        'Implement undo/redo functionality',
      ],
    },
    {
      id: 'lifecycle',
      title: '10. Lifecycle Hooks',
      skill: 'Lifecycle Hooks',
      tasks: [
        'Fix memory leak (cleanup event listeners)',
        'Add proper cleanup in onUnmounted',
        'Implement onBeforeMount for data prefetching',
        'Use watchEffect for reactive side effects',
        'Add error handling in lifecycle hooks',
      ],
    },
  ],
}
</script>

<template>
  <div class="min-h-screen" :class="[theme === 'dark' ? 'dark' : '']">
    <div class="mx-auto max-w-7xl px-4 py-8">
      <!-- Header -->
      <header class="mb-8">
        <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="rounded bg-red-100 px-3 py-1 text-sm text-red-700 font-semibold dark:bg-red-900 dark:text-red-300">
                Advanced Assessment
              </span>
              <span class="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                Fix the Issues
              </span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {{ challenge.title }}
            </h1>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              {{ challenge.description }}
            </p>
          </div>

          <!-- Theme Toggle -->
          <button
            class="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle theme"
            @click="toggleTheme"
          >
            <span v-if="theme === 'light'">🌙 Dark Mode</span>
            <span v-else>☀️ Light Mode</span>
          </button>
        </div>
      </header>

      <!-- Instructions Banner -->
      <div class="mb-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg">
        <h2 class="text-lg font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
          📋 Assessment Instructions
        </h2>
        <p class="text-sm text-yellow-800 dark:text-yellow-300 mb-3">
          Each tab below contains intentional bugs and issues. Your task is to identify and fix them.
        </p>
        <ul class="text-sm text-yellow-800 dark:text-yellow-300 space-y-1 list-disc list-inside">
          <li>Review the code in each section</li>
          <li>Identify the issues listed in the tasks</li>
          <li>Fix the problems following best practices</li>
          <li>Explain your reasoning for each fix</li>
          <li>Time limit: 60 minutes total (6 min per section)</li>
        </ul>
      </div>

      <!-- Section Tabs -->
      <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav class="-mb-px flex space-x-4 overflow-x-auto" aria-label="Assessment Sections">
          <button
            v-for="section in challenge.sections"
            :key="section.id"
            class="whitespace-nowrap border-b-2 py-4 px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-t"
            :class="[
              activeTab === section.id
                ? 'border-red-500 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
            ]"
            :aria-current="activeTab === section.id ? 'page' : undefined"
            @click="activeTab = section.id as any"
          >
            {{ section.skill }}
          </button>
        </nav>
      </div>

      <!-- Assessment Sections -->
      <main>
        <!-- Section 1: HTML/CSS & SCSS -->
        <section v-if="activeTab === 'html-css'" class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {{ challenge.sections[0].title }}
            </h2>

            <div class="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
              <h3 class="font-semibold text-red-900 dark:text-red-300 mb-2">
                Issues to Fix:
              </h3>
              <ul class="space-y-2 text-sm text-red-800 dark:text-red-300">
                <li v-for="(task, index) in challenge.sections[0].tasks" :key="index" class="flex items-start">
                  <span class="mr-2">❌</span>
                  <span>{{ task }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre class="text-sm"><code>&lt;!-- TODO: Fix the HTML/CSS issues below --&gt;
&lt;div style="background: blue; color: white;"&gt;
  &lt;h3&gt;Main Title&lt;/h3&gt;
  &lt;h1&gt;Subtitle&lt;/h1&gt;
  &lt;div class="container"&gt;
    &lt;span onclick="handleClick()"&gt;Click me&lt;/span&gt;
    &lt;img src="image.jpg" width="100"&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
.container {
  width: 100%;
}
.container span {
  cursor: pointer;
  color: #ccc;
}
/* TODO: Convert to SCSS with proper nesting */
&lt;/style&gt;</code></pre>
            </div>

            <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Evaluation Criteria:
              </h4>
              <ul class="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>✓ Semantic HTML structure</li>
                <li>✓ Proper heading hierarchy</li>
                <li>✓ Separation of concerns (no inline styles)</li>
                <li>✓ SCSS nesting and variables</li>
                <li>✓ CSS custom properties for theming</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Section 2: Responsive Design -->
        <section v-if="activeTab === 'responsive'" class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {{ challenge.sections[1].title }}
            </h2>

            <div class="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
              <h3 class="font-semibold text-red-900 dark:text-red-300 mb-2">
                Issues to Fix:
              </h3>
              <ul class="space-y-2 text-sm text-red-800 dark:text-red-300">
                <li v-for="(task, index) in challenge.sections[1].tasks" :key="index" class="flex items-start">
                  <span class="mr-2">❌</span>
                  <span>{{ task }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre class="text-sm"><code>&lt;!-- TODO: Fix responsive design issues --&gt;
&lt;div class="layout"&gt;
  &lt;div class="sidebar"&gt;
    &lt;!-- Sidebar content --&gt;
  &lt;/div&gt;
  &lt;div class="content"&gt;
    &lt;img src="large-image.jpg"&gt;
    &lt;button style="padding: 5px 10px;"&gt;Small Button&lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
.layout {
  display: flex;
}
.sidebar {
  width: 300px;
}
.content {
  flex: 1;
}
/* TODO: Add responsive breakpoints */
/* TODO: Fix mobile layout issues */
&lt;/style&gt;</code></pre>
            </div>

            <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Evaluation Criteria:
              </h4>
              <ul class="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>✓ Mobile-first approach</li>
                <li>✓ Proper breakpoints (tablet, desktop)</li>
                <li>✓ Responsive images</li>
                <li>✓ Touch-friendly targets (min 44px)</li>
                <li>✓ Flexible layouts (no fixed widths on mobile)</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Section 3: API Integration -->
        <section v-if="activeTab === 'api'" class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {{ challenge.sections[2].title }}
            </h2>

            <div class="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
              <h3 class="font-semibold text-red-900 dark:text-red-300 mb-2">
                Issues to Fix:
              </h3>
              <ul class="space-y-2 text-sm text-red-800 dark:text-red-300">
                <li v-for="(task, index) in challenge.sections[2].tasks" :key="index" class="flex items-start">
                  <span class="mr-2">❌</span>
                  <span>{{ task }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre class="text-sm"><code>// TODO: Fix API integration issues
async function handleSearch(searchTerm: string) {
  // BUG: No debouncing - API called on every keystroke
  filters.value.search = searchTerm
  await fetchUsers(1)
}

async function fetchUsers(page: number = 1) {
  // BUG: No error handling
  const response = await fetch(`/api/users?page=${page}`)
  const data = await response.json()
  users.value = data
}

// TODO: Implement proper debouncing
// TODO: Add request cancellation
// TODO: Handle loading and error states</code></pre>
            </div>

            <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Evaluation Criteria:
              </h4>
              <ul class="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>✓ Debounced search (300ms delay)</li>
                <li>✓ Error handling with retry</li>
                <li>✓ Loading states</li>
                <li>✓ Request cancellation (AbortController)</li>
                <li>✓ Edge case handling</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Section 4: Vue 2 to Vue 3 Migration -->
        <section v-if="activeTab === 'migration'" class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {{ challenge.sections[3].title }}
            </h2>

            <div class="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
              <h3 class="font-semibold text-red-900 dark:text-red-300 mb-2">
                Issues to Fix:
              </h3>
              <ul class="space-y-2 text-sm text-red-800 dark:text-red-300">
                <li v-for="(task, index) in challenge.sections[3].tasks" :key="index" class="flex items-start">
                  <span class="mr-2">❌</span>
                  <span>{{ task }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre class="text-sm"><code>// TODO: Migrate this Vue 2 component to Vue 3
export default {
  data() {
    return {
      users: [],
      search: ''
    }
  },
  filters: {
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  beforeDestroy() {
    // Cleanup
  },
  methods: {
    fetchUsers() {
      // Fetch logic
    }
  }
}

// TODO: Convert to Composition API
// TODO: Replace filters with computed
// TODO: Fix lifecycle hooks
// TODO: Update v-model syntax</code></pre>
            </div>

            <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Evaluation Criteria:
              </h4>
              <ul class="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>✓ Composition API conversion</li>
                <li>✓ Correct lifecycle hooks</li>
                <li>✓ Computed instead of filters</li>
                <li>✓ Modern v-model syntax</li>
                <li>✓ Provide/inject or Pinia migration</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Section 5: Accessibility -->
        <section v-if="activeTab === 'a11y'" class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {{ challenge.sections[4].title }}
            </h2>

            <div class="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
              <h3 class="font-semibold text-red-900 dark:text-red-300 mb-2">
                Issues to Fix:
              </h3>
              <ul class="space-y-2 text-sm text-red-800 dark:text-red-300">
                <li v-for="(task, index) in challenge.sections[4].tasks" :key="index" class="flex items-start">
                  <span class="mr-2">❌</span>
                  <span>{{ task }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre class="text-sm"><code>&lt;!-- TODO: Fix accessibility issues --&gt;
&lt;div onclick="openModal()"&gt;
  Click to open
&lt;/div&gt;

&lt;div v-if="showModal"&gt;
  &lt;h1&gt;Modal Title&lt;/h1&gt;
  &lt;button @click="closeModal"&gt;X&lt;/button&gt;
&lt;/div&gt;

&lt;div style="color: #999; background: #fff;"&gt;
  Low contrast text
&lt;/div&gt;

&lt;img src="photo.jpg"&gt;

&lt;!-- TODO: Add ARIA labels --&gt;
&lt;!-- TODO: Fix keyboard navigation --&gt;
&lt;!-- TODO: Add focus management --&gt;</code></pre>
            </div>

            <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Evaluation Criteria:
              </h4>
              <ul class="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>✓ ARIA attributes</li>
                <li>✓ WCAG AA color contrast</li>
                <li>✓ Keyboard navigation</li>
                <li>✓ Focus management</li>
                <li>✓ Screen reader support</li>
                <li>✓ Heading hierarchy</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Section 6: Performance -->
        <section v-if="activeTab === 'performance'" class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {{ challenge.sections[5].title }}
            </h2>

            <div class="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
              <h3 class="font-semibold text-red-900 dark:text-red-300 mb-2">
                Issues to Fix:
              </h3>
              <ul class="space-y-2 text-sm text-red-800 dark:text-red-300">
                <li v-for="(task, index) in challenge.sections[5].tasks" :key="index" class="flex items-start">
                  <span class="mr-2">❌</span>
                  <span>{{ task }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre class="text-sm"><code>// TODO: Fix performance issues
const users = ref([]) // BUG: Should use shallowRef for large arrays

const expensiveComputation = computed(() => {
  // BUG: Recalculates unnecessarily
  return users.value.map(user => ({
    ...user,
    computed: heavyCalculation(user)
  }))
}

&lt;!-- TODO: Add lazy loading for images --&gt;
&lt;img :src="user.avatar"&gt;

&lt;!-- TODO: Implement virtual scrolling --&gt;
&lt;div v-for="item in items" :key="item.id"&gt;
  &#123;&#123; item.name &#125;&#125;
&lt;/div&gt;

// TODO: Optimize computed properties
// TODO: Add code splitting
// TODO: Implement caching</code></pre>
            </div>

            <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Evaluation Criteria:
              </h4>
              <ul class="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>✓ Computed optimization</li>
                <li>✓ Lazy loading</li>
                <li>✓ Virtual scrolling</li>
                <li>✓ Proper ref usage (shallowRef)</li>
                <li>✓ Code splitting</li>
                <li>✓ Caching strategy</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Section 7: Vue 3 Built-in Components -->
        <section v-if="activeTab === 'built-in'" class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {{ challenge.sections[6].title }}
            </h2>

            <div class="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
              <h3 class="font-semibold text-red-900 dark:text-red-300 mb-2">
                Issues to Fix:
              </h3>
              <ul class="space-y-2 text-sm text-red-800 dark:text-red-300">
                <li v-for="(task, index) in challenge.sections[6].tasks" :key="index" class="flex items-start">
                  <span class="mr-2">❌</span>
                  <span>{{ task }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre class="text-sm"><code v-text="'&lt;!-- TODO: Add Vue 3 built-in components --&gt;\n\n&lt;!-- BUG: Modal renders in place (z-index issues) --&gt;\n&lt;div v-if=&quot;showModal&quot; class=&quot;modal&quot;&gt;\n  Modal content\n&lt;/div&gt;\n\n&lt;!-- BUG: No transition animations --&gt;\n&lt;div v-if=&quot;showElement&quot;&gt;\n  Content\n&lt;/div&gt;\n\n&lt;!-- BUG: List updates without animation --&gt;\n&lt;div v-for=&quot;item in items&quot; :key=&quot;item.id&quot;&gt;\n  {{ item.name }}\n&lt;/div&gt;\n\n&lt;!-- TODO: Add Transition for modal --&gt;\n&lt;!-- TODO: Add TransitionGroup for lists --&gt;\n&lt;!-- TODO: Use Teleport for modal --&gt;\n&lt;!-- TODO: Add Suspense for async --&gt;\n&lt;!-- TODO: Implement KeepAlive --&gt;'" /></pre>
            </div>

            <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Evaluation Criteria:
              </h4>
              <ul class="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>✓ Transition implementation</li>
                <li>✓ TransitionGroup for lists</li>
                <li>✓ Teleport for modals</li>
                <li>✓ Suspense for async</li>
                <li>✓ KeepAlive for caching</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Section 8: TypeScript -->
        <section v-if="activeTab === 'typescript'" class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {{ challenge.sections[7].title }}
            </h2>

            <div class="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
              <h3 class="font-semibold text-red-900 dark:text-red-300 mb-2">
                Issues to Fix:
              </h3>
              <ul class="space-y-2 text-sm text-red-800 dark:text-red-300">
                <li v-for="(task, index) in challenge.sections[7].tasks" :key="index" class="flex items-start">
                  <span class="mr-2">❌</span>
                  <span>{{ task }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre class="text-sm"><code>// TODO: Fix TypeScript issues
interface User {
  id: number
  name: string
  // TODO: Add more fields
}

// BUG: Using 'any' type
function processUser(user: any): any {
  return user
}

// BUG: Missing return type
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// TODO: Add proper type annotations
// TODO: Create API response interfaces
// TODO: Implement type guards
// TODO: Use generics for reusability</code></pre>
            </div>

            <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Evaluation Criteria:
              </h4>
              <ul class="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>✓ No 'any' types</li>
                <li>✓ Complete interfaces</li>
                <li>✓ Type guards</li>
                <li>✓ Return type annotations</li>
                <li>✓ Generic types</li>
                <li>✓ Discriminated unions</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Section 9: State Management -->
        <section v-if="activeTab === 'state'" class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {{ challenge.sections[8].title }}
            </h2>

            <div class="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
              <h3 class="font-semibold text-red-900 dark:text-red-300 mb-2">
                Issues to Fix:
              </h3>
              <ul class="space-y-2 text-sm text-red-800 dark:text-red-300">
                <li v-for="(task, index) in challenge.sections[8].tasks" :key="index" class="flex items-start">
                  <span class="mr-2">❌</span>
                  <span>{{ task }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre class="text-sm"><code>// TODO: Implement proper state management
const localState = ref({
  users: [],
  filters: {},
  theme: 'light'
})

// BUG: Global state mixed with local state
// BUG: No state persistence
// BUG: No state validation

// TODO: Integrate Pinia store
// TODO: Separate local vs global state
// TODO: Add localStorage persistence
// TODO: Implement state validation
// TODO: Add undo/redo functionality</code></pre>
            </div>

            <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Evaluation Criteria:
              </h4>
              <ul class="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>✓ Pinia integration</li>
                <li>✓ State separation</li>
                <li>✓ Persistence (localStorage)</li>
                <li>✓ Validation/sanitization</li>
                <li>✓ Undo/redo pattern</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Section 10: Lifecycle Hooks -->
        <section v-if="activeTab === 'lifecycle'" class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {{ challenge.sections[9].title }}
            </h2>

            <div class="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
              <h3 class="font-semibold text-red-900 dark:text-red-300 mb-2">
                Issues to Fix:
              </h3>
              <ul class="space-y-2 text-sm text-red-800 dark:text-red-300">
                <li v-for="(task, index) in challenge.sections[9].tasks" :key="index" class="flex items-start">
                  <span class="mr-2">❌</span>
                  <span>{{ task }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre class="text-sm"><code>// TODO: Fix lifecycle hook issues
onMounted(() => {
  fetchUsers()

  // BUG: Memory leak - event listener never removed
  window.addEventListener('resize', handleResize)
  document.addEventListener('keydown', handleKeydown)
})

// BUG: Missing onUnmounted cleanup
// BUG: No error handling in lifecycle hooks

// TODO: Add proper cleanup
// TODO: Implement onBeforeMount
// TODO: Use watchEffect
// TODO: Add error handling</code></pre>
            </div>

            <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Evaluation Criteria:
              </h4>
              <ul class="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>✓ Memory leak prevention</li>
                <li>✓ Proper cleanup in onUnmounted</li>
                <li>✓ onBeforeMount usage</li>
                <li>✓ watchEffect implementation</li>
                <li>✓ Error handling</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <RouterLink
            to="/advanced"
            class="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            ← Back to Advanced Challenges
          </RouterLink>

          <div class="text-sm text-gray-500 dark:text-gray-400">
            Time Remaining: <span class="font-mono font-semibold">60:00</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Focus visible styles for better accessibility */
:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Smooth transitions */
* {
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}
</style>
