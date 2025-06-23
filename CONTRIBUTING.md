# Contributing to Blindfold Chess

Thank you for your interest in contributing to Blindfold Chess! This is an open-source project and we welcome contributions from the community.

## Getting Started

Please read our [Development Setup](./docs/development.md) guide to get your local environment ready.

## Code Style and Conventions

To maintain consistency across the codebase, please follow these guidelines:

### Import Conventions
- Use `@/` alias for imports from the src directory
- Use TypeScript `type` imports for type-only imports

```typescript
// Good
import { GameStatus } from '@/features/game/types';
import type { ChessMove } from '@/types';

// Avoid
import { GameStatus } from '../../../features/game/types';
```

### TypeScript
- Always use TypeScript for new code
- Define proper types and interfaces
- Avoid using `any` type

### Code Quality
- All code must pass linting (`bun run lint`)
- All code must pass type checking (`bun run typecheck`)
- Write meaningful variable and function names
- Keep functions small and focused on a single responsibility

### Testing
- Write tests for new features and bug fixes
- Run tests before submitting (`bun run test`)
- Aim for high test coverage, especially for business logic

## Commit Guidelines

- Write clear and descriptive commit messages in English
- Use present tense ("Add feature" not "Added feature")
- Keep commits focused and atomic
- Reference issues when applicable (e.g., "Fix #123")

## Pull Request Process

1. Fork the repository
2. Create a feature branch from `main` (`git checkout -b feature/your-feature-name`)
3. Make your changes following the code conventions
4. Ensure all tests pass and add new tests if needed
5. Update documentation if necessary
6. Create a pull request with a clear description of the changes

## Documentation

- All documentation should be written in English
- Update relevant documentation when making changes
- Use clear and concise language

## Questions?

If you have questions about contributing, feel free to open an issue for discussion.

Thank you for contributing to Blindfold Chess!