# Sr.UI Developer Challenge-Based Assessment

## Overview

This is a **challenge-based assessment** where candidates must **identify and fix intentional bugs** across 10 critical skill areas. Unlike a demo, this component contains broken code that candidates need to repair.

## 📍 Location

`src/pages/challenges/advanced/sr-ui-assessment.vue`

## 🎯 Assessment Structure

### Format
- **10 sections**, each focusing on one skill area
- Each section contains **intentional bugs and issues**
- Candidates have **6 minutes per section** (60 minutes total)
- No solutions provided - candidates must demonstrate problem-solving

### Skills Assessed

1. **HTML/CSS & SCSS** - Fix semantic HTML, inline styles, CSS specificity
2. **Responsive Design** - Fix mobile layouts, breakpoints, touch targets
3. **API Integration** - Implement debouncing, error handling, loading states
4. **Vue 2→3 Migration** - Convert Options API, fix lifecycle hooks, replace filters
5. **Web Accessibility** - Add ARIA, fix contrast, keyboard navigation, focus management
6. **Performance** - Optimize computed, add lazy loading, virtual scrolling
7. **Vue 3 Built-in Components** - Add Transition, Teleport, TransitionGroup, Suspense
8. **TypeScript** - Fix types, add interfaces, implement type guards
9. **State Management** - Integrate Pinia, separate state, add persistence
10. **Lifecycle Hooks** - Fix memory leaks, add cleanup, proper hook usage

---

## 🚀 How to Use in Interviews

### Setup (5 minutes before interview)
```bash
pnpm dev
# Navigate to: http://localhost:5173/challenges/advanced/sr-ui-assessment
```

### Interview Flow (60 minutes)

#### Introduction (5 min)
- Explain the format: "You'll see 10 tabs, each with broken code"
- Time limit: 6 minutes per section
- Task: Identify issues and explain how you'd fix them
- They can write pseudo-code or describe solutions

#### Assessment (50 min - 5 min per section)
For each tab:
1. **Candidate reviews** the code snippet (1 min)
2. **Candidate identifies** issues (2 min)
3. **Candidate explains** fixes (2 min)

**Interviewer should:**
- Take notes on their approach
- Ask follow-up questions
- Observe problem-solving process
- Note communication clarity

#### Wrap-up (5 min)
- Ask which section was hardest/easiest
- Discuss their overall approach
- Answer candidate questions

---

## 📊 Evaluation Rubric

### Scoring Per Section (1-5 points)

**5 - Excellent:**
- Identifies ALL issues
- Explains fixes clearly with best practices
- Mentions edge cases
- Suggests optimizations beyond requirements

**4 - Good:**
- Identifies most issues (80%+)
- Clear explanations
- Minor gaps in knowledge

**3 - Adequate:**
- Identifies key issues (60-80%)
- Basic explanations
- Some confusion on advanced topics

**2 - Needs Improvement:**
- Misses major issues (<60%)
- Unclear explanations
- Significant knowledge gaps

**1 - Poor:**
- Cannot identify issues
- No clear approach
- Fundamental misunderstandings

### Total Score: ___/50

**Hiring Recommendation:**
- **45-50:** Strong Hire ⭐⭐⭐⭐⭐
- **35-44:** Hire ⭐⭐⭐⭐
- **25-34:** Lean Hire ⭐⭐⭐
- **<25:** No Hire ⭐⭐

---

## 🔍 What to Look For

### Green Flags ✅
- Asks clarifying questions before answering
- Thinks out loud during problem-solving
- References real-world experience
- Mentions trade-offs in solutions
- Considers accessibility/performance impact
- Admits uncertainty honestly

### Red Flags ❌
- Jumps to solutions without understanding
- Cannot explain WHY something is wrong
- Dismisses accessibility concerns
- Unaware of basic best practices
- Blames tools/frameworks for their mistakes
- Defensive when questioned

---

## 💡 Additional Skills to Evaluate

Beyond the 10 core areas, watch for these **critical senior-level skills**:

### HIGH Priority
1. **Error Handling Strategy** - Do they anticipate edge cases?
2. **Testing Approach** - Do they mention writing tests?
3. **Security Awareness** - XSS, input validation, CSP
4. **Code Organization** - Separation of concerns, DRY principles
5. **Communication** - Can they explain technical concepts clearly?

### MEDIUM Priority
6. **Build Optimization** - Code splitting, bundle size awareness
7. **Browser Compatibility** - Cross-browser considerations
8. **SEO Knowledge** - Meta tags, SSR implications
9. **Documentation** - Would they document their changes?
10. **Collaboration** - How would they work with team on fixes?

