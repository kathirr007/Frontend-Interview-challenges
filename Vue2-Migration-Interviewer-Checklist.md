# Vue 2 to Vue 3 Migration - Interviewer Quick Reference

## Component Location
```
src/components/Vue2MigrationExample.vue
```

## 15 Migration Sections to Evaluate

### ✅ Section Checklist for Interviewers

Use this checklist during the interview to track candidate performance:

#### **Section 1: Options API → Composition API**
- [ ] Identifies `data()` → `ref()`/`reactive()`
- [ ] Converts `computed` to `computed()`
- [ ] Converts `methods` to regular functions
- [ ] Converts `watch` to `watch()`/`watchEffect()`
- [ ] Uses `<script setup>` syntax

**Key Question:** "What are the benefits of Composition API over Options API?"

**Expected Answer:** Better code organization, reusability through composables, better TypeScript support, logical grouping of related code.

---

#### **Section 2: Reactivity System ($set/$delete)**
- [ ] Knows `$set` and `$delete` are removed
- [ ] Explains Proxy-based reactivity
- [ ] Shows direct property assignment works
- [ ] Understands why Vue 2 needed these helpers

**Key Question:** "Why doesn't Vue 3 need `$set` anymore?"

**Expected Answer:** Vue 3 uses Proxy instead of Object.defineProperty, which can detect property additions/deletions automatically.

---

#### **Section 3: Lifecycle Hooks**
- [ ] Maps `beforeDestroy` → `beforeUnmount`
- [ ] Maps `destroyed` → `unmounted`
- [ ] Imports hooks from 'vue'
- [ ] Uses hooks in `setup()` or `<script setup>`

**Key Question:** "What happened to `beforeCreate` and `created`?"

**Expected Answer:** They're replaced by the `setup()` function itself, which runs at the same time.

---

#### **Section 4: Props & Emits (.sync removal)**
- [ ] Knows `.sync` is removed
- [ ] Uses `v-model:propName` syntax
- [ ] Declares emits with `defineEmits()`
- [ ] Explains multiple v-model support

**Key Question:** "How do you achieve two-way binding in Vue 3?"

**Expected Answer:** Use `v-model:title` (or any prop name) instead of `:title.sync`, and emit `update:title`.

---

#### **Section 5: Filters Removal**
- [ ] States filters are completely removed
- [ ] Converts to computed properties or methods
- [ ] Explains why filters were removed (confusion with methods)

**Key Question:** "How would you replace a currency filter?"

**Expected Answer:** Create a method `formatCurrency(value)` or use a library like Intl.NumberFormat.

---

#### **Section 6: Event Bus**
- [ ] Knows event bus pattern is discouraged
- [ ] Suggests mitt library
- [ ] Suggests provide/inject
- [ ] Suggests Pinia for state management
- [ ] Explains cleanup importance

**Key Question:** "What's wrong with event buses?"

**Expected Answer:** Hard to trace data flow, memory leaks if not cleaned up, debugging difficulties, breaks unidirectional data flow.

---

#### **Section 7: Template Refs**
- [ ] Converts `this.$refs` to `ref(null)`
- [ ] Binds ref in template with same name
- [ ] Handles null checks (`?.` operator)
- [ ] Accesses value via `.value`

**Key Question:** "How do you access a DOM element in Composition API?"

**Expected Answer:** Create a ref with `ref(null)`, bind it in template, access via `refName.value`.

---

#### **Section 8: Mixins → Composables**
- [ ] Identifies mixin problems (naming conflicts)
- [ ] Creates composable function with `use` prefix
- [ ] Returns reactive state from composable
- [ ] Uses lifecycle hooks in composable
- [ ] Explains explicit dependencies

**Key Question:** "What are the problems with mixins?"

**Expected Answer:** Naming conflicts, implicit dependencies, unclear data sources, hard to trace logic.

---

#### **Section 9: Render Function**
- [ ] Knows `h` function signature changed
- [ ] Removes `attrs` wrapper
- [ ] Flattens props object
- [ ] Imports `h` from 'vue'

**Key Question:** "What changed in the render function?"

**Expected Answer:** Props are flattened (no nested attrs/class/style), children passed directly.

---

#### **Section 10: Custom Directives**
- [ ] Maps hook names correctly
- [ ] Uses arrow functions or regular functions
- [ ] Registers globally with `app.directive()`
- [ ] Knows simplified API

**Key Question:** "What directive hooks changed?"

**Expected Answer:** `bind` → `beforeMount`, `inserted` → `mounted`, `update` → `updated`, `unbind` → `beforeUnmount`.

---

#### **Section 11: Scoped Slots**
- [ ] Uses `v-slot` or `#` shorthand
- [ ] Removes `slot-scope` attribute
- [ ] Understands unified slot syntax
- [ ] Handles named slots correctly

**Key Question:** "How do you use scoped slots in Vue 3?"

**Expected Answer:** Use `<template #default="{ item }">` or `<template v-slot:default="{ item }">`.

---

#### **Section 12: Transition Classes**
- [ ] Changes `.fade-enter` to `.fade-enter-from`
- [ ] Changes `.fade-leave` to `.fade-leave-from`
- [ ] Keeps `-active` and `-to` classes the same

**Key Question:** "Which transition classes changed?"

**Expected Answer:** `-enter` → `-enter-from`, `-leave` → `-leave-from`.

---

#### **Section 13: Async Components**
- [ ] Uses `defineAsyncComponent()`
- [ ] Imports from 'vue'
- [ ] Handles loading/error states
- [ ] Knows options structure changed

**Key Question:** "How do you define async components in Vue 3?"

**Expected Answer:** Use `defineAsyncComponent(() => import('./Component.vue'))` with optional options object.

