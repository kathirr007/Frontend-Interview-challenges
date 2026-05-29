<script setup lang="ts">
const router = useRouter()

useHead({
  title: () => '404 - Page Not Found',
})
</script>

<template>
  <div class="min-h-[60vh] flex items-center justify-center px-4 py-12">
    <div class="max-w-md text-center">
      <!-- 404 Icon -->
      <div class="mb-8">
        <div class="select-none text-9xl text-gray-300 font-bold dark:text-gray-700">
          404
        </div>
      </div>

      <!-- Error Message -->
      <h1 class="mb-4 text-3xl text-gray-800 font-bold dark:text-gray-200">
        Page Not Found
      </h1>

      <p class="mb-8 text-lg text-gray-600 dark:text-gray-400">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <!-- Actions -->
      <div class="flex flex-col justify-center gap-4 sm:flex-row">
        <RouterLink
          to="/"
          class="inline-flex items-center justify-center rounded-lg bg-green-500 px-6 py-3 text-white font-semibold transition-colors hover:bg-green-600"
        >
          <div i-carbon-home class="mr-2" />
          Go Home
        </RouterLink>

        <button
          class="inline-flex items-center justify-center border-2 border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-semibold transition-all dark:border-gray-600 hover:border-green-500 dark:text-gray-300 hover:text-green-500 dark:hover:border-green-400 dark:hover:text-green-400"
          @click="router.back()"
        >
          <div i-carbon-arrow-left class="mr-2" />
          Go Back
        </button>
      </div>

      <!-- Helpful Links -->
      <div class="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
        <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
          You might be looking for:
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <RouterLink to="/beginner" class="rounded-lg bg-green-100 px-4 py-2 text-sm text-green-700 transition-colors dark:bg-green-900/30 hover:bg-green-200 dark:text-green-300 dark:hover:bg-green-900/50">
            Beginner Challenges
          </RouterLink>
          <RouterLink to="/intermediate" class="rounded-lg bg-yellow-100 px-4 py-2 text-sm text-yellow-700 transition-colors dark:bg-yellow-900/30 hover:bg-yellow-200 dark:text-yellow-300 dark:hover:bg-yellow-900/50">
            Intermediate Challenges
          </RouterLink>
          <RouterLink to="/advanced" class="rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 transition-colors dark:bg-red-900/30 hover:bg-red-200 dark:text-red-300 dark:hover:bg-red-900/50">
            Advanced Challenges
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
