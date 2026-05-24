# Senior UI Developer Interview Questions & Answers

## HTML & CSS

### Q1: Explain semantic HTML and its importance.
**A:** Semantic HTML uses elements like `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` that convey meaning about the content they contain. It improves accessibility, SEO, and code readability by providing context to both browsers and assistive technologies.

### Q2: How do you implement responsive design?
**A:** Use media queries, flexible grids (CSS Grid/Flexbox), fluid images, and relative units (em, rem, %, vw/vh). Ensure touch targets are large enough and test across devices.

### Q3: What is the box model? Explain its components.
**A:** The box model consists of:
- Content: The actual content (text, images).
- Padding: Space inside the border.
- Border: The border around the padding.
- Margin: Space outside the border.

Use `box-sizing: border-box` to include padding and border in the width/height.

### Q4: Describe CSS specificity and how it affects styling.
**A:** Specificity determines which CSS rule takes precedence when multiple rules apply to an element. It's calculated based on selector types:
- Inline styles: 1000
- ID selectors: 100
- Class, pseudo-classes, attribute selectors: 10
- Element selectors, pseudo-elements: 1

Higher specificity wins.

### Q5: How do you handle cross-browser compatibility issues?
**A:** Use feature detection (e.g., Modernizr), polyfills, vendor prefixes, and tools like Autoprefixer. Test thoroughly across target browsers and use browser support tables (e.g., Can I Use).

### Q6: What is the difference between inline, inline-block, and block elements?
**A:** 
- **Block elements** (`div`, `p`, `h1-h6`): Take full width, start on a new line, can have width/height set.
- **Inline elements** (`span`, `a`, `strong`): Only take necessary width, don't start on new line, cannot set width/height.
- **Inline-block elements**: Behave like inline but allow width/height settings and respect margin/padding.

### Q7: Explain the difference between `position: relative`, `absolute`, `fixed`, and `sticky`.
**A:**
- **relative**: Positioned relative to its normal position. Other elements flow as if it were in normal position.
- **absolute**: Positioned relative to the nearest positioned ancestor (not static). Removed from document flow.
- **fixed**: Positioned relative to viewport. Stays in place during scrolling.
- **sticky**: Toggles between relative and fixed based on scroll position. Becomes fixed when reaching a specified threshold.

### Q8: What are CSS custom properties (variables) and how do you use them?
**A:** CSS variables store reusable values using `--variable-name` syntax and accessed with `var(--variable-name)`. They cascade and can be updated dynamically with JavaScript.

Example:
```css
:root {
  --primary-color: #3498db;
  --spacing: 1rem;
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing);
}
```

### Q9: Explain Flexbox and when to use it vs. CSS Grid.
**A:** 
- **Flexbox**: One-dimensional layout system (row OR column). Best for aligning items in a single direction, distributing space, and handling dynamic content.
- **CSS Grid**: Two-dimensional layout system (rows AND columns). Best for complex page layouts, precise positioning, and grid-based designs.

Use Flexbox for components and Grid for overall page layout.

### Q10: What is the Critical Rendering Path and how do you optimize it?
**A:** The CRP is the sequence of steps the browser takes to convert HTML, CSS, and JavaScript into pixels on screen. Optimization strategies:
- Minimize CSS blocking (inline critical CSS)
- Defer non-critical JavaScript
- Optimize image loading (lazy loading, proper formats)
- Reduce render-blocking resources
- Use efficient CSS selectors

### Q11: How do you center an element both horizontally and vertically?
**A:** Multiple approaches:

**Flexbox:**
```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**Grid:**
```css
.parent {
  display: grid;
  place-items: center;
}
```

**Position + Transform:**
```css
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### Q12: What are pseudo-classes and pseudo-elements? Provide examples.
**A:**
- **Pseudo-classes** select elements in specific states: `:hover`, `:focus`, `:nth-child()`, `:first-child`, `:last-child`, `:not()`, `:disabled`
- **Pseudo-elements** style specific parts of elements: `::before`, `::after`, `::first-line`, `::first-letter`, `::placeholder`

Example:
```css
/* Pseudo-class */
button:hover {
  background-color: blue;
}

/* Pseudo-element */
p::first-letter {
  font-size: 2em;
  font-weight: bold;
}
```

### Q13: Explain CSS containment and its performance benefits.
**A:** CSS `contain` property tells the browser to isolate an element's subtree for optimization:
- `layout`: Element's layout doesn't affect outside elements
- `style`: Styles won't leak out
- `paint`: Element won't paint outside bounds
- `size`: Element's size won't change

Example:
```css
.card {
  contain: layout style paint;
}
```

