---
name: effortless
description: Ship a Sub-X change everywhere in one go. Syncs docs/index.html into the claude.ai and Android copies, smoke-tests the website and claude.ai copies in a browser, commits and pushes, and republishes the claude.ai page. Use when the user says /effortless, "ship it", "sync and publish", or asks to push a Sub-X change live.
---

# Ship a Sub-X change

Sub-X has three copies of one app:

| Copy | File | Goes live by |
| --- | --- | --- |
| Website | `docs/index.html` | a push to `main` (GitHub Pages rebuilds `docs/`) |
| Android app | `android-app/www/index.html` | the same push: the app loads the website and updates itself |
| claude.ai page | `claude-ai/sub-x-cube-timer.html` | republishing https://claude.ai/artifact/SBNFEGir43uePASXE5h3N9 |

Make code changes in `docs/index.html` first. The claude.ai copy has no camera or smart cube,
has an AI Review tab instead of Recordings, and has no `<html>` skeleton, so it can't just be copied over.
Files use LF line endings.

## Steps

1. **Sync.** Run `./tools/sync.sh` (or `./tools/sync.sh <commit>` if the change is already committed:
   pass the commit before it). It copies the website to the Android copy and patches the website's
   changes into the claude.ai copy. If it reports a `.rej` file, read it: port the hunks that touch
   shared code by hand, skip the website-only ones (camera, smart cube, splits, install button), then
   delete the `.rej` file.

2. **Test.** Serve both copies and run the smoke test against each. Both must print `OK`:
   ```bash
   npx serve -l 5178 docs &          # the website
   npx serve -l 5179 claude-ai &     # the claude.ai copy
   node tools/smoke.js http://localhost:5178/
   node tools/smoke.js http://localhost:5179/sub-x-cube-timer.html
   ```
   If Playwright isn't found, set `PLAYWRIGHT_PATH` to its folder (in Claude Code cloud sessions:
   `/opt/node-tools/node_modules/playwright`). Also test whatever the change itself touches,
   at desktop and phone width. Don't go on while anything fails.

3. **README.** If a feature was added or changed, update the "What it does" list in `README.md`.

4. **Commit and push.** Stage `docs/`, `android-app/www/`, `claude-ai/`, `README.md` and anything
   else you changed. Write a commit message that says what changed for the user. Push to the branch
   you were told to work on. If that isn't `main`, tell the user the website and app update only
   once it reaches `main`, and offer to merge or open a pull request. Don't merge without asking.

5. **Republish claude.ai.** Use the Artifact tool: read
   https://claude.ai/artifact/SBNFEGir43uePASXE5h3N9 first (it must be read in full before a
   publish from a new session), check it matches the last committed `claude-ai/sub-x-cube-timer.html`
   apart from the claude.ai wrapper (if not, someone edited it there: merge those edits in), then
   publish `claude-ai/sub-x-cube-timer.html` to that URL. Keep its capabilities as they are.

6. **Report** in a few lines: what shipped, where it is live now, and anything still waiting
   (a merge to `main`, or an Android APK build if native code changed:
   `cd android-app && npx cap sync android && cd android && ./gradlew assembleDebug`).
