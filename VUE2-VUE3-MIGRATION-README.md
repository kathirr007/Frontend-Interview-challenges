# Vue 2 to Vue 3 Migration Evaluation System

## Overview

This evaluation system provides **TWO different approaches** for assessing candidates' ability to migrate Vue 2 applications to Vue 3:

1. **Vue2MigrationExample.vue** - Educational component showing all patterns side-by-side
2. **LegacyVue2Component.vue** - Pure Vue 2 component that BREAKS in Vue 3 (realistic migration scenario)

---

## File Structure

```
Frontend-Interview-challenges/
├── src/components/
│   ├── LegacyVue2Component.vue       # 🔴 PURE VUE 2 - BREAKS IN VUE 3
│   ├── Vue2MigrationExample.vue      # 🟡 EDUCATIONAL - Shows both versions
│   └── AsyncExample.vue               # Supporting async component
├── Vue2-Migration-Evaluation-Guide.md # Comprehensive migration guide
├── Vue2-Migration-Interviewer-Checklist.md # Quick reference for interviewers
└── VUE2-VUE3-MIGRATION-README.md     # This file - system overview
```

---

## Component Comparison

### 🔴 **LegacyVue2Component.vue** (NEW - Realistic Test)

**Purpose:** A pure Vue 2 component that works perfectly in Vue 2 but **will break** when run in Vue 3.

**Characteristics:**
- ✅ Uses `export default { ... }` (Options API only)
- ✅ Uses `new Vue()` for event bus
- ✅ Uses `$set` and `$delete`
- ✅ Uses Vue 2 filters (`| uppercase`)
- ✅ Uses `.sync` modifier
- ✅ Uses Vue 2 lifecycle hooks (`beforeDestroy`, `destroyed`)
- ✅ Uses Vue 2 directive hooks (`bind`, `inserted`, `update`)
- ✅ Uses old slot syntax (`slot-scope`)
- ✅ Uses Vue 2 transition classes (`.slide-enter`)
- ✅ Uses Vue 2 render function signature
- ✅ Accesses `this.$refs`, `this.$apiUrl` (global properties)
- ✅ Uses mixins pattern