This improves rendering performance by limiting what the browser needs to recalculate.

### Q14: What is the difference between `em`, `rem`, `vh`, and `vw` units?
**A:**
- **em**: Relative to parent element's font-size
- **rem**: Relative to root element's font-size (html)
- **vh**: 1% of viewport height
- **vw**: 1% of viewport width

Use `rem` for consistent sizing, `em` for component-relative sizing, and viewport units for responsive designs.

### Q15: How do you create accessible forms?
**A:** Best practices:
- Use proper `<label>` elements associated with inputs via `for` attribute
- Add `aria-label` or `aria-labelledby` when labels aren't visible
- Include `required` and validation attributes
- Provide clear error messages
- Ensure keyboard navigation works
- Use appropriate input types (`email`, `tel`, `number`)
- Group related fields with `<fieldset>` and `<legend>`

Example:
```html
<form>
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required aria-describedby="email-error">
  <span id="email-error" role="alert"></span>
</form>
```

## SCSS (Sass)

### Q1: What are the benefits of using SCSS over regular CSS?
**A:** SCSS offers variables, nesting, mixins, functions, partials, and inheritance, making stylesheets more maintainable, reusable, and scalable.

### Q2: How do you manage global styles in a large project?
**A:** Use partials (files starting with `_`) to organize styles into modules (e.g., `_variables.scss`, `_mixins.scss`, `_buttons.scss`). Import them in a main file using `@import`.

### Q3: What is the difference between `@extend` and `@mixin`?
**A:**
- **@extend**: Inherits styles from another selector, creating shared classes. Good for similar components.
- **@mixin**: Reusable code blocks that can accept parameters. Better for complex patterns and flexibility.

Example:
```scss
// @extend
%button-base {
  padding: 10px 20px;
  border-radius: 4px;
}

.primary-button {
  @extend %button-base;
  background: blue;
}

// @mixin
@mixin button($bg-color, $text-color: white) {
  padding: 10px 20px;
  border-radius: 4px;
  background: $bg-color;
  color: $text-color;
}

.btn-primary {
  @include button(blue);
}
```

Prefer `@mixin` for better control and avoid excessive selector chaining with `@extend`.

### Q4: Explain SCSS nesting and its best practices.
**A:** Nesting allows writing selectors within other selectors, mirroring HTML structure. Best practices:
- Limit nesting depth to 3 levels maximum
- Use `&` to reference parent selector
- Avoid deeply nested selectors (reduces readability)
- Don't nest media queries unnecessarily

Example:
```scss
.navbar {
  display: flex;
  
  &__item {
    padding: 10px;
    
    &:hover {
      background: gray;
    }
    
    &--active {
      font-weight: bold;
    }
  }
}
```

### Q5: What are SCSS maps and how do you use them?
**A:** Maps store key-value pairs for organized data management. Useful for themes, breakpoints, and configuration.

Example:
```scss
$colors: (
  primary: #3498db,
  secondary: #2ecc71,
  danger: #e74c3c
);

$breakpoints: (
  sm: 576px,
  md: 768px,
  lg: 992px
);

@function color($key) {
  @return map-get($colors, $key);
}

.button {
  background: color(primary);
}

@mixin respond-to($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}

.container {
  @include respond-to(md) {
    max-width: 720px;
  }
}
```

### Q6: How do you handle vendor prefixes in SCSS?
**A:** Use autoprefixer post-processing instead of manual prefixes. If needed manually, create a mixin:

```scss
@mixin prefix($property, $value, $prefixes: webkit moz ms o) {
  @each $prefix in $prefixes {
    #{'-' + $prefix + '-' + $property}: $value;
  }
  #{$property}: $value;
}

.animated {
  @include prefix(transform, rotate(45deg));
  @include prefix(transition, all 0.3s ease);
}
```

However, modern build tools with Autoprefixer handle this automatically.

### Q7: What is the difference between `@import` and `@use` in modern Sass?
**A:** 
- **@import**: Legacy method, imports everything globally, can cause naming conflicts
- **@use**: Modern approach, creates namespaces, loads files only once, better modularity

Example:
```scss
// Old way
@import 'variables';
@import 'mixins';

// New way
@use 'variables' as *;
@use 'mixins' as m;

.button {
  background: $primary-color; // From variables
  @include m.responsive(); // From mixins namespace
}
```

`@use` is recommended for better maintainability and avoiding global scope pollution.

### Q8: How do you create a responsive grid system in SCSS?
**A:** Use loops and calculations to generate grid classes:

