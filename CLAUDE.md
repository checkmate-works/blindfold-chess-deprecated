# Blindfold Chess - Project Documentation

Welcome to the Blindfold Chess project! This is an open-source web application for practicing chess without seeing the pieces.

🌐 **Live Demo**: https://chess-blindfold.vercel.app/

## Project Overview

Blindfold Chess is a training tool designed to help chess players improve their board visualization and calculation skills. Players must remember piece positions and make moves using algebraic notation without visual aids.

## Documentation

### 📚 [Technical Stack](./docs/tech-stack.md)
Overview of the technologies, frameworks, and libraries used in the project.

### 🏗️ [Architecture](./docs/architecture.md)
Project structure, design patterns, and architectural decisions based on Bulletproof React.

### 💻 [Development Setup](./docs/development.md)
Step-by-step guide for setting up the development environment and running the project locally.

### 🚀 [Deployment](./docs/deployment.md)
Information about deployment configuration and processes using Vercel.

### 🧪 [Testing](./docs/testing.md)
Testing strategy, frameworks, and best practices for unit and integration tests.

## Quick Start

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash

# Clone and setup
git clone git@github.com:checkmate-works/blindfold-chess.git
cd blindfold-chess
bun install
bun run copy-stockfish

# Start development
bun run dev
```

## Key Features

- Play blindfold chess against Stockfish AI
- Multiple difficulty levels
- Move validation and illegal move detection
- Internationalization support (English and Japanese)
- Responsive design for all devices

## Contributing

This is an open-source project. Contributions are welcome! Please see our [Contributing Guide](./CONTRIBUTING.md) for detailed guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.