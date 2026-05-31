## React.js

### Q1: Explain React's Virtual DOM and how it differs from the real DOM.

**A:** The Virtual DOM is a lightweight JavaScript object representation of the actual DOM. It's a core concept that enables React's efficient rendering.

**How it Works:**

1. **Initial Render:** React creates a Virtual DOM tree
2. **State Change:** When state updates, React creates a new Virtual DOM tree
3. **Diffing:** React compares the new tree with the previous one (reconciliation)
4. **Patching:** Only changed elements are updated in the real DOM

```jsx
// Example: React optimizes updates
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p> {/* Only this updates */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

**Virtual DOM vs Real DOM:**

| Aspect | Virtual DOM | Real DOM |
|--------|-------------|----------|
| **Type** | JavaScript object | Browser API |
| **Speed** | Fast manipulation | Slow manipulation |
| **Updates** | Batch updates | Immediate updates |
| **Memory** | Lightweight | Heavy |
| **Operations** | Diff & patch | Direct manipulation |

**Benefits:**
- **Performance:** Minimizes expensive DOM operations
- **Cross-platform:** Same code works for web, mobile (React Native), desktop
- **Predictable:** Declarative programming model
- **Efficient:** Batch updates reduce reflows/repaints

**Limitations:**
- Initial render can be slower than direct DOM manipulation
- Memory overhead for large applications
- Not always faster for simple updates

---

### Q2: What are React Hooks? Explain the most commonly used hooks with examples.

**A:** Hooks are functions that let you "hook into" React state and lifecycle features from function components. Introduced in React 16.8.

**useState - State Management:**
```jsx
function Counter() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({ name: '', email: '' })

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>

      <input
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
    </div>
  )
}
```

**useEffect - Side Effects:**
```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isCancelled = false

    async function fetchUser() {
      setLoading(true)
      try {
        const response = await fetch(`/api/users/${userId}`)
        const data = await response.json()

        if (!isCancelled) {
          setUser(data)
          setLoading(false)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()

    // Cleanup function
    return () => {
      isCancelled = true
    }
  }, [userId]) // Re-run when userId changes

  if (loading) return <div>Loading...</div>
  return <div>{user?.name}</div>
}
```

**useContext - Context API:**
```jsx
const ThemeContext = createContext('light')

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Toolbar() {
  const theme = useContext(ThemeContext)
  return <div className={theme}>Themed content</div>
}
```

**useReducer - Complex State Logic:**
```jsx
const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return initialState
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  )
}
```

**useMemo & useCallback - Performance Optimization:**
```jsx
function ExpensiveComponent({ items, filter }) {
  // Memoize expensive calculation
  const filteredItems = useMemo(() => {
    console.log('Filtering items...')
    return items.filter(item => item.includes(filter))
  }, [items, filter])

  // Memoize callback to prevent unnecessary re-renders
  const handleClick = useCallback((item) => {
    console.log('Clicked:', item)
  }, [])

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item} onClick={() => handleClick(item)}>{item}</li>
      ))}
    </ul>
  )
}
```

**Custom Hooks - Reusable Logic:**
```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

// Usage
function Component() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  return <button onClick={() => setTheme('dark')}>{theme}</button>
}
```

---

### Q3: What are Controlled vs Uncontrolled components? When to use each?

**A:** This refers to how form input elements manage their state.

**Controlled Components (React manages state):**
```jsx
function ControlledForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData) // Access current values
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

**Uncontrolled Components (DOM manages state):**
```jsx
function UncontrolledForm() {
  const usernameRef = useRef(null)
  const emailRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Access values directly from DOM
    console.log({
      username: usernameRef.current.value,
      email: emailRef.current.value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={usernameRef} defaultValue="" />
      <input ref={emailRef} defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

**Comparison:**

| Feature | Controlled | Uncontrolled |
|---------|-----------|--------------|
| **State Source** | React state | DOM |
| **Validation** | Real-time | On submit |
| **Conditional Disable** | Easy | Hard |
| **Dynamic Inputs** | Easy | Complex |
| **Performance** | More re-renders | Better for large forms |
| **Integration** | React libraries | Non-React libraries |

**When to Use:**

**Use Controlled when:**
- Need instant validation
- Conditional field disabling/submission
- Dynamic form fields
- Integration with state management
- Using libraries like React Hook Form, Formik

**Use Uncontrolled when:**
- Simple forms
- Integrating with non-React libraries
- File inputs
- Performance-critical large forms
- Quick prototypes

**Modern Approach with React Hook Form:**
```jsx
import { useForm } from 'react-hook-form'

function ModernForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('username', {
          required: 'Username is required',
          minLength: { value: 3, message: 'Min 3 characters' }
        })}
      />
      {errors.username && <span>{errors.username.message}</span>}

      <button type="submit">Submit</button>
    </form>
  )
}
```

---

### Q4: Explain React's Component Lifecycle in functional components.

**A:** In functional components, lifecycle methods are replaced by hooks, primarily `useEffect`.

**Mounting Phase:**
```jsx
function Component() {
  // Runs once after initial render (componentDidMount)
  useEffect(() => {
    console.log('Component mounted')

    // Setup subscriptions, timers, etc.
    const timer = setInterval(() => console.log('tick'), 1000)

    // Cleanup function (componentWillUnmount)
    return () => {
      clearInterval(timer)
      console.log('Component unmounted')
    }
  }, []) // Empty dependency array = run once
}
```

**Updating Phase:**
```jsx
function Component({ userId }) {
  const [count, setCount] = useState(0)

  // Runs when specific dependencies change (componentDidUpdate)
  useEffect(() => {
    console.log('userId changed:', userId)
    // Fetch new data when userId changes
  }, [userId])

  // Runs on every render
  useEffect(() => {
    console.log('Component updated')
  })

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

**Complete Lifecycle Example:**
```jsx
function DataFetcher({ url }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(url, {
          signal: controller.signal
        })
        const result = await response.json()

        if (isMounted) {
          setData(result)
          setLoading(false)
        }
      } catch (err) {
        if (err.name !== 'AbortError' && isMounted) {
          setError(err)
          setLoading(false)
        }
      }
    }

    fetchData()

    // Cleanup: cancel request and mark as unmounted
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [url]) // Re-fetch when URL changes

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return <div>{JSON.stringify(data)}</div>
}
```

**Lifecycle Mapping:**

| Class Component | Functional Component (Hooks) |
|----------------|------------------------------|
| `constructor` | `useState` initialization |
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount` | `useEffect` cleanup function |
| `shouldComponentUpdate` | `React.memo`, `useMemo` |
| `getDerivedStateFromProps` | Derive state during render |
| `getSnapshotBeforeUpdate` | `useLayoutEffect` |
| `componentDidCatch` | Error Boundaries (class only) |

**useLayoutEffect vs useEffect:**
```jsx
function LayoutExample() {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)

  // Fires synchronously after DOM mutations (before paint)
  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth)
    }
  }, [])

  // Fires asynchronously after paint
  useEffect(() => {
    console.log('Painted to screen')
  }, [])

  return <div ref={ref}>Width: {width}px</div>
}
```

---

### Q5: What is Context API and when should you use it vs Redux/Zustand?

**A:** Context API provides a way to pass data through the component tree without prop drilling.

**Basic Context Implementation:**
```jsx
// Create context
const UserContext = createContext(null)

// Provider component
function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (userData) => setUser(userData)
  const logout = () => setUser(null)

  const value = useMemo(() => ({
    user,
    login,
    logout
  }), [user])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

// Consumer component
function Profile() {
  const { user, logout } = useContext(UserContext)

  if (!user) return <div>Please login</div>

  return (
    <div>
      <h2>{user.name}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

// App wrapper
function App() {
  return (
    <UserProvider>
      <Profile />
    </UserProvider>
  )
}
```

**Multiple Contexts:**
```jsx
const ThemeContext = createContext('light')
const LanguageContext = createContext('en')

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <LanguageContext.Provider value="en">
        <Dashboard />
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  )
}

