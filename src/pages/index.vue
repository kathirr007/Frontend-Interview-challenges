<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

// const { t } = useI18n()

useHead({
  title: () => 'Vue Challenges - Frontend Interview Practice',
})

interface ChallengeCategory {
  id: string
  title: string
  description: string
  icon: string
  count: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

const categories: ChallengeCategory[] = [
  {
    id: 'beginner',
    title: 'Beginner Challenges',
    description: 'Perfect for those just starting with Vue.js. Learn fundamentals like reactivity, components, and basic directives.',
    icon: 'i-carbon-idea',
    count: 18,
    difficulty: 'beginner',
  },
  {
    id: 'intermediate',
    title: 'Intermediate Challenges',
    description: 'Level up your skills with composition API, composables, state management, and more advanced patterns.',
    icon: 'i-carbon-chart-line',
    count: 20,
    difficulty: 'intermediate',
  },
  {
    id: 'advanced',
    title: 'Advanced Challenges',
    description: 'Master complex topics like performance optimization, custom directives, plugins, and architecture patterns.',
    icon: 'i-carbon-rocket',
    count: 15,
    difficulty: 'advanced',
  },
]
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <!-- Hero Section -->
    <div class="mb-12 text-center">
      <h1 class="mb-4 from-green-500 to-blue-500 bg-gradient-to-r bg-clip-text text-5xl text-transparent font-bold">
        Vue Challenges
      </h1>
      <p class="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
        Master Vue.js through hands-on coding challenges designed for frontend interviews
      </p>
    </div>

    <!-- Category Cards -->
    <div class="grid grid-cols-1 mb-12 gap-6 md:grid-cols-3">
      <RouterLink
        v-for="category in categories"
        :key="category.id"
        :to="`/${category.id}`"
        class="group block border-2 border-gray-200 rounded-xl p-6 transition-all duration-300 dark:border-gray-700 hover:border-green-500 hover:shadow-lg hover:-translate-y-1 dark:hover:border-green-400"
      >
        <div class="mb-4 flex items-start justify-between">
          <div class="text-4xl text-green-500" :class="[category.icon]" />
          <span
            class="rounded-full px-3 py-1 text-xs font-semibold"
            :class="{
              'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300': category.difficulty === 'beginner',
              'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300': category.difficulty === 'intermediate',
              'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300': category.difficulty === 'advanced',
            }"
          >
            {{ category.difficulty }}
          </span>
        </div>

        <h2 class="mb-2 text-2xl font-bold transition-colors group-hover:text-green-500 dark:group-hover:text-green-400">
          {{ category.title }}
        </h2>

        <p class="mb-4 text-sm text-gray-600 leading-relaxed dark:text-gray-400">
          {{ category.description }}
        </p>

        <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <div i-carbon-task />
          <span class="ml-2">{{ category.count }} challenges</span>
        </div>
      </RouterLink>
    </div>

    <!-- Features Section -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div class="rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
        <div i-carbon-code class="mb-3 text-3xl text-blue-500" />
        <h3 class="mb-2 text-lg font-bold">
          Practice Coding
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Solve real-world Vue.js problems with interactive coding exercises
        </p>
      </div>

      <div class="rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
        <div i-carbon-certificate class="mb-3 text-3xl text-purple-500" />
        <h3 class="mb-2 text-lg font-bold">
          Interview Ready
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Prepare for technical interviews with common Vue.js questions
        </p>
      </div>

      <div class="rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
        <div i-carbon-growth class="mb-3 text-3xl text-orange-500" />
        <h3 class="mb-2 text-lg font-bold">
          Track Progress
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Monitor your learning journey from beginner to advanced
        </p>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
