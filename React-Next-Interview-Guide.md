## Next.js

### Q1: What is Next.js and what are its key features compared to plain React?

**A:** Next.js is a React framework that provides production-ready features out of the box, solving common challenges in React development.

**Key Features:**

**1. File-based Routing:**
```
pages/
  index.js          → /
  about.js          → /about
  blog/[slug].js    → /blog/my-post (dynamic route)
  api/users.js      → /api/users (API route)
```

**2. Multiple Rendering Strategies:**
- **SSR (Server-Side Rendering)**: `getServerSideProps`
- **SSG (Static Site Generation)**: `getStaticProps`
- **ISR (Incremental Static Regeneration)**: Revalidate static pages
- **CSR (Client-Side Rendering)**: Standard React behavior

**3. Built-in Optimizations:**
- Image optimization with `<Image>` component
- Font optimization with `next/font`
- Script optimization with `<Script>`
- Automatic code splitting

**4. API Routes:**
```javascript
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello World' })
}
```

**5. Other Features:**
- TypeScript support out of the box
- CSS/Sass support with modules
- Environment variables management
- Middleware for request interception
- Internationalization (i18n) routing

**Comparison with Plain React:**

| Feature | React | Next.js |
|---------|-------|---------|
| Routing | Manual (React Router) | File-based (automatic) |
| SSR | Complex setup | Built-in |
| SEO | Limited | Excellent |
| Image Optimization | Manual | Automatic |
| API Routes | Separate backend | Built-in |
| Configuration | Minimal | Opinionated defaults |
| Deployment | Various options | Vercel optimized |

### Q2: Explain Next.js data fetching methods: getStaticProps, getServerSideProps, and getStaticPaths.

**A:** Next.js provides different data fetching strategies based on when and how data should be fetched.

**getStaticProps (SSG - Build Time):**
Fetches data at build time and generates static HTML.

```javascript
// pages/blog/index.js
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()

  return {
    props: {
      posts
    },
    // Optional: Revalidate every 60 seconds (ISR)
    revalidate: 60
  }
}

export default function BlogPage({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

**getServerSideProps (SSR - Request Time):**
Fetches data on every request.

```javascript
// pages/dashboard.js
export async function getServerSideProps(context) {
  const { req, query } = context

  // Check authentication
  const session = getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  // Fetch user-specific data
  const res = await fetch(`https://api.example.com/user/${session.user.id}`)
  const userData = await res.json()

  return {
    props: {
      userData
    }
  }
}

export default function Dashboard({ userData }) {
  return (
    <div>
      Welcome,
      {userData.name}
    </div>
  )
}
```

**getStaticPaths (Dynamic Routes with SSG):**
Specifies which dynamic routes should be pre-rendered.

```javascript
// pages/blog/[slug].js
export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()

  // Generate paths for all posts
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }))

  return {
    paths,
    // Fallback behavior for non-generated paths
    fallback: 'blocking' // or false or true
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.slug}`)
  const post = await res.json()

  return {
    props: {
      post
    },
    revalidate: 60
  }
}

export default function PostPage({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

**Fallback Options:**
- `fallback: false` - 404 for non-generated paths
- `fallback: true` - Show loading state, generate page on-demand
- `fallback: 'blocking'` - Wait for server to generate page (like SSR)

**Choosing the Right Method:**

| Method | Use Case | Example |
|--------|----------|---------|
| getStaticProps | Content that doesn't change often | Blog posts, product pages |
| getServerSideProps | Personalized or real-time data | User dashboard, live stats |
| getStaticPaths | Dynamic routes with known paths | Blog slugs, product IDs |

### Q3: What is Incremental Static Regeneration (ISR) and how does it work?

**A:** ISR allows you to update static pages after deployment without rebuilding the entire site. It combines the benefits of SSG (fast, cached) with the flexibility of SSR (fresh data).

**How ISR Works:**
1. Page is generated statically at build time
2. After specified `revalidate` time, next request triggers background regeneration
3. Users see old cached version during regeneration
4. Once regenerated, new version is served to subsequent requests

**Implementation:**

```javascript
// pages/products/[id].js
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } }
    ],
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/products/${params.id}`)
  const product = await res.json()

  return {
    props: {
      product
    },
    // Revalidate at most once per minute
    revalidate: 60
  }
}

export default function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>
        $
        {product.price}
      </p>
    </div>
  )
}
```

**On-Demand Revalidation (Next.js 12.2+):**
Manually trigger revalidation via API route.

