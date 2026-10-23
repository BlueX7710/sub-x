// Smoke test: opens Sub-X in Chromium, visits every Learn page and trainer, does a few timed solves,
// opens the race screen, and fails on any page error. Also checks the phone layout has no sideways scroll.
//   node tools/smoke.js http://localhost:5178/
//   node tools/smoke.js http://localhost:5179/sub-x-cube-timer.html   (the claude.ai copy)
// Needs Playwright: set PLAYWRIGHT_PATH to its folder if `require('playwright')` can't find it.
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const url = process.argv[2] || 'http://localhost:5178/';
const bare = /sub-x-cube-timer\.html/.test(url);   // the claude.ai copy has no <html> skeleton or [hidden] rule

(async () => {
  const browser = await chromium.launch(), errors = [];
  async function open(opts) {
    const p = await browser.newPage(opts);
    p.on('pageerror', e => errors.push(e.message));
    p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
    if (bare) await p.addInitScript(() => document.addEventListener('DOMContentLoaded', () => {
      const s = document.createElement('style'); s.textContent = '[hidden]{display:none !important}'; document.head.appendChild(s);
    }));
    return p;
  }
  const p = await open({ viewport: { width: 1280, height: 900 } });
  await p.goto(url + '#learn'); await p.waitForTimeout(600);
  for (const method of ['cfop', 'roux']) {
    await p.click(`[data-method="${method}"]`); await p.waitForTimeout(200);
    for (const mode of method === 'roux' ? ['teach', 'train'] : [null]) {
      if (mode) { await p.click(`[data-lmode="${mode}"]`); await p.waitForTimeout(200); }
      for (const k of await p.$$eval('[data-lset]', b => b.map(x => x.dataset.lset))) {
        await p.click(`[data-lset="${k}"]`); await p.waitForTimeout(150);
        if (await p.$('[data-llt="reveal"]')) await p.click('[data-llt="reveal"]');
      }
    }
  }
  await p.click('[data-method="cfop"]');
  await p.goto(url + '#timer'); await p.waitForTimeout(400);
  await p.uncheck('#insp');
  for (let i = 0; i < 6; i++) { await p.keyboard.down('Space'); await p.waitForTimeout(350); await p.keyboard.up('Space'); await p.waitForTimeout(120); await p.keyboard.press('Space'); await p.waitForTimeout(80); }
  const solves = await p.$$eval('#solves .solve-row', r => r.length);
  if (solves !== 6) errors.push(`expected 6 solves, got ${solves}`);
  await p.selectOption('#scrMode', 'daily'); await p.waitForTimeout(200);
  await p.click('#raceBtn'); await p.waitForTimeout(200); await p.keyboard.press('Escape');
  const m = await open({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await m.goto(url + '#timer'); await m.waitForTimeout(400);
  const sw = await m.evaluate(() => document.documentElement.scrollWidth);
  if (!bare && sw > 390) errors.push(`phone layout scrolls sideways (${sw}px wide)`);
  await browser.close();
  if (errors.length) { console.log('FAILED\n' + errors.join('\n')); process.exit(1); }
  console.log(`OK: ${url}`);
})();