### Questions to Ask
- "How would you test this fix?"
- "What could go wrong with this approach?"
- "How would you explain this to a junior developer?"
- "What monitoring would you add after fixing this?"

---

## 📝 Interviewer Checklist

Print this for each interview:

```
CANDIDATE: _________________________
DATE: _____________________________
INTERVIEWER: ______________________

SECTION SCORES (1-5):
□ HTML/CSS:     ___/5  Notes: ________________
□ Responsive:   ___/5  Notes: ________________
□ API:          ___/5  Notes: ________________
□ Migration:    ___/5  Notes: ________________
□ Accessibility:___/5  Notes: ________________
□ Performance:  ___/5  Notes: ________________
□ Vue 3 Comp:   ___/5  Notes: ________________
□ TypeScript:   ___/5  Notes: ________________
□ State Mgmt:   ___/5  Notes: ________________
□ Lifecycle:    ___/5  Notes: ________________

TOTAL: ___/50

OBSERVATIONS:
Strengths:
_________________________________________
_________________________________________

Areas for Improvement:
_________________________________________
_________________________________________

Communication Quality: □ Excellent □ Good □ Fair □ Poor
Problem-Solving Approach: □ Systematic □ Haphazard
Time Management: □ Good □ Rushed □ Slow

RECOMMENDATION:
□ Strong Hire (45-50)
□ Hire (35-44)
□ Lean Hire (25-34)
□ No Hire (<25)

FOLLOW-UP QUESTIONS TO ASK:
_________________________________________
_________________________________________
```

---

## 🎓 Section-by-Section Guide

### Section 1: HTML/CSS & SCSS
**Issues Present:**
- Improper heading hierarchy (h3 before h1)
- Inline styles instead of classes
- Missing semantic HTML
- No CSS custom properties
- Flat CSS structure (no SCSS nesting)

**Expected Fixes:**
```html
<!-- Before -->
<h3>Main Title</h3>
<h1>Subtitle</h1>
<div style="background: blue;">

<!-- After -->
<h1>Main Title</h1>
<h2>Subtitle</h2>
<div class="themed-container">
```

**Look For:** Understanding of semantic HTML, CSS architecture, maintainability

---

### Section 2: Responsive Design
**Issues Present:**
- Fixed width sidebar (breaks on mobile)
- No responsive breakpoints
- Small touch targets (<44px)
- Non-responsive images
- Missing viewport meta tag

**Expected Fixes:**
```css
/* Before */
.sidebar { width: 300px; }

/* After */
.sidebar { 
  width: 100%;
}
@media (min-width: 768px) {
  .sidebar { width: 300px; }
}
```

**Look For:** Mobile-first thinking, breakpoint strategy, accessibility awareness

---

### Section 3: API Integration
**Issues Present:**
- No debouncing on search
- No error handling
- No loading states
- No request cancellation
- No retry mechanism

**Expected Fixes:**
```typescript
// Before
async function handleSearch(term: string) {
  fetchUsers()
}

// After
const debouncedSearch = useDebounceFn(async (term: string) => {
  try {
    loading.value = true
    const controller = new AbortController()
    const response = await fetch(url, { signal: controller.signal })
    // ... handle response
  } catch (error) {
    error.value = error.message
  } finally {
    loading.value = false
  }
}, 300)
```

**Look For:** Debouncing knowledge, async/await patterns, error handling

---

### Section 4: Vue 2→3 Migration
**Issues Present:**
- Options API syntax
- Deprecated `beforeDestroy` hook
- Filters (removed in Vue 3)
- Old v-model syntax
- Event bus pattern

**Expected Fixes:**
```typescript
// Before (Vue 2)
export default {
  data() { return { users: [] } },
  filters: { capitalize(value) { ... } },
  beforeDestroy() { ... }
}

// After (Vue 3)
<script setup>
const users = ref([])
const capitalizedValue = computed(() => value.charAt(0).toUpperCase() + ...)
onBeforeUnmount(() => { ... })
</script>
```

**Look For:** Composition API fluency, migration strategy knowledge

---