```javascript
// pages/api/revalidate.js
export default async function handler(req, res) {
  // Check for secret token
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // Revalidate specific path
    await res.revalidate('/products/1')

    // Or revalidate all products
    // await res.revalidate('/products')

    return res.json({ revalidated: true })
  }
  catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
```

**Trigger from CMS webhook:**
```javascript
// Example: Trigger revalidation when content updates in CMS
export default async function handler(req, res) {
  const { slug } = req.body

  await res.revalidate(`/blog/${slug}`)

  return res.json({ revalidated: true })
}
```

**Benefits:**
- Fast initial load (static)
- Fresh data without full rebuild
- Reduced server load compared to SSR
- Scalable for large sites

**Considerations:**
- Users might see stale data for up to `revalidate` seconds
- First request after expiration is slower (regeneration)
- Need to handle fallback states appropriately

### Q4: Explain Next.js Image Optimization and best practices.

**A:** Next.js provides an optimized `<Image>` component that automatically handles image optimization, responsive sizing, and lazy loading.

**Basic Usage:**

```jsx
import Image from 'next/image'

function ProductCard({ product }) {
  return (
    <div className="card">
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={300}
        priority // Load immediately for above-the-fold images
      />
      <h3>{product.name}</h3>
    </div>
  )
}
```

**Advanced Features:**

**Responsive Images:**
```jsx
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  style={{
    maxWidth: '100%',
    height: 'auto'
  }}
/>
```

**Remote Images (configure in next.config.js):**
```javascript
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        pathname: '/images/**',
      },
    ],
  },
}
```

**Blur Placeholder:**
```jsx
<Image
  src="/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
/>
```

**Lazy Loading (default behavior):**
```jsx
// Below-the-fold images load only when near viewport
<Image
  src="/gallery/photo1.jpg"
  alt="Gallery photo"
  width={400}
  height={300}
  // loading="lazy" is default
/>
```

**Custom Loader:**
```jsx
<Image
  src="/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  loader={({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }}
/>
```

**Best Practices:**

1. **Always provide width and height** (or use fill with parent positioning):
```jsx
// ✅ Good - Explicit dimensions
<Image src="/img.jpg" alt="Img" width={400} height={300} />

// ✅ Good - Fill with positioned parent
<div style={{ position: 'relative', width: '100%', height: '400px' }}>
  <Image src="/img.jpg" alt="Img" fill style={{ objectFit: 'cover' }} />
</div>

// ❌ Bad - Missing dimensions
<Image src="/img.jpg" alt="Img" />
```

2. **Use priority for above-the-fold images:**
```jsx
<Image src="/hero.jpg" alt="Hero" width={1920} height={1080} priority />
```

3. **Use appropriate formats:**
```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'], // Modern formats first
  },
}
```

4. **Optimize for different devices:**
```jsx
<Image
  src="/responsive.jpg"
  alt="Responsive"
  width={1200}
  height={800}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

5. **Avoid wrapping in unnecessary containers:**
```jsx
// ❌ Bad
<div>
  <Image src="/img.jpg" alt="Img" width={400} height={300} />
</div>

// ✅ Good - Image handles layout
<Image src="/img.jpg" alt="Img" width={400} height={300} />
```

**Benefits over regular `<img>`:**
- Automatic WebP/AVIF conversion
- Responsive image generation
- Lazy loading by default
- Blur-up placeholders
- Prevents layout shift (CLS)
- CDN caching headers
- Device-specific optimization

### Q5: How do you implement authentication in Next.js applications?

**A:** Authentication in Next.js can be implemented using various approaches depending on requirements.

**Option 1: NextAuth.js (Recommended for most cases):**

```javascript
// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await verifyCredentials(credentials)
        if (user)
          return user
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    }
  },
  pages: {
    signIn: '/auth/login',
  }
})
```

**Protecting Pages:**

```jsx
// pages/dashboard.js
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    router.push('/auth/login')
    return null
  }

  return (
    <div>
      <h1>
        Welcome,
        {session.user.name}
      </h1>
      <p>
        Email:
        {session.user.email}
      </p>
    </div>
  )
}

// Server-side protection
export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}
```

**Option 2: Custom JWT Authentication:**

```javascript
// lib/auth.js
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

