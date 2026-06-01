# TypeScript Interview Questions & Answers

## TypeScript

### Q1: What are the advantages of using TypeScript?

**A:** TypeScript adds static typing, interfaces, enums, generics, and better tooling support. It catches errors at compile time, improves code documentation, and enhances developer productivity.

### Q2: Explain TypeScript interfaces vs. types.

**A:** Interfaces are extensible and can be re-opened to add new properties. Types are not extensible but can be used for unions, intersections, and primitives.

Example:

```typescript
interface User {
  name: string
  age: number
}

type UserStatus = 'active' | 'inactive'
```

### Q3: How do you handle optional parameters in TypeScript?

**A:** Use the question mark (`?`) after the parameter name.

Example:

```typescript
function greet(name: string, greeting?: string): void {
  console.log(greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`)
}
```

### Q4: How do you type backend API integrations in TypeScript?

**A:** Typing backend APIs involves defining interfaces for request/response payloads and using them with fetch methods or HTTP clients.

Example:

```typescript
// Define API response types
interface User {
  id: number
  name: string
  email: string
}

interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

// Typing a fetch call
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  const userData: ApiResponse<User> = await response.json()
  return userData.data
}

// Typing POST request
interface CreateUserRequest {
  name: string
  email: string
  age?: number
}

async function createUser(user: CreateUserRequest): Promise<User> {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  return response
}
```

### Q5: What are TypeScript generics and when should you use them?

**A:** Generics allow creating reusable components that work with multiple types while maintaining type safety. They're useful for functions, classes, and interfaces that need to work with various data types.

Example:

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg
}

// Generic interface
interface Repository<T> {
  findById(id: number): Promise<T>
  findAll(): Promise<T[]>
  create(data: Omit<T, 'id'>): Promise<T>
  update(id: number, data: Partial<T>): Promise<T>
  delete(id: number): Promise<void>
}

// Using generic repository
class UserRepository implements Repository<User> {
  async findById(id: number): Promise<User> {
    // Implementation
  }

  async findAll(): Promise<User[]> {
    // Implementation
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    // Implementation
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    // Implementation
  }

  async delete(id: number): Promise<void> {
    // Implementation
  }
}
```

### Q6: Explain TypeScript utility types (Partial, Pick, Omit, Readonly).

**A:** Utility types help transform existing types into new ones without duplication.

- **Partial<T>**: Makes all properties optional
- **Pick<T, K>**: Selects specific properties from a type
- **Omit<T, K>**: Excludes specific properties from a type
- **Readonly<T>**: Makes all properties readonly

Example:

```typescript
interface User {
  id: number
  name: string
  email: string
  age: number
  createdAt: Date
}

// Partial - all properties optional
type UpdateUserInput = Partial<User>

// Pick - select specific properties
type UserBasicInfo = Pick<User, 'id' | 'name' | 'email'>

// Omit - exclude specific properties
type CreateUserInput = Omit<User, 'id' | 'createdAt'>

// Readonly - immutable properties
type ReadonlyUser = Readonly<User>

// Usage
const updateUser = (id: number, data: UpdateUserInput) => {
  // Can pass partial user data
}

const getUserBasicInfo = (user: User): UserBasicInfo => {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  }
}
```

### Q7: How do you handle union types and type narrowing in TypeScript?

**A:** Union types allow a value to be one of several types. Type narrowing helps determine the actual type at runtime.

Example:

```typescript
type Shape = 
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }
  | { kind: 'rectangle'; width: number; height: number }

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'square':
      return shape.side ** 2
    case 'rectangle':
      return shape.width * shape.height
  }
}

// Type guards
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function processValue(value: string | number) {
  if (isString(value)) {
    // TypeScript knows value is string here
    return value.toUpperCase()
  }
  else {
    // TypeScript knows value is number here
    return value * 2
  }
}
```

### Q8: What are TypeScript's mapped types and conditional types?

**A:** Mapped types create new types by transforming properties of existing types. Conditional types select types based on conditions.

Example:

```typescript
// Mapped type - make all properties nullable
type Nullable<T> = {
  [P in keyof T]: T[P] | null
}

// Mapped type - make all properties optional
type Optional<T> = {
  [P in keyof T]?: T[P]
}

// Conditional type
type IsString<T> = T extends string ? true : false

// Advanced conditional type - extract promise value
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

// Usage
interface User {
  id: number
  name: string
  email: string
}

type NullableUser = Nullable<User>
// { id: number | null; name: string | null; email: string | null }

type UserId = UnwrapPromise<Promise<number>>
// number
```

### Q9: How do you implement discriminated unions for better type safety?

**A:** Discriminated unions use a common property (discriminant) to distinguish between different types in a union, enabling exhaustive type checking.

Example:

```typescript
interface SuccessResponse<T> {
  status: 'success'
  data: T
}

interface ErrorResponse {
  status: 'error'
  error: {
    code: number
    message: string
  }
}

interface LoadingResponse {
  status: 'loading'
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse | LoadingResponse

function handleResponse<T>(response: ApiResponse<T>): void {
  switch (response.status) {
    case 'success':
      console.log('Data:', response.data)
      break
    case 'error':
      console.error('Error:', response.error.message)
      break
    case 'loading':
      console.log('Loading...')
      break
    default:
      // TypeScript will error if we forget a case
      const _exhaustiveCheck: never = response
      return _exhaustiveCheck
  }
}
```

### Q10: How do you type React/Vue component props in TypeScript?

**A:** Define prop interfaces/types and use them with component definitions. For Vue 3, use `defineProps` with TypeScript.

**Vue 3 Example:**

```vue
<script setup lang="ts">
interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  onClick?: () => void
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false
})

const emit = defineEmits<{
  click: []
  hover: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :class="['btn', `btn-${props.variant}`, `btn-${props.size}`]"
    :disabled="props.disabled"
    @click="emit('click')"
    @mouseenter="(e) => emit('hover', e)"
  >
    {{ props.label }}
  </button>
</template>
```

**Nuxt 3 Example:**

```vue
<script setup lang="ts">
interface CardProps {
  title: string
  description: string
  imageUrl?: string
  tags?: string[]
}

const props = defineProps<CardProps>()
</script>

<template>
  <div class="card">
    <img v-if="props.imageUrl" :src="props.imageUrl" :alt="props.title">
    <h3>{{ props.title }}</h3>
    <p>{{ props.description }}</p>
    <div v-if="props.tags" class="tags">
      <span v-for="tag in props.tags" :key="tag">
        {{ tag }}
      </span>
    </div>
  </div>
</template>
```

### Q11: How do you type Vue composables with TypeScript?

**A:** Use TypeScript to define input/output types for composables, ensuring type safety across the application.

Example:

```typescript
// composables/useFetch.ts
import { ref, type Ref } from 'vue'

interface FetchOptions<T> {
  immediate?: boolean
  transform?: (data: any) => T
  onError?: (error: Error) => void
}

interface FetchResult<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<Error | null>
  execute: () => Promise<void>
}

export function useFetch<T>(
  url: string,
  options: FetchOptions<T> = {}
): FetchResult<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const execute = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      let result = await response.json()

      if (options.transform) {
        result = options.transform(result)
      }

      data.value = result
    }
    catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      options.onError?.(error.value)
    }
    finally {
      loading.value = false
    }
  }

  if (options.immediate !== false) {
    execute()
  }

  return {
    data,
    loading,
    error,
    execute
  }
}

// Usage in component
<script setup lang="ts">
interface User {
  id: number
  name: string
  email: string
}

const { data, loading, error } = useFetch<User[]>('/api/users', {
  immediate: true,
  transform: (data) => data.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email
  }))
})
</script>
```

### Q12: How do you type Pinia stores with TypeScript?

**A:** Define state, getters, and actions with explicit TypeScript types for full type safety.

Example:

```typescript
// stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'moderator'
}

interface LoginCredentials {
  email: string
  password: string
}

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const userName = computed(() => user.value?.name ?? 'Guest')

  // Actions
  async function login(credentials: LoginCredentials): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      user.value = data.user
      token.value = data.token

      localStorage.setItem('token', data.token)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    }
    finally {
      loading.value = false
    }
  }

  function logout(): void {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  async function fetchUserProfile(): Promise<void> {
    if (!token.value) return

    loading.value = true
    try {
      const response = await fetch('/api/users/me', {
        headers: { Authorization: `Bearer ${token.value}` }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      user.value = await response.json()
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    }
    finally {
      loading.value = false
    }
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    // Getters
    isAuthenticated,
    isAdmin,
    userName,
    // Actions
    login,
    logout,
    fetchUserProfile
  }
})
```

### Q13: How do you type Nuxt 3 server API endpoints with TypeScript?

**A:** Use TypeScript to define request/response types for server handlers, ensuring end-to-end type safety.

Example:

```typescript
// server/api/users.get.ts
import { defineEventHandler } from 'h3'

interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

interface UsersResponse {
  success: boolean
  data: User[]
  total: number
  page: number
  limit: number
}

export default defineEventHandler(async (event): Promise<UsersResponse> => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 10

  const users = await db.users.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' }
  })

  const total = await db.users.count()

  return {
    success: true,
    data: users,
    total,
    page,
    limit
  }
})
```

```typescript
// server/api/users.post.ts
import { defineEventHandler, readBody, createError } from 'h3'
import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['user', 'admin']).optional().default('user')
})

type CreateUserInput = z.infer<typeof createUserSchema>

interface UserResponse {
  success: boolean
  data: {
    id: number
    name: string
    email: string
    role: string
  }
}

export default defineEventHandler(async (event): Promise<UserResponse> => {
  const body = await readBody(event)

  try {
    const validatedData = createUserSchema.parse(body)

    const newUser = await db.users.create({
      data: {
        ...validatedData,
        password: await hashPassword(validatedData.password)
      }
    })

    return {
      success: true,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    }
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        message: 'Validation error',
        data: error.errors
      })
    }

    throw createError({
      statusCode: 500,
      message: 'Internal server error'
    })
  }
})
```

### Q14: How do you implement type-safe routing in Nuxt 3 with TypeScript?

**A:** Use typed route parameters and query strings for safer navigation.

Example:

```typescript
// pages/users/[id].vue
<script setup lang="ts">
const route = useRoute()
const userId = computed(() => Number(route.params.id))

const { data: user, pending, error } = await useAsyncData(
  `user-${userId.value}`,
  async () => {
    const response = await $fetch<User>(`/api/users/${userId.value}`)
    return response
  }
)

interface User {
  id: number
  name: string
  email: string
  bio?: string
}
</script>

<template>
  <div v-if="pending">
    Loading...
  </div>
  <div v-else-if="error">
    Error: {{ error.message }}
  </div>
  <div v-else-if="user">
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
    <p v-if="user.bio">{{ user.bio }}</p>
  </div>
</template>
```

```typescript
// Composable for type-safe navigation
// composables/useNavigation.ts
type RouteName = 
  | 'home'
  | 'users'
  | 'user-detail'
  | 'posts'
  | 'post-detail'

interface RouteParams {
  'user-detail': { id: string | number }
  'post-detail': { slug: string }
  'users': {}
  'posts': {}
  'home': {}
}

export function useNavigation() {
  const router = useRouter()

  function navigateTo<T extends RouteName>(
    route: T,
    params?: RouteParams[T]
  ): void {
    switch (route) {
      case 'home':
        router.push('/')
        break
      case 'users':
        router.push('/users')
        break
      case 'user-detail':
        router.push(`/users/${params!.id}`)
        break
      case 'posts':
        router.push('/posts')
        break
      case 'post-detail':
        router.push(`/posts/${params!.slug}`)
        break
    }
  }

  return { navigateTo }
}

// Usage
const { navigateTo } = useNavigation()
navigateTo('user-detail', { id: 123 })
```

### Q15: How do you handle TypeScript configuration for Vue 3 and Nuxt 3 projects?

**A:** Configure `tsconfig.json` with appropriate compiler options and Vue/Nuxt-specific settings.

