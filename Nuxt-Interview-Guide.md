# Nuxt.js Interview Questions & Answers

## Nuxt.js

### Q1: What is Nuxt.js and how does it differ from Vue.js?

**A:** Nuxt.js is a framework built on top of Vue.js that provides server-side rendering (SSR), static site generation (SSG), routing, and modular architecture out of the box. Nuxt 3 introduces several improvements over Nuxt 2:

- Nitro engine for universal deployment
- Native ES module support
- Auto-imports for composables
- Built-in TypeScript support
- Faster development startup with Vite or Webpack 5

### Q2: Explain Nuxt's page-based routing.

**A:** Nuxt automatically generates routes based on the file structure in the `pages/` directory. Each `.vue` file becomes a route. Nuxt 3 supports:

- Dynamic routes with `[slug]` syntax
- Nested routes with parent-child relationships
- Catch-all routes with `[...slug]`
- Route middleware and layouts defined per page

Example:

```
pages/
  index.vue          -> / (home)
  about.vue          -> /about
  users/[id].vue     -> /users/123
  blog/
    index.vue        -> /blog
    [slug].vue       -> /blog/article-slug
  [...all].vue       -> /any/unmatched/route
```

### Q3: What are Nuxt's middleware and how do you use them?

**A:** Middleware runs before entering a route. Define it in `middleware/` directory or inline in a page/component. Nuxt 3 supports named and anonymous middleware:

Named middleware (`middleware/auth.global.js`):

```js
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCookie('user')
  if (!user.value) {
    return navigateTo('/login')
  }
})
```

Page-level middleware:

```vue
<script setup>
definePageMeta({
  middleware: ['auth']
})
</script>
```

### Q4: How does Nuxt handle SSR and SSG in Nuxt 3?

**A:** Nuxt 3 uses the Nitro server engine which provides:

- Universal rendering (SSR, SSG, CSR)
- Server routes for API endpoints
- Hybrid rendering (mix of static and dynamic routes)
- Island architecture for selective hydration

Configure in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  ssr: true, // Enable SSR
  nitro: {
    preset: 'vercel' // Deploy to various platforms
  },
  routeRules: {
    '/static-page': { static: true },
    '/api/**': { cors: true, cache: true }
  }
})
```

### Q5: Explain Nuxt's composables and how they differ from Vue's composables.

**A:** Nuxt 3 introduces auto-imported composables that work seamlessly on both client and server:

- `useAsyncData`: Fetch data with automatic de-duplication
- `useFetch`: Simplified data fetching with caching
- `useState`: Shared state between client and server
- `useCookie`: Reactive cookies
- `navigateTo`: Programmatic navigation

Example:

```vue
<script setup>
const { data: posts, pending, error } = await useAsyncData('posts', async () => {
  const response = await $fetch('/api/posts')
  return response.data
})
</script>
```

### Q6: What are Nuxt modules and how do you create them?

**A:** Nuxt modules extend Nuxt's functionality and can modify its configuration. Create a module by exporting a function:

Module example (`modules/my-module.ts`):

```ts
export default defineNuxtModule({
  meta: {
    name: 'my-module',
    configKey: 'myModule'
  },
  defaults: {
    enabled: true
  },
  setup(options, nuxt) {
    if (options.enabled) {
      nuxt.options.css.push('~/assets/styles/global.css')
    }
  }
})
```

Use in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '~/modules/my-module']
})
```

### Q7: How do you optimize performance in Nuxt 3?

**A:** Nuxt 3 offers several performance optimizations:

- Automatic code splitting and lazy loading
- Static asset optimization
- Server-side optimizations with Nitro
- Bundle analyzer for identifying bottlenecks
- Image optimization with built-in image module
- Caching strategies for API routes

Example of image optimization:

```vue
<template>
  <NuxtImg src="/hero.jpg" width="800" height="400" alt="Hero" />
</template>
```

### Q8: How do you implement API calls in Nuxt 3 using useFetch and useAsyncData?

**A:** Nuxt 3 provides powerful composables for data fetching with built-in caching, deduplication, and SSR support:

**Basic useFetch Example:**