export function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET)
  }
  catch (error) {
    return null
  }
}
```

**Middleware Protection (Next.js 12+):**

```javascript
// middleware.js
import { NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

export function middleware(request) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const user = verifyToken(token)
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*']
}
```

**Login API Route:**

```javascript
// pages/api/auth/login.js
import { generateToken } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body

  const user = await authenticateUser(email, password)

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = generateToken(user)

  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800`)

  return res.status(200).json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  })
}
```

**Protected API Route:**

```javascript
// pages/api/user/profile.js
import { verifyToken } from '../../../lib/auth'

export default async function handler(req, res) {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const user = verifyToken(token)

  if (!user) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const profile = await getUserProfile(user.id)

  return res.status(200).json(profile)
}
```

**Best Practices:**
- Use HTTPS in production
- Store tokens in HttpOnly cookies (not localStorage)
- Implement CSRF protection
- Use secure password hashing (bcrypt)
- Set appropriate token expiration
- Implement refresh token rotation
- Add rate limiting to auth endpoints

### Q6: Explain Next.js Middleware and its use cases.

**A:** Middleware in Next.js allows you to run code before a request completes, enabling authentication, redirects, rewrites, and header modifications.

**Basic Middleware:**

```javascript
// middleware.js (or middleware.ts)
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Add custom header
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'value')

  return response
}

export const config = {
  matcher: '/about/:path*'
}
```

**Authentication Middleware:**

```javascript
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const pathname = request.nextUrl.pathname

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/profile', '/settings']
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    const token = request.cookies.get('token')?.value

    if (!token) {
      // Redirect to login
      const url = new URL('/login', request.url)
      url.searchParams.set('from', pathname)
      return NextResponse.redirect(url)
    }

    // Verify token (could call external service)
    const isValid = verifyToken(token)

    if (!isValid) {
      const url = new URL('/login', request.url)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/api/protected/:path*'
  ]
}
```

**Internationalization (i18n) Middleware:**

```javascript
// middleware.js
import { NextResponse } from 'next/server'

const locales = ['en', 'es', 'fr', 'de']
const defaultLocale = 'en'

export function middleware(request) {
  const pathname = request.nextUrl.pathname

  // Check if pathname already has locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale)
    return

  // Get user's preferred locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  const userLocale = detectLocale(acceptLanguage, locales) || defaultLocale

  // Redirect to localized path
  request.nextUrl.pathname = `/${userLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

function detectLocale(acceptLanguage, locales) {
  if (!acceptLanguage)
    return null

  const preferred = acceptLanguage.split(',')[0].split('-')[0]
  return locales.includes(preferred) ? preferred : null
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
```

**A/B Testing Middleware:**

```javascript
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const cookie = request.cookies.get('ab-test-variant')
  let variant = cookie?.value

  if (!variant) {
    // Randomly assign variant
    variant = Math.random() > 0.5 ? 'A' : 'B'

    const response = NextResponse.next()
    response.cookies.set('ab-test-variant', variant, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    })

    return response
  }

  const response = NextResponse.next()
  response.headers.set('x-ab-variant', variant)

  return response
}
```

**Rate Limiting Middleware:**

```javascript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
// middleware.js
import { NextResponse } from 'next/server'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
})

export async function middleware(request) {
  const ip = request.ip ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '10'
      }
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*'
}
```

**Use Cases:**
- Authentication and authorization
- Internationalization routing
- A/B testing
- Bot detection
- Rate limiting
- Geolocation-based redirects
- Custom logging/analytics
- Header manipulation

**Limitations:**
- Runs on Edge Runtime (limited Node.js APIs)
- Maximum execution time: 1.5 seconds
- Cannot modify request body
- Limited to specific response types

### Q7: How do you optimize Next.js application performance?

**A:** Next.js provides multiple built-in and manual optimization strategies.

**1. Automatic Optimizations:**

Next.js automatically:
- Code splits by page
- Prefetches linked pages in viewport
- Optimizes images
- Minifies CSS and JavaScript
- Tree-shakes unused code

**2. Image Optimization:**

```jsx
import Image from 'next/image'

// Optimized image with proper sizing
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority // Above-the-fold
  quality={85} // Compression quality
/>
```

**3. Font Optimization:**

```jsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

**4. Script Optimization:**

```jsx
import Script from 'next/script'

export default function Page() {
  return (
    <>
      {/* Load after page becomes interactive */}
      <Script
        src="https://analytics.example.com/script.js"
        strategy="lazyOnload"
      />

      {/* Load before hydration */}
      <Script
        id="schema-org"
        strategy="beforeInteractive"
      >
        {`
          {
            "@context": "https://schema.org",
            "@type": "Article"
          }
        `}
      </Script>
    </>
  )
}
```

