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
- **Website:** **Paddle**, opened by RevenueCat's web library (`@revenuecat/purchases-js` 1.73.2, loaded from jsDelivr
  only when needed). Paddle takes cards, **PayPal** and Apple Pay, and as the seller of record it charges and pays
  the sales tax/VAT in each buyer's country. It takes about 5% + $0.50 a sale (check paddle.com/pricing).
- Prices on the website: Paddle adds the buyer's sales tax on top of $2.99/$29.99 (in Indonesia that showed as
  $3.32 a month). To make the price include tax instead, change each Paddle price's tax setting to "Tax inclusive".
- Buying needs **Sign in with Google** (the same sign-in as sync). The subscription is stored against the
  Firebase account id, so one subscription works on the website and in the app.
- The GitHub APK pays on the website instead (see below). Apps older than 1.8 can't sell Pro. They still unlock it for people who subscribed on the website, and they
  say "Update the app to subscribe" to everyone else.
- Whether Pro is on is never saved in the backup or synced data, so a backup or restore can't turn it on.

## Where it stands (23 November 2026)

Done:
- **Play Console** (developer account Blue_X, app Sub-X `app.subx.cubetimer`): store listing with text, icon,
  feature graphic and 7 screenshots; category Sports; contact email and website; every App content form
  (content rating Everyone / PEGI 3, target age 13+, Data safety, sign-in details, trader status).
- **Payments:** merchant profile (MILA's payments profile, statement name SUBX), the 15% service fee (account
  group Blue_X), subscription `pro` with base plans `monthly` $2.99 and `yearly` $29.99, each with an active
  `trial-7d` offer (7 days free, new subscribers only).
