# Vue Challenges - Interactive Challenge System

## Overview

This project now features an interactive challenge system similar to [vuejs-challenges.netlify.app](https://vuejs-challenges.netlify.app/), where users can solve Vue.js coding challenges with detailed instructions, hints, solutions, and a built-in code editor.

## Structure

### Pages Hierarchy

```text
src/pages/
── index.vue                          # Landing page with category cards
├── beginner.vue                       # Beginner challenges list
├── intermediate.vue                   # Intermediate challenges list
├── advanced.vue                       # Advanced challenges list
├── [...all].vue                       # 404 page
└── challenges/
    └── beginner/
        ├── [id].vue                   # Dynamic route for all beginner challenges (template)
        ├── 01.vue                     # Challenge 1: Hello World Component
        ├── 02.vue                     # Challenge 2: Counter App
        ├── 03.vue                     # Challenge 3: Todo List
        ── ...                        # More challenges to be added
```

### Challenge Page Features

Each challenge page includes:

#### 1. **Header Section**

- Breadcrumb navigation (Home > Beginner > Challenge #X)
- Difficulty badge (Beginner/Intermediate/Advanced)
- Challenge number badge
- Title and description
- Action buttons: Reset Code, View Solution

#### 2. **Tabbed Interface**

- **Instructions Tab**: Learning objectives, topics covered, hints
- **Solution Tab**: Complete solution code with explanation (appears after clicking "View Solution")

#### 3. **Two-Panel Layout**

- **Left Panel**: Instructions/Solution content
  - Learning objectives checklist
  - Topic tags
  - Hint boxes with yellow styling
  - Solution code with syntax highlighting
  - Detailed explanations

- **Right Panel**: Interactive Code Editor
  - Dark-themed textarea for code input
  - Starter template provided
  - "Run Code" button (ready for implementation)
  - Language indicator (Vue 3 • Composition API)

#### 4. **Navigation Footer**

- Previous Challenge link
- Next Challenge link
- Back to category list

## How to Add New Challenges

### Step 1: Create Challenge File

Create a new file in `src/pages/challenges/beginner/XX.vue` (where XX is the padded challenge number):

```bash
# Example: src/pages/challenges/beginner/04.vue
```

### Step 2: Copy Template Structure

Use this template as a starting point:

```vue
<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { ref } from 'vue'

useHead({
  title: () => 'Challenge #XX: [Title] - Beginner Vue Challenges',
})

const activeTab = ref<'instructions' | 'solution'>('instructions')
const userCode = ref(`// Write your Vue component code here
<template>
  <div>
    <!-- Your code here -->
  </div>
</template>

<script setup>
// Your reactive data and logic here
<\/script>`)

const showSolution = ref(false)

const challenge = {
  id: XX,
  title: '[Challenge Title]',
  difficulty: 'beginner',
  description: '[Brief description of the challenge]',
  objectives: [
    'Objective 1',
    'Objective 2',
    // ... more objectives
  ],
  hints: [
    'Hint 1',
    'Hint 2',
    // ... more hints
  ],
  topics: ['Topic 1', 'Topic 2'],
}

function resetCode() {
  userCode.value = `[starter code template]`
}

function viewSolution() {
  showSolution.value = true
  activeTab.value = 'solution'
}
</script>

<template>
  <div>
    <!-- Full template structure (copy from existing challenge) -->
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
```

### Step 3: Customize Content

Update the following sections:

1. **Challenge Metadata** (`challenge` object):
   - `id`: Challenge number
   - `title`: Descriptive title
   - `description`: Clear explanation
   - `objectives`: 4-6 learning goals
   - `hints`: 3-4 helpful tips
   - `topics`: Relevant Vue.js concepts

2. **Starter Code** (`userCode`):
   - Provide a basic template
   - Include comments guiding the user

3. **Solution Code** (in template):
   - Show complete working solution
   - Use proper syntax highlighting
   - Add explanation section

4. **Navigation Links**:
   - Update Previous/Next challenge routes
   - Ensure proper sequential numbering

### Step 4: Update Category Page

Add the new challenge to the appropriate category list (e.g., `beginner.vue`):

```json
{
  "id": "XX",
  "title": "[Challenge Title]",
  "description": "[Description]",
  "difficulty": "beginner",
  "topics": ["Topic 1", "Topic 2"]
}
```