**5. Dynamic Imports:**

```jsx
import dynamic from 'next/dynamic'

// Lazy load heavy component
const HeavyChart = dynamic(() => import('../components/HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false // Disable SSR if not needed
})

export default function Dashboard() {
  return <HeavyChart data={data} />
}
```

**6. Caching Strategies:**

```javascript
// API route with cache headers
export default async function handler(req, res) {
  const data = await fetchData()

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
  res.json(data)
}
```

**7. Bundle Analysis:**

```bash
# Analyze bundle size
ANALYZE=true npm run build
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // Your config
})
```

**8. Database Query Optimization:**

```javascript
// Use getStaticProps for data that doesn't change often
export async function getStaticProps() {
  const products = await db.products.findMany({
    select: {
      id: true,
      name: true,
      price: true
      // Don't fetch unnecessary fields
    }
  })

  return {
    props: { products },
    revalidate: 3600 // Cache for 1 hour
  }
}
```

**9. Reduce Hydration Mismatches:**

```jsx
'use client' // Mark as client component in App Router
import { useEffect, useState } from 'react'

export default function Component() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Avoid rendering different content on server vs client
  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {window.innerWidth}
      px
    </div>
  )
}
```

**10. Optimize Third-party Scripts:**

```jsx
import Script from 'next/script'

// Load third-party scripts efficiently
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
  strategy="afterInteractive"
/>
<Script
  id="google-analytics"
  strategy="afterInteractive"
>
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_TRACKING_ID');
  `}
</Script>
```

**Performance Monitoring:**

```javascript
// next.config.js
module.exports = {
  experimental: {
    instrumentationHook: true,
  },
}

// instrumentation.js
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation-node')
  }
}
```

**Key Metrics to Monitor:**
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- TTFB (Time to First Byte)
- FCP (First Contentful Paint)

### Q8: Explain the difference between Pages Router and App Router in Next.js 13+.

**A:** Next.js 13 introduced the App Router, a new routing system built on React Server Components.

**Pages Router (Traditional):**

```javascript
// pages/blog/[slug].js
export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug)
  return { props: { post } }
}

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

**App Router (Next.js 13+):**

```jsx
// app/blog/[slug]/page.jsx
async function getPost(slug) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 3600 } // ISR
  })
  return res.json()
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug)

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

**Key Differences:**

| Feature | Pages Router | App Router |
|---------|-------------|------------|
| **File Structure** | `pages/` directory | `app/` directory |
| **Routing** | File-based with special naming | Nested layouts with folders |
| **Data Fetching** | `getStaticProps`, `getServerSideProps` | Async components, `fetch` with caching |
| **Server Components** | Not supported | Default (opt-out with `'use client'`) |
| **Layouts** | `_app.js`, `_document.js` | Nested `layout.js` files |
| **Loading States** | Manual implementation | Built-in `loading.js` |
| **Error Handling** | `pages/_error.js` | `error.js` boundaries |
| **Streaming** | Limited | Built-in with Suspense |
| **Route Groups** | Not available | `(group)` folders |
| **Parallel Routes** | Not available | `@folder` syntax |
| **Intercepting Routes** | Not available | `(..)folder` syntax |

**App Router Advantages:**

**1. Server Components by Default:**
```jsx
// app/page.jsx - Server Component (default)
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  // Runs on server, zero bundle size
  return <div>{data}</div>
}
```

**2. Nested Layouts:**
```jsx
// app/layout.jsx - Root layout
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

// app/dashboard/layout.jsx - Nested layout
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
```

**3. Streaming with Suspense:**
```jsx
// app/dashboard/page.jsx
import { Suspense } from 'react'
import RecentActivity from './recent-activity'
import Stats from './stats'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Fast-loading content */}
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>

      {/* Slow-loading content streams in */}
      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  )
}
```

**4. Parallel Routes:**
```jsx
// app/@team/page.jsx
export default function TeamPage() {
  return <TeamList />
}

// app/@analytics/page.jsx
export default function AnalyticsPage() {
  return <AnalyticsDashboard />
}

