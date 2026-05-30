<script setup lang="ts">
defineOptions({
  name: 'IntermediateChallenges',
})

useHead({
  title: () => 'Intermediate Vue Challenges',
})

interface Challenge {
  id: number
  title: string
  description: string
  difficulty: 'intermediate'
  topics: string[]
  completed?: boolean
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: 'Composition API Refactor',
    description: 'Refactor an Options API component to use Composition API with setup script.',
    difficulty: 'intermediate',
    topics: ['Composition API', 'setup()', 'Reactivity'],
  },
  {
    id: 2,
    title: 'Custom Composable',
    description: 'Create a reusable composable for fetching data from an API with loading states.',
    difficulty: 'intermediate',
    topics: ['Composables', 'Async/Await', 'Reactive State'],
  },
  {
    id: 3,
    title: 'Pinia Store Management',
    description: 'Implement state management using Pinia for a shopping cart application.',
    difficulty: 'intermediate',
    topics: ['Pinia', 'State Management', 'Actions'],
  },
  {
    id: 4,
    title: 'Dynamic Components',
    description: 'Build a tab system using dynamic components and keep-alive.',
    difficulty: 'intermediate',
    topics: ['Dynamic Components', 'keep-alive', 'Component Switching'],
  },
  {
    id: 5,
    title: 'Form with Validation',
    description: 'Create a multi-step form with validation, error handling, and progress tracking.',
    difficulty: 'intermediate',
    topics: ['Forms', 'Validation', 'Computed Properties'],
  },
  {
    id: 6,
    title: 'Search & Filter',
    description: 'Implement real-time search and filtering with debouncing on a large dataset.',
    difficulty: 'intermediate',
    topics: ['Watchers', 'Debouncing', 'Computed Properties'],
  },
  {
    id: 7,
    title: 'Modal System',
    description: 'Create a reusable modal component with teleport and proper accessibility.',
    difficulty: 'intermediate',
    topics: ['Teleport', 'Slots', 'Accessibility'],
  },
  {
    id: 8,
    title: 'API Integration',
    description: 'Build a CRUD application that interacts with a REST API with proper error handling.',
    difficulty: 'intermediate',
    topics: ['Fetch API', 'Error Handling', 'Loading States'],
  },
]
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <RouterLink to="/" class="mb-4 inline-flex items-center text-yellow-500 hover:text-yellow-600">
        <div i-carbon-arrow-left class="mr-2" />
        Back to Home
      </RouterLink>

      <div class="mb-4 flex items-center gap-3">
        <div i-carbon-chart-line class="text-4xl text-yellow-500" />
        <h1 class="text-4xl font-bold">
          Intermediate Challenges
        </h1>
      </div>

      <p class="max-w-2xl text-lg text-gray-600 dark:text-gray-300">
        Level up your skills with composition API, composables, state management,
        and more advanced Vue patterns.
      </p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 mb-8 gap-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
      <div class="text-center">
        <div class="text-2xl text-yellow-600 font-bold dark:text-yellow-400">
          {{ challenges.length }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Total Challenges
        </div>
      </div>
      <div class="text-center">
        <div class="text-2xl text-yellow-600 font-bold dark:text-yellow-400">
          0
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Completed
        </div>
      </div>
      <div class="text-center">
        <div class="text-2xl text-yellow-600 font-bold dark:text-yellow-400">
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
        class="group border-2 border-gray-200 rounded-xl p-6 transition-all duration-300 dark:border-gray-700 hover:border-yellow-500 hover:shadow-md dark:hover:border-yellow-400"
      >
        <div class="mb-3 flex items-start justify-between">
          <span class="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-700 font-semibold dark:bg-yellow-900 dark:text-yellow-300">
            #{{ challenge.id }}
          </span>
          <div
            v-if="challenge.completed"
            i-carbon-checkmark-filled
            class="text-yellow-500"
          />
        </div>

        <h3 class="mb-2 text-xl font-bold transition-colors group-hover:text-yellow-500 dark:group-hover:text-yellow-400">
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

        <button class="w-full rounded-lg bg-yellow-500 px-4 py-2 text-white font-semibold transition-colors hover:bg-yellow-600">
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
