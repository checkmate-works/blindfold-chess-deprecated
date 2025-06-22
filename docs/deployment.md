# Deployment

## Platform

The application is deployed on **Vercel**, which provides:
- Automatic deployments from Git
- Preview deployments for pull requests
- Global CDN distribution
- Zero-configuration deployment for Vite applications

## Configuration

### vercel.json

The project includes a `vercel.json` configuration file that ensures proper SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

This configuration redirects all routes to the root `index.html`, allowing React Router to handle client-side routing.

## Build Settings

Vercel automatically detects the Vite framework and applies appropriate build settings:

- **Build Command**: `bun run build`
- **Output Directory**: `dist`
- **Install Command**: `bun install`

## Environment Variables

### Required Configuration

When deploying to Vercel, you need to configure the following environment variable:

- **`VITE_SENTRY_DSN`**: Your Sentry DSN for error tracking
  - Find this in your Sentry project settings
  - Required for error tracking in production

### Setup Instructions

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add a new environment variable with the name `VITE_SENTRY_DSN` and your Sentry DSN as the value

### Environment Types

Vercel supports different environment variable scopes:
- Production environment variables
- Preview environment variables
- Development environment variables (for Vercel CLI)

The application uses Zod to validate environment variables at build time (see `src/schemas/env.ts`).

## Deployment Process

1. **Automatic Deployment**: Every push to the `main` branch triggers a production deployment
2. **Preview Deployments**: Pull requests automatically create preview deployments
3. **Manual Deployment**: Can be triggered from the Vercel dashboard or CLI

## Performance Optimizations

Vercel automatically provides:
- Brotli compression
- HTTP/2 support
- Immutable caching for static assets
- Edge network distribution

## Monitoring

- Build logs are available in the Vercel dashboard
- Runtime logs can be viewed for serverless functions (if any)
- Analytics and Web Vitals monitoring (if enabled)