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

## SCSS (Sass)

### Q6: What are the benefits of using SCSS over regular CSS?
**A:** SCSS offers variables, nesting, mixins, functions, partials, and inheritance, making stylesheets more maintainable, reusable, and scalable.

### Q7: How do you manage global styles in a large project?
**A:** Use partials (files starting with `_`) to organize styles into modules (e.g., `_variables.scss`, `_mixins.scss`, `_buttons.scss`). Import them in a main file using `@import`.

## JavaScript

### Q8: Explain closures and their use cases.
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

### Q9: What is event delegation and why is it useful?
**A:** Event delegation attaches a single event listener to a parent element instead of individual child elements. It reduces memory usage and simplifies dynamic content handling.

Example:
```javascript
document.getElementById('parent').addEventListener('click', function(e) {
  if (e.target.classList.contains('child')) {
    console.log('Child clicked');
  }
});
```

### Q10: Explain the difference between `==` and `===`.
**A:** `==` performs type coercion before comparison, while `===` checks both value and type. Always prefer `===` to avoid unexpected behavior.

Example:
```javascript
console.log(1 == '1'); // true (type coercion)
console.log(1 === '1'); // false (different types)
```

### Q11: What are promises and how do they work?
**A:** Promises represent the eventual completion (or failure) of an asynchronous operation. They have three states: pending, fulfilled, rejected.

Example:
```javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## TypeScript

### Q12: What are the advantages of using TypeScript?
**A:** TypeScript adds static typing, interfaces, enums, generics, and better tooling support. It catches errors at compile time, improves code documentation, and enhances developer productivity.

### Q13: Explain TypeScript interfaces vs. types.
**A:** Interfaces are extensible and can be re-opened to add new properties. Types are not extensible but can be used for unions, intersections, and primitives.

Example:
```typescript
interface User {
  name: string;
  age: number;
}

type UserStatus = 'active' | 'inactive';
```

### Q14: How do you handle optional parameters in TypeScript?
**A:** Use the question mark (`?`) after the parameter name.

Example:
```typescript
function greet(name: string, greeting?: string): void {
  console.log(greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`);
}
```

## Vue.js

### Q15: Explain Vue's reactivity system.
**A:** Vue 3 uses Proxies to make data reactive, replacing the getter/setter approach of Vue 2. This enables more efficient tracking of property access and allows reactivity on objects, arrays, and primitive values without limitations. The system tracks dependencies during template rendering and updates the DOM when data changes.

### Q16: What are Vue components and how do you create them?
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

### Q17: Explain Vue's Composition API and its advantages over Options API.
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

### Q18: What are Vue's lifecycle hooks in Composition API?
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

### Q19: How do you handle state management in Vue 3?
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

### Q20: What are Vue's new features in recent versions?
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

### Q21: How do you handle form validation in Vue 3?
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

### Q22: What is Nuxt.js and how does it differ from Vue.js?
**A:** Nuxt.js is a framework built on top of Vue.js that provides server-side rendering (SSR), static site generation (SSG), routing, and modular architecture out of the box. Nuxt 3 introduces several improvements over Nuxt 2:
- Nitro engine for universal deployment
- Native ES module support
- Auto-imports for composables
- Built-in TypeScript support
- Faster development startup with Vite or Webpack 5

### Q23: Explain Nuxt's page-based routing.
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

### Q24: What are Nuxt's middleware and how do you use them?
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

### Q25: How does Nuxt handle SSR and SSG in Nuxt 3?
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

### Q26: Explain Nuxt's composables and how they differ from Vue's composables.
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

### Q27: What are Nuxt modules and how do you create them?
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

### Q28: How do you optimize performance in Nuxt 3?
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