// app/layout.jsx
export default function Layout({ team, analytics }) {
  return (
    <div>
      {team}
      {analytics}
    </div>
  )
}
```

**Migration Considerations:**
- App Router is stable but still evolving
- Some libraries may not fully support Server Components
- Learning curve for new concepts
- Can use both routers in same project during migration
- Better for new projects, Pages Router still valid for existing

### Q9: How do you handle SEO in Next.js applications?

**A:** Next.js provides excellent SEO capabilities through metadata management, server-side rendering, and optimization features.

**Metadata API (App Router):**

```jsx
// app/blog/[slug]/page.jsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)

  return {
    title: `${post.title} | My Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://example.com/blog/${params.slug}`,
      siteName: 'My Blog',
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
    alternates: {
      canonical: `https://example.com/blog/${params.slug}`,
    },
  }
}

export default function BlogPost({ post }) {
  return <article>{/* Content */}</article>
}
```

**Static Metadata:**

```jsx
// app/about/page.jsx
export const metadata = {
  title: 'About Us',
  description: 'Learn more about our company',
  keywords: ['company', 'about', 'team'],
}

export default function About() {
  return <div>About page content</div>
}
```

**Root Layout Metadata:**

```jsx
// app/layout.jsx
export const metadata = {
  title: {
    template: '%s | My Website',
    default: 'My Website',
  },
  description: 'Default description for all pages',
  metadataBase: new URL('https://example.com'),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

**Pages Router Metadata:**

```jsx
// pages/blog/[slug].jsx
import Head from 'next/head'

export default function BlogPost({ post }) {
  return (
    <>
      <Head>
        <title>
          {post.title}
          {' '}
          | My Blog
        </title>
        <meta name="description" content={post.excerpt} />

        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:url" content={`https://example.com/blog/${post.slug}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://example.com/blog/${post.slug}`} />
      </Head>

      <article>{/* Content */}</article>
    </>
  )
}
```

**Sitemap Generation:**

```javascript
// app/sitemap.xml/route.js
export async function GET() {
  const posts = await getAllPosts()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://example.com</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${posts.map(post => `
        <url>
          <loc>https://example.com/blog/${post.slug}</loc>
          <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
```

**Robots.txt:**

```javascript
// app/robots.txt/route.js
export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://example.com/sitemap.xml`

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
```

**Structured Data (JSON-LD):**

```jsx
// app/blog/[slug]/page.jsx
export default function BlogPost({ post }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'image': post.coverImage,
    'datePublished': post.publishedAt,
    'dateModified': post.updatedAt,
    'author': {
      '@type': 'Person',
      'name': post.author.name,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>{/* Content */}</article>
    </>
  )
}
```

**SEO Best Practices:**

1. **Use semantic HTML:**
```jsx
<article>
  <header>
    <h1>Article Title</h1>
    <time dateTime="2024-01-01">January 1, 2024</time>
  </header>
  <section>
    <h2>Section Heading</h2>
    <p>Content...</p>
  </section>
</article>
```

2. **Optimize images with alt text:**
```jsx
<Image
  src="/photo.jpg"
  alt="Descriptive text for accessibility and SEO"
  width={800}
  height={600}
/>
```

3. **Implement breadcrumbs:**
```jsx
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/blog">Blog</a></li>
    <li aria-current="page">Current Post</li>
  </ol>
</nav>
```

4. **Use proper heading hierarchy:**
```jsx
<h1>Main Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
```

5. **Enable SSR/SSG for crawlable content:**
```javascript
// Prefer getStaticProps or getServerSideProps over client-side fetching
export async function getStaticProps() {
  // Data fetched at build time - SEO friendly
  return { props: { data } }
}
```

**SEO Checklist:**
- ✅ Unique title tags for each page
- ✅ Meta descriptions (150-160 characters)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ Canonical URLs
- ✅ Structured data (JSON-LD)
- ✅ XML sitemap
- ✅ Robots.txt
- ✅ Semantic HTML
- ✅ Alt text for images
- ✅ Mobile-responsive design
- ✅ Fast page load times
- ✅ Proper heading hierarchy
- ✅ Internal linking structure

---

## Summary

This guide provides comprehensive interview questions and answers for evaluating Senior UI Developers proficient in React.js and Next.js. The questions cover fundamental concepts, advanced patterns, performance optimization, and best practices that senior developers should master.

**Key Areas Assessed:**
- Deep understanding of React's architecture and lifecycle
- Proficiency with modern hooks and composition patterns
- Performance optimization strategies
- Form handling and validation
- Error handling and debugging
- Next.js framework features and rendering strategies
- Authentication and security patterns
- SEO implementation
- Modern Next.js 13+ App Router concepts

These questions are designed to assess not just theoretical knowledge but practical experience with real-world scenarios and problem-solving abilities.
