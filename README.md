## Installing Bun

- Bun can be easily installed using the official install script:
    
    ```bash
    $ curl -fsSL https://bun.sh/install | bash
    ```
    
    - Even if you are using `zsh`, you do not need to change the `bash` part of the above command.
    - This installs Bun in `~/.bun/bin` and updates your environment variables automatically.
- After installation, restart your terminal and verify the installation with:
    
    ```bash
    $ bun -v
    1.2.2
    ```
    
## Clone the repository

```bash
$ git clone git@github.com:checkmate-works/blindfold-chess.git
$ cd blindfold-chess
```

## Install and configure dependencies

```bash
$ bun install
$ bun run copy-stockfish
```

## Starting dev server

```bash
$ bun run dev
```

## Deployment

### Vercel Configuration

When deploying to Vercel, you need to configure the following environment variable:

- `VITE_SENTRY_DSN`: Your Sentry DSN for error tracking
  - You can find this in your Sentry project settings
  - This is required for error tracking in production

To set this up:
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add a new environment variable with the name `VITE_SENTRY_DSN` and your Sentry DSN as the value
