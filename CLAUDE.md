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
- Android APK: `cd android-app && npx cap sync android && cd android && gradlew.bat assembleDebug`.

## Rules the code keeps

- Every algorithm in Learn is checked in the cube model before it goes in (it must keep what it
  should keep, and cases must be distinct). Don't add one that hasn't been checked.
- A smart cube reports moves with white on top and counts M as two face turns (R and L'): scramble
  tracking and turn counts allow for that.

## Where things stand (October 2026)

- Work is on the branch `main-idnlw0`, three commits ahead of `main`: all 41 F2L cases, COLL with a
  ZBLL-cases option, slowest-case drills, the trend chart with ao12 and PBs, csTimer import, smart-cube
  step bars, Daily 5 scrambles, share links, race mode, the `/effortless` skill, and a fix for smart-cube
  tracking in the Roux trainers. The claude.ai page already has all of it. The website and app get it
  once `main-idnlw0` is merged into `main`: ask the owner before merging.
- Never tested on real hardware: smart cubes (the owner has a GAN cube that needed charging), the
  phone camera, saving to Documents, and the app offline. The best first smart-cube test is
  Timer → Smart cube → Connect, then a Roux LSE case in Learn.
- Optional: the old Netlify project `sub-x-cube-timer` is no longer used and could be deleted, with the
  owner's OK.
