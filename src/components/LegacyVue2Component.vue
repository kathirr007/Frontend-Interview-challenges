<!-- eslint-disable -->
<!-- eslint-disable vue/no-reserved-keys -->
<!-- eslint-disable vue/no-deprecated-destroyed-lifecycle -->
<!-- eslint-disable prefer-template -->
<!-- 
  LEGACY VUE 2 COMPONENT - WILL BREAK IN VUE 3
  This component uses pure Vue 2 patterns and APIs that are removed or changed in Vue 3.
  Candidates must identify and fix all breaking changes to make it work in Vue 3.
  
  NOTE: This file intentionally contains Vue 2-only code that violates Vue 3 ESLint rules.
  The eslint-disable comments above prevent IDE errors while preserving the educational value.
-->
<script>
// ============================================
// VUE 2 ONLY CODE - WILL NOT WORK IN VUE 3
// ============================================

// Vue 2 Event Bus Pattern
// eslint-disable-next-line vue/no-reserved-keys
const EventBus = new Vue({
  data() {
    return {
      events: {}
    }
  },
  methods: {
    // eslint-disable-next-line vue/no-reserved-keys
    $on(event, callback) {
      if (!this.events[event]) {
        this.events[event] = []
      }
      this.events[event].push(callback)
    },
    // eslint-disable-next-line vue/no-reserved-keys
    $emit(event, data) {
      if (this.events[event]) {
        this.events[event].forEach(cb => cb(data))
      }
    },
    // eslint-disable-next-line vue/no-reserved-keys
    $off(event, callback) {
      if (this.events[event]) {
        this.events[event] = this.events[event].filter(cb => cb !== callback)
      }
    }
  }
})

// Vue 2 Mixin
const mouseTrackerMixin = {
  data() {
    return {
      mouseX: 0,
      mouseY: 0
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.handleMouseMove)
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  },
  methods: {
    handleMouseMove(e) {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
    }
  }
}

// Vue 2 Child Component with .sync
const ChildInput = {
  name: 'ChildInput',
  props: ['value'],
  template: `
    <div>
      <input :value="value" @input="$emit('update:value', $event.target.value)" />
      <small>Child value: {{ value }}</small>
    </div>
  `
}

// Vue 2 List Renderer with old slot syntax
const ListRenderer = {
  name: 'ListRenderer',
  props: ['items'],
  template: `
    <div>
      <div v-for="(item, index) in items" :key="index">
        <slot :item="item" :index="index"></slot>
      </div>
    </div>
  `
}

// Vue 2 Render Function Component
const DynamicHeading = {
  name: 'DynamicHeading',
  props: {
    level: { type: Number, required: true },
    text: { type: String, required: true }
  },
  render(h) {
    // Vue 2 render function: h(tag, dataObject, children)
    return h(
      `h${this.level}`,
      {
        attrs: { id: `heading-${this.level}` },
        class: 'dynamic-heading',
        style: { color: '#42b883', fontWeight: 'bold' }
      },
      [this.text]
    )
  }
}

