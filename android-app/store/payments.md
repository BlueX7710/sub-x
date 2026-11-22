# Sub-X Pro: setting up payments

Sub-X Pro is a subscription, monthly or yearly, and the first week is free. The paywall, the Account page and the
locks are in `docs/index.html` (search for `Pro: the plan` and `Pro payments`). **Nothing is locked until a key in
`PAY` is filled in** (`PRO_LIVE` then turns on), so the site works exactly as before until then.

## What's free and what's Pro

| Free | Pro |
| --- | --- |
| Timer, inspection and every WCA event | Everything free, plus: |
| ao5, ao12 and the trend chart | Smart-cube splits and stats |
| Sync across devices, connecting a smart cube | Full OLL, PLL, COLL and ZBLL with their trainers |
| Beginner method, 2-look OLL and PLL | Memorizing and the X-cross trainer |

(The list is `PRO_ROWS` and `PRO_PAGES` in the code.) Before payments are live, `?protest=1` gives a testing switch on
the Account page and a pretend Go Pro. The claude.ai page has no paywall: it can't take payments.

## Prices

What similar apps charge (November 2026):

- **Last Cube X** (cube timer): $1.99 a month, $19.99 a year in one listing, and $3.99 and $39.99 in another
  (different dates or regions).
- **Cube Coach** (cube trainer): $0.99 a month, but that only removes ads.
- **Most cube timers** (csTimer, Twisty Timer, Cube Timer, SpeedCube Timer) are free with one-time unlocks or ads,
  and don't publish a subscription price.
