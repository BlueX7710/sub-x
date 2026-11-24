// Sub-X cancel server (Cloudflare Worker): cancels the signed-in user's own Google Play subscription to Pro.
//
// Why a server: the cancel call needs RevenueCat's secret key, and a secret key can't live inside the app.
// What it does: POST /cancel (or /delete) with "Authorization: Bearer <Firebase ID token>".
//   1. Checks the token is a real, unexpired Sign in with Google token for the Sub-X Firebase project
//      (signed by Google; the user id is in it, so nobody can cancel someone else's subscription).
//   2. Asks RevenueCat for that user's subscriptions and picks the active, renewing Play one.
//   3. Cancels it through RevenueCat: it stops renewing, and Pro stays on until the end of the paid time.
// POST /delete (Delete account in Sub-X): the same check, stops a renewing Play subscription, then deletes the user's
//   RevenueCat customer record. The app then deletes the synced copy and the sign-in itself.
// Secret (set with `npx wrangler secret put RC_SECRET`): a RevenueCat v1 secret API key (sk_...).
// Setup steps: server/cancel/README.md.

const PROJECT = 'sub-x-feb6b';   // the Firebase project Sub-X signs in with
const ALLOWED = ['https://bluex7710.github.io', 'http://localhost:5301'];   // the website and the app (it loads the website)
const JWKS = 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com';
const RC = 'https://api.revenuecat.com/v1';

let keys = null, keysUntil = 0;
async function googleKeys() {
  if (keys && Date.now() < keysUntil) return keys;
  const r = await fetch(JWKS);
  if (!r.ok) throw new Error('could not load Google keys');
  const age = /max-age=(\d+)/.exec(r.headers.get('cache-control') || '');
  keys = (await r.json()).keys; keysUntil = Date.now() + (age ? +age[1] * 1000 : 3600e3);
  return keys;
}
const b64url = s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(s.length / 4) * 4, '=')), c => c.charCodeAt(0));
const json = s => JSON.parse(new TextDecoder().decode(b64url(s)));

// a Firebase ID token's user id, or an error
async function verify(token) {
  const parts = String(token || '').split('.');
  if (parts.length !== 3) throw new Error('not signed in');
  const head = json(parts[0]), body = json(parts[1]), now = Date.now() / 1000;
  if (head.alg !== 'RS256') throw new Error('bad token');
  const jwk = (await googleKeys()).find(k => k.kid === head.kid);
  if (!jwk) throw new Error('bad token');
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64url(parts[2]), new TextEncoder().encode(parts[0] + '.' + parts[1]));
  if (!ok) throw new Error('bad token');
  if (body.aud !== PROJECT || body.iss !== 'https://securetoken.google.com/' + PROJECT) throw new Error('bad token');
  if (!(body.exp > now) || !(body.iat <= now + 300) || !body.sub) throw new Error('sign in again');
  return body.sub;
}

async function cancelFor(uid, env) {
  const auth = { Authorization: 'Bearer ' + env.RC_SECRET, 'Content-Type': 'application/json' };
  const who = encodeURIComponent(uid);
  const r = await fetch(`${RC}/subscribers/${who}`, { headers: auth });
  if (!r.ok) throw new Error('could not read the subscription (' + r.status + ')');
  const subs = ((await r.json()).subscriber || {}).subscriptions || {}, now = Date.now();
  // the Play subscription that is still on and still renewing
  const s = Object.values(subs).find(x => x.store === 'play_store' && x.store_transaction_id && Date.parse(x.expires_date) > now && !x.unsubscribe_detected_at && !x.refunded_at);
  if (!s) {
    const any = Object.values(subs).find(x => Date.parse(x.expires_date) > now);
    if (any && any.store !== 'play_store') return { status: 409, body: { error: 'not_play', message: 'This subscription was bought on the website: cancel it from its billing page.' } };
    if (any) return { status: 200, body: { ok: true, already: true, until: any.expires_date } };
    return { status: 404, body: { error: 'none', message: 'No subscription to cancel on this account.' } };
  }
  const c = await fetch(`${RC}/subscribers/${who}/subscriptions/${encodeURIComponent(s.store_transaction_id)}/cancel`, { method: 'POST', headers: auth });
  if (!c.ok) throw new Error('the store refused (' + c.status + ')');
  return { status: 200, body: { ok: true, until: s.expires_date } };
}

async function deleteFor(uid, env) {
  const auth = { Authorization: 'Bearer ' + env.RC_SECRET, 'Content-Type': 'application/json' };
  const who = encodeURIComponent(uid);
  const r = await fetch(`${RC}/subscribers/${who}`, { headers: auth });
  if (r.ok) {
    const subs = ((await r.json()).subscriber || {}).subscriptions || {}, now = Date.now();
    const web = Object.values(subs).find(x => x.store !== 'play_store' && x.store !== 'promotional' && Date.parse(x.expires_date) > now && !x.unsubscribe_detected_at);
    if (web) return { status: 409, body: { error: 'web_sub', message: 'Cancel the website subscription first, from its billing page.' } };
    const c = await cancelFor(uid, env);   // a renewing Play subscription stops; none is fine
    if (c.status >= 500) return c;
  } else if (r.status !== 404) throw new Error('could not read the subscription (' + r.status + ')');
  const d = await fetch(`${RC}/subscribers/${who}`, { method: 'DELETE', headers: auth });
  if (!d.ok && d.status !== 404) throw new Error('could not delete the subscription record (' + d.status + ')');
  return { status: 200, body: { ok: true } };
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const cors = { 'Access-Control-Allow-Origin': ALLOWED.includes(origin) ? origin : ALLOWED[0], 'Access-Control-Allow-Headers': 'Authorization, Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS', Vary: 'Origin' };
    const send = (status, body) => new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    const path = new URL(req.url).pathname;
    if (req.method !== 'POST' || !['/cancel', '/delete'].includes(path)) return send(404, { error: 'not_found' });
    if (!env.RC_SECRET) return send(500, { error: 'setup', message: 'The server has no RevenueCat key yet.' });
    let uid;
    try { uid = await verify((req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '')); }
    catch (e) { return send(401, { error: 'auth', message: String(e.message || e) }); }
    try { const r = await (path === '/delete' ? deleteFor : cancelFor)(uid, env); return send(r.status, r.body); }
    catch (e) { return send(502, { error: 'store', message: String(e.message || e) }); }
  },
};