// ============================================
// MAIN COMPONENT - PURE VUE 2 OPTIONS API
// ============================================
export default {
  name: 'LegacyVue2Component',
  
  components: {
    ChildInput,
    ListRenderer,
    DynamicHeading
  },

  // Vue 2 Mixins
  mixins: [mouseTrackerMixin],

  // Vue 2 Data
  data() {
    return {
      count: 0,
      userProfile: {
        name: 'John Doe',
        age: 30
      },
      scores: [85, 92, 78],
      lifecycleStatus: 'initializing',
      lifecycleLog: '',
      inputValue: '',
      message: 'hello world',
      price: 99.99,
      currentDate: new Date(),
      messages: [],
      headingLevel: 2,
      headingText: 'Dynamic Heading Text',
      highlightColor: 'yellow',
      showBox: false,
      asyncLoaded: false,
      AsyncComp: null,
      apiUrl: '',
      appVersion: '',
      items: [
        { id: 1, name: 'Item 1', description: 'First item description' },
        { id: 2, name: 'Item 2', description: 'Second item description' },
        { id: 3, name: 'Item 3', description: 'Third item description' }
      ],
      fruits: ['Apple', 'Banana', 'Cherry', 'Date']
    }
  },

  // Vue 2 Computed
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },

  // Vue 2 Filters (REMOVED IN VUE 3!)
  filters: {
    uppercase(value) {
      return value.toUpperCase()
    },
    currency(value) {
      // eslint-disable-next-line prefer-template
      return '$' + value.toFixed(2)
    },
    formatDate(value) {
      return new Date(value).toLocaleDateString()
    }
  },

  // Vue 2 Watch
  watch: {
    count: {
      handler(newVal, oldVal) {
        console.log(`Count changed from ${oldVal} to ${newVal}`)
      },
      immediate: true
    }
  },

  // Vue 2 Lifecycle Hooks
  created() {
    this.lifecycleLog += 'created → '
    this.setupEventBus()
  },

  mounted() {
    this.lifecycleLog += 'mounted → '
    this.lifecycleStatus = 'mounted'
    
    // Access Vue 2 global properties (Vue.prototype)
    this.apiUrl = this.$apiUrl || 'http://localhost:3000/api'
    this.appVersion = this.$appVersion || '1.0.0'
  },

  // Vue 2: beforeDestroy (RENAMED in Vue 3!)
  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy() {
    this.lifecycleLog += 'beforeDestroy → '
    this.cleanup()
  },

  // Vue 2: destroyed (RENAMED in Vue 3!)
  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  destroyed() {
    this.lifecycleLog += 'destroyed'
    this.lifecycleStatus = 'destroyed'
  },

  // Vue 2 Methods
  methods: {
    increment() {
      this.count++
    },
    
    decrement() {
      this.count--
    },

    // Vue 2: Must use $set for reactivity
    addEmail() {
      this.$set(this.userProfile, 'email', 'john@example.com')
    },

    // Vue 2: Must use $delete for reactivity
    removeAge() {
      this.$delete(this.userProfile, 'age')
    },

    // Vue 2: Array reactivity issue
    updateArrayItem() {
      this.$set(this.scores, 0, 95)
    },

    // Vue 2 Event Bus setup
    setupEventBus() {
      const handler = (data) => {
        this.messages.push(`Received: ${data}`)
      }
      EventBus.$on('custom-event', handler)
      this._eventHandler = handler // Store for cleanup
    },

    sendMessage() {
      EventBus.$emit('custom-event', `Message at ${new Date().toLocaleTimeString()}`)
    },

    clearMessages() {
      this.messages = []
    },

    // Vue 2: Access refs via this.$refs
    focusInput() {
      this.$refs.myInput.focus()
    },

    getValue() {
      this.inputValue = this.$refs.myInput.value
    },

    changeColor() {
      this.highlightColor = this.highlightColor === 'yellow' ? 'lightblue' : 'yellow'
    },

    // Vue 2: Async component factory
    loadAsync() {
      this.AsyncComp = () => import('./AsyncExample.vue')
      this.asyncLoaded = true
    },

    cleanup() {
      if (this._eventHandler) {
        EventBus.$off('custom-event', this._eventHandler)
      }
    }
  },

  // Vue 2 Custom Directives (OLD HOOK NAMES!)
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
}
</script>