- **Education apps generally** (Adapty's 2026 benchmark): median $12.99 a month and $38.42 a year.

That's only a few cubing apps, so it isn't a true average. It puts cubing subscriptions at about **$1–4 a
month**. Sub-X teaches a lot more than a timer does, so $2.99 sits in the middle of that range.

| Plan | Price | Free trial |
| --- | --- | --- |
| Monthly | **$2.99 a month** | 7 days |
| Yearly | **$29.99 a year** (12 × $2.99 = $35.88, so yearly saves 16%) | 7 days |

It's easy to change later: set a new price in Play Console and RevenueCat; the code doesn't need to change.
The app shows whatever the store says, including local prices in other countries and the % saved.

## How it works

- **RevenueCat** keeps the subscriptions for both places. It's free to start and takes a small share above a
  revenue threshold: check revenuecat.com/pricing for the current figures.
- **Android app:** Google requires **Google Play Billing** for subscriptions sold inside an app. The app uses
  RevenueCat's Capacitor plugin (`@revenuecat/purchases-capacitor` 13.8.0), new in **app 1.8**.
- **Website:** RevenueCat **Web Billing**, which charges cards through your **Stripe** account. Its library loads
  from jsDelivr (`@revenuecat/purchases-js` 1.73.2) only when needed.
- Buying needs **Sign in with Google** (the same sign-in as sync). The subscription is stored against the
  Firebase account id, so one subscription works on the website and in the app.
- The GitHub APK pays on the website instead (see below). Apps older than 1.8 can't sell Pro. They still unlock it for people who subscribed on the website, and they
  say "Update the app to subscribe" to everyone else.
- Whether Pro is on is never saved in the backup or synced data, so a backup or restore can't turn it on.

## Your steps (in this order)

### 1. Google Play

1. Play Console → **Setup → Payments profile**: create a payments (merchant) profile and fill in your tax
   and bank details. This is required before you can sell anything.
2. Build and upload **app 1.8** (`gradlew.bat bundleRelease`, see `listing.md`) to the closed test track.
   Play only lets you create subscriptions after a version with the billing permission is uploaded.
3. **Monetize → Products → Subscriptions → Create subscription**: product id `pro`, name "Sub-X Pro".
   - Base plan `monthly`: auto-renewing, billing period 1 month, price **$2.99** (let Play fill other countries).
   - Base plan `yearly`: auto-renewing, billing period 1 year, price **$29.99**.
   - On each base plan, **Add offer → Free trial**: offer id `trial-7d`, eligibility "New customer acquisition"
     (people who never had this subscription), phase: free trial, **7 days**.
   - Activate both base plans and offers.
4. **Setup → License testing**: add your Google account, so test purchases are free.

### 2. Stripe (for the website)

1. Make a Stripe account at stripe.com and finish verification (business or individual, bank account).
2. Sales tax: turn on **Stripe Tax**, or check what your country requires. RevenueCat Web Billing isn't a
   "merchant of record", so tax is your responsibility on the web. (Google Play handles tax in the app.)

### 3. RevenueCat

These steps follow how RevenueCat works, but its dashboard changes: where a name or menu differs, follow
RevenueCat's current guides for **Google Play** and **Web Billing**. What the code needs is fixed: an
entitlement called `pro`, and a current offering with a **Monthly** and an **Annual** package.

1. Sign up at revenuecat.com and make a project "Sub-X".
2. **Add app → Google Play**: package `app.subx.cubetimer`. Follow RevenueCat's guide to give it a Google Cloud
   service account with Play Console access (needed to check purchases). Copy the **public API key**
   (starts with `goog_`).
3. **Add app → Web Billing**: connect your Stripe account. Create two products: monthly at $2.99 and yearly at
   $29.99, each with a **7-day free trial**. Copy the **public API key** (starts with `rcb_`, not `rcb_sb_`).
   For testing first, the sandbox key (`rcb_sb_`) works with Stripe test cards.
4. **Entitlements**: make one called exactly `pro`, and attach the Play product (`pro:monthly`, `pro:yearly`)
   and both web products to it.
5. **Offerings**: make one called `default`, mark it **Current**, and add two packages: **Monthly** with the
   Play `pro:monthly` and web monthly product, **Annual** with `pro:yearly` and web yearly.
6. In the Web Billing app settings, set the app name, support email and your privacy policy link
   (https://bluex7710.github.io/sub-x/privacy.html), and any allowed-domain setting it asks for
   (`bluex7710.github.io`).

### 4. Turn it on

1. Send Claude the two **public** keys (they're meant to be public; never send the secret keys or the Stripe
   secret key). They go in `PAY.web` and `PAY.android` in `docs/index.html`.
2. Test with the sandbox key and a license-tester account: start a trial on the website and in the app, check
   both unlock, cancel, and check Restore purchases in the app.
3. Release **app 1.8** to production first, then push the site with the real keys. (The site update reaches
   the app at once; older apps show "Update the app to subscribe".)

### 5. Play Console forms to update

- **Data safety:** see `listing.md` (it now declares purchase history, user ids and synced data).
- **Content rating:** answer yes to "digital purchases".
- **Account deletion:** apps that let people sign in must offer a way to delete the account and its data. Add
  the URL https://github.com/BlueX7710/sub-x/issues (or an email) under App content → Data deletion, and delete
  the person's Firestore document and RevenueCat customer when asked.
- **Store listing:** the description now says "Free to start" and lists Pro (in `listing.md`).

## Google Play and the GitHub APK

Both stay. Google Play Billing only works in the copy installed from Google Play, so:

- **Google Play app:** subscribes with Google Play Billing, as above.
- **GitHub APK:** built with `bash tools/build-github-apk.sh`, which adds `SubXGitHub/<version>` to its user agent.
  In that copy the Pro card says **Subscribe on the website** and opens the Sub-X website with the card already
  open. People sign in there with the same Google account and pay by card (Stripe). Back in the app, Pro turns on
  (it re-checks within 10 minutes, or straight away when they open the card). This is allowed because that copy
  isn't distributed through Google Play. Attach `android-app/Sub-X.apk` to the GitHub release as before.
- Always build the GitHub APK with the script, never plain `assembleDebug`, or its buy button would try Google
  Play and fail.

## Existing users

When the keys go in, people who already use the CFOP and Roux pages and the stats lose them unless they subscribe.
You may want to announce it first, or give existing users a grace period (not built yet: ask Claude).

## Testing without real payments

`localhost` pages can load a pretend store: set `window.SUBX_PRO_TEST` before the page script runs, with
`user`, `signIn()`, `info()`, `plans()`, `buy(plan)` and `restore()`. This was used to test signed out, free,
free week, paid, cancelled, expired, a failed price load, a cancelled checkout, locked drills, keys and
smart-cube moves on locked trainers, and Memorize. **Not tested:** real purchases, and the Android billing
plugin running on a phone (app 1.8 builds, but it has not been run).
