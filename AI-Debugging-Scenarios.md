# AI-Assisted Debugging Scenarios (Live Coding Exercise)

## AI-Assisted Debugging Scenarios (Live Coding Exercise)

> **Instructions for the interviewer:** Present the candidate with each problematic code scenario. Ask them to identify the issues and fix the code using an AI assistant (e.g., Claude, Copilot). Evaluate:
>
> - How they describe the problem to the AI (prompt quality)
> - How they validate and iterate on the AI's suggestions
> - Their understanding of the underlying concepts
> - Whether they blindly accept AI output or critically review it

---

### Scenario 1A: Vue 3 — Memory Leak and Reactivity Bug

**Context:** A developer wrote a Vue 3 product listing page (SPA, no SSR) using [DummyJSON](https://dummyjson.com/docs/products) as the backend API. Users report the page gets slower over time and the search filter doesn't work correctly after navigating away and back.

> **API Reference:** `https://dummyjson.com/products?limit=10&skip=0` returns `{ products: [...], total, skip, limit }`. Search: `https://dummyjson.com/products/search?q=phone`.

**Problematic Code:**

```vue
<!-- src/views/ProductList.vue -->
<script setup>
import { onMounted, ref, watch } from 'vue'

const search = ref('')
const products = ref([])
const page = ref(0)
const limit = 10
let interval

async function fetchProducts() {
  const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${page.value * limit}`)
  const data = await response.json()
  products.value = [...products.value, ...data.products]
}

onMounted(() => {
  fetchProducts()

  // Poll for new products every 5 seconds
  interval = setInterval(async () => {
    const response = await fetch('https://dummyjson.com/products?limit=1&skip=0&sortBy=id&order=desc')
    const latest = await response.json()
    products.value.push(latest.products[0])
  }, 5000)
})

watch(search, () => {
  fetchProducts()
})

function loadMore() {
  page.value++
  fetchProducts()
}
</script>

<template>
  <div>
    <input v-model="search" placeholder="Search products...">
    <div v-for="product in products" :key="product.id">
      <h3>{{ product.title }}</h3>
      <p>${{ product.price }}</p>
    </div>
    <button @click="loadMore">
      Load More
    </button>
  </div>
</template>
```

**Issues to identify (Expected Answer):**

1. **Memory leak**: `setInterval` is never cleared — when the component unmounts (user navigates away), the interval continues running, fetching data and accumulating references in memory. Missing `onUnmounted` cleanup.
2. **Reactivity bug on search**: When `search` changes, `fetchProducts()` appends results to the existing array instead of resetting it. Filtered results mix with previous unfiltered results.
3. **Search doesn't use search API**: The watcher calls `fetchProducts()` which hits the listing endpoint, not the search endpoint (`/products/search?q=`). Search input has no effect on results.
4. **Race condition**: Rapid typing triggers multiple concurrent `fetchProducts` calls that may resolve out of order, causing stale data to overwrite fresh data.
5. **No loading/error state**: The UI provides no feedback during data fetching or when requests fail.
6. **No error handling**: `fetch` doesn't throw on HTTP errors — a 500 response would silently push `undefined` items into the array.
7. **Polling pushes duplicates**: The interval pushes the latest product without checking if it already exists in the list.

**Fixed Code:**

```vue
<!-- src/views/ProductList.vue -->
<script setup>
import { useDebounceFn } from '@vueuse/core'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const search = ref('')
const products = ref([])
const page = ref(0)
const total = ref(0)
const limit = 10
const loading = ref(false)
const loadingMore = ref(false)
const error = ref(null)
let interval = null
let abortController = null

