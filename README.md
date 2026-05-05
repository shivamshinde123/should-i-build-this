# Should I Build This?

Expo app that takes a startup idea plus founder background, sends it to a Supabase Edge Function backed by Anthropic, and returns a two-part report:

- Builder View
- Investor View

## Stack

- Expo SDK 54
- React Native + Expo Router
- TypeScript
- NativeWind
- Supabase Postgres
- Supabase Edge Functions
- Anthropic Claude Sonnet 4

## Repo layout

- `app/`: Expo Router screens
- `components/`: UI building blocks and report session state
- `constants/`: runtime config and theme tokens
- `lib/`: API client and report shaping helpers
- `supabase/functions/analyze/`: backend function that calls Anthropic and writes to Postgres
- `docs/`: smoke test notes and design references

## Prerequisites

- Node.js 20+
- npm
- Expo Go or a local simulator/device
- Supabase account if you want to run the app with your own backend
- Anthropic API key if you want to run the app with your own backend
- Supabase CLI if you want to deploy the Edge Function from this repo

## Install

```bash
npm install
```

## Run the app

```bash
npm run start
```

Other targets:

```bash
npm run ios
npm run android
npm run web
```

Notes:

- `npm run ios` requires macOS + Xcode.
- `npm run android` requires Android Studio, an emulator, and `adb`.
- `npm run web` works for layout/debugging, but this repo is primarily a native app.

## Two ways to run this repo

### Option 1: Run against the backend already checked into `app.json`

The app currently reads its public backend config from [app.json](/d:/WPI%20Things/Should%20I%20Build%20This/app.json), not from a root `.env` file.

Right now that file already contains:

- `expo.extra.supabaseUrl`
- `expo.extra.supabaseAnonKey`

So if you only want to boot the current app locally, this is enough:

```bash
npm install
npm run start
```

### Option 2: Run with your own credentials

If another developer wants to use their own Supabase project and their own Anthropic key, they need to configure both the backend and the mobile app.

## Backend setup with your own Supabase project

### 1. Create a Supabase project

Create a new Supabase project and collect these values:

- Project URL
- Project anon key
- Project service role key
- Project ref

You will use:

- the URL + anon key in the Expo app
- the URL + service role key as Edge Function secrets

### 2. Create the `reports` table

This repo has a `supabase/` directory and function config, but it does not currently contain a SQL migration for the `reports` table. Create the table manually in the Supabase SQL editor, or add your own migration before running the app.

Use this schema:

```sql
create extension if not exists pgcrypto;

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  idea_text text not null,
  background_text text,
  builder_view jsonb not null,
  investor_view jsonb not null,
  model text not null,
  created_at timestamptz not null default now(),
  user_id uuid references auth.users (id)
);

create index if not exists reports_created_at_idx
  on public.reports (created_at desc);
```

Notes:

- `slug` must be unique. The function generates an 8-character lowercase alphanumeric value.
- `user_id` is optional in the current flow. The app does not require sign-in.
- The current app only shows the most recent in-memory report session. It does not yet fetch historical reports from Supabase.

### 3. Deploy the `analyze` Edge Function

The function lives at [supabase/functions/analyze/index.ts](/d:/WPI%20Things/Should%20I%20Build%20This/supabase/functions/analyze/index.ts).

The repo-level function config is in [supabase/config.toml](/d:/WPI%20Things/Should%20I%20Build%20This/supabase/config.toml):

```toml
[functions.analyze]
verify_jwt = false
```

That matches the current mobile client, which calls the function with the public anon key and does not require a signed-in user.

If you are using the Supabase CLI, the typical flow is:

```bash
npx supabase login
npx supabase link --project-ref <your-project-ref>
npx supabase functions deploy analyze
```

### 4. Add required Edge Function secrets

The function will fail at runtime unless these secrets are present:

- `ANTHROPIC_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

You can set them in the Supabase dashboard or with the CLI:

```bash
npx supabase secrets set ANTHROPIC_API_KEY=<your-anthropic-key>
npx supabase secrets set SUPABASE_URL=<your-supabase-url>
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

Important:

- Do not put the Anthropic API key in the Expo app.
- Do not commit the service role key anywhere in this repo.
- The mobile app should only ever use the public anon key.

## Mobile app setup with your own Supabase credentials

The app reads runtime config from [constants/runtime.ts](/d:/WPI%20Things/Should%20I%20Build%20This/constants/runtime.ts), which pulls values from `expo.extra` in [app.json](/d:/WPI%20Things/Should%20I%20Build%20This/app.json).

Update these fields in `app.json`:

```json
"extra": {
  "supabaseUrl": "https://YOUR_PROJECT_REF.supabase.co",
  "supabaseAnonKey": "YOUR_SUPABASE_ANON_KEY",
  "router": {},
  "eas": {
    "projectId": "..."
  }
}
```

Only these two app values are required for the current runtime:

- `supabaseUrl`
- `supabaseAnonKey`

After that, the app will send requests to:

```text
<supabaseUrl>/functions/v1/analyze
```

## Verification

After configuring your backend and updating `app.json`:

1. Start the app with `npm run start`.
2. Open the `Validate` tab.
3. Enter an idea.
4. Enter founder background.
5. Press `Stress test this`.
6. Wait for the loading screen to finish.
7. Confirm the report opens in the `Reports` tab.
8. Switch between Builder View and Investor View.
9. Confirm source citations render at the bottom when Anthropic web search returns them.

## Useful commands

```bash
npm run start
npm run ios
npm run android
npm run web
npm run typecheck
npm run lint -- --no-cache
```

## EAS build commands

This repo already includes [eas.json](/d:/WPI%20Things/Should%20I%20Build%20This/eas.json) and these scripts:

```bash
npm run eas:build:android:preview
npm run eas:build:android:production
npm run eas:build:ios:preview
npm run eas:build:ios:production
npm run eas:build:ios:simulator
npm run eas:submit:android:internal
npm run eas:submit:ios:testflight
```

If you build the app for your own backend, make sure `app.json` points at your own Supabase project before running EAS builds.

## Troubleshooting

If Expo serves stale assets:

```bash
npx expo start -c
```

If the app crashes immediately on startup:

- Check that `expo.extra.supabaseUrl` exists in `app.json`.
- Check that `expo.extra.supabaseAnonKey` exists in `app.json`.

If the stress test request fails:

- Confirm the `analyze` function is deployed.
- Confirm `ANTHROPIC_API_KEY` is set in Supabase secrets.
- Confirm `SUPABASE_URL` is set in Supabase secrets.
- Confirm `SUPABASE_SERVICE_ROLE_KEY` is set in Supabase secrets.
- Confirm the `reports` table exists.
- Check the Supabase function logs for the `analyze` function.

If report saving fails:

- Check that the `reports.slug` unique constraint exists.
- Check that `builder_view` and `investor_view` are `jsonb`.
- Check that your service role key belongs to the same Supabase project as the deployed function.

## Related docs

- [CLAUDE.md](/d:/WPI%20Things/Should%20I%20Build%20This/CLAUDE.md)
- [docs/stage-8-smoke-test.md](/d:/WPI%20Things/Should%20I%20Build%20This/docs/stage-8-smoke-test.md)
