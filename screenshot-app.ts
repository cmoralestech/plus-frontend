import { chromium } from 'playwright';

const BASE = 'https://getarranged.io';
const OUT = '/tmp/arranged-screenshots';

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Public pages
  const publicPages = [
    ['homepage', '/'],
    ['pricing', '/pricing'],
    ['about', '/about'],
    ['blog-index', '/blog'],
    ['blog-post', '/blog/seeking-arrangement-review'],
    ['seeking-alternative', '/seeking-arrangement-alternative'],
    ['city-miami', '/sugar-dating/miami'],
    ['auth', '/auth'],
  ];

  for (const [name, path] of publicPages) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
    console.log(`✓ ${name}`);
  }

  // Login to see app pages
  await page.goto(`${BASE}/auth`, { waitUntil: 'networkidle' });
  await page.fill('input[type="email"]', 'sarah@demo.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  const appPages = [
    ['discover', '/discover'],
    ['search', '/search'],
    ['likes', '/likes'],
    ['matches', '/matches'],
    ['messages', '/messages'],
    ['profile', '/profile'],
    ['settings', '/settings'],
  ];

  for (const [name, path] of appPages) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${OUT}/app-${name}.png`, fullPage: true });
    console.log(`✓ app-${name}`);
  }

  await browser.close();
  console.log(`\nDone! Screenshots in ${OUT}/`);
}

run().catch(console.error);
