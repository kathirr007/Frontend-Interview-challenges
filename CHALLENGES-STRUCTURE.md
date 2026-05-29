# Vue Challenges - Project Structure

## Overview

This project has been restructured to provide Vue.js coding challenges organized by difficulty levels for frontend interview preparation.

## Pages Structure

### Main Pages

- **`/` (index.vue)** - Landing page with challenge category cards
  - Displays three difficulty levels: Beginner, Intermediate, Advanced
  - Features section highlighting key benefits
  - Navigation to each challenge category

- **`/beginner` (beginner.vue)** - Beginner challenges page
  - 8 beginner-level Vue.js challenges
  - Topics: Components, Reactivity, Event Handling, v-for, v-model, Forms
  - Green color theme
  - Progress tracking stats

- **`/intermediate` (intermediate.vue)** - Intermediate challenges page
  - 8 intermediate-level Vue.js challenges
  - Topics: Composition API, Composables, Pinia, Dynamic Components, API Integration
  - Yellow color theme
  - Progress tracking stats

- **`/advanced` (advanced.vue)** - Advanced challenges page
  - 8 advanced-level Vue.js challenges
  - Topics: Custom Directives, Performance, Plugins, SSR, Testing, Animations
  - Red color theme
  - Progress tracking stats

- **`/*` ([...all].vue)** - 404 Not Found page
  - Custom error page with navigation back to home or challenge pages
  - Helpful links to all challenge categories

## Layouts

### Default Layout (`src/layouts/default.vue`)

- Modern sticky navigation bar with:
  - Logo and branding
  - Navigation links to all challenge categories
  - Dark mode toggle
  - GitHub link
- Main content area with fade transitions
- Comprehensive footer with:
  - About section
  - Quick links
  - External resources (Vue.js docs, Vue Router, Pinia)

### Home Layout (`src/layouts/home.vue`)

- Simplified layout for special pages
- Clean header with logo and dark mode toggle
- Centered content area
- Minimal footer

### 404 Layout (`src/layouts/404.vue`)

- Minimal layout wrapper for 404 page
- Full-height centered content

## Design System

### Color Themes

- **Beginner**: Green (#22c55e / green-500)
- **Intermediate**: Yellow (#eab308 / yellow-500)
- **Advanced**: Red (#ef4444 / red-500)

### Components Used

- UnoCSS utility classes for styling
- Carbon icons from @iconify-json/carbon
- Responsive grid layouts
- Smooth transitions and hover effects
- Dark mode support throughout

### Features

- ✅ Fully responsive design
- ✅ Dark mode support
- ✅ Smooth page transitions
- ✅ Active route highlighting
- ✅ Progress tracking UI (ready for implementation)
- ✅ SEO-friendly meta tags
- ✅ Accessible navigation

## Removed Content

The following old pages have been removed:

- `/hi/[name]` - Dynamic greeting page
- `/about.md` - About page
- Old index.vue with name input form

## Next Steps

1. Implement challenge detail pages for each challenge
2. Add progress tracking with localStorage or backend
3. Create interactive code editors for challenges
4. Add solution viewing functionality
5. Implement user authentication (optional)
6. Add more challenges to each category

## Technology Stack

- Vue 3 with Composition API
- Vite for development and building
- Vue Router for navigation
- UnoCSS for styling
- TypeScript for type safety
- i18n for internationalization support
