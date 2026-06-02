# Vue 2 to Vue 3 Migration Evaluation Guide

This guide provides a comprehensive framework for evaluating candidates' ability to migrate Vue 2 applications to Vue 3. It includes a practical component (`Vue2MigrationExample.vue`) that demonstrates all critical migration scenarios.

## Table of Contents

1. [Overview](#overview)
2. [Component Structure](#component-structure)
3. [Migration Sections](#migration-sections)
4. [Evaluation Criteria](#evaluation-criteria)
5. [Expected Solutions](#expected-solutions)

---

## Overview

The `Vue2MigrationExample.vue` component contains **15 critical migration scenarios** that test a candidate's understanding of:
- Breaking changes between Vue 2 and Vue 3
- Composition API patterns
- Modern Vue 3 best practices
- Common pitfalls and gotchas

---

## Component Structure

```
src/components/
└── Vue2MigrationExample.vue    # Main evaluation component with 15 sections
```

---

## Migration Sections

### Section 1: Options API → Composition API

**What to Look For:**
- Can the candidate convert `data()`, `methods`, `computed`, and `watch` to Composition API?
- Do they understand `ref()` vs `reactive()`?
- Can they properly use `setup()` or `<script setup>`?

**Vue 2 Code:**
```javascript
export default {
  data() {
    return {
      count: 0
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
```

**Vue 3 Solution:**
```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

const increment = () => count.value++
const decrement = () => count.value--
</script>
```

---

### Section 2: Reactivity System ($set/$delete)

**What to Look For:**
- Does the candidate know `$set` and `$delete` are removed in Vue 3?
- Can they explain why Vue 3 doesn't need these helpers?
- Do they understand Proxy-based reactivity?

**Vue 2 Code:**
```javascript
// Adding reactive property
this.$set(this.user, 'email', 'john@example.com')

// Removing reactive property
this.$delete(this.user, 'age')

// Array reactivity
this.$set(this.items, 0, 'Updated Item')
```

**Vue 3 Solution:**
```javascript
import { reactive } from 'vue'

const user = reactive({
  name: 'John Doe',
  age: 30
})

// Direct assignment works in Vue 3 (Proxy-based)
user.email = 'john@example.com'
delete user.age

// Array mutations are reactive
items[0] = 'Updated Item 1'
```

**Key Point:** Vue 3 uses Proxy instead of Object.defineProperty, enabling direct property addition/deletion.

---

### Section 3: Lifecycle Hooks Mapping

**What to Look For:**
- Can they map Vue 2 hooks to Vue 3 equivalents?
- Do they know the Composition API lifecycle imports?
- Understanding of hook naming changes

**Vue 2 → Vue 3 Mapping:**
```
beforeCreate  → setup()
created       → setup()
beforeMount   → onBeforeMount
mounted       → onMounted
beforeUpdate  → onBeforeUpdate
updated       → onUpdated
beforeDestroy → beforeUnmount  ← NAME CHANGE
destroyed     → unmounted      ← NAME CHANGE
activated     → onActivated
deactivated   → onDeactivated
errorCaptured → onErrorCaptured
```

**Vue 3 Solution:**
```vue
<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const lifecycleLog = ref('')
const componentStatus = ref('mounted')

onMounted(() => {
  lifecycleLog.value += 'mounted | '
  componentStatus.value = 'fully mounted'
})

onBeforeUnmount(() => {
  lifecycleLog.value += 'beforeUnmount | '
  cleanup()
})
</script>
```

---

### Section 4: Props & Emits (.sync Removal)

**What to Look For:**
- Knowledge that `.sync` modifier is removed
- Understanding of `v-model` argument syntax
- Proper emits declaration

**Vue 2 Code:**
```vue
<!-- Parent -->
<ChildComponent :title.sync="parentTitle" />

<!-- Child -->
<script>
export default {
  props: ['title'],
  methods: {
    updateTitle(value) {
      this.$emit('update:title', value)
    }
  }
}
</script>
```

**Vue 3 Solution:**
```vue
<!-- Parent - v-model with argument -->
<ChildComponent v-model:title="parentTitle" />

<!-- Child - explicit emits declaration -->
<script setup>
defineProps({
  title: String
})

const emit = defineEmits(['update:title'])

const updateTitle = (value) => {
  emit('update:title', value)
}
</script>
```

---

### Section 5: Filters Removal

**What to Look For:**
- Awareness that filters are completely removed in Vue 3
- Ability to convert filters to computed properties or methods
- Understanding of why filters were removed

**Vue 2 Code:**
```vue
<template>
  <p>{{ message | uppercase }}</p>
  <p>{{ price | currency }}</p>
  <p>{{ currentDate | dateFormat }}</p>
</template>

<script>
export default {
  filters: {
    uppercase(value) {
      return value.toUpperCase()
    },
    currency(value) {
      return `$${value.toFixed(2)}`
    },
    dateFormat(value) {
      return new Date(value).toLocaleDateString()
    }
  }
}
</script>
```

**Vue 3 Solution:**
```vue
<script setup>
import { computed } from 'vue'

const message = 'hello world'
const price = 99.99
const currentDate = new Date()

const uppercaseMessage = computed(() => message.toUpperCase())

const formatCurrency = (value) => `$${value.toFixed(2)}`
const formatDate = (date) => new Date(date).toLocaleDateString()
</script>

<template>
  <p>{{ uppercaseMessage }}</p>
  <p>{{ formatCurrency(price) }}</p>
  <p>{{ formatDate(currentDate) }}</p>
</template>
```

---

### Section 6: Event Bus ($on/$off/$emit)

**What to Look For:**
- Knowledge that event bus pattern is discouraged in Vue 3
- Familiarity with alternatives: mitt, provide/inject, or Pinia
- Understanding of why event bus was problematic

**Vue 2 Code:**
```javascript
// EventBus.js
import Vue from 'vue'
export const EventBus = new Vue()

// Component A - Emit
EventBus.$emit('custom-event', data)

// Component B - Listen
EventBus.$on('custom-event', (data) => {
  console.log(data)
})

// Cleanup
EventBus.$off('custom-event')
```

**Vue 3 Solution (Option 1: mitt):**
```javascript
// eventBus.js
import mitt from 'mitt'
export const emitter = mitt()

// Component A - Emit
emitter.emit('custom-event', data)

// Component B - Listen
import { onMounted, onUnmounted } from 'vue'
import { emitter } from './eventBus'

const handler = (data) => console.log(data)

onMounted(() => emitter.on('custom-event', handler))
onUnmounted(() => emitter.off('custom-event', handler))
```

**Vue 3 Solution (Option 2: provide/inject):**
```vue
<!-- Parent -->
<script setup>
import { provide, ref } from 'vue'

const sharedState = ref({})
provide('sharedState', sharedState)
</script>

<!-- Child -->
<script setup>
import { inject } from 'vue'
const sharedState = inject('sharedState')
</script>
```

---

### Section 7: Template Refs (this.$refs)

**What to Look For:**
- Conversion from `this.$refs` to `ref()` template refs
- Understanding of ref binding in Composition API
- Handling of null refs

**Vue 2 Code:**
```vue
<template>
  <input ref="inputRef" type="text" />
</template>

<script>
export default {
  methods: {
    focusInput() {
      this.$refs.inputRef.focus()
    },
    getInputValue() {
      return this.$refs.inputRef.value
    }
  }
}
</script>
```

**Vue 3 Solution:**
```vue
<script setup>
import { ref } from 'vue'

const inputRef = ref(null)

const focusInput = () => {
  inputRef.value?.focus()
}

const getInputValue = () => {
  return inputRef.value?.value
}
</script>

<template>
  <input ref="inputRef" type="text" />
</template>
```

---

### Section 8: Mixins → Composables

**What to Look For:**
- Understanding of mixin problems (naming conflicts, implicit dependencies)
- Ability to extract logic into composables
- Knowledge of composable naming conventions (use prefix)

**Vue 2 Code:**
```javascript
// mouseMixin.js
export default {
  data() {
    return {
      mousePosition: { x: 0, y: 0 }
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.handleMouseMove)
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  },
  methods: {
    handleMouseMove(event) {
      this.mousePosition.x = event.clientX
      this.mousePosition.y = event.clientY
    }
  }
}

// Component usage
import mouseMixin from './mouseMixin'

export default {
  mixins: [mouseMixin]
}
```

**Vue 3 Solution:**
```javascript
// useMouse.js - Composable
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const mousePosition = ref({ x: 0, y: 0 })

  const handleMouseMove = (event) => {
    mousePosition.value = {
      x: event.clientX,
      y: event.clientY
    }
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
  })

  return { mousePosition }
}

// Component usage
<script setup>
import { useMouse } from './composables/useMouse'

const { mousePosition } = useMouse()
</script>
```

---

### Section 9: Render Function Changes

**What to Look For:**
- Knowledge of `h` function signature change
- Understanding of vnode structure changes
- Ability to update render function syntax

**Vue 2 Code:**
```javascript
render(h) {
  return h(
    `h${this.level}`,
    {
      attrs: { id: `heading-${this.level}` },
      class: 'dynamic-heading',
      style: { color: '#42b883' }
    },
    [this.text]
  )
}
```

**Vue 3 Solution:**
```javascript
import { h } from 'vue'

// Vue 3: props object is flattened (no nested attrs/class/style)
render() {
  return h(
    `h${this.level}`,
    {
      id: `heading-${this.level}`,
      class: 'dynamic-heading',
      style: { color: '#42b883' }
    },
    this.text
  )
}
```

**Key Changes:**
- No `attrs` wrapper - attributes are direct properties
- `class` and `style` are regular props
- Children passed as third argument (not array for single child)

---

### Section 10: Custom Directives

**What to Look For:**
- Knowledge of directive hook name changes
- Understanding of simplified directive API
- Ability to update directive lifecycle hooks

**Vue 2 Directive Hooks:**
```
bind        → beforeMount
inserted    → mounted
update      → updated
componentUpdated → postUpdate
unbind      → beforeUnmount
```

**Vue 2 Code:**
```javascript
directives: {
  focus: {
    inserted(el) {
      el.focus()
    }
  },
  highlight: {
    bind(el, binding) {
      el.style.backgroundColor = binding.value
    },
    update(el, binding) {
      if (binding.value !== binding.oldValue) {
        el.style.backgroundColor = binding.value
      }
    }
  }
}
```

**Vue 3 Solution:**
```javascript
const vFocus = {
  mounted: (el) => el.focus()
}

const vHighlight = {
  beforeMount: (el, binding) => {
    el.style.backgroundColor = binding.value
  },
  updated: (el, binding) => {
    if (binding.value !== binding.oldValue) {
      el.style.backgroundColor = binding.value
    }
  }
}

// Or globally
app.directive('highlight', {
  beforeMount(el, binding) {
    el.style.backgroundColor = binding.value
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      el.style.backgroundColor = binding.value
    }
  }
})
```

---

### Section 11: Scoped Slots Syntax

**What to Look For:**
- Knowledge of slot syntax simplification
- Understanding of `v-slot` directive
- Ability to convert old slot syntax

**Vue 2 Code:**
```vue
<!-- Old syntax -->
<slot-component>
  <template slot-scope="{ item, index }">
    <span>Item {{ index + 1 }}: {{ item }}</span>
  </template>
</slot-component>

<!-- Alternative old syntax -->
<slot-component>
  <div slot="header" slot-scope="{ title }">
    {{ title }}
  </div>
</slot-component>
```

**Vue 3 Solution:**
```vue
<!-- Unified v-slot syntax with # shorthand -->
<slot-component>
  <template #default="{ item, index }">
    <span>Item {{ index + 1 }}: {{ item }}</span>
  </template>
</slot-component>

<!-- Named slots -->
<slot-component>
  <template #header="{ title }">
    {{ title }}
  </template>
</slot-component>
```

---

### Section 12: Transition Class Names

**What to Look For:**
- Knowledge of transition class name changes
- Understanding of CSS class naming convention updates

**Vue 2 Classes:**
```css
.fade-enter {}           /* Starting state */
.fade-enter-active {}    /* Active during enter */
.fade-enter-to {}        /* Ending state (2.1.8+) */
.fade-leave {}           /* Starting state */
.fade-leave-active {}    /* Active during leave */
.fade-leave-to {}        /* Ending state (2.1.8+) */
```

**Vue 3 Classes:**
```css
.fade-enter-from {}      /* CHANGED: enter → enter-from */
.fade-enter-active {}
.fade-enter-to {}
.fade-leave-from {}      /* CHANGED: leave → leave-from */
.fade-leave-active {}
.fade-leave-to {}
```

**Key Change:** `.fade-enter` → `.fade-enter-from`, `.fade-leave` → `.fade-leave-from`

---

### Section 13: Async Components

**What to Look For:**
- Knowledge of `defineAsyncComponent` helper
- Understanding of async component options changes
- Ability to handle loading/error states

**Vue 2 Code:**
```javascript
export default {
  components: {
    // Simple async component
    AsyncComponent: () => import('./AsyncExample.vue'),
    
    // With options
    AsyncWithOptions: () => ({
      component: import('./AsyncExample.vue'),
      loading: LoadingComponent,
      error: ErrorComponent,
      delay: 200,
      timeout: 3000
    })
  }
}
```

**Vue 3 Solution:**
```vue
<script setup>
import { defineAsyncComponent } from 'vue'

// Simple async component
const AsyncComponent = defineAsyncComponent(() => 
  import('./AsyncExample.vue')
)

// With options
const AsyncWithOptions = defineAsyncComponent({
  loader: () => import('./AsyncExample.vue'),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
})
</script>
```

---

### Section 14: Global API Changes

**What to Look For:**
- Understanding of app instance pattern
- Knowledge of global property registration changes
- Plugin installation migration

**Vue 2 Code:**
```javascript
import Vue from 'vue'

// Global property
Vue.prototype.$myGlobalProperty = 'global value'

// Global component
Vue.component('my-component', MyComponent)

// Plugin
Vue.use(MyPlugin)

// Directive
Vue.directive('my-directive', directiveDef)
```

**Vue 3 Solution:**
```javascript
import { createApp } from 'vue'

const app = createApp(App)

// Global property
app.config.globalProperties.$myGlobalProperty = 'global value'

// Global component
app.component('my-component', MyComponent)

// Plugin
app.use(MyPlugin)

// Directive
app.directive('my-directive', directiveDef)

app.mount('#app')
```

**Key Change:** Vue 3 uses app instance instead of mutating global Vue constructor.

---

### Section 15: Key Attribute on Templates

**What to Look For:**
- Knowledge that `key` can now be used on `<template>` with `v-for`
- Understanding of when to use key on template vs element

**Vue 2 Code:**
```vue
<!-- Had to put key on actual element -->
<div v-for="item in items" :key="item.id">
  <span>{{ item.name }}</span>
</div>

<!-- Multiple elements required wrapper with key -->
<div v-for="item in items" :key="item.id">
  <span>{{ item.name }}</span>
  <span>{{ item.description }}</span>
</div>
```

**Vue 3 Solution:**
```vue
<!-- Key can be on template -->
<template v-for="item in items" :key="item.id">
  <div>{{ item.name }}</div>
</template>

<!-- Cleaner without extra wrapper -->
<template v-for="item in items" :key="item.id">
  <span>{{ item.name }}</span>
  <span>{{ item.description }}</span>
</template>
```

---

## Evaluation Criteria

### Beginner Level (0-2 years Vue experience)
**Expected to identify:**
- ✅ Options API → Composition API basics
- ✅ Lifecycle hook name changes
- ✅ Filter removal and conversion
- ✅ Basic reactivity changes ($set/$delete)

**Red flags:**
- Cannot explain why `$set` is no longer needed
- Doesn't know lifecycle hook mapping
- Still uses filters in Vue 3 code

### Intermediate Level (2-4 years Vue experience)
**Expected to identify:**
- ✅ All beginner items plus:
- ✅ Mixins → Composables pattern
- ✅ Event bus alternatives
- ✅ .sync → v-model changes
- ✅ Template ref changes
- ✅ Custom directive hook updates

**Red flags:**
- Creates composables that look exactly like mixins
- Uses event bus pattern in Vue 3
- Doesn't declare emits in child components

### Advanced Level (4+ years Vue experience)
**Expected to identify:**
- ✅ All intermediate items plus:
- ✅ Render function signature changes
- ✅ Global API changes (createApp pattern)
- ✅ Performance implications of migration
- ✅ Tree-shaking benefits
- ✅ TypeScript integration improvements

**Red flags:**
- Cannot explain Proxy vs Object.defineProperty
- Doesn't understand tree-shaking benefits
- Cannot articulate when NOT to migrate

---

## Expected Solutions

### Complete Vue 3 Migration

See the companion file `Vue2MigrationExample.vue` for the original Vue 2 implementation. Candidates should be able to:

1. **Convert to `<script setup>` syntax**
2. **Replace all Vue 2 patterns with Vue 3 equivalents**
3. **Explain WHY each change is necessary**
4. **Identify potential breaking changes in their own codebases**
5. **Create a migration strategy for real projects**

### Sample Assessment Questions

1. **"Walk me through migrating Section 2 (Reactivity)"**
   - Should mention Proxy-based reactivity
   - Explain why `$set` is no longer needed
   - Show direct property assignment

2. **"How would you test this migrated component?"**
   - Should mention unit tests with Vitest/Jest
   - Component testing with Vue Test Utils
   - Checking reactivity edge cases

3. **"What would be your migration strategy for a large codebase?"**
   - Incremental migration approach
   - Using Vue 2/3 compatibility build
   - Prioritizing components by complexity
   - Testing strategy during migration

4. **"When would you NOT migrate to Vue 3?"**
   - Legacy browser requirements (IE11)
   - Critical dependencies without Vue 3 support
   - Stable production apps with no active development
   - Cost/benefit analysis considerations

---

## Additional Resources

- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/)
- [Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue 3 Breaking Changes](https://v3-migration.vuejs.org/breaking-changes/)

---

## Scoring Rubric

| Criteria | Poor (0) | Fair (1) | Good (2) | Excellent (3) |
|----------|----------|----------|----------|---------------|
| **Understanding of Breaking Changes** | Cannot identify major changes | Identifies some changes | Explains most changes clearly | Comprehensive understanding with examples |
| **Composition API Proficiency** | Stuck in Options API thinking | Basic composition usage | Comfortable with composables | Advanced patterns, custom composables |
| **Problem-Solving Approach** | Gives up on complex scenarios | Needs hints for solutions | Solves independently | Elegant solutions with best practices |
| **Code Quality** | Messy, inconsistent style | Working but not idiomatic | Clean, follows conventions | Production-ready, well-documented |
| **Explanation Ability** | Cannot articulate reasoning | Basic explanations | Clear explanations | Teaches concepts effectively |

**Total Score: /15**

- **0-5**: Needs significant Vue 3 training
- **6-10**: Capable with some guidance
- **11-13**: Strong Vue 3 developer
- **14-15**: Expert level, can lead migrations