async function fetchProducts(reset = false) {
  // Cancel any in-flight request
  if (abortController)
    abortController.abort()
  abortController = new AbortController()

  if (reset) {
    page.value = 0
    products.value = []
  }

  loading.value = true
  error.value = null

  try {
    const baseUrl = search.value
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(search.value)}`
      : 'https://dummyjson.com/products'

    const response = await fetch(
      `${baseUrl}&limit=${limit}&skip=${page.value * limit}`.replace('?q=', '?q=').replace('products&', 'products?'),
      { signal: abortController.signal }
    )

    if (!response.ok)
      throw new Error(`HTTP ${response.status}`)

    const data = await response.json()
    products.value = reset ? data.products : [...products.value, ...data.products]
    total.value = data.total
  }
  catch (err) {
    if (err.name !== 'AbortError') {
      error.value = err.message
    }
  }
  finally {
    loading.value = false
    loadingMore.value = false
  }
}

// Debounce search to avoid race conditions
const debouncedSearch = useDebounceFn(() => {
  fetchProducts(true)
}, 300)

watch(search, () => {
  debouncedSearch()
})

function loadMore() {
  loadingMore.value = true
  page.value++
  fetchProducts(false)
}

onMounted(() => {
  fetchProducts(true)

  // Polling with proper cleanup
  interval = setInterval(() => {
    fetchProducts(true)
  }, 30000) // Poll every 30s, not 5s
})

onUnmounted(() => {
  if (interval)
    clearInterval(interval)
  if (abortController)
    abortController.abort()
})
</script>

<template>
  <div>
    <input v-model="search" placeholder="Search products...">
    <div v-if="loading && !products.length">
      Loading...
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <template v-else>
      <div v-for="product in products" :key="product.id">
        <h3>{{ product.title }}</h3>
        <p>${{ product.price }}</p>
      </div>
      <button
        :disabled="loadingMore || products.length >= total"
        @click="loadMore"
      >
        {{ loadingMore ? 'Loading...' : 'Load More' }}
      </button>
    </template>
  </div>
</template>
```

---

### Scenario 1B: Nuxt 3 — Memory Leak and Reactivity Bug

**Context:** The same product listing feature, but built using Nuxt 3 with SSR. A developer used Nuxt-specific patterns incorrectly. Users report the page gets slower over time and the search filter doesn't work correctly after navigating away and back.

> **API Reference:** `https://dummyjson.com/products?limit=10&skip=0` returns `{ products: [...], total, skip, limit }`. Search: `https://dummyjson.com/products/search?q=phone`.

**Problematic Code:**

```vue
<!-- pages/products.vue -->
<script setup>
import { ref, watch } from 'vue'

const search = ref('')
const products = ref([])
const page = ref(0)
const limit = 10
let interval

async function fetchProducts() {
  const data = await $fetch(`https://dummyjson.com/products?limit=${limit}&skip=${page.value * limit}`)
  products.value = [...products.value, ...data.products]
}

// Poll for new products every 5 seconds
interval = setInterval(async () => {
  const latest = await $fetch('https://dummyjson.com/products?limit=1&skip=0&sortBy=id&order=desc')
  products.value.push(latest.products[0])
}, 5000)

watch(search, () => {
  fetchProducts()
})

function loadMore() {
  page.value++
  fetchProducts()
}

fetchProducts()
</script>

<template>
  <div>
    <input v-model="search" placeholder="Search products...">
    <div v-for="product in products" :key="product.id">
      <h3>{{ product.title }}</h3>
      <p>${{ product.price }}</p>
    </div>
    <button @click="loadMore">
      Load More
    </button>
  </div>
