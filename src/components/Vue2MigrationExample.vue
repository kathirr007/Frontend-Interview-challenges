<script>
// Vue 2 Component - For migration evaluation
import { defineComponent } from 'vue'

// Simulated mixin (to be converted to composable)
const mouseMixin = {
  data() {
    return {
      mousePosition: { x: 0, y: 0 },
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
    },
  },
}

// Simulated event bus (Vue 2 pattern)
const EventBus = {
  events: {},
  $on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  },
  $emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data))
    }
  },
  $off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback)
    }
  },
}

// Child component for .sync demo
const ChildComponent = defineComponent({
  name: 'ChildComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['update:title'],
  template: `
    <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
      <input :value="title" @input="$emit('update:title', $event.target.value)" />
      <p>Child receives: {{ title }}</p>
    </div>
  `,
})

// Slot component for scoped slots demo
const SlotComponent = defineComponent({
  name: 'SlotComponent',
  data() {
    return {
      items: ['Apple', 'Banana', 'Cherry'],
    }
  },
  template: `
    <div>
      <div v-for="(item, index) in items" :key="index">
        <slot :item="item" :index="index"></slot>
      </div>
    </div>
  `,
})

// Dynamic heading component for render function demo
const DynamicHeading = defineComponent({
  name: 'DynamicHeading',
  props: {
    level: {
      type: Number,
      required: true,
      validator(value) {
        return value >= 1 && value <= 6
      },
    },
    text: {
      type: String,
      required: true,
    },
  },
  render(h) {
    // Vue 2 render function signature: h(tag, data, children)
    // Vue 3 changes: h(tag, props, children) - data object structure changed
    return h(
      `h${this.level}`,
      {
        attrs: { id: `heading-${this.level}` },
        class: 'dynamic-heading',
        style: { color: '#42b883' },
      },
      [this.text],
    )
  },
})

export default defineComponent({
  name: 'Vue2MigrationExample',

  components: {
    ChildComponent,
    SlotComponent,
    DynamicHeading,
  },

  // Section 5: Filters (removed in Vue 3)
  filters: {
    uppercase(value) {
      return value.toUpperCase()
    },
    currency(value) {
      return `$${value.toFixed(2)}`
    },
    dateFormat(value) {
      return new Date(value).toLocaleDateString()
    },
  },

  // Section 10: Custom directives (Vue 2 syntax)
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
    highlight: {
      bind(el, binding) {
        el.style.backgroundColor = binding.value
      },
      update(el, binding) {
        if (binding.value !== binding.oldValue) {
          el.style.backgroundColor = binding.value
        }
      },
    },
  },

  // Mixin usage (to be migrated to composables)
  mixins: [mouseMixin],

  // Section 1: Options API
  data() {
    return {
      count: 0,
      user: {
        name: 'John Doe',
        age: 30,
      },
      items: ['Item 1', 'Item 2', 'Item 3'],
      lifecycleLog: '',
      componentStatus: 'mounted',
      parentTitle: 'Initial Title',
      message: 'hello world',
      price: 99.99,
      currentDate: new Date(),
      eventMessages: [],
      inputValue: '',
      windowSize: { width: 0, height: 0 },
      networkStatus: navigator.onLine,
      headingLevel: 1,
      headingText: 'Dynamic Heading',
      highlightColor: 'yellow',
      showTransition: false,
      asyncComponentLoaded: false,
      globalProperty: '',
      pluginStatus: 'not loaded',
      keyItems: [
        { id: 1, name: 'First' },
        { id: 2, name: 'Second' },
        { id: 3, name: 'Third' },
      ],
    }
  },

  computed: {
    // Section 1: Computed property
    doubleCount() {
      return this.count * 2
    },

    // Section 5: Filter replacement - uppercase
    uppercaseMessage() {
      return this.message.toUpperCase()
    },
  },

  watch: {
    // Watch with options
    count: {
      handler(newVal, oldVal) {
        console.log(`Count changed from ${oldVal} to ${newVal}`)
      },
      immediate: true,
    },

    // Simple watcher
    parentTitle(newVal) {
      console.log('Title updated:', newVal)
    },
  },

  // Section 3: Lifecycle hooks
  created() {
    this.lifecycleLog += 'created | '
    this.setupEventBus()
    this.setupNetworkListener()
    this.updateWindowSize()
  },

  mounted() {
    this.lifecycleLog += 'mounted | '
    this.componentStatus = 'fully mounted'
    this.globalProperty = this.$myGlobalProperty || 'global value'
    this.pluginStatus = 'plugin active'

    // Setup window resize listener
    window.addEventListener('resize', this.updateWindowSize)
  },

  // Vue 2: beforeDestroy (Vue 3: beforeUnmount)
  beforeUnmount() {
    this.lifecycleLog += 'beforeDestroy | '
    this.cleanup()
  },

  // Vue 2: destroyed (Vue 3: unmounted)
  unmounted() {
    this.lifecycleLog += 'destroyed'
    this.componentStatus = 'destroyed'
  },

  methods: {
    // Section 1: Methods
    increment() {
      this.count++
    },

    decrement() {
      this.count--
    },

    // Section 2: $set and $delete usage
    addEmail() {
      // Vue 2: Must use $set for reactive property addition
      this.$set(this.user, 'email', 'john@example.com')
    },

    removeAge() {
      // Vue 2: Must use $delete for reactive property removal
      this.$delete(this.user, 'age')
    },

    updateArrayItem() {
      // Vue 2: Direct array index assignment is NOT reactive
      // this.items[0] = 'Updated Item' // This won't trigger reactivity
      this.$set(this.items, 0, 'Updated Item 1') // Use $set instead
    },

    // Section 4: .sync modifier handling
    handleTitleUpdate(newTitle) {
      this.parentTitle = newTitle
    },

    // Section 5: Filter replacements as methods
    formatCurrency(value) {
      return `$${value.toFixed(2)}`
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },

    // Section 6: Event Bus setup
    setupEventBus() {
      EventBus.$on('custom-event', (data) => {
        this.eventMessages.push(`Received: ${data}`)
      })
    },

    sendEvent() {
      EventBus.$emit('custom-event', `Event at ${new Date().toLocaleTimeString()}`)
    },

    clearEvents() {
      this.eventMessages = []
    },

    // Section 7: Template refs
    focusInput() {
      // Vue 2: Access via this.$refs
      this.$refs.inputRef.focus()
    },

    getInputValue() {
      this.inputValue = this.$refs.inputRef.value
    },

    // Section 8: Window size tracking (mixin alternative)
    updateWindowSize() {
      this.windowSize.width = window.innerWidth
      this.windowSize.height = window.innerHeight
    },

    // Network status listener
    setupNetworkListener() {
      window.addEventListener('online', () => {
        this.networkStatus = true
      })
      window.addEventListener('offline', () => {
        this.networkStatus = false
      })
    },

    // Section 10: Custom directive toggle
    toggleHighlight() {
      this.highlightColor = this.highlightColor === 'yellow' ? 'lightblue' : 'yellow'
    },

    // Section 13: Async component loading
    loadAsyncComponent() {
      // Vue 2: Async component factory
      // Vue 3: Use defineAsyncComponent
      this.AsyncComponent = () => import('./AsyncExample.vue')
      this.asyncComponentLoaded = true
    },

    // Cleanup
    cleanup() {
      window.removeEventListener('resize', this.updateWindowSize)
      EventBus.$off('custom-event')
    },
  },
})
</script>

