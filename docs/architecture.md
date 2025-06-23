# Architecture

## Overview

This project follows the [**Bulletproof React**](https://github.com/alan2207/bulletproof-react) architecture pattern, which provides a scalable and maintainable structure for React applications.

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
│   │   ├── services/     # Business logic layer
│   │   ├── repositories/ # Data access layer
│   │   ├── providers/    # Dependency injection
│   │   └── utils/
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

### Extended Bulletproof React Architecture

This project follows the **Bulletproof React** architecture as a foundation but extends it with additional layers to handle complex domain logic. While Bulletproof React typically focuses on CRUD applications with straightforward API interactions, our chess game requires sophisticated business rules and complex state management.

**Standard Bulletproof React Pattern:**
```
features/
├── api/          # Data fetching
├── components/   # UI layer
└── hooks/        # React logic
```

**Our Extended Pattern ([NestJS](https://nestjs.com/)-inspired):**
```
features/
├── components/   # UI layer (Bulletproof React)
├── hooks/        # React logic (Bulletproof React)
├── services/     # Business logic layer (Our extension)
├── repositories/ # Data access layer (Our extension)
├── providers/    # Dependency injection (Our extension)
└── utils/        # Pure utilities (Bulletproof React)
```

### Feature-Based Organization
- Each major functionality is organized as a feature module
- Features are self-contained with their own components, hooks, services, and data access
- This promotes better code organization and easier maintenance
- Additional layers handle complex domain logic that goes beyond typical CRUD operations

### Shared Components
- Reusable components are placed in the `components/` directory
- UI primitives and common patterns are abstracted for consistency

### Type Safety
- TypeScript is used throughout the application
- Zod schemas validate runtime data (environment variables, API responses)

### Service Layer (Business Logic)

Our service layer encapsulates complex domain logic that would otherwise bloat React components:

**GameStateService**: Manages chess game state and rule validation
- Move validation using chess.js
- Game status detection (checkmate, stalemate, draw)
- Board state management
- Move history tracking

**ChessEngineService**: Handles AI engine integration
- Stockfish WebWorker communication
- UCI protocol handling
- Move format conversion (UCI ↔ SAN)
- AI skill level management

**Benefits:**
- **Separation of Concerns**: UI components focus on presentation, services handle business logic
- **Testability**: Business logic can be unit tested independently of React components
- **Reusability**: Services can be used across multiple components
- **Maintainability**: Changes to chess rules or AI integration are isolated to specific services

### Repository Layer (Data Access)

The repository pattern abstracts data persistence details:

**LocalStorageGameRepository**: Implements game data persistence
- Save/load game states
- Game history management
- Move tracking
- Error handling and data validation

**Benefits:**
- **Abstraction**: Components don't need to know about localStorage implementation
- **Flexibility**: Can easily switch to different storage backends (API, IndexedDB, etc.)
- **Testing**: Can be mocked for unit tests
- **Consistency**: Standardized data access patterns

### Dependency Injection

React Context is used for dependency injection, following NestJS patterns adapted for React:

```typescript
// Service creation and injection
export const GameServicesContext = createContext<GameServices | null>(null);

export function useGameServices(): GameServices {
  const services = useContext(GameServicesContext);
  if (!services) {
    throw new Error("useGameServices must be used within a GameServicesProvider");
  }
  return services;
}
```

This approach provides:
- **Loose Coupling**: Components depend on abstractions, not concrete implementations
- **Testability**: Easy to inject mock services for testing
- **Configuration**: Services can be configured at the provider level

### State Management
- React Context is used for global state (sound preferences, service injection)
- Local component state is preferred when possible
- Business logic state is managed by services, not components
- No external state management library is currently used

### Routing
- React Router v7 handles client-side routing
- Routes are centrally defined in `app/routes.tsx`

## Key Design Decisions

### 1. Extended Architecture Pattern

**Decision**: Extend Bulletproof React with service and repository layers inspired by NestJS patterns.

**Rationale**: 
- Bulletproof React's standard pattern (api/components/hooks) works well for CRUD applications
- Chess games require complex domain logic (rules validation, AI integration, game state management)
- A 228-line monolithic GamePlayRoute component was becoming unmaintainable
- Service layer provides clear separation between UI and business logic
- Repository layer abstracts data persistence and enables easy testing

**Trade-offs**:
- Increased architectural complexity compared to standard Bulletproof React
- Additional learning curve for developers unfamiliar with layered architecture
- More files and abstractions to maintain

### 2. Dependency Injection with React Context

**Decision**: Use React Context for dependency injection rather than direct imports.

**Rationale**:
- Enables easy mocking for tests
- Allows runtime configuration of services (e.g., skill level)
- Follows inversion of control principles
- Maintains React patterns while gaining testability benefits

### 3. Business Logic in Services, Not Hooks

**Decision**: Place complex business logic in service classes rather than custom hooks.

**Rationale**:
- Chess rules and AI integration are domain logic, not React-specific logic
- Services can be tested without React testing utilities
- Easier to reason about complex state transitions
- Clear separation between React concerns and domain concerns

### 4. Repository Pattern for Data Access

**Decision**: Abstract localStorage access behind repository interfaces.

**Rationale**:
- Enables switching storage backends without changing business logic
- Provides consistent error handling and data validation
- Facilitates testing with mock implementations
- Follows established patterns from backend development

### 5. Comprehensive Testing Strategy

**Decision**: Implement unit tests for all service and repository layers.

**Rationale**:
- Complex business logic requires thorough testing
- Service layer isolation makes unit testing straightforward
- Prevents regressions in chess rules and AI integration
- Builds confidence for refactoring and feature additions

### 6. Modern Tooling

**Decision**: Use Vite, Bun, and Vitest for fast development experience.

**Rationale**:
- Fast build times and hot reload improve developer productivity
- Native TypeScript support reduces configuration complexity
- Vitest provides excellent testing experience with minimal setup