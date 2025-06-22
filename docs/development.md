# Development Setup

## Prerequisites

### Installing Bun

Bun is the primary package manager and JavaScript runtime for this project.

1. Install Bun using the official install script:
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```
   - This works for both bash and zsh shells
   - Installs Bun in `~/.bun/bin`
   - Automatically updates your environment variables

2. Restart your terminal and verify the installation:
   ```bash
   bun -v
   # Should output version 1.2.2 or higher
   ```

## Project Setup

### 1. Clone the Repository

```bash
git clone git@github.com:checkmate-works/blindfold-chess.git
cd blindfold-chess
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Configure Stockfish

The project uses Stockfish.js for the chess AI. Run the setup script to copy the necessary files:

```bash
bun run copy-stockfish
```

This copies the Stockfish WebAssembly files to the public directory.

## Development Server

Start the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:5173` (Vite's default port).

## Available Scripts

- `bun run dev` - Start the development server
- `bun run build` - Build for production
- `bun run preview` - Preview the production build locally
- `bun run format` - Format code with Prettier
- `bun run lint` - Run ESLint
- `bun run typecheck` - Run TypeScript type checking

## Environment Variables

For local development, create a `.env.local` file in the project root:

```bash
# Optional: Sentry DSN for error tracking
VITE_SENTRY_DSN=your_sentry_dsn_here
```

Environment variables are validated using Zod schemas defined in `src/schemas/env.ts`.

## Git Hooks

The project uses Husky and lint-staged for pre-commit hooks:
- Automatically formats staged files with Prettier
- Runs ESLint on staged TypeScript/JavaScript files
- Ensures code quality before commits

## IDE Setup

### VS Code

Recommended extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

The project includes VS Code settings for consistent formatting and linting.

## Code Conventions

### Import Aliases

Use the `@/` alias for imports from the src directory:

```typescript
// ✅ Good
import type { AlgebraicNotation } from "@/types";
import { generateMoveSuggestions } from "@/utils/move-suggestions";

// ❌ Avoid
import type { AlgebraicNotation } from "../types";
import { generateMoveSuggestions } from "./move-suggestions";
```

The `@/` alias is configured in both Vite and TypeScript to point to the `src/` directory.

### Other Conventions

- Use TypeScript's `type` imports for type-only imports
- Prefer named exports over default exports
- Use meaningful variable and function names
- Follow the existing code patterns in each feature module

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, you can specify a different port:

```bash
bun run dev -- --port 3000
```

### Stockfish Not Loading

If Stockfish fails to load:
1. Ensure you've run `bun run copy-stockfish`
2. Check that `public/stockfish.js` and `public/stockfish.wasm` exist
3. Clear your browser cache and reload

### TypeScript Errors

If you encounter TypeScript errors:
1. Run `bun run typecheck` to see all type errors
2. Ensure your IDE is using the workspace TypeScript version
3. Try deleting `tsconfig.tsbuildinfo` and rebuilding