- **Testing:** email list "Sub-X testers" (the owner's Gmail) used for license testing, the internal test
  (1.8, version code 9, live: https://play.google.com/apps/internaltest/4700828412526386314) and the closed test
  "Closed testing - Alpha" (all countries; sent for Google's review on 23 Nov). Testers join the closed test at
  https://play.google.com/apps/testing/app.subx.cubetimer. Production needs 12 testers opted in for 14 days.

- **Google Cloud** (project "Sub-x", `sub-x-feb6b`): terms accepted; Google Play Android Developer API, Google Play
  Developer Reporting API and Pub/Sub API on; service account `revenuecat@sub-x-feb6b.iam.gserviceaccount.com`
  (roles Pub/Sub Editor, Monitoring Viewer), invited in Play Console with the four permissions RevenueCat needs.
- **Decisions:** Paddle prices include tax; Pro is free for everyone for two weeks after the website launch
  (`PRO_OPEN_UNTIL`, see "Existing users"); the Android key may go live on its own first.
- **RevenueCat:** Play Store app "Sub-X (Play Store)" (`app.subx.cubetimer`); products `pro:monthly` (backwards
  compatible) and `pro:yearly`, both on the `pro` entitlement and in the `default` offering's Monthly and Annual
  packages next to the Paddle prices. Its public key is in `PAY.android` and live on `main` (23 Nov): Pro locks only
  in the Play app (internal/closed testers so far); the website, the GitHub APK and older apps stay free until
  `PAY.web` gets the Paddle setup's `pdl_` public key. Purchases only validate once the service-account key is
  uploaded (below).
- **Before the production release:** rebuild the bundle as version code 10 so its offline copy also has the key
  (version code 9's offline copy has `android: ''`, so Pro is open in the Play app when it starts offline).

Waiting on the owner:
- Sign in to RevenueCat and Paddle (both logged out), add 11+ more testers to "Sub-X testers", finish the Paddle
  live account.
- The service account's key (step 3.5 below): create it and upload it to RevenueCat yourself; it's a credential.

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

### 2. Paddle (for the website)

Paddle keeps test ("sandbox", sandbox-vendors.paddle.com) and live (vendors.paddle.com) as separate accounts.
The sandbox one is already set up; repeat these steps on the live account when going live (Paddle reviews the
live account and website first):

1. **Catalog → Products → New product** "Sub-X Pro", with two prices: **$2.99 monthly** and **$29.99 yearly**,
   each with a **7-day free trial** (Trials on, "Free trial", 7 days). Tax mode **included in price** (decided
   23 Nov 2026: buyers pay $2.99 / $29.99 everywhere, like Google Play's prices, and Paddle takes the tax out of it).
2. **Checkout → Checkout settings**: Payment methods: **PayPal** and Apple Pay on (Google Pay needs Paddle's extra
   check first); Default payment link **https://pay.rev.cat**; Recovery (abandoned checkout emails) **off**.
3. **Checkout → Website approval** (live only): add `pay.rev.cat` and `bluex7710.github.io`.
4. **Developer tools → Authentication → New API key** for RevenueCat, set to **never expire**. Copy the secret
   (`pdl_live_...`, or `pdl_sdbx_...` in sandbox) from the pop-up straight after saving: Paddle shows it once.
   RevenueCat lists the permissions it needs; read for everything plus write for client-side tokens, customer
   portal sessions and transactions. (The sandbox key has write on everything, set while finding a paste problem;
   trim it to that list.)

### 3. RevenueCat

What the code needs is fixed: an entitlement called `pro`, and a current offering with a **Monthly** and an
**Annual** package. Done in the sandbox: project "Sub-X", entitlement `pro`, offering `default`, and the Paddle
setup "Sub-X (Paddle)". (An earlier Stripe setup, "Sub-X (RevenueCat Billing)", is still there but unused:
RevenueCat won't delete it because it has an old test purchase. Its products were taken out of the `default`
offering on 23 Nov, so it isn't offered anywhere.)

1. **Web → New web provider → Paddle**: names "Sub-X (Paddle)" / "Sub-X", paste the Paddle API key with **Set
   secret**, keep Automatic tracking and autogenerated user IDs, **Connect to Paddle**.
2. **Product catalog → Products → Sub-X (Paddle) → Import** both Paddle prices.
3. Attach them to the `pro` entitlement, and add them to the `default` offering's Monthly and Annual packages.
4. The Paddle setup's **Public API Key** (starts with `pdl_`) is what goes in `PAY.web`.
5. **Add app → Google Play**: package `app.subx.cubetimer`. Copy the **public API key** (starts with `goog_`) for
   `PAY.android`, and attach the Play products (`pro:monthly`, `pro:yearly`) to `pro` and the offering's packages.
   Then give RevenueCat a Google Cloud service account (RevenueCat's checklist, read 23 Nov 2026):
   - Google Cloud project "Sub-x" (`sub-x-feb6b`): enable **Google Play Android Developer API**, **Google Play
     Developer Reporting API** and **Pub/Sub API**.
   - **IAM → Service accounts → Create**, e.g. `revenuecat`, with roles **Pub/Sub Editor** and **Monitoring Viewer**.
   - Play Console → **Users and permissions → Invite new users**: the service account's email; add the app; account
     permissions **View app information and download bulk reports**, **View financial data, orders, and
     cancellation survey responses**, **Manage orders and subscriptions**, **Manage store presence**.
   - Service account → **Keys → Add key → Create new key → JSON**; upload it in RevenueCat under the Play app's
     **Service Account Credentials JSON**, save, and delete the downloaded file. It can take up to 36 hours to
     validate (errors 503/521 until then).
   - After that: RevenueCat → Play app → **Connect to Google** (it can create the Pub/Sub topic), paste the topic in
     Play Console → **Monetize with Play → Monetization setup** (Real-time developer notifications, "Subscriptions,
     voided purchases, and all one-time products"), then **Send test notification**.

### 4. Turn it on

1. Send Claude the two **public** keys (they're meant to be public; never send the secret Paddle or RevenueCat keys). They go in `PAY.web` and `PAY.android` in `docs/index.html`.
2. Test with the sandbox keys and a license-tester account (Paddle test card 4242 4242 4242 4242, any future
   date, CVV 100): start a trial on the website and in the app, check
   both unlock, cancel, and check Restore purchases in the app.
3. Release **app 1.8** to production first, then push the site with the real keys. (The site update reaches
   the app at once; older apps show "Update the app to subscribe".)

### 5. Play Console forms to update

- **Data safety:** see `listing.md` (it now declares purchase history, user ids and synced data).
- **Content rating:** answer yes to "digital purchases".
- **Account deletion:** done: Data safety links to https://bluex7710.github.io/sub-x/privacy.html#delete-account.
  When someone asks, delete their Firestore document, their Firebase sign-in record and their RevenueCat customer.
- **Store listing:** the description now says "Free to start" and lists Pro (in `listing.md`).

## Google Play and the GitHub APK

Both stay. Google Play Billing only works in the copy installed from Google Play, so:

- **Google Play app:** subscribes with Google Play Billing, as above.
- **GitHub APK:** built with `bash tools/build-github-apk.sh`, which adds `SubXGitHub/<version>` to its user agent.
  In that copy the Pro card says **Subscribe on the website** and opens the Sub-X website with the card already
  open. People sign in there with the same Google account and pay with Paddle (card, PayPal or Apple Pay). Back in the app, Pro turns on
  (it re-checks within 10 minutes, or straight away when they open the card). This is allowed because that copy
  isn't distributed through Google Play. Attach `android-app/Sub-X.apk` to the GitHub release as before.
- Always build the GitHub APK with the script, never plain `assembleDebug`, or its buy button would try Google
  Play and fail.

## Existing users

Decided 23 Nov 2026: when the website key goes in, every Pro feature stays free for **everyone for two weeks**. Set
`PRO_OPEN_UNTIL` near the top of the Pro section in `docs/index.html` to the end of the free period, e.g.
`Date.parse('2027-01-14T00:00:00Z')`. Until then nothing locks; the plan card and the paywall say "Every Pro feature
is free for everyone until <date>", and each device shows that once as a message. It's a date in the code, not saved
data, so nobody can extend it. `0` turns it off (the Android-only launch uses `0`: nobody has the Play app yet).

## Testing without real payments

`localhost` pages can load a pretend store: set `window.SUBX_PRO_TEST` before the page script runs, with
`user`, `signIn()`, `info()`, `plans()`, `buy(plan)` and `restore()`. This was used to test signed out, free,
free week, paid, cancelled, expired, a failed price load, a cancelled checkout, locked drills, keys and
smart-cube moves on locked trainers, and Memorize. **Not tested:** real purchases, and the Android billing
plugin running on a phone (app 1.8 builds, but it has not been run).
