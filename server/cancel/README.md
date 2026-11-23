# Sub-X cancel server

A tiny Cloudflare Worker that lets people cancel their Google Play Pro subscription **inside Sub-X**
(Account → Manage subscription → Cancel subscription). It's needed only because the cancel call
uses RevenueCat's secret key, which can't be put inside the app.

How it works: the app sends the signed-in user's Firebase sign-in token. The worker checks Google's
signature on it (project `sub-x-feb6b`), finds that user's renewing Play subscription in RevenueCat,
and calls RevenueCat's "Google Play: Cancel a Subscription". It stops renewing and Pro stays on until
the end of the time paid for. Nobody can cancel someone else's subscription. Changing the payment card
still opens Google Play (Google has no API for it). Website (Paddle) subscriptions aren't handled yet.

Cost: free (Cloudflare Workers free plan: 100,000 requests a day, no card needed).

## Setup (once, about 5 minutes)

1. **Cloudflare account:** sign up free at https://dash.cloudflare.com/sign-up.
2. **RevenueCat secret key:** RevenueCat → your project → API keys → **+ New secret API key**,
   version **v1**, name it `subx-cancel`. Copy it (starts with `sk_`). Don't share it or put it in the app.
3. **Deploy** (in a terminal, from this folder):
   ```
   cd server/cancel
   npx wrangler login
   npx wrangler deploy
   npx wrangler secret put RC_SECRET
   ```
   `wrangler login` opens the browser to sign in to Cloudflare. `secret put` asks you to paste the key.
   `deploy` prints the address, like `https://subx-cancel.<your-name>.workers.dev`.
4. **Tell Claude the address.** It goes into `PAY.cancelUrl` in `docs/index.html` (address + `/cancel`),
   then gets shipped. Until then, Cancel opens Google Play's page as before.

## Test (without a real cancel)

`curl -X POST https://subx-cancel.<your-name>.workers.dev/cancel` should answer
`{"error":"auth","message":"not signed in"}`. That means it's running and has the key.