### Section 5: Accessibility
**Issues Present:**
- Missing ARIA labels
- Low color contrast (#999 on #fff)
- No keyboard navigation
- Div used as button (onclick)
- Missing alt text on images
- Improper heading hierarchy in modal

**Expected Fixes:**
```html
<!-- Before -->
<div onclick="openModal()">Click</div>
<img src="photo.jpg">

<!-- After -->
<button @click="openModal()" aria-label="Open user details modal">
  Click to open
</button>
<img src="photo.jpg" alt="User profile photo">
```

**Look For:** WCAG knowledge, screen reader considerations, inclusive design

---

### Section 6: Performance
**Issues Present:**
- Using `ref` instead of `shallowRef` for large arrays
- Expensive computed recalculating unnecessarily
- No lazy loading for images
- No virtual scrolling for long lists
- No code splitting

**Expected Fixes:**
```typescript
// Before
const users = ref(largeArray)

// After
const users = shallowRef(largeArray)

// Add lazy loading
<img :src="user.avatar" loading="lazy">

// Virtual scrolling (mention libraries like vue-virtual-scroller)
```

**Look For:** Performance optimization strategies, profiling knowledge

---

### Section 7: Vue 3 Built-in Components
**Issues Present:**
- Modal renders in DOM tree (z-index issues)
- No transitions/animations
- List updates without animation
- No Suspense for async components
- No KeepAlive for cached views

**Expected Fixes:**
```vue
<!-- Before -->
<div v-if="showModal">Modal</div>

<!-- After -->
<Teleport to="body">
  <Transition name="modal">
    <div v-if="showModal">Modal</div>
  </Transition>
</Teleport>

<TransitionGroup name="list">
  <div v-for="item in items" :key="item.id">{{ item.name }}</div>
</TransitionGroup>
```

**Look For:** Knowledge of Vue 3 features, UX enhancement thinking

---

### Section 8: TypeScript
**Issues Present:**
- Using `any` type
- Missing return type annotations
- Incomplete interfaces
- No type guards
- No generics for reusability

**Expected Fixes:**
```typescript
// Before
function processUser(user: any): any { return user }

// After
interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'moderator'
}

function processUser(user: User): User { 
  return user 
}

// Type guard
function isAdmin(user: User): user is User & { role: 'admin' } {
  return user.role === 'admin'
}
```

**Look For:** Type safety mindset, advanced TypeScript features

---

### Section 9: State Management
**Issues Present:**
- All state in component (no Pinia)
- No state separation (local vs global)
- No persistence (localStorage)
- No validation/sanitization
- No undo/redo functionality

**Expected Fixes:**
```typescript
// Create Pinia store
export const useUserStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const filters = ref<FilterState>({...})
  
  // Persist to localStorage
  watch([users, filters], ([newUsers, newFilters]) => {
    localStorage.setItem('userState', JSON.stringify({
      users: newUsers,
      filters: newFilters
    }))
  }, { deep: true })
  
  return { users, filters }
})
```

**Look For:** State architecture thinking, scalability considerations

---

### Section 10: Lifecycle Hooks
**Issues Present:**
- Memory leak (event listeners not removed)
- Missing onUnmounted cleanup
- No error handling in hooks
- Not using watchEffect for reactive side effects
- Missing onBeforeMount for prefetching

**Expected Fixes:**
```typescript
// Before
onMounted(() => {
  window.addEventListener('resize', handleResize)
  // Never cleaned up!
})

// After
let resizeHandler: (() => void) | null = null

onBeforeMount(() => {
  // Prefetch data
  prefetchUserData()
})

onMounted(() => {
  resizeHandler = () => { /* handle resize */ }
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
})

// Use watchEffect for reactive side effects
watchEffect(() => {
  console.log(`User count: ${users.value.length}`)
})
```

**Look For:** Memory management awareness, lifecycle mastery

---

## 🔗 Related Documentation

- **Quick Start:** `QUICK-START-ASSESSMENT.md`
- **Additional Skills:** `ADDITIONAL-SKILLS-GUIDE.md`
- **Implementation Details:** `IMPLEMENTATION-SUMMARY.md`

---

## ⚠️ Important Notes

### For Interviewers
1. **Don't provide hints** unless candidate is completely stuck
2. **Focus on reasoning**, not just correct answers
3. **Note communication style** - can they explain technical concepts?
4. **Watch for red flags** - dismissing accessibility, no testing mindset
5. **Consider experience level** - adjust expectations accordingly

### For Candidates
1. **Think out loud** - we want to understand your process
2. **Ask questions** if something is unclear
3. **It's okay to say "I don't know"** - honesty is valued
4. **Explain trade-offs** in your solutions
5. **Consider edge cases** and error scenarios

---

## 📈 Success Metrics

Track these to improve the assessment:
- Average score per section
- Time spent per section
- Hire rate correlation with scores
- Candidate feedback ratings
- Common missed issues (update assessment if too many miss same thing)

---

**Last Updated:** 2026-06-04  
**Version:** 2.0 (Challenge-Based)  
**Status:** Ready for Production Use ✅