function Dashboard() {
  const theme = useContext(ThemeContext)
  const language = useContext(LanguageContext)

  return <div className={theme}>{language}</div>
}
```

**Optimizing Context with Split Providers:**
```jsx
// Split contexts to avoid unnecessary re-renders
const ThemeContext = createContext()
const UserContext = createContext()

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const value = useMemo(() => ({ theme, setTheme }), [theme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({ user, setUser }), [user])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

// Components only subscribe to what they need
function ThemedButton() {
  const { theme } = useContext(ThemeContext) // Only re-renders on theme change
  return <button className={theme}>Click</button>
}
```

**Context vs State Management Libraries:**

| Feature | Context API | Redux | Zustand |
|---------|------------|-------|---------|
| **Learning Curve** | Low | High | Medium |
| **Boilerplate** | Minimal | High | Low |
| **DevTools** | None | Excellent | Good |
| **Performance** | Can cause re-renders | Optimized | Optimized |
| **Middleware** | No | Yes | Yes |
| **Time Travel** | No | Yes | Plugins |
| **Bundle Size** | Built-in | ~7KB | ~1KB |
| **Best For** | Small-medium apps | Large enterprise | Medium-large apps |

**When to Use Context:**
- ✅ Theme, language, authentication
- ✅ Small to medium applications
- ✅ Infrequent updates
- ✅ Simple state logic

**When to Use Redux/Zustand:**
- ✅ Complex state interactions
- ✅ Frequent state updates
- ✅ Need middleware (logging, persistence)
- ✅ Time-travel debugging
- ✅ Large-scale applications

**Zustand Example (Modern Alternative):**
```jsx
import { create } from 'zustand'

const useStore = create((set) => ({
  user: null,
  theme: 'light',
  setUser: (user) => set({ user }),
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  }))
}))

function Component() {
  const { user, theme, toggleTheme } = useStore()
  return (
    <div className={theme}>
      {user?.name}
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  )
}
```

---

### Q6: How do you optimize React application performance?

**A:** React provides multiple optimization techniques at different levels.

**1. React.memo - Prevent Unnecessary Re-renders:**
```jsx
const ExpensiveComponent = React.memo(({ data }) => {
  console.log('Rendering...')
  return <div>{data}</div>
})

// Custom comparison
const CustomMemo = React.memo(Component, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id
})
```

**2. useMemo - Memoize Expensive Calculations:**
```jsx
function SearchResults({ items, query }) {
  const filtered = useMemo(() => {
    console.log('Filtering...')
    return items.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    )
  }, [items, query])

  return <ul>{filtered.map(item => <li key={item}>{item}</li>)}</ul>
}
```

**3. useCallback - Memoize Functions:**
```jsx
function Parent() {
  const [count, setCount] = useState(0)

  // Without useCallback, this creates new function on every render
  const handleClick = useCallback(() => {
    console.log('Clicked')
  }, []) // Empty deps = stable reference

  return <Child onClick={handleClick} />
}

const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>
})
```

**4. Code Splitting with lazy/Suspense:**
```jsx
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))
const ChartComponent = lazy(() => import('./ChartComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
      <ChartComponent />
    </Suspense>
  )
}
```

**5. Virtual Scrolling for Large Lists:**
```jsx
import { FixedSizeList } from 'react-window'

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index]}
    </div>
  )

  return (
    <FixedSizeList
      height={400}
      width={300}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  )
}
```

**6. Debouncing Expensive Operations:**
```jsx
function SearchInput() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query) {
        const data = await fetchResults(query)
        setResults(data)
      }
    }, 300) // Wait 300ms after typing stops

    return () => clearTimeout(timer)
  }, [query])

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  )
}
```

**7. Windowing/Pagination:**
```jsx
function PaginatedList() {
  const [page, setPage] = useState(1)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchItems(page).then(setItems)
  }, [page])

  return (
    <>
      {items.map(item => <Item key={item.id} data={item} />)}
      <button onClick={() => setPage(p => p + 1)}>Load More</button>
    </>
  )
}
```

**8. Profiling with React DevTools:**
```jsx
// Enable profiling in development
import { Profiler } from 'react'

