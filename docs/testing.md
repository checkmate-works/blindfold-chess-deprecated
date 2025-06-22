# Testing

## Overview

The project uses a modern testing stack built around Vitest and React Testing Library for unit and integration testing.

## Testing Stack

### Unit & Integration Testing
- **Vitest** - Fast unit test runner with native Vite support
- **React Testing Library** - Testing utilities focused on user behavior
- **@testing-library/jest-dom** - Custom DOM matchers
- **@testing-library/user-event** - Advanced user interaction simulation
- **jsdom** - DOM implementation for Node.js

### E2E Testing (Planned)
- **Playwright** - For end-to-end testing of chess gameplay flows

## Running Tests

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test

# Run tests with UI
bun run test:ui

# Run tests with coverage
bun run test:coverage
```

## Test Structure

```
src/
├── components/
│   └── ComponentName/
│       ├── ComponentName.tsx
│       └── ComponentName.test.tsx
├── utils/
│   ├── utilityName.ts
│   └── utilityName.test.ts
├── hooks/
│   ├── useHookName.ts
│   └── useHookName.test.ts
└── test/
    └── setup.ts         # Test configuration
```

## Writing Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { generateMoveSuggestions } from './move-suggestions';

describe('generateMoveSuggestions', () => {
  it('should return empty array for empty input', () => {
    expect(generateMoveSuggestions('')).toEqual([]);
  });
});
```

### Component Test Example

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Test Configuration

The test configuration is defined in `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
});
```

## Best Practices

1. **Test User Behavior**: Focus on testing how users interact with the application
2. **Avoid Implementation Details**: Test the public API, not internal implementation
3. **Use Descriptive Test Names**: Tests should clearly describe what they're testing
4. **Keep Tests Simple**: Each test should verify one specific behavior
5. **Use Test Utilities**: Leverage React Testing Library's queries and utilities

## Coverage Goals

While not enforced, aim for:
- **Utility Functions**: 100% coverage
- **Custom Hooks**: 90%+ coverage
- **Components**: 80%+ coverage for critical paths
- **Integration**: Key user flows should be tested

## Continuous Integration

Tests are automatically run on:
- Pre-commit hooks (via Husky)
- Pull requests
- Main branch pushes