</template>
```

**Issues to identify (Expected Answer):**

1. **Memory leak**: `setInterval` is never cleared — when the user navigates away, the interval continues running, fetching data and accumulating in memory. Missing `onUnmounted` cleanup.
2. **`setInterval` runs during SSR**: On the server, `setInterval` runs but never gets cleaned up since `onUnmounted` is never called server-side. This leaks on every request.
3. **Reactivity bug on search**: When `search` changes, `fetchProducts()` appends results to the existing array instead of resetting it. Filtered results mix with previous unfiltered results.
4. **Search doesn't use search API**: The watcher calls `fetchProducts()` which hits the listing endpoint, ignoring the search term entirely.
5. **Race condition**: Rapid typing triggers multiple concurrent `$fetch` calls that may resolve out of order.
6. **Not using Nuxt composables**: `$fetch` in `<script setup>` without `useAsyncData`/`useFetch` causes duplicate fetches (server + client hydration mismatch) and loses SSR benefits like caching and deduplication.
7. **No loading/error state**: The UI provides no feedback during data fetching.
8. **`fetchProducts()` called at top level**: Runs on both server and client, causing double data fetching and hydration mismatches.

**Fixed Code:**

```vue
<!-- pages/products.vue -->
<script setup>
import { useDebounceFn } from '@vueuse/core'
import { computed, onUnmounted, ref, watch } from 'vue'

const search = ref('')
const page = ref(0)
const limit = 10
const loadingMore = ref(false)

const fetchUrl = computed(() => {
  if (search.value) {
    return `https://dummyjson.com/products/search?q=${encodeURIComponent(search.value)}&limit=${limit}&skip=${page.value * limit}`
  }
  return `https://dummyjson.com/products?limit=${limit}&skip=${page.value * limit}`
})

// useAsyncData handles SSR, caching, and deduplication
const { data, pending, error, refresh } = await useAsyncData(
  'products',
  () => $fetch(fetchUrl.value),
  { watch: [fetchUrl] }
)

// Debounce search to avoid race conditions
const debouncedSearch = useDebounceFn(() => {
  page.value = 0
}, 300)

watch(search, () => {
  debouncedSearch()
})

// Polling — only on client side, with proper cleanup
let interval: ReturnType<typeof setInterval> | null = null

if (import.meta.client) {
  interval = setInterval(() => {
    refresh()
  }, 30000)
}

onUnmounted(() => {
  if (interval)
    clearInterval(interval)
})

async function loadMore() {
  loadingMore.value = true
  page.value++
  await refresh()
  loadingMore.value = false
}
</script>

<template>
  <div>
    <input v-model="search" placeholder="Search products...">
    <div v-if="pending">
      Loading...
    </div>
    <div v-else-if="error">
      Failed to load products: {{ error.message }}
    </div>
    <template v-else>
      <div v-for="product in data?.products" :key="product.id">
        <h3>{{ product.title }}</h3>
        <p>${{ product.price }}</p>
      </div>
      <button
        :disabled="loadingMore || !data || page * limit >= data.total"
        @click="loadMore"
      >
        {{ loadingMore ? 'Loading...' : 'Load More' }}
      </button>
    </template>
  </div>
</template>
```

**Key differences between Vue 3 and Nuxt 3 fixes:**

| Concern              | Vue 3 (SPA) Fix                                | Nuxt 3 (SSR) Fix                                               |
| -------------------- | ---------------------------------------------- | -------------------------------------------------------------- |
| **Data fetching**    | `fetch()` + manual state management            | `useAsyncData()` with automatic SSR/hydration                  |
| **Race conditions**  | `AbortController` to cancel in-flight requests | `useAsyncData` handles deduplication internally                |
| **Polling guard**    | Start in `onMounted` (no SSR concern)          | Guard with `import.meta.client` to avoid server-side intervals |
| **URL construction** | Manual URL building in fetch call              | `computed` ref watched by `useAsyncData`                       |
| **Error handling**   | Try/catch with manual error ref                | Built-in `error` ref from `useAsyncData`                       |
| **Caching**          | Manual (or use libraries like TanStack Query)  | Built-in via Nuxt's `useAsyncData` key-based cache             |

---

### Scenario 2: TypeScript/JavaScript — Unsafe Types and Async Pitfalls

**Context:** A developer built an API service layer for a Vue 3 app using [ReqRes](https://reqres.in/) as the backend. The code compiles without errors but causes runtime crashes and data corruption in production.

> **API Reference:** `https://reqres.in/api/users?page=1` returns `{ page, per_page, total, data: [{ id, email, first_name, last_name, avatar }] }`. PUT/DELETE endpoints: `https://reqres.in/api/users/{id}`.