**Vue 3 tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["vite/client"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ],
  "exclude": ["node_modules", "dist"]
}
```

**Nuxt 3 tsconfig.json:**

```json
{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

**Nuxt 3 nuxt.config.ts:**

```typescript
export default defineNuxtConfig({
  typescript: {
    strict: true,
    typeCheck: true, // Enable type checking during dev
    shim: true // Generate shims for .vue files
  },
  
  // Enable auto-imports for composables
  imports: {
    dirs: ['composables/**']
  }
})
```

### Q16: What are TypeScript declaration files (.d.ts) and when should you use them?

**A:** Declaration files provide type information for JavaScript libraries or modules that don't have built-in TypeScript support.

Example:

```typescript
// types/global.d.ts
declare global {
  interface Window {
    analytics?: {
      track: (event: string, properties?: Record<string, any>) => void
      identify: (userId: string, traits?: Record<string, any>) => void
    }
  }
}

export {}
```

```typescript
// types/vue-shim.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

```typescript
// types/api.d.ts
declare module '#app' {
  interface PageMeta {
    requiresAuth?: boolean
    layout?: string
  }
}

export {}
```

### Q17: How do you implement advanced TypeScript patterns like template literal types?

**A:** Template literal types enable creating string literal types based on other types, useful for API routes, CSS classes, etc.

Example:

```typescript
// API endpoint types
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type ApiResource = 'users' | 'posts' | 'comments'
type ApiEndpoint = `/api/${ApiResource}`

// Dynamic route types
type RoutePath = 
  | '/'
  | '/about'
  | `/users/${number}`
  | `/posts/${string}`

// CSS class names
type ButtonVariant = 'primary' | 'secondary' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonClass = `btn-${ButtonVariant}-${ButtonSize}`

// Usage
function fetchFromApi(endpoint: ApiEndpoint, method: HttpMethod) {
  // Type-safe API calls
}

function navigateTo(path: RoutePath) {
  // Type-safe navigation
}

function getButtonClass(variant: ButtonVariant, size: ButtonSize): ButtonClass {
  return `btn-${variant}-${size}`
}
```

### Q18: How do you type event emitters and custom events in Vue 3 with TypeScript?

**A:** Use `defineEmits` with TypeScript to ensure type-safe event emissions.

Example:

```vue
<script setup lang="ts">
// Define event types
interface ModalEvents {
  confirm: [value: string]
  cancel: []
  close: []
}

const emit = defineEmits<ModalEvents>()

function handleConfirm() {
  emit('confirm', 'confirmed-value') // ✅ Type-safe
  // emit('confirm') // ❌ Error: missing argument
  // emit('invalid-event') // ❌ Error: invalid event name
}

function handleCancel() {
  emit('cancel') // ✅ No arguments needed
}
</script>

<template>
  <div class="modal">
    <button @click="handleConfirm">
      Confirm
    </button>
    <button @click="handleCancel">
      Cancel
    </button>
  </div>
</template>
```

Parent component usage:

```vue
<script setup lang="ts">
import Modal from '@/components/Modal.vue'

function handleConfirm(value: string) {
  console.log('Confirmed with:', value) // value is typed as string
}

function handleCancel() {
  console.log('Cancelled')
}
</script>

<template>
  <Modal
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
</template>
```

### Q19: How do you implement type-safe form handling in Vue 3 with TypeScript?

**A:** Create typed form state and validation logic using TypeScript.

Example:

```typescript
// composables/useForm.ts
import { reactive, ref, type Ref } from 'vue'

interface ValidationRule<T> {
  validate: (value: T) => boolean
  message: string
}

interface FormField<T> {
  value: T
  error: string | null
  touched: boolean
  rules: ValidationRule<T>[]
}

type FormState<T> = {
  [K in keyof T]: FormField<T[K]>
}

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Partial<{
    [K in keyof T]: ValidationRule<T[K]>[]
  }> = {}
) {
  const fields = reactive<FormState<T>>(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = {
        value: initialValues[key as keyof T],
        error: null,
        touched: false,
        rules: validationRules[key as keyof T] || []
      }
      return acc
    }, {} as FormState<T>)
  )

  const isValid = ref(false)
  const isSubmitting = ref(false)

  function validateField<K extends keyof T>(fieldName: K): boolean {
    const field = fields[fieldName]
    field.touched = true

    for (const rule of field.rules) {
      if (!rule.validate(field.value)) {
        field.error = rule.message
        isValid.value = false
        return false
      }
    }

    field.error = null
    return true
  }

  function validateAll(): boolean {
    const fieldNames = Object.keys(fields) as Array<keyof T>
    const results = fieldNames.map(fieldName => validateField(fieldName))
    isValid.value = results.every(result => result)
    return isValid.value
  }

  function resetForm(): void {
    Object.keys(fields).forEach((key) => {
      const fieldName = key as keyof T
      fields[fieldName].value = initialValues[fieldName]
      fields[fieldName].error = null
      fields[fieldName].touched = false
    })
    isValid.value = false
  }

  function getFormValues(): T {
    return Object.keys(fields).reduce((acc, key) => {
      acc[key as keyof T] = fields[key as keyof T].value
      return acc
    }, {} as T)
  }

  return {
    fields,
    isValid,
    isSubmitting,
    validateField,
    validateAll,
    resetForm,
    getFormValues
  }
}
```

Usage in component:

```vue
<script setup lang="ts">
import { useForm } from '@/composables/useForm'

