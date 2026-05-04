# Should I Build This?

Expo app that takes a project idea and founder background, sends it to a Supabase Edge Function, and returns a saved report with two views:

- Builder View
- Investor View

## Stack

- Expo SDK 54
- React Native + Expo Router
- TypeScript
- NativeWind
- Supabase Postgres + Edge Functions
- Anthropic Claude Sonnet 4
- Next.js 16

## 1. Install dependencies

Root app:

```bash
npm install
```

## 2. Run the mobile app

Start Expo:

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

- `npm run ios` requires macOS + Xcode
- `npm run android` requires Android Studio, an emulator, and `adb`
- `npm run web` is useful for debugging layout, but the main product is native

## 3. If you only want to run the current app

The mobile app already has a Supabase URL, anon key, and public report base URL in [app.json](/d:/WPI%20Things/Should%20I%20Build%20This/app.json) under `expo.extra`.

That means you can run the app locally with:

```bash
npm install
npm run start
```

without setting a root `.env` file.

## 4. If you want your own backend

You need your own Supabase project, database schema, Edge Function secrets, and app config.

### 5.1 Create a Supabase project

Create a project in Supabase, then note:

- project URL
- anon key
- service-role key

### 5.2 Create the `reports` table

The app and viewer expect this schema:

```sql
create table reports (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  idea_text text not null,
  background_text text,
  builder_view jsonb not null,
  investor_view jsonb,
  model text not null,
  created_at timestamptz not null default now(),
  user_id uuid references auth.users
);

create index on reports (created_at desc);
```

Notes:

- `slug` is an 8-character lowercase alphanumeric ID
- `user_id` is nullable in the current v1 flow

### 4.3 Configure the Edge Function

The function is at [supabase/functions/analyze/index.ts](/d:/WPI%20Things/Should%20I%20Build%20This/supabase/functions/analyze/index.ts).

Current function config:

```toml
[functions.analyze]
verify_jwt = false
```

Required function secrets:

- `ANTHROPIC_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Those are required. Without them, `/analyze` will fail.

### 4.4 Add the Anthropic API key

In Supabase project secrets, create:

```text
ANTHROPIC_API_KEY=<your Anthropic API key>
```

Do not put the Anthropic key in the Expo app or in committed files.

### 4.5 Deploy the function

Deploy the `analyze` function to your Supabase project.

After deployment, the mobile app will call:

```text
/functions/v1/analyze
```

### 4.6 Point the app at your project

Update [app.json](/d:/WPI%20Things/Should%20I%20Build%20This/app.json) `expo.extra` values:

- `supabaseUrl`
- `supabaseAnonKey`

## 5. Happy path test

After the app is running:

1. Open `VALIDATE`
2. Enter the idea text
3. Enter founder background
4. Press `STRESS TEST THIS`
5. Wait for the loading screen
6. Confirm the report renders
7. Switch between Builder and Investor views

## 6. Useful commands

Root:

```bash
npm run start
npm run ios
npm run android
npm run web
npm run typecheck
npm run lint -- --no-cache
```

## 7. EAS

The repo also includes [eas.json](/d:/WPI%20Things/Should%20I%20Build%20This/eas.json) and these scripts:

```bash
npm run eas:build:android:preview
npm run eas:build:android:production
npm run eas:build:ios:preview
npm run eas:build:ios:production
npm run eas:build:ios:simulator
npm run eas:submit:android:internal
npm run eas:submit:ios:testflight
```

The detailed internal build flow is in [docs/stage-8-smoke-test.md](/d:/WPI%20Things/Should%20I%20Build%20This/docs/stage-8-smoke-test.md).

## 8. Troubleshooting

If the UI looks stale or wrong:

```bash
npx expo start -c
```

If `/analyze` fails, check:

- Supabase function secrets
- `ANTHROPIC_API_KEY`
- app `supabaseUrl` / `supabaseAnonKey`
- deployed function logs

## References

- [CLAUDE.md](/d:/WPI%20Things/Should%20I%20Build%20This/CLAUDE.md)
- [docs/stage-8-smoke-test.md](/d:/WPI%20Things/Should%20I%20Build%20This/docs/stage-8-smoke-test.md)
