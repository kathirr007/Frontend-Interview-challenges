# React.js & Next.js AI-Assisted Debugging Scenarios

## Instructions for Interviewers

Present candidates with each problematic code scenario. Ask them to identify issues and fix the code using an AI assistant. Evaluate their prompt quality, critical review of AI output, understanding of concepts, and iteration approach.

---

## Scenario 5A: React.js — Infinite Re-render and State Management Bug

### Context
A React dashboard component fetches user statistics and displays them. Users report the page freezes immediately upon loading.

**API:** `https://jsonplaceholder.typicode.com/users` and `/posts?userId={id}`

### Problematic Code Issues (Expected Answer)
1. **Infinite re-render loop**: `useEffect` depends on `users`, calls `setStats` which creates new object, triggering effect again
2. **Multiple API calls in loop**: forEach with fetch creates uncontrolled parallel requests
3. **No cleanup**: Async operations continue after unmount
4. **No error handling**: Network failures crash silently
5. **No loading states**: Poor UX during data fetching
6. **Expensive filter**: Runs on every keystroke without debouncing

### Key Fixes Required
- Add cleanup function to useEffect (`let isMounted = true`)
- Use `Promise.all` for parallel requests with proper error handling
- Memoize filtered results with `useMemo`
- Debounce filter input
- Add loading and error states
- Use `AbortController` for request cancellation

---

## Scenario 5B: Next.js — Hydration Mismatch and Data Fetching Bug

### Context
Next.js App Router blog page shows flash of incorrect content and stale data.

**API:** `https://jsonplaceholder.typicode.com/posts`

### Problematic Code Issues (Expected Answer)
1. **Unnecessary `'use client'`**: Forces CSR, loses SSR benefits
2. **Hydration mismatch**: Server renders empty state, client renders different content
3. **Client-side fetching**: Defeats Next.js SSR/SSG, poor SEO
4. **No caching/revalidation**: Fresh fetch on every load
5. **Incorrect date display**: Shows current date instead of post date
6. **No error handling**: Network failures show blank page
7. **Waterfall loading**: HTML → JS → Data (slow)

### Key Fixes Required
**Option 1 - Server Component (Recommended):**
- Remove `'use client'`, make it async Server Component
- Use `fetch` with `next: { revalidate: 3600 }` for ISR
- Add metadata for SEO
- Handle errors gracefully

**Option 2 - Hybrid Approach:**
- Keep main page as Server Component
- Extract interactive parts to Client Component
- Wrap with `<Suspense>` for streaming
- Create internal API route for client fetching

---

## Scenario 6: React.js + TypeScript — Type Safety and Performance Issues

### Context
TypeScript e-commerce catalog has runtime errors, poor performance, type safety issues.

**API:** `https://fakestoreapi.com/products`

### Problematic Code Issues (Expected Answer)
1. **Excessive `any` types**: `price: any`, `rating: any`, events `(e: any)` - defeats TypeScript
2. **Missing interfaces**: No `CartItem`, `Rating` interfaces
3. **Sorting on every render**: Recalculates unnecessarily
4. **Cart duplicates**: Adding same product creates duplicates vs incrementing quantity
5. **No memoization**: Filter/sort run on every state change
6. **No error/loading states**: Poor UX
7. **Accessibility issues**: Missing labels, ARIA attributes

### Key Fixes Required
- Define proper TypeScript interfaces (Product, Rating, CartItem)
- Use `useMemo` for filteredProducts and sortedProducts
- Use `useCallback` for addToCart function
- Track cart quantities properly (map/reduce pattern)
- Add error handling with try-catch
- Implement loading states
- Add proper event types: `React.ChangeEvent<HTMLInputElement>`
- Improve accessibility with labels and ARIA attributes

---

## Evaluation Criteria

| Criteria | Poor (1-2) | Good (3-4) | Excellent (5) |
|----------|-----------|------------|---------------|
| **Problem identification** | Misses critical issues | Finds most issues | Identifies all issues with root causes |
| **Prompt crafting** | Vague prompts | Provides context | Precise prompts with constraints |
| **Critical review** | Accepts AI output blindly | Checks obvious errors | Validates types, tests edge cases |
| **Understanding depth** | Can't explain fixes | Explains correctly | Connects to broader principles |
| **Iteration quality** | Gives up early | Refines with feedback | Combines AI + own knowledge |
| **Security awareness** | Misses XSS/injection | Identifies when prompted | Proactively catches vulnerabilities |

---

## Integration Instructions

To add these scenarios to `Sr.UI Developer.md`:

1. Open `Sr.UI Developer.md`
2. Find line containing: `### Evaluation Criteria for AI-Assisted Scenarios`
3. Insert all content from this file BEFORE that line
4. Ensure proper markdown formatting with `---` separators
5. Update table of contents if needed

This completes the React.js and Next.js sections for Senior UI Developer evaluation.