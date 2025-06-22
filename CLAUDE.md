# Blindfold Chess - Project Documentation

Welcome to the Blindfold Chess project! This is an open-source web application for practicing chess without seeing the pieces.

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
- Sound effects for moves
- Internationalization support (English and Japanese)
- Responsive design for all devices

## Contributing

This is an open-source project. Contributions are welcome! Please ensure that:
- All code follows the existing patterns and conventions
- Documentation is written in English
- Commits messages are clear and in English
- Code passes linting and type checking

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.