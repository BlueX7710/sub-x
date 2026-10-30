# Sub-X: notes for Claude

Sub-X is a speedcubing timer and CFOP/Roux trainer that runs as a website, an Android app and a
claude.ai page. It's the owner's own project; `README.md` lists everything it does.

## How the code is laid out

- `docs/index.html` is the website and the main copy: make changes here first. GitHub Pages serves
  `docs/` from `main`, and the Android app loads that site, so a push to `main` updates both.
- `android-app/www/index.html` is an exact copy of the website (for the app's offline start).
- `claude-ai/sub-x-cube-timer.html` is the claude.ai page, https://claude.ai/artifact/SBNFEGir43uePASXE5h3N9.
  It has no camera or smart cube, an AI Review tab instead of Recordings, and no `<html>` skeleton.
- Files use LF line endings. Each copy is one HTML file with no build step.
- To ship a change, use `/effortless` (`.claude/skills/effortless/SKILL.md`): `tools/sync.sh` copies
  the change into the other two copies, `tools/smoke.js` tests a copy in a browser, then commit,
  push and republish the claude.ai page.
- Android APK: `cd android-app && npx cap sync android && cd android && gradlew.bat assembleDebug`. On the
  owner's PC, Java and the Android SDK are in `%LOCALAPPDATA%\SubXBuild` (set `JAVA_HOME` and `ANDROID_HOME`
  to them), and `npm ci` in `android-app` first if `node_modules` is missing. Keep the same debug key, so a
  new APK installs over the old one.
- Play Store: `gradlew.bat bundleRelease` signs with the upload key in `%LOCALAPPDATA%\SubXBuild\release\`
  (`subx-upload.jks` and `keystore.properties`, not in git: never print or commit the password). Listing text,
  the owner's steps and Data safety answers are in `android-app/store/listing.md`; the privacy policy is
  `docs/privacy.html`.
- The Stackmat reader is website and app only (the claude.ai page has no microphone), like the camera and
  smart cube: `tools/sync.sh` rejects those hunks for the claude.ai copy on purpose.- App versions: the app adds `SubX/<version>` to its user agent (`appendUserAgent` in
  `capacitor.config.json`). The site gives scrambles that cancel out to apps older than 1.4 (`OLD_APP` in
  the page), so raising the minimum means a new release on GitHub first, then pushing the site.

## Rules the code keeps

- Every algorithm in Learn is checked in the cube model before it goes in (it must keep what it
  should keep, and cases must be distinct). Don't add one that hasn't been checked.
- A smart cube reports moves with white on top and counts M as two face turns (R and L'): scramble
  tracking and turn counts allow for that.

## Where things stand (October 2026)

- Everything is on `main` and live on the website, the app and the claude.ai page: all 41 F2L cases,
  COLL with a ZBLL-cases option, slowest-case drills, the trend chart with ao12 and PBs, csTimer import,
  smart-cube step bars, Daily 5 scrambles, share links, race mode, the `/effortless` skill, and a fix for
  smart-cube tracking in the Roux trainers. `main-idnlw0` has been merged and isn't needed any more.
- Never tested on real hardware: smart cubes (the owner has a GAN cube that needed charging), the
  phone camera, saving to Documents, and the app offline. The best first smart-cube test is
  Timer → Smart cube → Connect, then a Roux LSE case in Learn.
- Optional: the old Netlify project `sub-x-cube-timer` is no longer used and could be deleted, with the
  owner's OK.