<template>
  <div class="vue2-migration-example">
    <h2>Vue 2 to Vue 3 Migration Example</h2>

    <!-- Section 1: Options API vs Composition API -->
    <section class="migration-section">
      <h3>1. Options API → Composition API</h3>
      <div class="demo-box">
        <p>Count: {{ count }}</p>
        <p>Double: {{ doubleCount }}</p>
        <button @click="increment">
          Increment
        </button>
        <button @click="decrement">
          Decrement
        </button>
      </div>
    </section>

    <!-- Section 2: Reactive System Changes ($set/$delete) -->
    <section class="migration-section">
      <h3>2. Reactivity System ($set/$delete)</h3>
      <div class="demo-box">
        <p>User: {{ user.name }}, Age: {{ user.age }}</p>
        <p>New Property (added with $set): {{ user.email || 'Not set' }}</p>
        <button @click="addEmail">
          Add Email ($set)
        </button>
        <button @click="removeAge">
          Remove Age ($delete)
        </button>

        <h4>Array Reactivity:</h4>
        <ul>
          <li v-for="(item, index) in items" :key="index">
            {{ item }}
          </li>
        </ul>
        <button @click="updateArrayItem">
          Update Array Item Directly
        </button>
      </div>
    </section>

    <!-- Section 3: Lifecycle Hooks -->
    <section class="migration-section">
      <h3>3. Lifecycle Hooks Mapping</h3>
      <div class="demo-box">
        <p>Lifecycle Log: {{ lifecycleLog }}</p>
        <p>Status: {{ componentStatus }}</p>
      </div>
    </section>

    <!-- Section 4: Props and Emits (.sync removal) -->
    <section class="migration-section">
      <h3>4. Props & Emits (.sync → v-model)</h3>
      <div class="demo-box">
        <ChildComponent
          v-model:title="parentTitle"
          @update:title="handleTitleUpdate"
        />
        <p>Parent Title: {{ parentTitle }}</p>
        <input v-model="parentTitle" placeholder="Update title">
      </div>
    </section>

    <!-- Section 5: Filters Removal -->
    <section class="migration-section">
      <h3>5. Filters → Computed/Methods</h3>
      <div class="demo-box">
        <p>Original: {{ message }}</p>
        <p>Uppercase (was filter): {{ uppercaseMessage }}</p>
        <p>Currency (was filter): {{ formatCurrency(price) }}</p>
        <p>Date (was filter): {{ formatDate(currentDate) }}</p>
      </div>
    </section>

    <!-- Section 6: Event Bus Replacement -->
    <section class="migration-section">
      <h3>6. Event Bus ($on/$emit → provide/inject or mitt)</h3>
      <div class="demo-box">
        <p>Event Messages:</p>
        <ul>
          <li v-for="(msg, idx) in eventMessages" :key="idx">
            {{ msg }}
          </li>
        </ul>
        <button @click="sendEvent">
          Send Event
        </button>
        <button @click="clearEvents">
          Clear Events
        </button>
      </div>
    </section>

    <!-- Section 7: Template Refs -->
    <section class="migration-section">
      <h3>7. Template Refs (this.$refs → ref())</h3>
      <div class="demo-box">
        <input ref="inputRef" type="text" placeholder="Type something...">
        <button @click="focusInput">
          Focus Input
        </button>
        <button @click="getInputValue">
          Get Value
        </button>
        <p>Input Value: {{ inputValue }}</p>
      </div>
    </section>

    <!-- Section 8: Mixins to Composables -->
    <section class="migration-section">
      <h3>8. Mixins → Composables</h3>
      <div class="demo-box">
        <p>Mouse Position: X={{ mousePosition.x }}, Y={{ mousePosition.y }}</p>
        <p>Window Size: Width={{ windowSize.width }}, Height={{ windowSize.height }}</p>
        <p>Is Online: {{ networkStatus }}</p>
      </div>
    </section>

    <!-- Section 9: Render Function -->
    <section class="migration-section">
      <h3>9. Render Function Changes</h3>
      <div class="demo-box">
        <DynamicHeading :level="headingLevel" :text="headingText" />
        <input v-model.number="headingLevel" type="number" min="1" max="6">
        <input v-model="headingText" placeholder="Heading text">
      </div>
    </section>

    <!-- Section 10: Custom Directives -->
    <section class="migration-section">
      <h3>10. Custom Directives</h3>
      <div class="demo-box">
        <div v-highlight="'yellow'" v-focus>
          This div has custom directives (highlight & auto-focus)
        </div>
        <button @click="toggleHighlight">
          Toggle Highlight Color
        </button>
      </div>
    </section>

    <!-- Section 11: Scoped Slots -->
    <section class="migration-section">
      <h3>11. Scoped Slots Syntax</h3>
      <div class="demo-box">
        <SlotComponent>
          <template #default="{ item, index }">
            <span>Item {{ index + 1 }}: {{ item }}</span>
          </template>
        </SlotComponent>
      </div>
    </section>

    <!-- Section 12: Transitions -->
    <section class="migration-section">
      <h3>12. Transition Class Names</h3>
      <div class="demo-box">
        <button @click="showTransition = !showTransition">
          Toggle Animation
        </button>
        <transition name="fade">
          <p v-if="showTransition">
            This fades in/out
          </p>
        </transition>
      </div>
    </section>

    <!-- Section 13: Async Components -->
    <section class="migration-section">
      <h3>13. Async Components</h3>
      <div class="demo-box">
        <button @click="loadAsyncComponent">
          Load Async Component
        </button>
        <component :is="AsyncComponent" v-if="asyncComponentLoaded" />
      </div>
    </section>

    <!-- Section 14: Global API Changes Demo -->
    <section class="migration-section">
      <h3>14. Global API Changes</h3>
      <div class="demo-box">
        <p>Global Property (was Vue.prototype): {{ globalProperty }}</p>
        <p>Plugin Status: {{ pluginStatus }}</p>
      </div>
    </section>

    <!-- Section 15: Key Attribute Changes -->
    <section class="migration-section">
      <h3>15. Key Attribute on Templates</h3>
      <div class="demo-box">
        <template v-for="item in keyItems" :key="item.id">
          <div>{{ item.name }}</div>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped>
.vue2-migration-example {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.migration-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
}

.migration-section h3 {
  color: #42b883;
  margin-top: 0;
  border-bottom: 2px solid #42b883;
  padding-bottom: 10px;
}

.demo-box {
  padding: 15px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #ddd;
}

button {
  margin: 5px;
  padding: 8px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369970;
}

input {
  margin: 5px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Section 12: Transition classes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.dynamic-heading {
  margin: 10px 0;
}

ul {
  list-style-position: inside;
  padding-left: 0;
}

li {
  margin: 5px 0;
}
</style>
