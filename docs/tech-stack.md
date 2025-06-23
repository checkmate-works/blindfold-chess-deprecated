# Technical Stack

**Rationale**: Selected technologies that enable the most efficient implementation in 2025 while ensuring long-term maintainability

## Frontend Framework

### React Ecosystem
- **React 19** - UI component library
- **React Router DOM 7** - Client-side routing
- **TypeScript 5** - Type safety

## Build Tools & Development Environment

### Build Tools
- **Vite 6** - Fast development server and build tool
- **Bun** - JavaScript runtime and package manager

### CSS & Styling
- **Tailwind CSS 4** - Utility-first CSS framework (using Vite plugin)
- **PostCSS 8** - CSS processing tool
- **Autoprefixer 10** - Automatic vendor prefixing

## Chess-related Libraries

- **React Chessboard 4** - React chess board UI component
- **Chess.js 1** - Chess rules and logic implementation
- **Stockfish.js 10** - AI chess engine

## UI Components & Utilities

### UI Components
- **@headlessui/react 2** - Accessible UI components
- **@heroicons/react 2** - SVG icon set
- **react-hot-toast 2** - Toast notifications
- **react-helmet-async 2** - Document head management

### Utilities
- **clsx 2** - Conditional CSS class concatenation
- **date-fns 4** - Date manipulation library
- **Zod 3** - Schema validation

## Internationalization (i18n)

- **i18next 25** - Internationalization framework
- **react-i18next 15** - React bindings for i18next
- **i18next-browser-languagedetector 8** - Automatic language detection

## Development Tools

### Code Quality
- **ESLint 9** - JavaScript linter
- **Prettier 3** - Code formatter
- **Husky 9** - Git hooks management
- **lint-staged 15** - Staged files linting

### Monitoring & Error Tracking
- **@sentry/react 9** - Error monitoring and performance tracking

## Testing

### Unit & Integration Testing
- **Vitest 3** - Test runner with Vite integration
- **@testing-library/react 16** - React component testing
- **@testing-library/jest-dom 6** - Custom matchers for DOM testing
- **@testing-library/user-event 14** - User interaction simulation
- **jsdom 26** - DOM implementation for Node.js

## Notes

- **Bun** is used as the package manager - As an alternative to npm/yarn/pnpm, Bun includes built-in package management capabilities, allowing dependency management through the `bun` command