```scss
$grid-columns: 12;
$gutter: 1rem;

.grid {
  display: grid;
  gap: $gutter;
  grid-template-columns: repeat($grid-columns, 1fr);
}

@for $i from 1 through $grid-columns {
  .col-#{$i} {
    grid-column: span $i;
  }
}

// Responsive breakpoints
@mixin breakpoint($size) {
  @if $size == sm {
    @media (min-width: 576px) { @content; }
  } @else if $size == md {
    @media (min-width: 768px) { @content; }
  }
}

@include breakpoint(md) {
  .col-md-6 {
    grid-column: span 6;
  }
}
```

### Q9: Explain BEM methodology and how SCSS supports it.
**A:** BEM (Block Element Modifier) is a naming convention:
- **Block**: Standalone component (`.card`)
- **Element**: Part of a block (`.card__title`)
- **Modifier**: Variation (`.card--featured`)

SCSS nesting makes BEM easier:
```scss
.card {
  padding: 1rem;
  
  &__header {
    border-bottom: 1px solid #ddd;
  }
  
  &__title {
    font-size: 1.5rem;
  }
  
  &--featured {
    border: 2px solid gold;
  }
}
```

Compiles to `.card`, `.card__header`, `.card__title`, `.card--featured`.

### Q10: How do you optimize SCSS compilation performance?
**A:** Best practices:
- Use `@use` instead of `@import` to avoid duplicate imports
- Split code into logical partials
- Avoid deeply nested selectors (increases complexity)
- Use placeholder selectors (`%placeholder`) with `@extend` sparingly
- Implement tree-shaking by only importing needed modules
- Use Sass compiler caching
- Minimize function calls in loops

Example structure:
```
styles/
  _variables.scss
  _mixins.scss
  _functions.scss
  components/
    _buttons.scss
    _cards.scss
  main.scss (imports only what's needed)
```

## JavaScript

### Q1: Explain closures and their use cases.
**A:** A closure is a function that has access to its outer function's scope even after the outer function has returned. Useful for data privacy, callbacks, and creating private variables.

Example:
```javascript
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

### Q2: What is event delegation and why is it useful?
**A:** Event delegation attaches a single event listener to a parent element instead of individual child elements. It reduces memory usage and simplifies dynamic content handling.

Example:
```javascript
document.getElementById('parent').addEventListener('click', function(e) {
  if (e.target.classList.contains('child')) {
    console.log('Child clicked');
  }
});
```

### Q3: Explain the difference between `==` and `===`.
**A:** `==` performs type coercion before comparison, while `===` checks both value and type. Always prefer `===` to avoid unexpected behavior.

Example:
```javascript
console.log(1 == '1'); // true (type coercion)
console.log(1 === '1'); // false (different types)
```

### Q4: What is the difference between arrow functions and regular functions?
**A:** Arrow functions (`=>`) and regular functions have several key differences:

1. **`this` binding**: Arrow functions don't have their own `this` context; they inherit it from the enclosing scope. Regular functions have their own `this` based on how they're called.
2. **`arguments` object**: Arrow functions don't have access to the `arguments` object.
3. **Cannot be used as constructors**: Arrow functions cannot be instantiated with `new`.
4. **No `prototype` property**: Arrow functions don't have a prototype property.
5. **Syntax**: Arrow functions have a more concise syntax.

Example:
```javascript
// Regular function - has its own 'this'
function Person() {
  this.age = 0;
  
  setInterval(function growUp() {
    // In non-strict mode, growUp() defines 'this' as the global object
    this.age++; // Doesn't work as expected
  }, 1000);
}

// Arrow function - inherits 'this' from enclosing scope
function Person() {
  this.age = 0;
  
  setInterval(() => {
    // 'this' refers to the Person instance
    this.age++; // Works correctly
  }, 1000);
}

// Cannot use arrow function as constructor
const MyFunc = () => {};
const obj = new MyFunc(); // TypeError: MyFunc is not a constructor

// No arguments object in arrow functions
function regularFunc() {
  console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
}

const arrowFunc = () => {
  console.log(arguments); // ReferenceError: arguments is not defined
};

regularFunc(1, 2);
arrowFunc(1, 2);
```

Use arrow functions for callbacks and when you need lexical `this` binding. Use regular functions for methods, constructors, or when you need dynamic `this`.

### Q5: What are promises and how do they work?
**A:** Promises represent the eventual completion (or failure) of an asynchronous operation. They have three states: pending, fulfilled, rejected.

Example:
```javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Q6: Explain async/await and how it differs from promises.
**A:** Async/await is syntactic sugar built on top of promises that allows writing asynchronous code that looks synchronous. The `async` keyword marks a function as asynchronous, and `await` pauses execution until the promise settles.

