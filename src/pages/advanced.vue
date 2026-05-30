<script setup lang="ts">
defineOptions({
  name: 'AdvancedChallenges',
})

useHead({
  title: () => 'Advanced Vue Challenges',
})

interface Challenge {
  id: number
  title: string
  description: string
  difficulty: 'advanced'
  topics: string[]
  completed?: boolean
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: 'Custom Directive System',
    description: 'Build a library of custom directives for common UI patterns (debounce, throttle, focus).',
    difficulty: 'advanced',
    topics: ['Custom Directives', 'Lifecycle Hooks', 'DOM Manipulation'],
  },
  {
    id: 2,
    title: 'Performance Optimization',
    description: 'Optimize a large list rendering application using virtual scrolling and lazy loading.',
    difficulty: 'advanced',
    topics: ['Performance', 'Virtual Scrolling', 'Lazy Loading'],
  },
  {
    id: 3,
    title: 'Plugin Architecture',
    description: 'Create a Vue plugin system with installable modules and global configuration.',
    difficulty: 'advanced',
    topics: ['Plugins', 'Global Properties', 'Architecture'],
  },
  {
    id: 4,
    title: 'SSR Implementation',
    description: 'Implement server-side rendering with data prefetching and hydration.',
    difficulty: 'advanced',
    topics: ['SSR', 'Hydration', 'Server Components'],
  },
  {
    id: 5,
    title: 'State Machine Integration',
    description: 'Integrate a state machine library (XState) with Vue for complex state management.',
    difficulty: 'advanced',
    topics: ['State Machines', 'Complex State', 'XState'],
  },
  {
    id: 6,
    title: 'Micro-Frontend Architecture',
    description: 'Build a micro-frontend system with module federation and shared dependencies.',
    difficulty: 'advanced',
    topics: ['Module Federation', 'Micro-Frontends', 'Webpack'],
  },
  {
    id: 7,
    title: 'Testing Suite',
    description: 'Create comprehensive test coverage with unit, integration, and E2E tests.',
    difficulty: 'advanced',
    topics: ['Testing', 'Vitest', 'Component Testing'],
  },
  {
    id: 8,
    title: 'Animation System',
    description: 'Build a sophisticated animation system using GSAP or Framer Motion with Vue.',
    difficulty: 'advanced',
    topics: ['Animations', 'GSAP', 'Transitions'],
  },
]
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <RouterLink to="/" class="mb-4 inline-flex items-center text-red-500 hover:text-red-600">
        <div i-carbon-arrow-left class="mr-2" />
        Back to Home
      </RouterLink>

      <div class="mb-4 flex items-center gap-3">
        <div i-carbon-rocket class="text-4xl text-red-500" />
        <h1 class="text-4xl font-bold">
          Advanced Challenges
        </h1>
      </div>

      <p class="max-w-2xl text-lg text-gray-600 dark:text-gray-300">
        Master complex topics like performance optimization, custom directives, plugins,
        SSR, and advanced architecture patterns.
      </p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 mb-8 gap-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
      <div class="text-center">
        <div class="text-2xl text-red-600 font-bold dark:text-red-400">
          {{ challenges.length }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Total Challenges
        </div>
      </div>
      <div class="text-center">
        <div class="text-2xl text-red-600 font-bold dark:text-red-400">
          0
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Completed
        </div>
      </div>
      <div class="text-center">
        <div class="text-2xl text-red-600 font-bold dark:text-red-400">
          0%
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Progress
        </div>
      </div>
    </div>

    <!-- Challenges Grid -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
      <div
        v-for="challenge in challenges"
        :key="challenge.id"
        class="group border-2 border-gray-200 rounded-xl p-6 transition-all duration-300 dark:border-gray-700 hover:border-red-500 hover:shadow-md dark:hover:border-red-400"
      >
        <div class="mb-3 flex items-start justify-between">
          <span class="rounded bg-red-100 px-2 py-1 text-xs text-red-700 font-semibold dark:bg-red-900 dark:text-red-300">
            #{{ challenge.id }}
          </span>
          <div
            v-if="challenge.completed"
            i-carbon-checkmark-filled
            class="text-red-500"
          />
        </div>

        <h3 class="mb-2 text-xl font-bold transition-colors group-hover:text-red-500 dark:group-hover:text-red-400">
          {{ challenge.title }}
        </h3>

        <p class="mb-4 text-sm text-gray-600 leading-relaxed dark:text-gray-400">
          {{ challenge.description }}
        </p>

        <div class="mb-4 flex flex-wrap gap-2">
          <span
            v-for="topic in challenge.topics"
            :key="topic"
            class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            {{ topic }}
          </span>
        </div>

        <button class="w-full rounded-lg bg-red-500 px-4 py-2 text-white font-semibold transition-colors hover:bg-red-600">
          Start Challenge
        </button>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
