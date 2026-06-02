# Vue 2 to Vue 3 Migration - Quick Start Guide

## 🎯 What You Get

You now have **TWO complementary components** for evaluating Vue 2 → Vue 3 migration skills:

### 1. 🔴 **LegacyVue2Component.vue** (Realistic Test)
- **Pure Vue 2 code** that works in Vue 2 but **BREAKS in Vue 3**
- Contains **15+ breaking changes** that candidates must identify and fix
- Simulates real-world migration scenarios
- Perfect for practical coding assessments

### 2. 🟡 **Vue2MigrationExample.vue** (Educational Reference)
- Shows all migration patterns with explanations
- Documents Vue 2 vs Vue 3 side-by-side
- Includes solutions and best practices
- Perfect for teaching and preparation

---

## 🚀 Quick Start for Interviewers

### Option A: Practical Test (Recommended)

```bash
# Step 1: Give candidate the legacy component
cp src/components/LegacyVue2Component.vue ./candidate-assessment/

# Step 2: Instructions
"Here's a Vue 2 component from our legacy codebase. 
It works in Vue 2 but breaks in Vue 3.
You have 60 minutes to:
1. Identify all breaking changes
2. Migrate it to Vue 3
3. Explain your changes"

# Step 3: Evaluate using checklist
# See: Vue2-Migration-Interviewer-Checklist.md
```

**What to look for:**
- ✅ Identifies filters removal
- ✅ Replaces $set/$delete
- ✅ Fixes lifecycle hook names
- ✅ Updates event bus pattern
- ✅ Modernizes directives/transitions

---

### Option B: Guided Discussion

```bash
# Open both components side by side
# Walk through each section together
```

**Discussion points:**
- "What's different between these two approaches?"
- "Why did Vue 3 make this change?"
- "What are the benefits of the new pattern?"

---

## 📋 Breaking Changes Checklist

Give this to candidates or use it for evaluation:

```markdown
## Critical Errors (Won't Run in Vue 3)

- [ ] Filters removed (| uppercase, | currency, etc.)
- [ ] $set() / $delete() methods removed
- [ ] Event Bus with `new Vue()` doesn't work
- [ ] Lifecycle hooks renamed (beforeDestroy → beforeUnmount)
- [ ] Global Vue API changed (Vue.prototype → app.config)

## Warnings (Deprecated but May Work)

- [ ] .sync modifier replaced by v-model
- [ ] Directive hooks renamed (bind → beforeMount)
- [ ] Transition classes renamed (.enter → .enter-from)
- [ ] Old slot syntax (slot-scope → v-slot)
- [ ] Render function structure changed

## Optional Improvements

- [ ] Convert Options API → Composition API
- [ ] Replace mixins with composables
- [ ] Add TypeScript
- [ ] Optimize reactivity usage
```

---

## ⏱️ Time Estimates

| Candidate Level | Discovery | Migration | Testing | Total |
|----------------|-----------|-----------|---------|-------|
| **Junior** | 15 min | 40 min | 10 min | 65 min |
| **Mid-Level** | 10 min | 30 min | 10 min | 50 min |
| **Senior** | 5 min | 20 min | 10 min | 35 min |

---

## 🎓 Sample Solutions

### Minimal Fix (Keep Options API)

Just fix what's broken, keep the same structure:

```vue
<script>
import { defineComponent } from 'vue'
import mitt from 'mitt'

const emitter = mitt()

export default defineComponent({
  // Keep data(), computed:, methods: structure
  
  computed: {
    // Replace filters with computed properties
    uppercaseMessage() {
      return this.message.toUpperCase()
    }
  },
  
  // Rename lifecycle hooks
  beforeUnmount() { /* was beforeDestroy */ },
  unmounted() { /* was destroyed */ },
  
  methods: {
    // Direct assignment instead of $set
    addEmail() {
      this.userProfile.email = 'john@example.com'
    }
  }
})
</script>

<template>
  <!-- Replace filters -->
  <p>{{ uppercaseMessage }}</p>
  
  <!-- Replace .sync -->
  <child-input v-model:value="inputValue" />
</template>
```

### Full Migration (Composition API)

Modern Vue 3 approach:

```vue
<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { useMouse } from '@/composables/useMouse'
import { useEventBus } from '@/composables/useEventBus'

// Reactivity
const count = ref(0)
const userProfile = ref({ name: 'John', age: 30 })

// Computed (replaces filters)
const uppercaseMessage = computed(() => message.value.toUpperCase())

// Composables (replaces mixins)
const { mouseX, mouseY } = useMouse()

// Methods
const increment = () => count.value++
const addEmail = () => {
  userProfile.value.email = 'john@example.com' // No $set needed!
}

// Lifecycle
onBeforeUnmount(() => {
  cleanup()
})
</script>
```

---

## 📊 Evaluation Rubric

### Scoring (out of 10)

| Criteria | Points | What to Look For |
|----------|--------|------------------|
| **Identifies Issues** | 0-3 | Found all 10+ breaking changes |
| **Correct Fixes** | 0-3 | All changes work correctly |
| **Understanding** | 0-2 | Explains WHY changes needed |
| **Code Quality** | 0-1 | Clean, idiomatic Vue 3 |
| **Testing** | 0-1 | Has verification plan |

**Score Interpretation:**
- **9-10**: Expert - Can lead migrations
- **7-8**: Strong - Needs minimal guidance
- **5-6**: Competent - Needs some support
- **<5**: Needs training

---

## 🔍 Common Mistakes

### ❌ Red Flags

1. **Misses filters** - Doesn't realize they're completely removed
2. **Keeps $set/$delete** - Doesn't understand Proxy reactivity
3. **Uses `new Vue()`** - Tries to create event bus anyway
4. **Wrong lifecycle names** - Keeps beforeDestroy/destroyed
5. **No testing plan** - Doesn't verify functionality

### ✅ Green Flags

1. **Systematic approach** - Lists issues before fixing
2. **Explains reasoning** - Knows why changes were made
3. **Suggests improvements** - Mentions Composition API
4. **Asks questions** - Clarifies requirements
5. **Tests incrementally** - Verifies as they go

---

## 💡 Pro Tips for Interviewers

### Before the Interview
1. Review both components yourself
2. Understand all 15 breaking changes
3. Prepare development environment
4. Print the checklist

### During the Interview
1. Let them struggle a bit (shows problem-solving)
2. Ask "why" not just "how"
3. Watch their debugging process
4. Note how they handle getting stuck

### After the Interview
1. Score using the rubric
2. Document specific strengths/weaknesses
3. Provide constructive feedback
4. Share resources for improvement

---

## 📚 Resources to Share

### For Candidates
- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/)
- [Breaking Changes](https://v3-migration.vuejs.org/breaking-changes/)
- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

### Tools
- [Vue Codemod](https://github.com/vuejs/vue-codemod) - Automated migration
- [Migration Build](https://v3-migration.vuejs.org/migration-build.html) - Compatibility layer

---

## 🎯 Next Steps

1. **Review the components** - Familiarize yourself with both files
2. **Practice running them** - Try in Vue 2 and Vue 3 environments
3. **Prepare questions** - Use the interviewer checklist
4. **Schedule interviews** - Start assessing candidates!

---

## ❓ FAQ

**Q: Which component should I use?**  
A: Use `LegacyVue2Component.vue` for practical tests, `Vue2MigrationExample.vue` for teaching.

**Q: Can candidates reference documentation?**  
A: Yes! Real developers look things up. Focus on problem-solving, not memorization.

**Q: What if they finish too fast?**  
A: Ask them to refactor to Composition API or add TypeScript.

**Q: What if they can't finish?**  
A: That's okay! See how far they got and what they understood. Partial credit is fine.

**Q: Should I provide hints?**  
A: For junior roles, yes. For senior roles, let them struggle more. Adjust based on level.

---

## 📞 Support

Need help? Check:
- `VUE2-VUE3-MIGRATION-README.md` - Complete system overview
- `Vue2-Migration-Evaluation-Guide.md` - Detailed solutions
- `Vue2-Migration-Interviewer-Checklist.md` - Quick reference

---

**Ready to evaluate Vue 2 → Vue 3 migration skills!** 🚀

Last Updated: June 2, 2026
