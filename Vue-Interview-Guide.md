# Vue.js Interview Questions & Answers

### Q1: What is Vue.js and what are its key features?

**A:** Vue.js is a progressive JavaScript framework for building user interfaces. Key features include:

- **Reactive Data Binding**: Automatic DOM updates when data changes
- **Component-Based Architecture**: Reusable, encapsulated UI components
- **Virtual DOM**: Efficient rendering through virtual DOM diffing
- **Directives**: Special attributes (v-if, v-for, v-bind, etc.) for DOM manipulation
- **Composition API**: Flexible way to organize component logic (Vue 3)
- **Single File Components**: Combine template, script, and styles in .vue files
- **Ecosystem**: Vue Router, Pinia/Vuex, Vue DevTools, and extensive plugin system


### Q2: What are Vue components and how do you create them?

**A:** Components are reusable UI elements with their own templates, logic, and styles. With Vue 3, you can create components using Options API or Composition API:

Options API:

```vue
<script>
export default {
  name: 'Button',
  props: ['label'],
  data() {
    return {
      clicked: false
    }
  },
  methods: {
    handleClick() {
      this.clicked = true
    }
  }
}
</script>

<template>
  <div class="button">
    {{ label }}
  </div>
</template>
```

Composition API:

```vue
<script setup>
import { ref } from 'vue'

const props = defineProps(['label'])
const clicked = ref(false)

function handleClick() {
  clicked.value = true
}
</script>

<template>
  <div class="button" @click="handleClick">
    {{ label }} - Clicked: {{ clicked }}
  </div>
</template>
```

### Q3: Explain Vue's Composition API and its advantages over Options API.

**A:** Composition API allows organizing component logic by concerns rather than options. Key advantages include:

- Better logic reuse with composable functions
- Improved type inference with TypeScript
- More flexible code organization
- Easier testing of business logic

Example:

```vue
<script setup>
import { onMounted, ref } from 'vue'
import { useUser } from '@/composables/useUser'

const { user, loading, fetchUser } = useUser()

onMounted(() => {
  fetchUser()
})
</script>
```

### Q4: What are Vue's lifecycle hooks in Composition API?

**A:** In Composition API, lifecycle hooks are imported as functions:

- `onBeforeMount`: Before mounting
- `onMounted`: After mounting
- `onBeforeUpdate`: Before update
- `onUpdated`: After update
- `onBeforeUnmount`: Before unmounting
- `onUnmounted`: After unmounting
- `onErrorCaptured`: When error captured
- `onActivated`: When component activated (inside keep-alive)
- `onDeactivated`: When component deactivated

### Q5: How do you handle state management in Vue 3?

**A:** Vue 3 offers multiple approaches:

- Pinia: Official recommended state management solution, simpler than Vuex with better TypeScript support
- Provide/Inject: For component tree communication
- Global properties: Simple state sharing
- Composables: Custom functions for state management

Example with Pinia:

```javascript
// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false
  }),
  getters: {
    isLoggedIn: state => !!state.user
  },
  actions: {
    async fetchUser() {
      this.loading = true
      this.user = await api.getUser()
      this.loading = false
    }
  }
})
```

### Q6: What are Vue's new features in recent versions?

**A:** Recent Vue versions introduced:

- Composition API: Better logic organization and reuse
- Teleport: Render content in different parts of DOM
- Suspense: Experimental component for handling async dependencies
- Fragments: Components can have multiple root nodes
- Emits: Explicitly define emitted events with `defineEmits`
- Slots: Enhanced slot functionality with better type support
- Single File Components (SFC) features: `<script setup>`, `<style vars>`, etc.

Example of Teleport:

```vue
<template>
  <teleport to="body">
    <div class="modal">
      <p>This will be rendered in body element</p>
    </div>
  </teleport>
</template>
```

### Q7: How do you handle form validation in Vue 3?

**A:** Use Composition API with refs and computed values or third-party libraries like VeeValidate:

``vue
<script setup>
import { computed, ref } from 'vue'

const email = ref('')
const password = ref('')

const errors = computed(() => {
  const err = {}
  if (!email.value)
    err.email = 'Email is required'
  else if (!/\S[^\s@]*@\S+\.\S+/.test(email.value))
    err.email = 'Invalid email'

  if (!password.value)
    err.password = 'Password is required'
  else if (password.value.length < 8)
    err.password = 'Password must be at least 8 characters'

  return err
})

const isValid = computed(() => Object.keys(errors.value).length === 0)
</script>
```

### Q8: How do you implement API calls in Vue 3 using Composition API?

**A:** Create reusable composables for API calls that handle loading states, errors, and caching. Use `fetch` or libraries like Axios:

**Basic API Composable:**

```javascript
// composables/useApi.js
import { ref } from 'vue'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async (url, options = {}) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    }
    catch (err) {
      error.value = err.message
      throw err
    }
    finally {
      loading.value = false
    }
  }

  return { loading, error, fetchData }
}
```

**Using the Composable in a Component:**

```vue
<script setup>
import { onMounted, ref } from 'vue'
import { useApi } from '@/composables/useApi'

