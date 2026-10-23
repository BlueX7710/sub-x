# Sub-X Cube Timer

A speedcubing timer you can use in the browser, install as an app, or run on Android.

**Open it:** https://bluex7710.github.io/sub-x/

## What it does

- **Timer**: WCA-style scrambles for 2×2 to 5×5, one-handed, Pyraminx and Skewb (or scramble it yourself and optionally type the scramble), a picture of the scrambled cube, 15-second inspection with +2/DNF, and a hold-to-start timer that works with the space bar or by touch.
- **Daily 5, sharing and racing**: pick **Daily 5** for five scrambles a day that are the same for everyone (finish them for your daily ao5). **Share** sends a link that opens Sub-X on the same scramble, and **Race a friend** puts two timers on one screen for head-to-head solves on one scramble.
- **Sessions and stats**: separate sessions per event (for example "Comp sim"), with current and best single, mo3, ao5, ao12, ao50 and ao100, a trend chart (singles, ao5 and ao12, with new PBs marked, over the last 50, the last 100 or all solves), and a sub-X goal. Smart-cube solves also get a cross/F2L/OLL/PLL bar for each recent solve.
- **Smart cubes**: connect a GAN (Gen2/3/4) or MoYu AI 2023 cube in the Android app (1.3 or newer) or in Chrome/Edge. Sub-X follows the scramble (moves done are crossed out, and if you go off it, it shows the quickest fix), starts on your first turn, stops when the cube is solved, and records exact cross, F2L, OLL and PLL splits. Uses [gan-web-bluetooth](https://github.com/afedotov/gan-web-bluetooth) (MIT).
- **Solution for every solve**: open a 3×3 solve and tap **Solution**. **Best way** gives a full CFOP solution (the shortest possible cross, then F2L pairs, OLL and PLL from the algorithms in Learn) with a 3D player. **How you solved it** splits your own moves into cross, each pair, OLL and PLL, names the OLL and PLL cases you got, and shows turns, time and TPS for each step, highlighting your longest step, slowest pair and longest pause. Smart-cube solves fill this in by themselves; otherwise type your moves.
- **Backup and import**: save all sessions, solves, learned cases, trainer times and review schedules to a file, and restore (merge) it on any device. Restore also imports a csTimer export: each csTimer session becomes a Sub-X session.
- **Learn**: pick CFOP or Roux (and make either one your default). Each CFOP step opens with a short lesson, then practice; each Roux step has Teach (the lesson and a worked example in 3D) and Train modes. Trainers for the cross, F2L, OLL, PLL, COLL, and the Roux first block, second block, two-look CMLL and last six edges (the shortest cross, block or LSE is found for every case; each trainer has a recognition and solving clock that runs by itself with a smart cube, plus turns and TPS); two-look CMLL for Roux, notation, all 41 F2L cases, 2-look OLL (10 cases), full OLL (all 57), all 21 PLLs and all 40 COLLs. The COLL trainer can also mix up the edges, so you practise every ZBLL case as COLL then an edge PLL. The F2L, OLL, PLL and COLL trainers save each case's times, list your slowest cases, and have a **My slowest** option to drill just those. F2L cases are shown in 3D, and every case has a "Watch in 3D" player that animates the algorithm move by move. Each case has its algorithm and the setup moves that create it on a solved cube, plus "mark learned", a recognition drill with spaced repetition, and timed drills of single cases.
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
| `tools/` | `sync.sh` copies website changes into the other two copies; `smoke.js` tests a copy in a browser. |
| `.claude/skills/effortless/` | The `/effortless` Claude Code skill: sync, test, commit, push and republish in one go. |

## Building the Android app

Requirements: Node.js, JDK 21 and the Android SDK (platform 36, build-tools 35).

```bash
cd android-app
npm install
npx cap sync android
cd android
./gradlew assembleDebug   # output: app/build/outputs/apk/debug/app-debug.apk
```
