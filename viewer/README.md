# Stage 7 Viewer

Thin Next.js App Router app for public read-only report viewing at `/r/[slug]`.

## Required environment

Create a local `.env.local` from `.env.example` and set:

```bash
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

The viewer fetches reports server-side by slug. The service-role key must never be exposed to the browser or committed to Git.

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```