const { loading, error, fetchData } = useApi()
const users = ref([])

onMounted(async () => {
  try {
    users.value = await fetchData('/api/users')
  }
  catch (err) {
    console.error('Failed to fetch users:', err)
  }
})
</script>

<template>
  <div v-if="loading">
    Loading...
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>
  <ul v-else>
    <li v-for="user in users" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
</template>
```

### Q9: How do you handle authentication and token management in Vue 3?

**A:** Store tokens securely and automatically attach them to API requests. Use interceptors with Axios or custom fetch wrappers:

**Auth Composable:**

```javascript
// composables/useAuth.js
import { computed, ref } from 'vue'

export function useAuth() {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  const isAuthenticated = computed(() => !!token.value)

  const login = async (credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })

    const data = await response.json()
    token.value = data.token
    user.value = data.user

    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const getAuthHeaders = () => ({
    Authorization: token.value ? `Bearer ${token.value}` : ''
  })

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    getAuthHeaders
  }
}
```

**API Service with Auth Interceptor:**

```javascript
// services/api.js
import { useAuth } from '@/composables/useAuth'

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  async request(endpoint, options = {}) {
    const { getAuthHeaders } = useAuth()

    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
        ...options.headers
      },
      ...options
    }

    const response = await fetch(url, config)

    if (response.status === 401) {
      // Handle unauthorized - redirect to login
      window.location.href = '/login'
    }

    return response.json()
  }

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' })
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }
}

export const apiService = new ApiService('/api')
```

### Q10: How do you implement error handling and retry logic for API calls?

**A:** Implement retry mechanisms with exponential backoff and proper error categorization:

**Retry Logic Composable:**

```javascript
// composables/useFetchWithRetry.js
import { ref } from 'vue'

export function useFetchWithRetry(maxRetries = 3, baseDelay = 1000) {
  const loading = ref(false)
  const error = ref(null)
  const retries = ref(0)

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const shouldRetry = (err) => {
    // Retry on network errors or 5xx server errors
    return err instanceof TypeError
      || (err.status >= 500 && err.status < 600)
  }

  const executeWithRetry = async (fn) => {
    loading.value = true
    error.value = null
    retries.value = 0

    while (retries.value <= maxRetries) {
      try {
        const result = await fn()
        return result
      }
      catch (err) {
        error.value = err

        if (!shouldRetry(err) || retries.value >= maxRetries) {
          throw err
        }

        // Exponential backoff
        const delay = baseDelay * 2 ** retries.value
        await sleep(delay)
        retries.value++
      }
    }
  }

  return { loading, error, retries, executeWithRetry }
}
```

**Usage Example:**

```vue
<script setup>
import { ref } from 'vue'
import { useFetchWithRetry } from '@/composables/useFetchWithRetry'

const { loading, error, executeWithRetry } = useFetchWithRetry(3, 1000)
const data = ref(null)

async function fetchData() {
  try {
    data.value = await executeWithRetry(() =>
      fetch('/api/data').then(res => res.json())
    )
  }
  catch (err) {
    console.error('All retries failed:', err)
  }
}
</script>
```

### Q11: How do you implement pagination and infinite scrolling with API calls?

**A:** Manage page state and load more data as users scroll:

**Pagination Composable:**

```javascript
// composables/usePagination.js
import { computed, ref } from 'vue'

export function usePagination(fetchFunction, itemsPerPage = 10) {
  const items = ref([])
  const currentPage = ref(1)
  const totalPages = ref(0)
  const loading = ref(false)
  const hasMore = computed(() => currentPage.value < totalPages.value)

  const fetchPage = async (page) => {
    loading.value = true
    try {
      const response = await fetchFunction(page, itemsPerPage)
      items.value = page === 1 ? response.data : [...items.value, ...response.data]
      totalPages.value = response.totalPages
      currentPage.value = page
    }
    finally {
      loading.value = false
    }
  }

  const loadNextPage = async () => {
    if (hasMore.value && !loading.value) {
      await fetchPage(currentPage.value + 1)
    }
  }

  const reset = () => {
    items.value = []
    currentPage.value = 1
    totalPages.value = 0
  }

  return {
    items,
    currentPage,
    totalPages,
    loading,
    hasMore,
    fetchPage,
    loadNextPage,
    reset
  }
}
```

**Component Implementation:**

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'
import { usePagination } from '@/composables/usePagination'

function fetchPosts(page, limit) {
  return fetch(`/api/posts?page=${page}&limit=${limit}`).then(res => res.json())
}

const { items, loading, hasMore, loadNextPage, reset } = usePagination(fetchPosts, 10)

function handleScroll() {
  const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
  if (bottom && hasMore.value && !loading.value) {
    loadNextPage()
  }
}

onMounted(() => {
  reset()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="posts">
    <article v-for="post in items" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.excerpt }}</p>
    </article>
    <div v-if="loading" class="loader">
      Loading more...
    </div>
    <div v-else-if="!hasMore" class="end-message">
      No more posts
    </div>
  </div>
</template>
```
