# Sub-X Cube Timer

A speedcubing timer you can use in the browser, install as an app, or run on Android.

**Open it:** https://bluex7710.github.io/sub-x/

## What it does

- **Timer**: WCA-style scrambles for 2×2 to 7×7, one-handed, blindfolded, Pyraminx, Skewb, Megaminx, Square-1 and Clock (or scramble it yourself and optionally type the scramble), a picture of the scrambled cube, 15-second inspection with +2/DNF and **voice calls** at 8 and 12 seconds (beeps where the device can't speak), and a hold-to-start timer that works with the space bar or by touch.
- **Stackmat**: plug a Gen 3 or Gen 4 Stackmat into the microphone jack and press **Connect Stackmat**: each time it stops is saved (website and Android app).
- **Achievements and streaks**: 25 achievements (first solve to sub-10, all of PLL learned, a week of Daily 5, a comp sim podium) and a day streak in the header.
- **Coach**: after a slow step, Sub-X says what to practise. With a smart cube it names the exact OLL or PLL case (counting the time to recognise it) and, in **Must practise** mode, the next solve waits until you've drilled that case 3 times. Without one, a solve well over your ao12 asks where you got stuck and opens that trainer. Set it to **Suggest** or **Off** next to Coach.
- **Welcome tour**: a first visit opens a short welcome card and an optional five-step tour.
- **Send to another device**: in Backup, makes a link that adds all your times and progress on another phone or computer (or shares the backup file when there's too much for a link).
- **Daily 5, sharing and racing**: pick **Daily 5** for five scrambles a day that are the same for everyone (finish them for your daily ao5). **Share** sends a link that opens Sub-X on the same scramble, and **Race a friend** puts two timers on one screen for head-to-head solves on one scramble.
- **Comp sim**: a round of five scrambles run like a competition: 15-second inspection, an optional cutoff and time limit, and your average with the best and worst in brackets, compared with your earlier rounds.
- **F2L practice scrambles**: in **Scramble**, pick **F2L: right hand**, **left hand** or **both hands**. The cross stays solved and the pairs are mixed so they can be solved with only R and U, L and U, or R, L and U, without turning the cube (held white on the bottom). On a smart cube the timer stops when F2L is done.
- **Works offline**: after one visit with internet, the website and the Android app keep working with no connection, fonts and smart-cube library included.
- **Sessions and stats**: separate sessions per event (for example "Comp sim"), with current and best single, mo3, ao5, ao12, ao50 and ao100, a trend chart (singles, ao5 and ao12, with new PBs marked, over the last 50, the last 100 or all solves), and a sub-X goal. Smart-cube solves also get a cross/F2L/OLL/PLL bar for each recent solve.
- **Smart cubes**: connect a GAN (Gen2/3/4) or MoYu AI 2023 cube in the Android app (1.4 or newer) or in Chrome/Edge. Sub-X follows the scramble (moves done are crossed out, and if you go off it, it shows the quickest fix), starts on your first turn, stops when the cube is solved, and records exact cross, F2L, OLL and PLL splits. A 3D cube on the timer turns with yours; under **3D cube** you can hold it white on top or on the bottom and pick its colours (Standard, Bright, Pastel, Neon or your own) and plastic (black, white or stickerless). Uses [gan-web-bluetooth](https://github.com/afedotov/gan-web-bluetooth) (MIT).
- **Solution for every solve**: open a 3×3 solve and tap **Solution**. **Best way** gives a full CFOP solution (the shortest possible cross, then F2L pairs, OLL and PLL from the algorithms in Learn) with a 3D player. **How you solved it** splits your own moves into cross, each pair, OLL and PLL, names the OLL and PLL cases you got, and shows turns, time and TPS for each step, highlighting your longest step, slowest pair and longest pause. Smart-cube solves fill this in by themselves; otherwise type your moves. **Watch yours in 3D** replays a smart-cube solve at the speed you did it, with your pauses marked in red.
- **Six looks**: pick **Look** in the header. Classic and Minimal (black and white, no boxes, a huge thin clock) follow your light/dark setting; Midnight (navy and blue), Terminal (green on black), Speed (racing red, PBs in purple) and Dracula (the editor palette) are dark. In every look the timer's idle, inspection, holding and ready states have their own colours. Your choice is remembered.
- **Save your best solves**: tap **Save** on any solve (a new best says **Save this PB**) to keep a copy in Learn → **My solves**. Each one keeps its scramble and, from a smart cube, your moves: do the same scramble again to try to beat it, watch how you solved it in 3D move by move, or watch the best way. Saved solves stay when you clear a session and are in backups.
- **Backup and import**: save all sessions, solves, learned cases, trainer times and review schedules to a file, and restore (merge) it on any device. Restore also imports a csTimer export: each csTimer session becomes a Sub-X session.
- **Today**: Learn opens on a daily practice plan built from your own times (your slowest step from smart-cube splits, the trainer with your slowest case, 2 new cases to learn and 12 timed solves). Each part ticks off as you do it, and **Remove** drops a part you don't want today.
- **Practise your slowest**: the F2L, OLL, PLL, COLL and CMLL trainers start on **Focus on my slowest**: three cases in four come from your 5 slowest, until they get faster.
- **F2L in the other slots**: all 41 F2L cases for the front-left, back-right and back-left slots, solved without turning the cube (mirror and turned-round versions of the front-right algorithms, each checked in the cube model).
- **Learn times are kept**: every trainer keeps your last 200 timed tries, and drills on the timer keep each case's times, shown on its card in Learn. Both are in backups.
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
./gradlew bundleRelease   # Play Store bundle: app/build/outputs/bundle/release/app-release.aab
```

`bundleRelease` signs with the upload key named in `%LOCALAPPDATA%\SubXBuild\release\keystore.properties`
(or the file in `SUBX_KEYSTORE`); the key isn't in the repo. The Play Store listing text, privacy policy and
release steps are in `android-app/store/listing.md`.
