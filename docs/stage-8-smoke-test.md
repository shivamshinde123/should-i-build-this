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
- Production build profile: `production`

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

## Production build commands

Production artifacts are required before submission to TestFlight or Google Play internal testing.

### Android production

- profile: `production`
- output: Play Store artifact for submission

Command:

```bash
npm run eas:build:android:production
```

### iOS production

- profile: `production`
- output: App Store Connect artifact for TestFlight submission

Command:

```bash
npm run eas:build:ios:production
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

1. Build the production Android artifact:

```bash
npm run eas:build:android:production
```

2. Submit the latest production Android build:

```bash
npm run eas:submit:android:internal
```

Requires:

- a configured Google Play service account
- a Play Console app
- at least one completed Android `production` build in EAS

### TestFlight

1. Build the production iOS artifact:

```bash
npm run eas:build:ios:production
```

2. Submit the latest production iOS build:

```bash
npm run eas:submit:ios:testflight
```

Requires:

- Apple Developer / App Store Connect credentials
- app metadata configured in App Store Connect
- at least one completed iOS `production` build in EAS

## Remaining external blockers

- Android emulator smoke test requires local Android SDK tooling, including `adb` and `emulator`, to be installed and available
- iOS simulator smoke test requires a macOS machine
- iOS internal device preview requires Apple signing credentials to be configured in EAS
- Store submission requires successful `production` builds before running the submit commands
