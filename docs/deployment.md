# Deployment

## Live Application

🌐 **Production URL**: https://chess-blindfold.vercel.app/

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

When deploying to Vercel, you need to configure the following environment variables:

- **`VITE_SENTRY_DSN`**: Your Sentry DSN for error tracking
  - Find this in your Sentry project settings
  - Required for error tracking in production

### Optional Configuration

- **`VITE_GA_MEASUREMENT_ID`**: Google Analytics 4 Measurement ID
  - Format: `G-XXXXXXXXXX`
  - Used for user behavior analytics
  - Only active in production environment
  - If not set, Google Analytics will be disabled

### Setup Instructions

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the required environment variables:
   - **Name**: `VITE_SENTRY_DSN`, **Value**: Your Sentry DSN
   - **Name**: `VITE_GA_MEASUREMENT_ID`, **Value**: Your GA4 Measurement ID (optional)
4. Set environment scope to "Production" for both variables

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
- Google Analytics 4 for user behavior tracking (if configured)
- Sentry for error tracking and performance monitoring