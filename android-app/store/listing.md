# Sub-X on Google Play

Everything to paste into the Play Console, and the steps that need the owner.

## Build

- Upload: `android-app/android/app/build/outputs/bundle/release/app-release.aab`. Build it with
  `cd android-app && npx cap sync android && cd android && gradlew.bat bundleRelease`
  (with `JAVA_HOME` and `ANDROID_HOME` set as in `CLAUDE.md`).
- It's signed with the **upload key** in `%LOCALAPPDATA%\SubXBuild\release\` (`subx-upload.jks` and
  `keystore.properties`, which holds its password). These are not in git. **Back up that folder** somewhere
  safe (a USB stick or a password manager). With Play App Signing, a lost upload key can be reset through
  Google support, but it's slow.
- Package name: `app.subx.cubetimer`. Version 1.8 (version code 9). 1.8 adds Google Play Billing for Sub-X Pro:
  set up the subscription with `payments.md` before releasing it.
- The Play version and the GitHub APK are signed with different keys, so Android won't update one with the
  other: people who sideloaded the APK uninstall it before installing from Play (backing up their times first,
  or using Send to another device).

## Store listing

**App name** (30 max): `Sub-X: Cube Timer & Trainer`

**Short description** (80 max):
`Speedcubing timer with CFOP and Roux trainers, smart cube splits and comp sim.`

**Full description:**

```
Sub-X is a speedcubing timer that teaches you too. Free to start, no ads, and it works offline.

TIMER
• Competition-style 15-second inspection with "8 seconds" and "12 seconds" calls
• Single, mo3, ao5, ao12, ao50 and ao100, personal bests and a trend chart
• Comp sim: a round of five like at a competition, with a cutoff and time limit
• Race a friend on one phone, and Daily 5 scrambles that are the same for everyone
• 3×3, 2×2, 4×4, 5×5, 6×6, 7×7, One-Handed, Blindfolded, Pyraminx, Skewb, Megaminx, Square-1 and Clock
• Sessions, +2 and DNF, backups and csTimer import

LEARN (free: the beginner method, 2-look OLL and PLL, cross and F2L)
• Every CFOP case: cross, all 41 F2L cases (and the other three slots), 2-look and full OLL, PLL and COLL
• Roux: first block, second block, CMLL and LSE
• A 3D player for every algorithm, and drills for any case
• Trainers that time your recognition and solving, and focus on your slowest cases
• Today: a short daily practice plan made from your own times

SMART CUBES AND TIMERS
• Connect a GAN or MoYu AI smart cube: the timer starts on your first turn and every solve gets
  cross, F2L, OLL and PLL splits, with a real-speed replay
• Plug in a Stackmat timer through the headphone jack

KEEP GOING
• Streaks and 25 achievements, from your first solve to sub-10
• Move all your times to a new phone with one link

SUB-X PRO
• Full OLL, PLL, COLL and ZBLL trainers, memorizing, the X-cross trainer and smart-cube splits
• $2.99 a month or $29.99 a year, and the first week is free. Cancel any time in Google Play.

Your times stay on your device unless you sign in to sync them.
```

**Category:** Sports (or Education). **Tags:** puzzle, timer, Rubik's-style cube.
Don't use "Rubik's" in the name or as a main keyword: it's a trademark.

**Contact email:** your developer email. **Website:** https://bluex7710.github.io/sub-x/
**Privacy policy:** https://bluex7710.github.io/sub-x/privacy.html

**Release notes (1.8):**
```
• Sub-X Pro: full OLL, PLL, COLL and ZBLL trainers, memorizing, the X-cross trainer and smart-cube splits.
  $2.99 a month or $29.99 a year, and the first week is free
• The timer, every event, ao5/ao12, the beginner method and 2-look OLL and PLL stay free
```

**Release notes (1.5):**
```
• Comp sim rounds with cutoff and time limit
• Voice calls during inspection
• New events: 6×6, 7×7, Blindfolded, Megaminx, Square-1 and Clock
• Achievements and day streaks
• Stackmat timer support
• Send all your times to another device with one link
• A welcome tour for new cubers
```

## Graphics (ready in `store/graphics/`)

- App icon 512×512: `graphics/icon-512.png` (same as `docs/icon-512.png`).
- Feature graphic 1024×500: `graphics/feature-1024x500.png`.
- Phone screenshots 1080×1920: `graphics/phone-1-welcome.png` to `phone-7-oll.png`, taken from the live site
  with the app's user agent. Swap in real phone shots later (a solve in progress, stats with real times).

## App content answers

- **Ads:** no ads.
- **Data safety** (filled in Play Console on 23 Nov 2026; sync and Pro are optional and need Google sign-in):
  - Collected, optional, not shared, not processed ephemerally: **Personal info → Name, Email address, User IDs**
    (app functionality, account management); **Financial info → Purchase history** (Pro, via Google Play and
    RevenueCat; app functionality); **App activity → Other user-generated content** (times and progress, only with
    sync; app functionality).
  - Encrypted in transit: yes. Account creation: OAuth (Google sign-in). Delete-account link:
    https://bluex7710.github.io/sub-x/privacy.html#delete-account
  - Not shared or sold (RevenueCat, Google Firebase and Google Play act as service providers). The microphone
    (Stackmat) is used on the device only and nothing is sent.
- **Content rating:** fill the IARC questionnaire as a utility/tool with no violence, user content, chat,
  gambling. Answer **yes to digital purchases** (Sub-X Pro). It should come out as Everyone / PEGI 3, with "In-app purchases".
- **Target audience:** 13 and over is simplest. Including under-13s brings in the Families policy rules.
- **Permissions to explain:** microphone (Stackmat signal), Bluetooth and
  location on Android 11 and older (finding smart cubes; location isn't used).

## Steps for the owner

1. Make a Google Play developer account (play.google.com/console, $25 once) and finish the identity check.
2. Create the app "Sub-X: Cube Timer & Trainer" (app, free).
3. New personal accounts must run a **closed test with at least 12 testers for 14 days** before production:
   make a closed testing track, upload the `.aab`, and add testers' Google accounts or a Google Group.
4. Fill in the store listing, graphics and App content answers above.
5. After 14 days, apply for production access and release.
6. Before releasing 1.8: set up Sub-X Pro with `payments.md` (payments profile, subscription, RevenueCat).