```vue
<script setup>
const { data: users, pending, error, refresh } = await useFetch('/api/users', {
  method: 'GET',
  lazy: true, // Don't block navigation
  server: true, // Fetch on server side
  watch: [/* reactive dependencies */],
  transform: data => data.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email
  }))
})
</script>

<template>
  <div v-if="pending">
    Loading users...
  </div>
  <div v-else-if="error">
    Error: {{ error.message }}
  </div>
  <ul v-else>
    <li v-for="user in users" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
  <button @click="refresh">
    Refresh
  </button>
</template>
```

**useAsyncData for Complex Data Fetching:**

```vue
<script setup>
const { data: dashboard, pending, error } = await useAsyncData(
  'dashboard-data', // Unique key for caching
  async () => {
    const [users, posts, stats] = await Promise.all([
      $fetch('/api/users'),
      $fetch('/api/posts'),
      $fetch('/api/stats')
    ])

    return {
      users: users.data,
      posts: posts.data,
      stats: stats.data
    }
  },
  {
    transform: data => ({
      ...data,
      totalUsers: data.users.length,
      recentPosts: data.posts.slice(0, 5)
    })
  }
)
</script>
```

### Q9: How do you create API routes in Nuxt 3 using the server directory?

**A:** Nuxt 3 allows creating backend API endpoints in the `server/api/` directory using Nitro:

**Simple GET Endpoint:**

```typescript
// server/api/users.get.ts
export default defineEventHandler(async (event) => {
  const users = await db.users.findMany()
  return {
    success: true,
    data: users
  }
})
```

**POST Endpoint with Validation:**

```typescript
// server/api/users.post.ts
import { z } from 'zod'

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(18).optional()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const validatedData = userSchema.parse(body)
    const newUser = await db.users.create({ data: validatedData })

    setResponseStatus(event, 201)
    return {
      success: true,
      data: newUser
    }
  }
  catch (error) {
    setResponseStatus(event, 400)
    return {
      success: false,
      error: error.errors
    }
  }
})
```

**Dynamic Route Parameters:**

```typescript
// server/api/users/[id].get.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const user = await db.users.findUnique({ where: { id: Number(id) } })

  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'User not found'
    })
  }

  return user
})
```

### Q10: How do you handle authentication and protected API routes in Nuxt 3?

**A:** Implement authentication middleware and session management:

**Authentication Middleware:**

```typescript
// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const session = useCookie('session')

  if (!session.value) {
    return navigateTo('/login')
  }

  // Verify session validity
  try {
    const user = await $fetch('/api/auth/verify', {
      headers: {
        Authorization: `Bearer ${session.value}`
      }
    })

    // Attach user to context
    useState('user').value = user
  }
  catch (error) {
    // Clear invalid session
    session.value = null
    return navigateTo('/login')
  }
})
```

**Protected API Endpoint:**

```typescript
// server/api/profile.get.ts
export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const token = authHeader.split(' ')[1]
  const user = await verifyToken(token)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Invalid token'
    })
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email
  }
})
```

**Login Composable:**

```typescript
// composables/useAuth.ts
export function useAuth() {
  const session = useCookie('session')
  const user = useState('user')

  const login = async (credentials: { email: string, password: string }) => {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: credentials
    })

    session.value = response.token
    user.value = response.user

    return response
  }

  const logout = () => {
    session.value = null
    user.value = null
    navigateTo('/login')
  }

  return {
    user,
    isAuthenticated: computed(() => !!user.value),
    login,
    logout
  }
}
```

### Q11: How do you implement error handling and retry logic in Nuxt 3 API calls?

**A:** Use Nuxt's built-in error handling with custom retry strategies:

**Global Error Handler:**

```typescript
// plugins/error-handler.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (error, instance, info) => {
    console.error('Vue Error:', error, info)
    // Send to error tracking service
  })

  nuxtApp.hook('app:error', (error) => {
    console.error('App Error:', error)
    // Show user-friendly error message
  })
})
```

**Custom Fetch with Retry:**

```typescript
// composables/useFetchWithRetry.ts
export function useFetchWithRetry(url: string, options: any = {}, maxRetries = 3) {
  const attempts = ref(0)

  const executeFetch = async () => {
    try {
      return await useFetch(url, {
        ...options,
        onResponse({ response }) {
          if (response.status >= 500 && attempts.value < maxRetries) {
            attempts.value++
            throw new Error(`Server error, retrying... (${attempts.value}/${maxRetries})`)
          }
        }
      })
    }
    catch (error) {
      if (attempts.value < maxRetries) {
        // Exponential backoff
        const delay = 2 ** attempts.value * 1000
        await new Promise(resolve => setTimeout(resolve, delay))
        return executeFetch()
      }
      throw error
    }
  }

  return executeFetch()
}
```