**What Happens in Vue 3:**
❌ **Filters** → Runtime error (filters removed)  
❌ **$set/$delete** → Runtime error (methods don't exist)  
❌ **.sync** → Warning (deprecated, use v-model)  
❌ **beforeDestroy/destroyed** → Hooks never called (renamed)  
❌ **Event Bus** → Error (Vue constructor doesn't exist)  
❌ **Directive hooks** → Won't work (names changed)  
❌ **Transition classes** → Animation breaks (class names changed)  
❌ **Global properties** → Undefined (different registration)  

**Best For:** 
- Testing if candidates can identify breaking changes
- Simulating real migration scenarios
- Assessing practical debugging skills

---

### 🟡 **Vue2MigrationExample.vue** (Educational Reference)

**Purpose:** An educational component that demonstrates all 15 migration scenarios with explanations.

**Characteristics:**
- Uses `defineComponent` wrapper (compatible with both Vue 2.7+ and Vue 3)
- Contains inline comments explaining each section
- Shows Vue 2 patterns alongside Vue 3 solutions
- More verbose for learning purposes
- Includes detailed documentation references

**Best For:**
- Teaching migration concepts
- Self-study and preparation
- Understanding the "why" behind changes
- Reference during interviews

---

## How to Use Each Component

### Scenario 1: Practical Migration Test (Use LegacyVue2Component.vue)

**Setup:**
```bash
# Give candidate the legacy component
cp LegacyVue2Component.vue candidate-workspace/

# Ask them to make it work in Vue 3
```

**Instructions to Candidate:**
```
"This is a Vue 2 component from our legacy codebase. It works perfectly 
in Vue 2, but we're migrating to Vue 3 and it's broken. 

Your task:
1. Identify all the breaking changes
2. Migrate it to work in Vue 3
3. Explain each change you make
4. Ensure all functionality still works

You have 60 minutes."
```

**What to Evaluate:**
- Can they identify ALL breaking changes?
- Do they understand WHY each change is needed?
- Is their migrated code idiomatic Vue 3?
- Do they use Composition API or stick with Options API?
- How do they handle edge cases?

---

### Scenario 2: Guided Learning (Use Vue2MigrationExample.vue)

**Setup:**
```bash
# Open the educational component together
# Walk through each section
```

**Instructions to Candidate:**
```
"This component demonstrates 15 common Vue 2 to Vue 3 migration scenarios.
Let's go through each section and discuss:
1. What's the Vue 2 pattern?
2. Why did it change in Vue 3?
3. What's the Vue 3 equivalent?
4. What are the benefits?"
```

**What to Evaluate:**
- Conceptual understanding
- Ability to explain trade-offs
- Knowledge of best practices
- Awareness of performance implications

---

### Scenario 3: Hybrid Approach (Recommended)

**Phase 1: Discovery (15 min)**
- Show `LegacyVue2Component.vue`
- Ask: "What will break in Vue 3?"
- List all issues without fixing

**Phase 2: Migration (30 min)**
- Candidate migrates the component
- Can reference `Vue2MigrationExample.vue` if stuck
- Focus on making it work correctly

**Phase 3: Optimization (15 min)**
- "How would you improve this using Vue 3 features?"
- Discuss Composition API conversion
- Talk about composables, better patterns

---

## Detailed Breaking Changes in LegacyVue2Component.vue

### 🔴 Critical Errors (Won't Run)

#### 1. Filters (Line ~280-290)
```vue
<!-- Vue 2 -->
<p>{{ message | uppercase }}</p>

filters: {
  uppercase(value) {
    return value.toUpperCase()
  }
}
```
**Vue 3 Error:** `[Vue warn]: Failed to resolve filter: uppercase`

**Fix:** Convert to computed property or method

---

#### 2. $set / $delete (Line ~340-350)
```javascript
// Vue 2
this.$set(this.userProfile, 'email', 'john@example.com')
this.$delete(this.userProfile, 'age')
```
**Vue 3 Error:** `TypeError: this.$set is not a function`

**Fix:** Direct assignment (Proxy-based reactivity)

---

#### 3. Event Bus with new Vue() (Line ~170-190)
```javascript
// Vue 2
const EventBus = new Vue({ ... })
```
**Vue 3 Error:** `ReferenceError: Vue is not defined`

**Fix:** Use mitt library or provide/inject

---

#### 4. Lifecycle Hook Names (Line ~320-330)
```javascript
// Vue 2
beforeDestroy() { ... }
destroyed() { ... }
```
**Vue 3 Issue:** Hooks never called (silently ignored)

**Fix:** Rename to `beforeUnmount` and `unmounted`

---

### ⚠️ Warnings & Deprecated Features

#### 5. .sync Modifier (Line ~250)
```vue
<!-- Vue 2 -->
<child-input :value.sync="inputValue" />
```
**Vue 3 Warning:** `[Vue warn]: .sync modifier is deprecated`

**Fix:** Use `v-model:value="inputValue"`

---

#### 6. Directive Hook Names (Line ~390-405)
```javascript
// Vue 2
directives: {
  highlight: {
    bind(el, binding) { ... },
    update(el, binding) { ... }
  }
}
```
**Vue 3 Issue:** Hooks won't be called correctly

**Fix:** Rename to `beforeMount` and `updated`

---

#### 7. Transition Classes (CSS, Line ~440-450)
```css
/* Vue 2 */
.slide-enter { ... }
.slide-leave { ... }
```
**Vue 3 Issue:** Animation won't work (classes don't match)

**Fix:** Rename to `.slide-enter-from` and `.slide-leave-from`

---

#### 8. Render Function Signature (Line ~230-240)
```javascript
// Vue 2
render(h) {
  return h('h1', {
    attrs: { id: 'heading' },
    class: 'title',
    style: { color: 'red' }
  }, [text])
}
```
**Vue 3 Issue:** Works but uses deprecated structure

**Fix:** Flatten props object (no nested attrs/class/style)

---

#### 9. Old Slot Syntax (Line ~270)
```vue
<!-- Vue 2 -->
<template slot-scope="{ item, index }">
```
**Vue 3 Warning:** `[Vue warn]: slot-scope is deprecated`

**Fix:** Use `v-slot` or `#` shorthand

---

#### 10. Global Properties (Line ~310-315)
```javascript
// Vue 2
this.apiUrl = this.$apiUrl
```
**Vue 3 Issue:** Property is undefined

**Fix:** Access via `app.config.globalProperties` or inject

---

### 📋 Complete Checklist for Candidates

Give this checklist to candidates to track their progress:

```markdown
## Migration Checklist

### Critical Fixes (Must Fix)
- [ ] Remove filters, convert to methods/computed
- [ ] Replace $set/$delete with direct assignment
- [ ] Replace Event Bus (new Vue) with mitt/provide-inject
- [ ] Rename beforeDestroy → beforeUnmount
- [ ] Rename destroyed → unmounted

### Warnings (Should Fix)
- [ ] Replace .sync with v-model
- [ ] Update directive hook names
- [ ] Update transition class names
- [ ] Modernize render function
- [ ] Update slot syntax
- [ ] Fix global property access

### Optional Improvements
- [ ] Convert to Composition API
- [ ] Extract mixins to composables
- [ ] Add TypeScript
- [ ] Optimize reactivity
- [ ] Add proper error handling
```

---

## Interview Questions by Component

### For LegacyVue2Component.vue

**Discovery Phase:**
1. "Without running it, what do you think will break in Vue 3?"
2. "How many breaking changes can you identify?"
3. "Which changes are critical vs. just warnings?"

**Migration Phase:**
4. "Walk me through your migration strategy"
5. "Why does Vue 3 remove filters?"
6. "How does Proxy-based reactivity differ from Object.defineProperty?"

**Optimization Phase:**
7. "Would you keep Options API or convert to Composition API? Why?"
8. "How would you test this after migration?"
9. "What performance improvements does Vue 3 offer here?"

---

### For Vue2MigrationExample.vue

**Conceptual Questions:**
1. "Explain the benefit of composables over mixins"
2. "When would you use ref() vs reactive()?"
3. "Why did Vue 3 change the global API?"

**Deep Dive:**
4. "Show me how you'd extract the mouse tracking logic into a composable"
5. "How would you handle this component with TypeScript?"
6. "What are the tree-shaking benefits of Vue 3's architecture?"

---

## Scoring Rubric (Updated)

### Using LegacyVue2Component.vue

| Criteria | Points | Details |
|----------|--------|---------|
| **Identifies All Breaking Changes** | 0-3 | Found all 10+ issues |
| **Correct Migration** | 0-3 | All fixes work correctly |
| **Understanding of Why** | 0-2 | Explains reasoning clearly |
| **Code Quality** | 0-1 | Clean, idiomatic Vue 3 |
| **Testing Approach** | 0-1 | Has plan to verify functionality |

**Total: /10**
- 9-10: Expert
- 7-8: Strong
- 5-6: Competent
- <5: Needs training

---

## Time Estimates

| Task | Junior | Mid-Level | Senior |
|------|--------|-----------|--------|
| **Identify Issues** | 15 min | 10 min | 5 min |
| **Fix Critical Errors** | 30 min | 20 min | 10 min |
| **Fix Warnings** | 20 min | 15 min | 10 min |
| **Optional Improvements** | N/A | 15 min | 20 min |
| **Total** | 65 min | 60 min | 45 min |

---

## Common Mistakes to Watch For

### ❌ Red Flags

1. **Misses filters removal**
   - Doesn't realize filters are completely gone
   - Tries to import them from somewhere

2. **Keeps using $set/$delete**
   - Doesn't understand Proxy-based reactivity
   - Thinks it's still needed for arrays

3. **Uses event bus in Vue 3**
   - Creates new Vue() instance anyway
   - Doesn't know about mitt or provide/inject

4. **Doesn't rename lifecycle hooks**
   - Keeps beforeDestroy/destroyed
   - Component cleanup never runs

5. **Sticks with Options API unnecessarily**
   - Misses opportunity to use Composition API
   - Doesn't see benefits of composables

### ✅ Green Flags

1. **Systematic approach**
   - Lists all issues first
   - Prioritizes critical fixes
   - Tests as they go

2. **Explains reasoning**
   - Knows WHY changes were made
   - Understands trade-offs
   - Can teach concepts

3. **Modern patterns**
   - Suggests Composition API
   - Mentions composables
   - Considers TypeScript

4. **Testing mindset**
   - Asks about test coverage
   - Plans verification steps
   - Considers edge cases

---

## Sample Solutions

### Quick Fix (Keep Options API)

Minimal changes to make it work in Vue 3 while keeping Options API:

```vue
<script>
import { defineComponent } from 'vue'
import mitt from 'mitt'

const emitter = mitt()

export default defineComponent({
  name: 'MigratedComponent',
  
  // Keep Options API structure
  data() {
    return {
      count: 0,
      // ... other data
    }
  },
  
  computed: {
    doubleCount() {
      return this.count * 2
    },
    
    // Replace filters with computed
    uppercaseMessage() {
      return this.message.toUpperCase()
    }
  },
  
  // Rename lifecycle hooks
  beforeUnmount() {
    this.cleanup()
  },
  
  unmounted() {
    this.lifecycleStatus = 'unmounted'
  },
  
  methods: {
    // Direct assignment instead of $set
    addEmail() {
      this.userProfile.email = 'john@example.com'
    },
    
    // Direct deletion instead of $delete
    removeAge() {
      delete this.userProfile.age
    },
    
    // Use mitt instead of Vue event bus
    setupEventBus() {
      emitter.on('custom-event', (data) => {
        this.messages.push(`Received: ${data}`)
      })
    }
  },
  
  // Update directive hooks
  directives: {
    highlight: {
      beforeMount(el, binding) {
        el.style.backgroundColor = binding.value
      },
      updated(el, binding) {
        if (binding.value !== binding.oldValue) {
          el.style.backgroundColor = binding.value
        }
      }
    }
  }
})
</script>

<template>
  <!-- Replace filters with computed -->
  <p>{{ uppercaseMessage }}</p>
  
  <!-- Replace .sync with v-model -->
  <child-input v-model:value="inputValue" />
  
  <!-- Update transition classes -->
  <transition name="slide">
    <div v-if="showBox">Content</div>
  </transition>
</template>

<style>
/* Update transition class names */
.slide-enter-from { transform: translateX(-100%); }
.slide-leave-from { transform: translateX(0); }
</style>
```

### Full Migration (Composition API)

Complete refactor to modern Vue 3 patterns:

```vue
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useMouse } from '@/composables/useMouse'
import { useEventBus } from '@/composables/useEventBus'

// Reactivity (no $set/$delete needed)
const count = ref(0)
const userProfile = ref({
  name: 'John Doe',
  age: 30
})

// Computed (replaces filters)
const doubleCount = computed(() => count.value * 2)
const uppercaseMessage = computed(() => message.value.toUpperCase())

// Composables (replaces mixins)
const { mouseX, mouseY } = useMouse()
const { messages, sendMessage, clearMessages } = useEventBus()

// Methods
const increment = () => count.value++
const addEmail = () => {
  userProfile.value.email = 'john@example.com'
}

// Lifecycle (renamed hooks)
onMounted(() => {
  console.log('Mounted')
})

onBeforeUnmount(() => {
  console.log('Cleanup')
})
</script>

<template>
  <p>{{ uppercaseMessage }}</p>
  <child-input v-model:value="inputValue" />
</template>
```

---

## Additional Resources

### For Candidates
- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/)
- [Breaking Changes List](https://v3-migration.vuejs.org/breaking-changes/)
- [Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html)

### For Interviewers
- [Vue 3 Documentation](https://vuejs.org/)
- [Migration Build Tool](https://v3-migration.vuejs.org/migration-build.html)
- [Vue Codemod (Automated)](https://github.com/vuejs/vue-codemod)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1.0 | 2026-06-02 | Added LegacyVue2Component.vue for realistic testing |
| 1.0.0 | 2026-06-02 | Initial release with Vue2MigrationExample.vue |

---

## Feedback & Contributions

If you use this evaluation system, please share:
- Which component worked better for your interviews?
- What breaking changes did candidates struggle with most?
- Any additional scenarios we should add?

---

**Last Updated:** June 2, 2026  
**Components:** 2 (Legacy + Educational)  
**Breaking Changes Covered:** 15+  
**Difficulty Levels:** Beginner to Advanced