**Problematic Code:**

```typescript
// services/api.ts
interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
}

interface ApiResponse {
  data: any
  page: number
  total: number
}

class UserService {
  private baseUrl = 'https://reqres.in/api'
  private cache: any = {}

  async getUsers(): Promise<User[]> {
    if (this.cache.users) {
      return this.cache.users
    }

    const response = await fetch(`${this.baseUrl}/users?page=1`)
    const result: ApiResponse = await response.json()
    this.cache.users = result.data
    return result.data
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
    const result = await response.json()

    // Update cache
    const users = this.cache.users
    const index = users.findIndex((u: any) => u.id === id)
    users[index] = { ...users[index], ...result }

    return result
  }

  async deleteUsers(ids: number[]): Promise<void> {
    ids.forEach(async (id) => {
      await fetch(`${this.baseUrl}/users/${id}`, { method: 'DELETE' })
    })

    // Remove from cache
    this.cache.users = this.cache.users.filter(
      (u: any) => !ids.includes(u.id)
    )
  }

  async getUsersByRole(role: string): Promise<User[]> {
    const users = await this.getUsers()
    return users.filter(u => u.role == role)
  }
}

export const userService = new UserService()
```

**Issues to identify (Expected Answer):**

1. **Excessive `any` types**: `ApiResponse.data` is `any`, cache is `any` — defeats the purpose of TypeScript. Runtime type mismatches go undetected.
2. **No error handling**: No check for `response.ok`. Network failures, 404s, and 500s silently return malformed data that gets cached.
3. **`forEach` with `async`**: In `deleteUsers`, `forEach` doesn't await — the function returns immediately before deletions complete. Cache is modified assuming all deletes succeeded.
4. **Cache invalidation bug**: `updateUser` directly mutates the cache array. If `this.cache.users` is `undefined` (cache miss), it throws `Cannot read property 'findIndex' of undefined`.
5. **Stale cache**: No TTL or invalidation strategy. Once cached, data never refreshes.
6. **Missing `Content-Type` header**: The PUT request sends JSON body but doesn't set `Content-Type: application/json` header.
7. **Loose equality**: `u.role == role` uses loose comparison instead of strict `===`.
8. **`role` parameter typed as `string`**: Should use the `User['role']` union type for type safety.

**Fixed Code:**

```typescript
// services/api.ts
interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  avatar: string
  role: 'admin' | 'editor' | 'viewer'
}

interface ReqResListResponse<T> {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: T[]
}

interface CacheEntry<T> {
  data: T
  timestamp: number
}

class UserService {
  private baseUrl = 'https://reqres.in/api'
  private cache: Map<string, CacheEntry<unknown>> = new Map()
  private cacheTTL = 60000 // 1 minute

  private getCached<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (entry && Date.now() - entry.timestamp < this.cacheTTL) {
      return entry.data as T
    }
    this.cache.delete(key)
    return null
  }

  private setCache<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() })
  }

  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  async getUsers(): Promise<User[]> {
    const cached = this.getCached<User[]>('users')
    if (cached)
      return cached

    const result = await this.request<ReqResListResponse<User>>(
      `${this.baseUrl}/users?page=1&per_page=12`
    )
    this.setCache('users', result.data)
    return result.data
  }

  async updateUser(id: number, updates: Partial<Omit<User, 'id'>>): Promise<User> {
    const updatedUser = await this.request<User>(
      `${this.baseUrl}/users/${id}`,
      { method: 'PUT', body: JSON.stringify(updates) }
    )

    // Invalidate cache instead of manual mutation
    this.cache.delete('users')
    return updatedUser
  }

  async deleteUsers(ids: number[]): Promise<void> {
    // Use Promise.all instead of forEach
    await Promise.all(
      ids.map(id =>
        fetch(`${this.baseUrl}/users/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
          if (!res.ok)
            throw new Error(`Failed to delete user ${id}`)
        })
      )
    )

    this.cache.delete('users')
  }

  async getUsersByRole(role: User['role']): Promise<User[]> {
    const users = await this.getUsers()
    return users.filter(u => u.role === role)
  }
}

