# SCSS (Sass) Interview Questions & Answers

## SCSS (Sass)

### Q1: What are the benefits of using SCSS over regular CSS?

**A:** SCSS offers variables, nesting, mixins, functions, partials, and inheritance, making stylesheets more maintainable, reusable, and scalable.

### Q2: How do you manage global styles in a large project?

**A:** Use partials (files starting with `_`) to organize styles into modules (e.g., `_variables.scss`, `_mixins.scss`, `_buttons.scss`). Import them in a main file using `@import`.

### Q3: What is the difference between `@extend` and `@mixin`?

**A:**

- **@extend**: Inherits styles from another selector, creating shared classes. Good for similar components.
- **@mixin**: Reusable code blocks that can accept parameters. Better for complex patterns and flexibility.

Example:

```scss
// @extend
%button-base {
  padding: 10px 20px;
  border-radius: 4px;
}

.primary-button {
  @extend %button-base;
  background: blue;
}

// @mixin
@mixin button($bg-color, $text-color: white) {
  padding: 10px 20px;
  border-radius: 4px;
  background: $bg-color;
  color: $text-color;
}

.btn-primary {
  @include button(blue);
}

```

Prefer `@mixin` for better control and avoid excessive selector chaining with `@extend`.

### Q4: Explain SCSS nesting and its best practices.

**A:** Nesting allows writing selectors within other selectors, mirroring HTML structure. Best practices:

- Limit nesting depth to 3 levels maximum
- Use `&` to reference parent selector
- Avoid deeply nested selectors (reduces readability)
- Don't nest media queries unnecessarily

Example:

```scss
.navbar {
  display: flex;

  &__item {
    padding: 10px;

    &:hover {
      background: gray;
    }

    &--active {
      font-weight: bold;
    }
  }
}

```

### Q5: What are SCSS maps and how do you use them?

**A:** Maps store key-value pairs for organized data management. Useful for themes, breakpoints, and configuration.

Example:

```scss
$colors: (
  primary: #3498db,
  secondary: #2ecc71,
  danger: #e74c3c,
);

$breakpoints: (
  sm: 576px,
  md: 768px,
  lg: 992px,
);

@function color($key) {
  @return map-get($colors, $key);
}

.button {
  background: color(primary);
}

@mixin respond-to($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}

.container {
  @include respond-to(md) {
    max-width: 720px;
  }
}

```

### Q6: How do you handle vendor prefixes in SCSS?

**A:** Use autoprefixer post-processing instead of manual prefixes. If needed manually, create a mixin:

```scss
@mixin prefix($property, $value, $prefixes: webkit moz ms o) {
  @each $prefix in $prefixes {
    #{'-' + $prefix + '-' + $property}: $value;
  }
  #{$property}: $value;
}

.animated {
  @include prefix(transform, rotate(45deg));
  @include prefix(transition, all 0.3s ease);
}

```

However, modern build tools with Autoprefixer handle this automatically.

### Q7: What is the difference between `@import` and `@use` in modern Sass?

**A:**

- **@import**: Legacy method, imports everything globally, can cause naming conflicts
- **@use**: Modern approach, creates namespaces, loads files only once, better modularity

Example:

```scss
// Old way
@import 'variables';
@import 'mixins';

// New way
@use 'variables' as *;
@use 'mixins' as m;

.button {
  background: $primary-color; // From variables
  @include m.responsive(); // From mixins namespace
}

```

`@use` is recommended for better maintainability and avoiding global scope pollution.

### Q8: How do you create a responsive grid system in SCSS?

**A:** Use loops and calculations to generate grid classes:

```scss
$grid-columns: 12;
$gutter: 1rem;

.grid {
  display: grid;
  gap: $gutter;
  grid-template-columns: repeat($grid-columns, 1fr);
}

@for $i from 1 through $grid-columns {
  .col-#{$i} {
    grid-column: span $i;
  }
}

// Responsive breakpoints
@mixin breakpoint($size) {
  @if $size == sm {
    @media (min-width: 576px) {
      @content;
    }
  } @else if $size == md {
    @media (min-width: 768px) {
      @content;
    }
  }
}

@include breakpoint(md) {
  .col-md-6 {
    grid-column: span 6;
  }
}

```

### Q9: Explain BEM methodology and how SCSS supports it.

**A:** BEM (Block Element Modifier) is a naming convention:

- **Block**: Standalone component (`.card`)
- **Element**: Part of a block (`.card__title`)
- **Modifier**: Variation (`.card--featured`)

SCSS nesting makes BEM easier:

```scss
.card {
  padding: 1rem;

  &__header {
    border-bottom: 1px solid #ddd;
  }

  &__title {
    font-size: 1.5rem;
  }

  &--featured {
    border: 2px solid gold;
  }
}

```

Compiles to `.card`, `.card__header`, `.card__title`, `.card--featured`.

### Q10: How do you optimize SCSS compilation performance?

**A:** Best practices:

- Use `@use` instead of `@import` to avoid duplicate imports
- Split code into logical partials
- Avoid deeply nested selectors (increases complexity)
- Use placeholder selectors (`%placeholder`) with `@extend` sparingly
- Implement tree-shaking by only importing needed modules
- Use Sass compiler caching
- Minimize function calls in loops

Example structure:

```
styles/
  _variables.scss
  _mixins.scss
  _functions.scss
  components/
    _buttons.scss
    _cards.scss
  main.scss (imports only what's needed)
```
