# Architecture

## Overview

This project follows the **Bulletproof React** architecture pattern, which provides a scalable and maintainable structure for React applications.

## Directory Structure

```
src/
├── app/              # Application setup and routing
│   ├── App.tsx       # Root component
│   ├── AppProviders.tsx  # Global providers
│   ├── main.tsx      # Entry point
│   └── routes.tsx    # Route definitions
│
├── features/         # Feature-based modules
│   ├── game/         # Game functionality
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   └── home/         # Home screen
│       └── components/
│
├── components/       # Shared components
│   ├── Board/
│   ├── ErrorBoundary/
│   ├── Layout/
│   └── ui/          # Generic UI components
│
├── contexts/         # React contexts
│   └── SoundContext.tsx
│
├── schemas/          # Validation schemas
│   └── env.ts       # Environment variable validation
│
├── utils/            # Utility functions
│   ├── fen.ts       # FEN notation utilities
│   └── moves.ts     # Chess move utilities
│
└── lib/             # Third-party library configurations
    └── i18n/        # Internationalization setup
```

## Architecture Principles

### Feature-Based Organization
- Each major functionality is organized as a feature module
- Features are self-contained with their own components, hooks, and types
- This promotes better code organization and easier maintenance

### Shared Components
- Reusable components are placed in the `components/` directory
- UI primitives and common patterns are abstracted for consistency

### Type Safety
- TypeScript is used throughout the application
- Zod schemas validate runtime data (environment variables, API responses)

### State Management
- React Context is used for global state (sound preferences)
- Local component state is preferred when possible
- No external state management library is currently used

### Routing
- React Router v7 handles client-side routing
- Routes are centrally defined in `app/routes.tsx`

## Key Design Decisions

1. **No Testing Framework**: Currently, the project doesn't include unit or E2E tests. This is a conscious decision for the MVP phase but should be addressed for production readiness.

2. **Minimal State Management**: The application uses React's built-in state management rather than external libraries like Redux or Zustand, keeping the architecture simple.

3. **Feature Isolation**: Each feature (game, home) is isolated, making it easy to add, remove, or modify features without affecting others.

4. **Modern Tooling**: The use of Vite and Bun reflects a preference for fast, modern development tools over traditional webpack setups.