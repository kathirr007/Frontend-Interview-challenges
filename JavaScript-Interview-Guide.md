# JavaScript Interview Questions & Answers

## JavaScript

### Q1: Explain closures and their use cases.

**A:** A closure is a function that has access to its outer function's scope even after the outer function has returned. Useful for data privacy, callbacks, and creating private variables.

Example:

```javascript
function createCounter() {
  let count = 0
  return function () {
    return ++count
  }
}

const counter = createCounter()
console.log(counter()) // 1
console.log(counter()) // 2
```

### Q2: What is event delegation and why is it useful?

**A:** Event delegation attaches a single event listener to a parent element instead of individual child elements. It reduces memory usage and simplifies dynamic content handling.

Example:

```javascript
document.getElementById('parent').addEventListener('click', (e) => {
  if (e.target.classList.contains('child')) {
    console.log('Child clicked')
  }
})
```

### Q3: Explain the difference between `==` and `===`.

**A:** `==` performs type coercion before comparison, while `===` checks both value and type. Always prefer `===` to avoid unexpected behavior.

Example:

```javascript
console.log(1 == '1') // true (type coercion)
console.log(1 === '1') // false (different types)
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
  .catch(error => console.error(error))
```

### Q6: Explain async/await and how it differs from promises.

**A:** Async/await is syntactic sugar built on top of promises that allows writing asynchronous code that looks synchronous. The `async` keyword marks a function as asynchronous, and `await` pauses execution until the promise settles.

Example:

```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data')
    const data = await response.json()
    console.log(data)
  }
  catch (error) {
    console.error(error)
  }
}
```

### Q7: What is the JavaScript event loop and how does it work?

**A:** The event loop is a single-threaded mechanism that monitors the call stack and callback queue. When the call stack is empty, it moves callbacks from the queue to the stack for execution. This enables non-blocking I/O operations despite JavaScript being single-threaded.

Example:

```javascript
console.log('Start')
setTimeout(() => console.log('Timeout'), 0)
Promise.resolve().then(() => console.log('Promise'))
console.log('End')

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
document.getElementById('parent').addEventListener('click', handler, true)
// Bubbling
document.getElementById('child').addEventListener('click', handler, false)
```