---

#### **Section 14: Global API**
- [ ] Uses `createApp()` instead of global Vue
- [ ] Registers plugins with `app.use()`
- [ ] Sets global properties on `app.config.globalProperties`
- [ ] Explains tree-shaking benefits

**Key Question:** "Why did Vue 3 change the global API?"

**Expected Answer:** Better tree-shaking, multiple app instances, no global state pollution, better TypeScript support.

---

#### **Section 15: Key on Templates**
- [ ] Knows key can be on `<template>`
- [ ] Understands when to use it
- [ ] Cleaner code without extra wrappers

**Key Question:** "What changed about keys with v-for?"

**Expected Answer:** Can now put `:key` directly on `<template>` tags with `v-for`.

---

## Scoring Guide

### Quick Assessment (5 minutes per section)

**Pass Criteria:**
- ✅ Correctly identifies the breaking change
- ✅ Provides working Vue 3 solution
- ✅ Explains the reasoning

**Red Flags:**
- ❌ Still uses Vue 2 patterns
- ❌ Cannot explain why change is needed
- ❌ Solutions have bugs or anti-patterns

### Time Allocation

| Level | Total Time | Focus Areas |
|-------|-----------|-------------|
| Junior | 30-45 min | Sections 1-5, basic understanding |
| Mid-Level | 45-60 min | Sections 1-10, practical migration |
| Senior | 60-90 min | All sections, strategy & architecture |

---

## Common Interview Questions

### Strategic Questions

1. **"Would you migrate a large production app to Vue 3? Why/why not?"**
   - Look for: Risk assessment, cost-benefit analysis, incremental approach

2. **"What's your migration strategy for a 100+ component app?"**
   - Look for: Prioritization, testing strategy, compatibility build usage

3. **"How do you handle third-party libraries that don't support Vue 3?"**
   - Look for: Alternatives research, wrapper components, contribution plans

4. **"What are the biggest benefits of Vue 3?"**
   - Look for: Performance, composition API, TypeScript, tree-shaking

### Technical Deep-Dive Questions

1. **"Explain Proxy vs Object.defineProperty"**
   - Should mention: Property detection, performance, limitations

2. **"When would you use `ref()` vs `reactive()`?"**
   - Should mention: Primitive vs object, destructuring, reassignment

3. **"How does tree-shaking work in Vue 3?"**
   - Should mention: ES modules, unused imports removed, smaller bundles

4. **"What's the difference between `watch` and `watchEffect`?"**
   - Should mention: Explicit dependencies, lazy vs immediate, return value

---

## Practical Exercise Ideas

### Exercise 1: Live Migration (30 minutes)
Give candidate a small Vue 2 component and ask them to migrate it live.

**Sample Component:**
```vue
<!-- Vue 2 -->
<template>
  <div>
    <p>{{ message | uppercase }}</p>
    <button @click="count++">{{ count }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return { count: 0, message: 'hello' }
  },
  filters: {
    uppercase(v) { return v.toUpperCase() }
  }
}
</script>
```

### Exercise 2: Debug Migration Issues (20 minutes)
Show broken Vue 3 code and ask candidate to fix it.

**Common Bugs:**
- Forgetting `.value` on refs
- Using `$set` in Vue 3
- Old lifecycle hook names
- Missing emit declarations

### Exercise 3: Architecture Discussion (15 minutes)
"How would you structure a new Vue 3 project differently from Vue 2?"

**Look for:**
- Composables folder structure
- TypeScript integration
- Pinia instead of Vuex
- Vite instead of webpack

---

## Evaluation Matrix

| Skill Area | Weight | What to Assess |
|------------|--------|----------------|
| **Technical Knowledge** | 30% | Understanding of breaking changes |
| **Problem Solving** | 25% | Approach to migration challenges |
| **Code Quality** | 20% | Clean, idiomatic Vue 3 code |
| **Communication** | 15% | Clear explanations, teaches concepts |
| **Best Practices** | 10% | Modern patterns, performance awareness |

---

## Decision Framework

### Hire If:
- ✅ Scores 11+ out of 15 on rubric
- ✅ Demonstrates systematic thinking
- ✅ Asks clarifying questions
- ✅ Shows learning mindset

### Consider If:
- ⚠️ Scores 8-10 out of 15
- ⚠️ Strong in some areas, weak in others
- ⚠️ Needs mentoring but shows potential

### Pass If:
- ❌ Scores below 8 out of 15
- ❌ Resistant to new patterns
- ❌ Cannot explain fundamental concepts
- ❌ Poor problem-solving approach

---

## Follow-Up Actions

### For Successful Candidates:
1. Assign real migration task as trial project
2. Pair programming session on actual codebase
3. Review their migration documentation skills

### For Borderline Candidates:
1. Provide Vue 3 resources for self-study
2. Schedule follow-up interview after 2 weeks
3. Assign smaller migration exercise

### For Unsuccessful Candidates:
1. Provide constructive feedback
2. Suggest specific areas for improvement
3. Offer to reconnect after skill development

---

## Resources to Share with Candidates

- [Official Vue 3 Migration Guide](https://v3-migration.vuejs.org/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Composition API Cheatsheet](https://vuejs.org/guide/extras/composition-api-faq.html)
- [VueUse Composables Library](https://vueuse.org/)

---

## Notes Section

Use this space during interviews to record observations:

**Candidate Name:** _______________________

**Date:** _______________________

**Position Level:** □ Junior □ Mid □ Senior

**Strengths:**
- 
- 
- 

**Areas for Improvement:**
- 
- 
- 

**Overall Impression:**

**Recommendation:** □ Hire □ Consider □ Pass

**Next Steps:**