export const userService = new UserService()
```

---

### Scenario 3: HTML, CSS & Accessibility — Inaccessible Modal with Layout Bugs

**Context:** A developer created a confirmation modal component. QA reports: (1) screen reader users can't interact with it, (2) the modal doesn't trap focus, (3) the layout breaks on mobile, and (4) users can scroll the background when the modal is open.

**Problematic Code:**

```vue
<!-- components/ConfirmModal.vue -->
<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,
  message: String,
  confirmText: { type: String, default: 'Confirm' }
})

const emit = defineEmits(['confirm', 'close'])

const isOpen = ref(false)

function open() { isOpen.value = true }
function close() { isOpen.value = false; emit('close') }
function confirm() { emit('confirm'); close() }

defineExpose({ open, close })
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <span class="title">{{ title }}</span>
        <span class="close-btn" @click="close">✕</span>
      </div>
      <div class="modal-body">
        <p>{{ message }}</p>
      </div>
      <div class="modal-footer">
        <div class="btn cancel" @click="close">
          Cancel
        </div>
        <div class="btn confirm" @click="confirm">
          {{ confirmText }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  width: 500px;
  border-radius: 8px;
  padding: 24px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.close-btn {
  cursor: pointer;
  font-size: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel {
  background: #e0e0e0;
}

.confirm {
  background: #1976d2;
  color: white;
}
</style>
```

**Issues to identify (Expected Answer):**

**Accessibility issues:**

1. **No ARIA attributes**: Missing `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`.
2. **Close button is a `<span>`**: Not focusable or announced by screen readers. Must be a `<button>` with `aria-label`.
3. **Action buttons are `<div>`**: Not keyboard-operable or announced as interactive. Must be `<button>` elements.
4. **No focus trap**: Users can Tab out of the modal into background content.
5. **No Escape key handling**: Keyboard users have no way to dismiss the modal without Tab-navigating to the close button.
6. **No focus management**: Focus doesn't move into the modal on open or return to the trigger element on close.

**CSS/Layout issues:** 7. **Fixed width `500px`**: Overflows on mobile screens (< 500px width). No responsive handling. 8. **Background scroll not prevented**: Page behind the modal remains scrollable. 9. **No `z-index`**: Modal may appear behind other positioned elements. 10. **`100vw` causes horizontal scrollbar**: On Windows (scrollbar takes space), `100vw` includes scrollbar width, creating overflow.

**Fixed Code:**

```vue
<!-- components/ConfirmModal.vue -->
<script setup lang="ts">
import { nextTick, onUnmounted, ref, useId, watch } from 'vue'

const props = defineProps<{
  title: string
  message: string
  confirmText?: string
}>()

const emit = defineEmits<{
  confirm: []
  close: []
}>()

const titleId = `modal-title-${useId()}`
const bodyId = `modal-body-${useId()}`

const isOpen = ref(false)
const modalContent = ref<HTMLElement | null>(null)
const confirmBtn = ref<HTMLElement | null>(null)
let previouslyFocusedElement: HTMLElement | null = null

function open() {
  previouslyFocusedElement = document.activeElement as HTMLElement
  isOpen.value = true
}

function close() {
  isOpen.value = false
  emit('close')
  // Return focus to trigger element
  nextTick(() => {
    previouslyFocusedElement?.focus()
  })
}

function handleConfirm() {
  emit('confirm')
  close()
}

// Focus trap
function trapFocus(event: KeyboardEvent) {
  if (!isOpen.value || event.key !== 'Tab')
    return

  const modal = modalContent.value
  if (!modal)
    return

  const focusableElements = modal.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  }
  else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

// Lock body scroll and manage focus
watch(isOpen, async (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', trapFocus)
    await nextTick()
    confirmBtn.value?.focus()
  }
  else {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', trapFocus)
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', trapFocus)
})

defineExpose({ open, close })
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="modal-overlay"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :aria-describedby="bodyId"
        @click.self="close"
        @keydown.escape="close"
      >
        <div
          ref="modalContent"
          class="modal-content"
          tabindex="-1"
        >
          <header class="modal-header">
            <h2 :id="titleId" class="title">
              {{ title }}
            </h2>
            <button
              class="close-btn"
              aria-label="Close dialog"
              @click="close"
            >
              ✕
            </button>
          </header>
          <div :id="bodyId" class="modal-body">
            <p>{{ message }}</p>
          </div>
          <footer class="modal-footer">
            <button class="btn cancel" @click="close">
              Cancel
            </button>
            <button ref="confirmBtn" class="btn confirm" @click="handleConfirm">
              {{ confirmText }}
            </button>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  width: min(500px, calc(100% - 32px));
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  border-radius: 8px;
  padding: 24px;
  outline: none;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.title {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.25rem;
}

.close-btn:hover,
.close-btn:focus-visible {
  background: #f0f0f0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
}

.btn:focus-visible {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}

.cancel {
  background: #e0e0e0;
  color: #333;
}

.cancel:hover {
  background: #d0d0d0;
}

.confirm {
  background: #1976d2;
  color: white;
}

.confirm:hover {
  background: #1565c0;
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active {
    transition: none;
  }
}
</style>
```

---

### Scenario 4: Performance — Unoptimized Data Table with Rendering Issues

**Context:** A developer built a data table component that fetches comments from [JSONPlaceholder](https://jsonplaceholder.typicode.com/) (500 records, simulating a large dataset). Users report: (1) the page freezes on load, (2) sorting takes 5+ seconds, (3) typing in the filter input is extremely laggy, and (4) scrolling is janky.

> **API Reference:** `https://jsonplaceholder.typicode.com/comments` returns 500 comments with fields: `{ id, postId, name, email, body }`. For simulating 10,000+ rows, the code duplicates the dataset.

**Problematic Code:**

```vue
<!-- components/DataTable.vue -->
<script setup>
import { onMounted, ref } from 'vue'

const columns = ['id', 'name', 'email', 'body']
const allRows = ref([])
const displayedRows = ref([])
const filter = ref('')
const sortColumn = ref('')

onMounted(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments')
  const data = await response.json()
  // Duplicate dataset to simulate 10,000+ rows
  const largeDataset = []
  for (let i = 0; i < 20; i++) {
    largeDataset.push(...data.map((item, idx) => ({ ...item, id: i * 500 + idx })))
  }
  allRows.value = largeDataset
  displayedRows.value = largeDataset
})

function applyFilter() {
  displayedRows.value = allRows.value.filter(row =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(filter.value.toLowerCase())
    )
  )
}

function sortBy(column) {
  sortColumn.value = column
  displayedRows.value = [...displayedRows.value].sort((a, b) => {
    return String(a[column]).localeCompare(String(b[column]))
  })
}

function highlight(text) {
  if (!filter.value)
    return text
  const regex = new RegExp(`(${filter.value})`, 'gi')
  return String(text).replace(regex, '<mark>$1</mark>')
}

function editRow(row) { /* ... */ }
function deleteRow(row) { /* ... */ }
</script>

<template>
  <div class="table-container">
    <input
      :value="filter"
      placeholder="Filter comments..."
      @input="filter = $event.target.value; applyFilter()"
    >
    <select @change="sortBy($event.target.value)">
      <option value="">
        Sort by...
      </option>
      <option v-for="col in columns" :key="col" :value="col">
        {{ col }}
      </option>
    </select>

    <table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col">
            {{ col }}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in displayedRows" :key="index">
          <td v-for="col in columns" :key="col">
            <span v-html="highlight(row[col])" />
          </td>
          <td>
            <button @click="editRow(row)">
              Edit
            </button>
            <button @click="deleteRow(row)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  height: 600px;
  overflow: auto;
}

table {
  width: 100%;
}

tr:nth-child(even) {
  background: #f5f5f5;
}
</style>
```

**Issues to identify (Expected Answer):**

**Performance issues:**

1. **Rendering all 10,000+ rows at once**: No virtualization. The DOM contains thousands of `<tr>` elements, causing massive memory usage and layout thrashing.
2. **`v-html` with `highlight()` on every cell**: Creates a regex and runs string replacement for every cell on every render — O(rows × columns) per re-render. Also an XSS risk if `filter` contains HTML.
3. **No debounce on filter input**: `applyFilter()` runs synchronously on every keystroke, blocking the main thread during filtering of 10,000+ rows.
4. **`:key="index"`**: Using array index as key causes Vue to re-render all rows when the list changes (sort, filter) instead of efficiently patching.
5. **Sort mutates displayed rows directly**: Loses the original sort order; applying a filter after sorting requires re-sorting.
6. **Inline event handlers create new functions**: `@click="editRow(row)"` creates a new closure for every row on every render.

**CSS/Layout issues:** 7. **No `table-layout: fixed`**: Browser recalculates column widths on every row change. 8. **Sticky header missing**: Headers scroll out of view in a large table.

**Fixed Code:**

```vue
<!-- components/DataTable.vue -->
<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'

interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

const ROW_HEIGHT = 40
const VISIBLE_BUFFER = 10

const columns = ['id', 'name', 'email', 'body']
const allRows = ref<Comment[]>([])
const filter = ref('')
const debouncedFilter = ref('')
const sortColumn = ref('')
const scrollTop = ref(0)
const scrollContainer = ref<HTMLElement | null>(null)

// Debounce filter input
const updateFilter = useDebounceFn((value: string) => {
  debouncedFilter.value = value
}, 250)

watch(filter, value => updateFilter(value))

// Computed: filter then sort (derived from source data, never mutated)
const filteredRows = computed(() => {
  let rows = allRows.value

  if (debouncedFilter.value) {
    const term = debouncedFilter.value.toLowerCase()
    rows = rows.filter(row =>
      columns.some(col =>
        String(row[col as keyof Comment]).toLowerCase().includes(term)
      )
    )
  }

  if (sortColumn.value) {
    const col = sortColumn.value as keyof Comment
    rows = [...rows].sort((a, b) =>
      String(a[col]).localeCompare(String(b[col]))
    )
  }

  return rows
})

// Virtual scrolling
const visibleCount = computed(() => {
  if (!scrollContainer.value)
    return 30
  return Math.ceil(scrollContainer.value.clientHeight / ROW_HEIGHT) + VISIBLE_BUFFER * 2
})

const startIndex = computed(() => {
  return Math.max(0, Math.floor(scrollTop.value / ROW_HEIGHT) - VISIBLE_BUFFER)
})

const visibleRows = computed(() => {
  return filteredRows.value.slice(startIndex.value, startIndex.value + visibleCount.value)
})

const offsetTop = computed(() => startIndex.value * ROW_HEIGHT)
const offsetBottom = computed(() => {
  const remaining = filteredRows.value.length - startIndex.value - visibleCount.value
  return Math.max(0, remaining) * ROW_HEIGHT
})

function onScroll(event: Event) {
  scrollTop.value = (event.target as HTMLElement).scrollTop
}

// Safe highlighting without v-html (prevents XSS)
function highlightSegments(text: unknown) {
  const str = String(text)
  if (!debouncedFilter.value)
    return [{ text: str, match: false }]

  const segments: { text: string, match: boolean }[] = []
  const term = debouncedFilter.value.toLowerCase()
  let remaining = str

  while (remaining.length > 0) {
    const matchIndex = remaining.toLowerCase().indexOf(term)
    if (matchIndex === -1) {
      segments.push({ text: remaining, match: false })
      break
    }
    if (matchIndex > 0) {
      segments.push({ text: remaining.slice(0, matchIndex), match: false })
    }
    segments.push({ text: remaining.slice(matchIndex, matchIndex + term.length), match: true })
    remaining = remaining.slice(matchIndex + term.length)
  }

  return segments
}

function editRow(id: number) { /* ... */ }
function deleteRow(id: number) { /* ... */ }

// Fetch data from JSONPlaceholder and simulate large dataset
onMounted(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments')
  if (!response.ok)
    throw new Error('Failed to fetch comments')
  const data: Comment[] = await response.json()

  // Duplicate to simulate 10,000 rows
  const largeDataset: Comment[] = []
  for (let i = 0; i < 20; i++) {
    largeDataset.push(...data.map((item, idx) => ({ ...item, id: i * 500 + idx })))
  }
  allRows.value = largeDataset
})
</script>

<template>
  <div class="table-container">
    <div class="table-controls">
      <input
        v-model="filter"
        placeholder="Filter comments..."
        aria-label="Filter table data"
      >
      <select v-model="sortColumn" aria-label="Sort by column">
        <option value="">
          Sort by...
        </option>
        <option v-for="col in columns" :key="col" :value="col">
          {{ col }}
        </option>
      </select>
      <span class="row-count">{{ filteredRows.length }} rows</span>
    </div>

    <div ref="scrollContainer" class="table-scroll" @scroll="onScroll">
      <table>
        <thead>
          <tr>
            <th v-for="col in columns" :key="col">
              {{ col }}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr :style="{ height: `${offsetTop}px` }" aria-hidden="true" />
          <tr v-for="row in visibleRows" :key="row.id">
            <td v-for="col in columns" :key="col">
              <template v-if="filter">
                <span v-for="(segment, i) in highlightSegments(row[col])" :key="i">
                  <mark v-if="segment.match">{{ segment.text }}</mark>
                  <template v-else>{{ segment.text }}</template>
                </span>
              </template>
              <template v-else>
                {{ row[col] }}
              </template>
            </td>
            <td>
              <button @click="editRow(row.id)">
                Edit
              </button>
              <button @click="deleteRow(row.id)">
                Delete
              </button>
            </td>
          </tr>
          <tr :style="{ height: `${offsetBottom}px` }" aria-hidden="true" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  height: 600px;
}

.table-controls {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px 0;
  flex-shrink: 0;
}

.row-count {
  margin-left: auto;
  font-size: 0.875rem;
  color: #666;
}

.table-scroll {
  flex: 1;
  overflow-y: auto;
  will-change: transform;
}

table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

thead {
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  box-shadow: 0 1px 0 #ddd;
}

th,
td {
  padding: 8px 12px;
  text-align: left;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

tr:nth-child(even) {
  background: #f9f9f9;
}
</style>
```

---

### Evaluation Criteria for AI-Assisted Scenarios

| Criteria                         | Poor (1-2)                           | Good (3-4)                                      | Excellent (5)                                                                      |
| -------------------------------- | ------------------------------------ | ----------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Problem identification**       | Misses critical issues               | Finds most issues independently                 | Identifies all issues and explains root causes                                     |
| **Prompt crafting**              | Vague or overly broad prompts        | Provides context and constraints                | Precise prompts with code context, expected behavior, and constraints              |
| **Critical review of AI output** | Accepts output without question      | Checks for obvious errors                       | Validates types, tests edge cases, questions assumptions                           |
| **Understanding depth**          | Can't explain why the fix works      | Explains the fix correctly                      | Connects the fix to broader principles (reactivity model, browser rendering, WCAG) |
| **Iteration quality**            | Gives up or accepts first suggestion | Refines with follow-up prompts                  | Combines AI suggestions with own knowledge to reach optimal solution               |
| **Security awareness**           | Misses security implications         | Identifies XSS/injection risks when pointed out | Proactively catches `v-html` XSS, unsafe regex, missing sanitization               |

> **Note**: This document should be regularly updated to reflect current best practices and technology advancements.
