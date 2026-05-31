<script setup lang="ts">
defineOptions({
  name: 'BeginnerChallenges',
})

// const { t } = useI18n()

useHead({
  title: () => 'Beginner Vue Challenges',
})

interface Challenge {
  id: number
  title: string
  description: string
  difficulty: 'beginner'
  topics: string[]
  completed?: boolean
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: 'Hello World Component',
    description: 'Create a simple Vue component that displays "Hello, Vue!" with reactive data.',
    difficulty: 'beginner',
    topics: ['Components', 'Reactivity', 'Template Syntax'],
  },
  {
    id: 2,
    title: 'Counter App',
    description: 'Build a counter application with increment, decrement, and reset functionality.',
    difficulty: 'beginner',
    topics: ['Event Handling', 'Reactive State', 'Methods'],
  },
  {
    id: 3,
    title: 'Todo List',
    description: 'Create a todo list where users can add, remove, and toggle completion status.',
    difficulty: 'beginner',
    topics: ['v-for', 'v-model', 'List Rendering'],
  },
  {
    id: 4,
    title: 'Conditional Rendering',
    description: 'Build a component that shows different content based on user state (logged in/out).',
    difficulty: 'beginner',
    topics: ['v-if', 'v-else', 'Conditional Rendering'],
  },
  {
    id: 5,
    title: 'Form Validation Basics',
    description: 'Create a simple form with basic validation for name and email fields.',
    difficulty: 'beginner',
    topics: ['Forms', 'v-model', 'Validation'],
  },
  {
    id: 6,
    title: 'Image Gallery',
    description: 'Display a grid of images with click-to-view functionality.',
    difficulty: 'beginner',
    topics: ['v-for', 'Event Handling', 'Computed Properties'],
  },
  {
    id: 7,
    title: 'Simple Calculator',
    description: 'Build a calculator that can perform basic arithmetic operations.',
    difficulty: 'beginner',
    topics: ['Methods', 'Event Handling', 'Reactive Data'],
  },
  {
    id: 8,
    title: 'Tab Navigation',
    description: 'Create tabbed navigation to switch between different content sections.',
    difficulty: 'beginner',
    topics: ['Conditional Rendering', 'Event Handling', 'Dynamic Classes'],
  },
  {
    id: 9,
    title: 'Shopping Cart Display',
    description: 'Display items in a shopping cart with quantity controls and total calculation.',
    difficulty: 'beginner',
    topics: ['v-for', 'Computed Properties', 'Array Methods'],
  },
  {
    id: 10,
    title: 'Search Filter',
    description: 'Implement a search box that filters a list of items in real-time.',
    difficulty: 'beginner',
    topics: ['v-model', 'Computed Properties', 'String Methods'],
  },
  {
    id: 11,
    title: 'Accordion Component',
    description: 'Create an accordion UI where clicking headers expands/collapses content.',
    difficulty: 'beginner',
    topics: ['Conditional Rendering', 'Event Handling', 'Dynamic Classes'],
  },
  {
    id: 12,
    title: 'Star Rating System',
    description: 'Build an interactive star rating component with hover and click effects.',
    difficulty: 'beginner',
    topics: ['Event Handling', 'Dynamic Styling', 'Component Props'],
  },
  {
    id: 13,
    title: 'Digital Clock',
    description: 'Create a digital clock that updates every second using Vue reactivity.',
    difficulty: 'beginner',
    topics: ['Lifecycle Hooks', 'setInterval', 'Date Object'],
  },
  {
    id: 14,
    title: 'Color Picker',
    description: 'Build a color picker with RGB sliders that display the selected color.',
    difficulty: 'beginner',
    topics: ['v-model', 'Inline Styles', 'Computed Properties'],
  },
  {
    id: 15,
    title: 'Quiz App',
    description: 'Create a simple quiz with multiple choice questions and score tracking.',
    difficulty: 'beginner',
    topics: ['Conditional Rendering', 'Event Handling', 'State Management'],
  },
  {
    id: 16,
    title: 'Markdown Previewer',
    description: 'Build a markdown editor with live preview using a simple parser.',
    difficulty: 'beginner',
    topics: ['v-model', 'Computed Properties', 'String Manipulation'],
  },
  {
    id: 17,
    title: 'Expense Tracker',
    description: 'Track expenses with add/delete functionality and total calculation.',
    difficulty: 'beginner',
    topics: ['Forms', 'v-for', 'Array Methods', 'Computed Properties'],
  },
  {
    id: 18,
    title: 'Password Strength Checker',
    description: 'Create a password input with visual strength indicator.',
    difficulty: 'beginner',
    topics: ['v-model', 'Computed Properties', 'Regular Expressions'],
  },
]
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <RouterLink to="/" class="mb-4 inline-flex items-center text-green-500 hover:text-green-600">
        <div i-carbon-arrow-left class="mr-2" />
        Back to Home
      </RouterLink>

      <div class="mb-4 flex items-center gap-3">
        <div i-carbon-idea class="text-4xl text-green-500" />
        <h1 class="text-4xl font-bold">
          Beginner Challenges
        </h1>
      </div>

      <p class="max-w-2xl text-lg text-gray-600 dark:text-gray-300">
        Perfect for those just starting with Vue.js. Master fundamentals like reactivity,
        components, directives, and event handling.
      </p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 mb-8 gap-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
      <div class="text-center">
        <div class="text-2xl text-green-600 font-bold dark:text-green-400">
          {{ challenges.length }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Total Challenges
        </div>
      </div>
      <div class="text-center">
        <div class="text-2xl text-green-600 font-bold dark:text-green-400">
          0
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Completed
        </div>
      </div>
      <div class="text-center">
        <div class="text-2xl text-green-600 font-bold dark:text-green-400">
          0%
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Progress
        </div>
      </div>
    </div>

    <!-- Challenges Grid -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
      <RouterLink
        v-for="challenge in challenges"
        :key="challenge.id"
        :to="`/challenges/beginner/${String(challenge.id).padStart(2, '0')}`"
        class="group block border-2 border-gray-200 rounded-xl p-6 transition-all duration-300 dark:border-gray-700 hover:border-green-500 hover:shadow-md dark:hover:border-green-400"
      >
        <div class="mb-3 flex items-start justify-between">
          <span class="rounded bg-green-100 px-2 py-1 text-xs text-green-700 font-semibold dark:bg-green-900 dark:text-green-300">
            #{{ challenge.id }}
          </span>
          <div
            v-if="challenge.completed"
            i-carbon-checkmark-filled
            class="text-green-500"
          />
        </div>

        <h3 class="mb-2 text-xl font-bold transition-colors group-hover:text-green-500 dark:group-hover:text-green-400">
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

        <button class="w-full rounded-lg bg-green-500 px-4 py-2 text-white font-semibold transition-colors hover:bg-green-600">
          Start Challenge
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
