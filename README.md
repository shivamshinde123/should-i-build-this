# Should I Build This?

Mobile app where you submit a project idea and get back a brutally honest, structured analysis — Builder View (should I build this as a side project?) and Investor View (could I pitch this?). Two verdicts, shareable reports.

## Stack
- Expo (React Native) + TypeScript + Expo Router 6 (new architecture)
- NativeWind v4 + Tailwind v3 — see `tailwind.config.js` for design tokens
- Supabase (Postgres + Edge Functions) — added in stage 4
- Anthropic Claude `sonnet-4-6` with web search + prompt caching — added in stage 5

## Develop

```bash
npm install
npm run start    # dev server with QR code
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # web build for quick preview
npm run typecheck
```

## Project context
- `CLAUDE.md` — full spec, stack, schema, conventions
- `docs/figma/` — reference mockups (4 screens)
- Roadmap and progress notes live in the Obsidian vault under `Projects/Mobile Apps/Should I Build This/`

Each stage of work is tracked as a GitHub issue (#1–#9) and lands via its own PR.