interface RegisterForm {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const { fields, isValid, validateAll, getFormValues, isSubmitting } = useForm<RegisterForm>(
  {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  {
    username: [
      {
        validate: (value) => value.length >= 3,
        message: 'Username must be at least 3 characters'
      }
    ],
    email: [
      {
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Invalid email address'
      }
    ],
    password: [
      {
        validate: (value) => value.length >= 8,
        message: 'Password must be at least 8 characters'
      }
    ],
    confirmPassword: [
      {
        validate: (value) => value === fields.password.value,
        message: 'Passwords do not match'
      }
    ]
  }
)

async function handleSubmit() {
  if (!validateAll()) return

  isSubmitting.value = true
  try {
    const values = getFormValues()
    await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(values)
    })
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input
        v-model="fields.username.value"
        @blur="() => validateField('username')"
        placeholder="Username"
      >
      <span v-if="fields.username.error" class="error">
        {{ fields.username.error }}
      </span>
    </div>

    <div>
      <input
        v-model="fields.email.value"
        @blur="() => validateField('email')"
        placeholder="Email"
      >
      <span v-if="fields.email.error" class="error">
        {{ fields.email.error }}
      </span>
    </div>

    <button type="submit" :disabled="!isValid || isSubmitting">
      {{ isSubmitting ? 'Submitting...' : 'Register' }}
    </button>
  </form>
</template>
```

### Q20: How do you optimize TypeScript performance in large Vue/Nuxt applications?

**A:** Implement strategies to improve TypeScript compilation speed and reduce memory usage.

**Best Practices:**

1. **Use incremental builds:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  }
}
```

2. **Exclude unnecessary files:**

```json
{
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

3. **Use path mapping instead of relative imports:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/composables/*": ["src/composables/*"]
    }
  }
}
```

4. **Split large type definitions:**

```typescript
// types/index.ts - Re-export from smaller files
export * from './user'
export * from './product'
export * from './api'
export * from './common'
```

5. **Use const assertions for better inference:**

```typescript
// Instead of this
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
}

// Use this
const config = {
  apiUrl: 'https://api.example.com' as const,
  timeout: 5000 as const
}
```

6. **Lazy load heavy types:**

```typescript
// Use dynamic imports for heavy type computations
type HeavyType = import('./heavy-types').HeavyType
```

7. **Configure Nuxt for better TypeScript performance:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  typescript: {
    typeCheck: false, // Disable during dev, enable in CI
    shim: true
  },
  
  vite: {
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          preserveValueImports: false
        }
      }
    }
  }
})
```

---

**Note:** For comprehensive React.js and Next.js interview questions covering component lifecycle, hooks, performance optimization, data fetching strategies, authentication patterns, middleware, SEO, and modern App Router concepts, please refer to the dedicated guide: [React-Next-Interview-Guide.md](./React-Next-Interview-Guide.md)