<template>
  <div class="legacy-vue2-component">
    <h2>Legacy Vue 2 Component (Needs Migration)</h2>

    <!-- Section 1: Options API Pattern -->
    <section class="demo-section">
      <h3>1. Counter (Options API)</h3>
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

    <!-- Section 2: Reactivity Issues ($set/$delete) -->
    <section class="demo-section">
      <h3>2. User Profile (Reactivity)</h3>
      <div class="demo-box">
        <p>Name: {{ userProfile.name }}</p>
        <p>Age: {{ userProfile.age }}</p>
        <p>Email: {{ userProfile.email || 'Not set' }}</p>
        <p>Phone: {{ userProfile.phone || 'Not set' }}</p>
        <button @click="addEmail">
          Add Email (uses $set)
        </button>
        <button @click="removeAge">
          Remove Age (uses $delete)
        </button>
        <button @click="updateArrayItem">
          Update Array Item
        </button>

        <h4>Scores:</h4>
        <ul>
          <li v-for="(score, index) in scores" :key="index">
            {{ score }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Section 3: Lifecycle Hooks (Vue 2 names) -->
    <section class="demo-section">
      <h3>3. Lifecycle Demo</h3>
      <div class="demo-box">
        <p>Status: {{ lifecycleStatus }}</p>
        <p>Log: {{ lifecycleLog }}</p>
      </div>
    </section>

    <!-- Section 4: .sync Modifier -->
    <section class="demo-section">
      <h3>4. Two-Way Binding (.sync)</h3>
      <div class="demo-box">
        <ChildInput v-model:value="inputValue" />
        <p>Parent sees: {{ inputValue }}</p>
      </div>
    </section>

    <!-- Section 5: Filters -->
    <section class="demo-section">
      <h3>5. Filters</h3>
      <div class="demo-box">
        <p>Message: {{ message | uppercase }}</p>
        <p>Price: {{ price | currency }}</p>
        <p>Date: {{ currentDate | formatDate }}</p>
      </div>
    </section>

    <!-- Section 6: Event Bus -->
    <section class="demo-section">
      <h3>6. Event Bus</h3>
      <div class="demo-box">
        <p>Messages:</p>
        <ul>
          <li v-for="(msg, idx) in messages" :key="idx">
            {{ msg }}
          </li>
        </ul>
        <button @click="sendMessage">
          Send Message
        </button>
        <button @click="clearMessages">
          Clear
        </button>
      </div>
    </section>

    <!-- Section 7: Template Refs -->
    <section class="demo-section">
      <h3>7. Input Ref</h3>
      <div class="demo-box">
        <input ref="myInput" type="text" placeholder="Type here...">
        <button @click="focusInput">
          Focus
        </button>
        <button @click="getValue">
          Get Value
        </button>
        <p>Value: {{ inputValue }}</p>
      </div>
    </section>

    <!-- Section 8: Mixin Usage -->
    <section class="demo-section">
      <h3>8. Mouse Tracker (Mixin)</h3>
      <div class="demo-box">
        <p>Mouse X: {{ mouseX }}, Y: {{ mouseY }}</p>
      </div>
    </section>

    <!-- Section 9: Render Function Component -->
    <section class="demo-section">
      <h3>9. Dynamic Heading</h3>
      <div class="demo-box">
        <DynamicHeading :level="headingLevel" :text="headingText" />
        <input v-model.number="headingLevel" type="number" min="1" max="6">
        <input v-model="headingText" placeholder="Heading text">
      </div>
    </section>

    <!-- Section 10: Custom Directives (Vue 2 hooks) -->
    <section class="demo-section">
      <h3>10. Custom Directives</h3>
      <div class="demo-box">
        <div v-highlight="highlightColor" v-focus>
          This has custom directives
        </div>
        <button @click="changeColor">
          Change Color
        </button>
      </div>
    </section>

    <!-- Section 11: Old Slot Syntax -->
    <section class="demo-section">
      <h3>11. Scoped Slots (Old Syntax)</h3>
      <div class="demo-box">
        <ListRenderer :items="fruits">
          <template #default="{ item, index }">
            <span>{{ index + 1 }}. {{ item }}</span>
          </template>
        </ListRenderer>
      </div>
    </section>

    <!-- Section 12: Transition Classes -->
    <section class="demo-section">
      <h3>12. Animation</h3>
      <div class="demo-box">
        <button @click="showBox = !showBox">
          Toggle Box
        </button>
        <transition name="slide">
          <div v-if="showBox" class="animated-box">
            Animated Content
          </div>
        </transition>
      </div>
    </section>

    <!-- Section 13: Async Component (Vue 2 pattern) -->
    <section class="demo-section">
      <h3>13. Async Component</h3>
      <div class="demo-box">
        <button @click="loadAsync">
          Load Component
        </button>
        <component :is="AsyncComp" v-if="asyncLoaded" />
      </div>
    </section>

    <!-- Section 14: Global Property Access -->
    <section class="demo-section">
      <h3>14. Global Properties</h3>
      <div class="demo-box">
        <p>API URL: {{ apiUrl }}</p>
        <p>App Version: {{ appVersion }}</p>
      </div>
    </section>

    <!-- Section 15: Key on Template -->
    <section class="demo-section">
      <h3>15. List Rendering</h3>
      <div class="demo-box">
        <div v-for="item in items" :key="item.id">
          <strong>{{ item.name }}</strong>: {{ item.description }}
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.legacy-vue2-component {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.demo-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 2px solid #e74c3c;
  border-radius: 8px;
  background-color: #fff5f5;
}

.demo-section h3 {
  color: #e74c3c;
  margin-top: 0;
  border-bottom: 2px solid #e74c3c;
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
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #c0392b;
}

input {
  margin: 5px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.animated-box {
  padding: 20px;
  background-color: #3498db;
  color: white;
  margin-top: 10px;
  border-radius: 4px;
}

/* Vue 2 Transition Classes (WRONG for Vue 3!) */
.slide-enter {
  transform: translateX(-100%);
}
.slide-enter-active {
  transition: transform 0.3s ease;
}
.slide-leave {
  transform: translateX(0);
}
.slide-leave-active {
  transition: transform 0.3s ease;
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

small {
  display: block;
  color: #666;
  margin-top: 5px;
}
</style>
