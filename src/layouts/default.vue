<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
    <!-- Navigation Bar -->
    <nav class="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/80">
      <div class="mx-auto max-w-6xl px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <RouterLink to="/" class="group flex items-center gap-2">
            <div class="text-3xl text-green-500 transition-transform group-hover:scale-110">
              <div i-carbon-code />
            </div>
            <div>
              <h1 class="from-green-500 to-blue-500 bg-gradient-to-r bg-clip-text text-xl text-transparent font-bold">
                Vue Challenges
              </h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Frontend Interview Practice
              </p>
            </div>
          </RouterLink>

          <!-- Navigation Links -->
          <div class="hidden items-center gap-6 md:flex">
            <RouterLink
              to="/beginner"
              class="rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-green-50 dark:text-gray-300 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400"
              active-class="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-semibold"
            >
              Beginner
            </RouterLink>
            <RouterLink
              to="/intermediate"
              class="rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-yellow-50 dark:text-gray-300 hover:text-yellow-600 dark:hover:bg-yellow-900/20 dark:hover:text-yellow-400"
              active-class="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 font-semibold"
            >
              Intermediate
            </RouterLink>
            <RouterLink
              to="/advanced"
              class="rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-red-50 dark:text-gray-300 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
              active-class="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold"
            >
              Advanced
            </RouterLink>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <!-- Dark Mode Toggle -->
            <button
              class="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Toggle dark mode"
              @click="toggleDark()"
            >
              <div v-if="isDark" i-carbon-moon class="text-xl" />
              <div v-else i-carbon-sun class="text-xl" />
            </button>

            <!-- GitHub Link -->
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              class="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              title="GitHub"
            >
              <div i-carbon-logo-github class="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="min-h-[calc(100vh-4rem)]">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div class="mx-auto max-w-6xl px-4 py-8">
        <div class="grid grid-cols-1 mb-8 gap-8 md:grid-cols-3">
          <div>
            <h3 class="mb-3 flex items-center gap-2 text-lg font-bold">
              <div i-carbon-code class="text-green-500" />
              Vue Challenges
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Master Vue.js through hands-on coding challenges designed for frontend interviews.
            </p>
          </div>

          <div>
            <h4 class="mb-3 font-semibold">
              Quick Links
            </h4>
            <ul class="text-sm space-y-2">
              <li>
                <RouterLink to="/" class="text-gray-600 dark:text-gray-400 hover:text-green-500">
                  Home
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/beginner" class="text-gray-600 dark:text-gray-400 hover:text-green-500">
                  Beginner
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/intermediate" class="text-gray-600 dark:text-gray-400 hover:text-green-500">
                  Intermediate
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/advanced" class="text-gray-600 dark:text-gray-400 hover:text-green-500">
                  Advanced
                </RouterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="mb-3 font-semibold">
              Resources
            </h4>
            <ul class="text-sm space-y-2">
              <li><a href="https://vuejs.org" target="_blank" class="text-gray-600 dark:text-gray-400 hover:text-green-500">Vue.js Docs</a></li>
              <li><a href="https://router.vuejs.org" target="_blank" class="text-gray-600 dark:text-gray-400 hover:text-green-500">Vue Router</a></li>
              <li><a href="https://pinia.vuejs.org" target="_blank" class="text-gray-600 dark:text-gray-400 hover:text-green-500">Pinia</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-6 text-center text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
          <p>&copy; 2024 Vue Challenges. Built with ❤️ for frontend developers.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