function App() {
  return (
    <Profiler id="App" onRender={(id, phase, actualDuration) => {
      console.log(`${id} rendered in ${actualDuration}ms`)
    }}>
      <Component />
    </Profiler>
  )
}
```

**Performance Checklist:**
- ✅ Use `React.memo` for pure components
- ✅ Memoize expensive calculations with `useMemo`
- ✅ Stabilize callbacks with `useCallback`
- ✅ Code split with `lazy()` and `Suspense`
- ✅ Virtualize long lists
- ✅ Debounce/throttle user input
- ✅ Implement pagination/infinite scroll
- ✅ Optimize images and assets
- ✅ Use production build
- ✅ Monitor with React DevTools Profiler

---

### Q7: What are Error Boundaries and how do you implement them?

**A:** Error Boundaries are React components that catch JavaScript errors in their child component tree and display a fallback UI.

**Class Component Error Boundary (Required):**
```jsx
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to reporting service
    console.error('Error caught by boundary:', error, errorInfo)

    // Example: Send to error tracking service
    // logErrorToService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>Something went wrong</h2>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <ProblematicComponent />
    </ErrorBoundary>
  )
}
```

**Nested Error Boundaries:**
```jsx
function App() {
  return (
    <ErrorBoundary fallback={<HeaderFallback />}>
      <Header />

      <ErrorBoundary fallback={<ContentFallback />}>
        <MainContent />
      </ErrorBoundary>

      <ErrorBoundary fallback={<SidebarFallback />}>
        <Sidebar />
      </ErrorBoundary>
    </ErrorBoundary>
  )
}
```

**Error Boundary with Retry Logic:**
```jsx
class RetryErrorBoundary extends Component {
  state = { hasError: false, retryCount: 0 }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, retryCount: this.state.retryCount + 1 })
  }

  render() {
    if (this.state.hasError) {
      if (this.state.retryCount >= 3) {
        return <div>Failed after multiple attempts. Please refresh.</div>
      }

      return (
        <div>
          <p>Something went wrong</p>
          <button onClick={this.handleRetry}>
            Retry ({3 - this.state.retryCount} attempts left)
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
```

**What Error Boundaries DON'T Catch:**
- ❌ Event handlers (use try/catch)
- ❌ Asynchronous code (setTimeout, promises)
- ❌ Server-side rendering
- ❌ Errors thrown in the error boundary itself

**Handling Async Errors:**
```jsx
function AsyncComponent() {
  const [error, setError] = useState(null)

  const handleClick = async () => {
    try {
      await fetchData()
    } catch (err) {
      setError(err)
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return <button onClick={handleClick}>Fetch Data</button>
}
```

**Global Error Handler:**
```jsx
// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  // Send to error tracking service
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})
```

---

### Q8: Explain React 18 Concurrent Features: useTransition, useDeferredValue, and Suspense.

**A:** React 18 introduced concurrent rendering, allowing React to interrupt and prioritize rendering work.

**useTransition - Non-Urgent Updates:**
```jsx
import { useState, useTransition } from 'react'

function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()

  const handleSearch = (value) => {
    setQuery(value) // Urgent: update input immediately

    startTransition(() => {
      // Non-urgent: filter results (can be interrupted)
      const filtered = expensiveFilter(allItems, value)
      setResults(filtered)
    })
  }

  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />

      {isPending && <Spinner />}

      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

**useDeferredValue - Defer Expensive Updates:**
```jsx
import { useState, useDeferredValue, useMemo } from 'react'

function ExpensiveList({ items }) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  // Memoize expensive filtering
  const filteredItems = useMemo(() => {
    console.log('Filtering with:', deferredQuery)
    return items.filter(item =>
      item.toLowerCase().includes(deferredQuery.toLowerCase())
    )
  }, [items, deferredQuery])

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      {/* Shows stale results briefly while computing new ones */}
      <List items={filteredItems} />
    </div>
  )
}
```

**Suspense for Data Fetching:**
```jsx
import { Suspense, lazy } from 'react'

// Lazy load components
const Comments = lazy(() => import('./Comments'))
const Sidebar = lazy(() => import('./Sidebar'))

function Article({ articleId }) {
  return (
    <div>
      <ArticleContent id={articleId} />

      {/* Show fallback while loading */}
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments articleId={articleId} />
      </Suspense>

      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </div>
  )
}
```

**Streaming with Suspense (Server Components):**
```jsx
// Server Component
async function Page() {
  return (
    <div>
      {/* Fast content renders first */}
      <Header />

      {/* Stream in slow content */}
      <Suspense fallback={<PostSkeleton />}>
        <PostContent />
      </Suspense>

      <Suspense fallback={<CommentsSkeleton />}>
        <Comments />
      </Suspense>
    </div>
  )
}

async function PostContent() {
  const post = await fetchPost() // Server-side fetch
  return <article>{post.content}</article>
}
```

**Concurrent Rendering Benefits:**
- ✅ Keep UI responsive during heavy computations
- ✅ Prioritize important updates (user input)
- ✅ Defer non-urgent updates (search results)
- ✅ Better perceived performance
- ✅ Automatic batching of state updates

**Comparison:**

| Feature | Purpose | Use Case |
|---------|---------|----------|
| `useTransition` | Mark updates as non-urgent | Tab switching, search filters |
| `useDeferredValue` | Defer value updates | Expensive list filtering |
| `Suspense` | Handle loading states | Code splitting, data fetching |
| `startTransition` | Wrap non-urgent updates | Navigation, complex updates |

---

### Q9: What are React Server Components (RSC) and how do they differ from Client Components?

**A:** React Server Components (introduced in React 18, stabilized in Next.js 13+) allow components to render exclusively on the server, reducing bundle size and improving performance.

**Server Component (Default in App Router):**
```jsx
// app/page.jsx - Server Component (no 'use client')
import db from '@/lib/db'

async function getPosts() {
  // Direct database access (server-only)
  const posts = await db.posts.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  })
  return posts
}

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <main>
      <h1>Latest Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </main>
  )
}
```

**Client Component (Interactive):**
```jsx
'use client' // Opt into client rendering

import { useState } from 'react'

export default function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleLike = async () => {
    setLoading(true)
    await fetch(`/api/posts/${postId}/like`, { method: 'POST' })
    setLikes(l => l + 1)
    setLoading(false)
  }

  return (
    <button onClick={handleLike} disabled={loading}>
      👍 {likes}
    </button>
  )
}
```

**Mixing Server and Client Components:**
```jsx
// app/blog/[slug]/page.jsx - Server Component
import CommentSection from './CommentSection' // Client Component
import db from '@/lib/db'

export default async function BlogPost({ params }) {
  const post = await db.posts.findUnique({
    where: { slug: params.slug }
  })

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Client component for interactivity */}
      <CommentSection postId={post.id} />
    </article>
  )
}
```

**Key Differences:**

| Feature | Server Components | Client Components |
|---------|------------------|-------------------|
| **Execution** | Server only | Browser (and server for SSR) |
| **Bundle Size** | Zero KB | Included in bundle |
| **Data Access** | Direct DB/API access | Must fetch via API |
| **State/Hooks** | ❌ No useState, useEffect | ✅ Full hook support |
| **Interactivity** | ❌ No event handlers | ✅ onClick, onChange, etc. |
| **Imports** | Can import server-only libs | Browser-compatible only |
| **SEO** | ✅ Excellent | Depends on SSR |

**Server Component Advantages:**
- ✅ Zero bundle size for server-only code
- ✅ Direct database access (no API layer needed)
- ✅ Improved security (secrets stay on server)
- ✅ Better SEO (full HTML sent to client)
- ✅ Automatic code splitting

**When to Use Server Components:**
- Fetching data from databases/APIs
- Rendering static content
- Keeping sensitive logic server-side
- Reducing client bundle size
- Improving initial page load

**When to Use Client Components:**
- Interactive elements (buttons, forms)
- Using browser APIs (localStorage, window)
- State management with hooks
- Event listeners
- Third-party client libraries

**Server Actions (React 19):**
```jsx
// app/actions.js - Server Actions
'use server'

import { revalidatePath } from 'next/cache'
import db from '@/lib/db'

export async function createPost(formData) {
  const title = formData.get('title')
  const content = formData.get('content')

  await db.posts.create({
    data: { title, content }
  })

  revalidatePath('/posts')
}

// Usage in Server Component
import { createPost } from './actions'

export default function NewPostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Create Post</button>
    </form>
  )
}
```

---

### Q10: What's new in React 19? Explain the major features.

**A:** React 19 introduces several significant features focused on simplifying development and improving performance.

**1. Actions (Form Actions):**
```jsx
// Before React 19
function OldForm() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPending(true)
    setError(null)

    try {
      const formData = new FormData(e.target)
      await updateUser(formData)
    } catch (err) {
      setError(err.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <input name="name" />
      <button type="submit" disabled={pending}>
        {pending ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}

// React 19 - Simplified with Actions
function NewForm() {
  return (
    <form action={updateUser}>
      <input name="name" />
      <button type="submit">Save</button>
    </form>
  )
}

// Server Action
async function updateUser(formData) {
  'use server'
  const name = formData.get('name')
  await db.users.update({ name })
}
```

**2. useFormStatus Hook:**
```jsx
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}

function Form() {
  return (
    <form action={submitAction}>
      <input name="email" />
      <SubmitButton /> {/* Automatically knows form state */}
    </form>
  )
}
```

**3. useActionState Hook:**
```jsx
import { useActionState } from 'react'

function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    async (previousState, formData) => {
      const email = formData.get('email')
      const password = formData.get('password')

      try {
        await login(email, password)
        return { success: true, error: null }
      } catch (error) {
        return { success: false, error: 'Invalid credentials' }
      }
    },
    { success: false, error: null }
  )

  return (
    <form action={formAction}>
      {state.error && <p className="error">{state.error}</p>}
      {state.success && <p className="success">Logged in!</p>}

      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

**4. useOptimistic Hook:**
```jsx
import { useOptimistic } from 'react'

function CommentList({ comments }) {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (currentComments, newComment) => [...currentComments, newComment]
  )

  const handleSubmit = async (formData) => {
    const comment = formData.get('comment')

    // Optimistically update UI
    addOptimisticComment({ id: 'temp', text: comment })

    try {
      // Actually save to server
      await saveComment(comment)
    } catch (error) {
      // React automatically reverts on error
      console.error('Failed to save comment')
    }
  }

  return (
    <div>
      <form action={handleSubmit}>
        <input name="comment" />
        <button type="submit">Add Comment</button>
      </form>

      {optimisticComments.map(comment => (
        <div key={comment.id}>{comment.text}</div>
      ))}
    </div>
  )
}
```

**5. Document Metadata Support:**
```jsx
// No need for react-helmet or similar libraries
export default function Page() {
  return (
    <>
      <title>Page Title</title>
      <meta name="description" content="Page description" />
      <link rel="canonical" href="https://example.com/page" />
      <meta property="og:title" content="OG Title" />

      <h1>Content</h1>
    </>
  )
}
```

**6. Asset Loading (preload, preinit):**
```jsx
import { preload, preinit } from 'react-dom'

function Component() {
  useEffect(() => {
    // Preload critical resources
    preload('/fonts/inter.woff2', { as: 'font' })
    preload('/images/hero.jpg', { as: 'image' })

    // Preinitialize stylesheets
    preinit('/styles/critical.css', { as: 'style' })
  }, [])

  return <div>Content</div>
}
```

**7. Ref as Props:**
```jsx
// Before: Forward refs manually
const MyInput = forwardRef((props, ref) => (
  <input ref={ref} {...props} />
))

// React 19: Pass ref directly as prop
function MyInput({ ref, ...props }) {
  return <input ref={ref} {...props} />
}

// Usage
<MyInput ref={inputRef} />
```

**8. Support for Stylesheets in JSX:**
```jsx
function Component() {
  return (
    <>
      <link rel="stylesheet" href="/styles/component.css" />
      <div className="styled">Content</div>
    </>
  )
}
```

**React 19 Migration Benefits:**
- ✅ Simpler form handling
- ✅ Built-in optimistic updates
- ✅ Better TypeScript support
- ✅ Reduced boilerplate
- ✅ Improved performance
- ✅ Better developer experience

---
