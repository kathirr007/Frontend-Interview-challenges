# HTML & CSS Interview Questions & Answers

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
  <input type="email" id="email" name="email" required aria-describedby="email-error" />
  <span id="email-error" role="alert"></span>
</form>

```