**Usage in Component:**

```vue
<script setup>
const { data, error, pending } = await useFetchWithRetry(
  '/api/critical-data',
  { method: 'GET' },
  3 // Max retries
)
</script>

<template>
  <div v-if="pending">
    Loading...
  </div>
  <div v-else-if="error" class="error-state">
    <p>Failed to load data after multiple attempts</p>
    <button @click="$router.go(0)">
      Try Again
    </button>
  </div>
  <div v-else>
    <!-- Display data -->
  </div>
</template>
```

### Q12: How do you implement real-time updates with WebSockets in Nuxt 3?

**A:** Use WebSocket connections for real-time data updates:

**WebSocket Composable:**

```typescript
// composables/useWebSocket.ts
export function useWebSocket(url: string) {
  const ws = ref<WebSocket | null>(null)
  const messages = ref<any[]>([])
  const isConnected = ref(false)

  const connect = () => {
    ws.value = new WebSocket(url)

    ws.value.onopen = () => {
      isConnected.value = true
      console.log('WebSocket connected')
    }

    ws.value.onmessage = (event) => {
      const data = JSON.parse(event.data)
      messages.value.push(data)
    }

    ws.value.onerror = (error) => {
      console.error('WebSocket error:', error)
      isConnected.value = false
    }

    ws.value.onclose = () => {
      isConnected.value = false
      // Attempt reconnection after 5 seconds
      setTimeout(connect, 5000)
    }
  }

  const sendMessage = (data: any) => {
    if (ws.value && isConnected.value) {
      ws.value.send(JSON.stringify(data))
    }
  }

  const disconnect = () => {
    if (ws.value) {
      ws.value.close()
    }
  }

  onMounted(connect)
  onUnmounted(disconnect)

  return {
    messages,
    isConnected,
    sendMessage,
    disconnect
  }
}
```

**Real-time Component:**

```vue
<script setup>
const { messages, isConnected, sendMessage } = useWebSocket('wss://api.example.com/updates')

function sendNotification() {
  sendMessage({ type: 'notification', content: 'Hello!' })
}
</script>

<template>
  <div>
    <span :class="{ online: isConnected }">
      {{ isConnected ? 'Connected' : 'Disconnected' }}
    </span>

    <div v-for="(msg, index) in messages" :key="index">
      {{ msg.content }}
    </div>

    <button :disabled="!isConnected" @click="sendNotification">
      Send Notification
    </button>
  </div>
</template>
```

### Q13: How do you implement caching strategies for API responses in Nuxt 3?

**A:** Leverage Nuxt's built-in caching with custom strategies:

**Client-Side Caching with SWR (Stale While Revalidate):**

```vue
<script setup>
const { data, refresh } = await useFetch('/api/products', {
  key: 'products-list',
  lazy: true,
  server: false, // Client-side only
  getCachedData(key) {
    // Return cached data immediately
    const cached = useNuxtData(key).data.value
    return cached
  },
  // Refresh in background
  watch: [/* dependencies */]
})

// Manual refresh when needed
async function forceRefresh() {
  await refresh()
}
</script>
```

**Server-Side Caching with Route Rules:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    // Cache API responses for 1 hour
    '/api/products/**': {
      cache: {
        maxAge: 3600,
        staleMaxAge: 86400, // Serve stale for 24 hours
        headersOnly: true
      }
    },
    // Cache static pages for 1 day
    '/blog/**': {
      static: true,
      cache: {
        maxAge: 86400
      }
    }
  }
})
```

**Custom Cache Implementation:**

```typescript
// composables/useCachedFetch.ts
const cache = new Map()

export async function useCachedFetch(url: string, ttl = 300000) {
  const now = Date.now()
  const cached = cache.get(url)

  // Return cached data if still valid
  if (cached && (now - cached.timestamp) < ttl) {
    return cached.data
  }

  // Fetch fresh data
  const response = await $fetch(url)

  // Update cache
  cache.set(url, {
    data: response,
    timestamp: now
  })

  return response
}
```
