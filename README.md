# Sub-X Cube Timer

A speedcubing timer you can use in the browser, install as an app, or run on Android.

**Open it:** https://bluex7710.github.io/sub-x/

## What it does

- **Timer**: WCA-style scrambles for 2×2, 3×3 and 4×4, a picture of the scrambled cube, 15-second inspection with +2/DNF, and a hold-to-start timer that works with the space bar or by touch.
- **Stats**: current and best single, mo3, ao5, ao12, ao50 and ao100, a trend chart, and a sub-X goal.
- **Learn**: a CFOP guide, notation, 23 F2L cases, 2-look OLL (10 cases), full OLL (all 57) and all 21 PLLs. Each case has a diagram, its algorithm and the setup moves that create it on a solved cube, plus "mark learned", a recognition drill, and timed drills of single cases.
- **Camera**: records each solve while the timer runs, so every clip starts and stops with the solve.
- **AI review**: tap **Review with AI** after a recorded solve. Sub-X saves the clip and opens the claude.ai review page (in the Claude app if installed); pick the clip and you get a breakdown of where the time went (cross, F2L, OLL, PLL, pauses and tips). It runs on your Claude plan, so there's no API bill.

Solves and recordings are stored only on your own device.

## Install

- **Android app**: download `Sub-X.apk` from [Releases](../../releases/latest), open it on your phone and allow the install. The app loads from GitHub Pages, so it updates itself whenever this site changes.
- **Any phone or computer**: open the link above. Then use **Install app** (Chrome, Edge, Android) or **Share → Add to Home Screen** (iPhone/iPad Safari).

## Repository layout

| Folder | What's in it |
| --- | --- |
| `docs/` | The web app, served by GitHub Pages: one `index.html`, plus the manifest, offline service worker and icons. |
| `android-app/` | Capacitor project that wraps the site as an Android app (`npx cap sync android`, then build with Gradle). |
| `claude-ai/` | The claude.ai artifact version, which adds the AI Review tab. |

## Building the Android app

Requirements: Node.js, JDK 21 and the Android SDK (platform 36, build-tools 35).

```bash
cd android-app
npm install
npx cap sync android
cd android
./gradlew assembleDebug   # output: app/build/outputs/apk/debug/app-debug.apk
```
