# Should I Build This?

Mobile app where a user submits a project idea (one line or a paragraph) and gets back a brutally honest, structured analysis — like a senior engineer and a product person reviewed it over coffee. Two lenses: **Builder View** (should I build this as a side project?) and **Investor View** (could I pitch this?).

Target user: students and early-career builders deciding what side project to pour weeks into. Secondary: indie hackers stress-testing an idea before committing.

Canonical project notes live in the Obsidian vault at `Projects/Mobile Apps/Should I Build This/` (Overview, Architecture, Progress, Roadmap, Dependencies). Read those at session start; update them as work lands.

## Stack

**Mobile**
- Expo (React Native) + TypeScript, EAS for builds
- Expo Router (file-based navigation)
- NativeWind (Tailwind for RN)
- React Native Reusables (shadcn-equivalent for RN)
- Zustand or React Query — add only when a real need appears

**Backend**
- Supabase: Postgres (`reports` table) + Edge Functions (Deno) that proxy the Anthropic API so the key never ships to device. Auth deferred to v2.
- Anthropic API: `claude-sonnet-4-6` with the `web_search_20250305` tool, prompt caching on the system prompt.

**Web report viewer (v1)**
- Thin Next.js app at `/r/<slug>` for sharing reports to people without the app. Read-only, pulls JSON from Supabase by slug.

## Data flow

1. User submits idea → app POSTs to Supabase Edge Function `/analyze`.
2. Edge Function calls Anthropic API with system prompt + idea + web search tool.
3. Edge Function inserts the full report into `reports`, returns the slug.
4. App renders report from local state; share button copies `/r/<slug>` URL.
5. Web viewer fetches by slug and renders read-only.

v1 default: single completion response with a fun loading screen. Streaming is a v2 consideration.

## Schema (v1)

```sql
create table reports (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,        -- nanoid(8)
  idea_text       text not null,
  background_text text,
  builder_view    jsonb not null,
  investor_view   jsonb,
  model           text not null,
  created_at      timestamptz not null default now(),
  user_id         uuid references auth.users   -- nullable in v1
);

create index on reports (created_at desc);
```

## Analysis angles

**Builder View:** Problem Clarity, Market Landscape, Technical Feasibility, Possible Approaches (2–3 paths with pros/cons/time), Learning Value, Time to Build (phased), Portfolio Impact, Fun Factor, Final Verdict (build / don't build / build smaller version).

**Investor View:** Investability Score (/10), Market Size (TAM/SAM/SOM), Defensibility/Moat, Traction Requirements, Business Model Clarity, Founder-Market Fit, Red Flags, What's Missing to Become Investor-Ready, Comparable Funded Startups (via web search).

Problem Clarity and Market Landscape are shared across both views. Final report has two verdicts: side-project + investability.

## v1 scope (weekend ship — target 2026-05-04)

Idea input screen → loading screen → Builder View report → save → share link → thin web viewer. **No** Investor View, founder-market fit, or auth in v1.

## Design

The app UI is designed in Figma. When implementing screens, fetch the latest design via the Figma MCP (`mcp__figma__get_figma_data`, `mcp__figma__download_figma_images`) rather than guessing layouts, spacing, or colors. Load the `figma:figma-implement-design` skill before translating Figma frames to React Native code.

## Conventions

- API key lives only in Supabase Edge Function env. Device uses the Supabase anon key.
- Validate the model's JSON output server-side before insert.
- Slugs are `nanoid(8)`.
- Rate limiting deferred until there are real users.
- When using the Anthropic SDK, follow the `claude-api` skill (prompt caching on the system prompt is a hard requirement).
- Use Context7 (`mcp__claude_ai_Context7__query-docs`) for Expo / NativeWind / Supabase / Anthropic SDK docs before guessing API shapes.
- Use the Supabase MCP tools for project setup, migrations, and log inspection.

## Out of scope for v1

Investor View, founder-market fit input, auth, history, refinement chat, comparing reports, public gallery, paid tier. All tracked in Obsidian Roadmap (Phases 2–4).
