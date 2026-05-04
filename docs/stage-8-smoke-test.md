# Stage 8 Smoke Test and Internal Build Runbook

## Scope

This project's Stage 8 covers:

- local happy-path smoke test
- EAS preview builds for Android and iOS
- internal distribution handoff steps

Happy path:

1. Enter idea text and founder background on `VALIDATE`
2. Start analysis
3. Wait for loading/synthesizing
4. Verify Builder and Investor report views render
5. Copy the share link
6. Open the `/r/<slug>` web viewer and confirm the same report loads

## Current repo setup

- EAS project linked: `7426fb94-434a-4f99-b733-ad191d0f2756`
- Expo owner: `shivamshinde1234`
- Preview build profile: `preview`
- iOS simulator build profile: `preview-simulator`

## Current remote build status

- iOS simulator preview build finished successfully
- iOS simulator build id: `490fd52b-c4bd-4399-9ce3-7e5ad05a9e14`
- Android preview build id: `cec85f57-2345-47ef-b96a-e5e5d4e05cdd`
- Android preview build status should be checked with `npx eas build:list`
- iOS device preview build is not yet available from this repo alone because Apple internal-distribution credentials are still missing in EAS

## Build profiles

### Android preview

- profile: `preview`
- output: APK
- intended for: Android emulator or direct internal install

Command:

```bash
npm run eas:build:android:preview
```

### iOS internal preview

- profile: `preview`
- output: internal distribution build
- intended for: ad hoc internal install
- requirement: Apple Developer account and registered devices
- current blocker: EAS could not find suitable iOS credentials in non-interactive mode

Command:

```bash
npm run eas:build:ios:preview
```

### iOS simulator

- profile: `preview-simulator`
- output: iOS simulator build
- intended for: Xcode simulator install without TestFlight

Command:

```bash
npm run eas:build:ios:simulator
```

## Local smoke test steps

### Android emulator

Prerequisites:

- Android Studio installed
- at least one AVD created
- `adb` and `emulator` available on PATH

Run:

```bash
npm install
npx expo start --android
```

Verify:

- app launches without red screen
- Validate form accepts input
- analyze request succeeds
- Reports tab renders Builder and Investor content
- share link copies and opens the correct web viewer route

### iOS simulator

Prerequisites:

- macOS host
- Xcode installed
- iOS Simulator available

Run:

```bash
npx expo start --ios
```

Verify the same happy path as Android.

## Internal distribution

### Google Play internal

Build a store-ready Android binary with `production`, then submit it:

```bash
npm run eas:submit:android:internal
```

Requires a configured Google Play service account and Play Console app.

### TestFlight

Submit an iOS store build:

```bash
npm run eas:submit:ios:testflight
```

Requires Apple Developer / App Store Connect credentials and app metadata.

## Environment limitations on this workstation

At the time this runbook was created:

- Windows host cannot run an iOS Simulator
- `adb` was not available on PATH
- `emulator` was not available on PATH

That means EAS configuration can be completed here, but full iOS simulator verification and local Android emulator verification require additional machine setup.

## Remaining external blockers

- Android emulator smoke test requires local Android SDK tooling on PATH
- iOS simulator smoke test requires a macOS machine
- iOS internal device preview requires Apple signing credentials to be configured in EAS interactively