Example:
```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

### Q7: What is the JavaScript event loop and how does it work?
**A:** The event loop is a single-threaded mechanism that monitors the call stack and callback queue. When the call stack is empty, it moves callbacks from the queue to the stack for execution. This enables non-blocking I/O operations despite JavaScript being single-threaded.

Example:
```javascript
console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('End');

// Output:
// Start
// End
// Promise
// Timeout
```

### Q8: Explain event propagation in JavaScript.
**A:** Event propagation describes how events travel through the DOM tree. There are two phases:
- Capturing phase: Event travels from window to target's parent
- Bubbling phase: Event bubbles up from target to window

Methods to control propagation:
- `event.stopPropagation()` - Stops propagation
- `event.stopImmediatePropagation()` - Stops propagation and prevents other listeners
- `event.preventDefault()` - Prevents default behavior

Example:
```javascript
// Capturing
document.getElementById('parent').addEventListener('click', handler, true);
// Bubbling
document.getElementById('child').addEventListener('click', handler, false);
```

## TypeScript

### Q1: What are the advantages of using TypeScript?
**A:** TypeScript adds static typing, interfaces, enums, generics, and better tooling support. It catches errors at compile time, improves code documentation, and enhances developer productivity.

### Q2: Explain TypeScript interfaces vs. types.
**A:** Interfaces are extensible and can be re-opened to add new properties. Types are not extensible but can be used for unions, intersections, and primitives.

Example:
```typescript
interface User {
  name: string;
  age: number;
}

type UserStatus = 'active' | 'inactive';
```

### Q3: How do you handle optional parameters in TypeScript?
**A:** Use the question mark (`?`) after the parameter name.

Example:
```typescript
function greet(name: string, greeting?: string): void {
  console.log(greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`);
}
```

### Q4: How do you type backend API integrations in TypeScript?
**A:** Typing backend APIs involves defining interfaces for request/response payloads and using them with fetch methods or HTTP clients.

Example:
```typescript
// Define API response types
interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Typing a fetch call
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const userData: ApiResponse<User> = await response.json();
  return userData.data;
}

// Typing POST request
interface CreateUserRequest {
  name: string;
  email: string;
  age?: number;
}

async function createUser(user: CreateUserRequest): Promise<User> {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
}
```

## Vue.js

### Q1: Explain Vue's reactivity system.
**A:** Vue 3 uses Proxies to make data reactive, replacing the getter/setter approach of Vue 2. This enables more efficient tracking of property access and allows reactivity on objects, arrays, and primitive values without limitations. The system tracks dependencies during template rendering and updates the DOM when data changes.

### Q2: What are Vue components and how do you create them?
**A:** Components are reusable UI elements with their own templates, logic, and styles. With Vue 3, you can create components using Options API or Composition API:

Options API:
```vue
<template>
  <div class="button">{{ label }}</div>
</template>

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
      this.clicked = true;
    }
  }
};
</script>
```

Composition API:
```vue
<template>
  <div class="button" @click="handleClick">{{ label }} - Clicked: {{ clicked }}</div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['label']);
const clicked = ref(false);

const handleClick = () => {
  clicked.value = true;
};
</script>
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
import { ref, onMounted } from 'vue';
import { useUser } from '@/composables/useUser';

const { user, loading, fetchUser } = useUser();

onMounted(() => {
  fetchUser();
});
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
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false
  }),
  getters: {
    isLoggedIn: (state) => !!state.user
  },
  actions: {
    async fetchUser() {
      this.loading = true;
      this.user = await api.getUser();
      this.loading = false;
    }
  }
});
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

```vue
<script setup>
import { ref, computed } from 'vue';

const email = ref('');
const password = ref('');

const errors = computed(() => {
  const err = {};
  if (!email.value) err.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(email.value)) err.email = 'Invalid email';
  
  if (!password.value) err.password = 'Password is required';
  else if (password.value.length < 8) err.password = 'Password must be at least 8 characters';
  
  return err;
});

const isValid = computed(() => Object.keys(errors.value).length === 0);
</script>
```


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
  const user = useCookie('user');
  if (!user.value) {
    return navigateTo('/login');
  }
});
```

Page-level middleware:
```vue
<script setup>
definePageMeta({
  middleware: ['auth']
});
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
});
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
  const response = await $fetch('/api/posts');
  return response.data;
});
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
      nuxt.options.css.push('~/assets/styles/global.css');
    }
  }
});
```

Use in `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '~/modules/my-module']
});
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


> **Note**: This document should be regularly updated to reflect current best practices and technology advancements.