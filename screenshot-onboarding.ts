import { chromium } from 'playwright';

const BASE = 'https://getarranged.io';
const OUT = '/tmp/onboarding-audit';

const VIEWPORTS = [
  { name: 'mobile', width: 393, height: 852 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

async function run() {
  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    console.log(`\n=== ${vp.name} (${vp.width}x${vp.height}) ===`);
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    // Register a new account
    const email = `onboard-${vp.name}-${Date.now()}@test.com`;
    await page.goto(`${BASE}/auth?mode=register`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Fill registration
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', 'testpass123');

    // Select "Successful" user type
    const successfulBtn = page.locator('button:has-text("Successful")');
    if (await successfulBtn.isVisible()) {
      await successfulBtn.click();
    }

    // Agree to terms
    const checkbox = page.locator('input[type="checkbox"]');
    if (await checkbox.isVisible()) {
      await checkbox.check();
    }

    // Submit
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    // Screenshot onboarding step 1
    await page.screenshot({ path: `${OUT}/${vp.name}-step1.png`, fullPage: true });
    console.log(`  ✓ step1 (basics)`);

    // Fill step 1
    const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nickname"]');
    if (await nameInput.isVisible()) {
      await nameInput.fill('Test User');
    }

    // DOB
    const monthSelect = page.locator('select').first();
    if (await monthSelect.isVisible()) {
      await monthSelect.selectOption('6');
      const daySelect = page.locator('select').nth(1);
      await daySelect.selectOption('15');
      const yearSelect = page.locator('select').nth(2);
      await yearSelect.selectOption('1990');
    }

    // Gender
    const maleBtn = page.locator('button:has-text("Male")');
    if (await maleBtn.isVisible()) {
      await maleBtn.click();
    }

    // City
    const cityInput = page.locator('input[placeholder*="Miami"]');
    if (await cityInput.isVisible()) {
      await cityInput.fill('Houston');
    }

    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/${vp.name}-step1-filled.png`, fullPage: true });
    console.log(`  ✓ step1 filled`);

    // Click Continue
    const continueBtn = page.locator('button:has-text("Continue")');
    if (await continueBtn.isVisible() && await continueBtn.isEnabled()) {
      await continueBtn.click();
      await page.waitForTimeout(1000);
    }

    // Screenshot step 2
    await page.screenshot({ path: `${OUT}/${vp.name}-step2.png`, fullPage: true });
    console.log(`  ✓ step2 (arrangement)`);

    // Fill looking for
    const lookingFor = page.locator('textarea');
    if (await lookingFor.isVisible()) {
      await lookingFor.fill('Looking for someone genuine and fun');
    }

    // Select an arrangement type
    const datingPill = page.locator('button:has-text("Dating")');
    if (await datingPill.isVisible()) {
      await datingPill.click();
    }

    // Select income
    const incomeBtn = page.locator('button:has-text("$100K")');
    if (await incomeBtn.isVisible()) {
      await incomeBtn.click();
    }

    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/${vp.name}-step2-filled.png`, fullPage: true });
    console.log(`  ✓ step2 filled`);

    // Click Create profile
    const createBtn = page.locator('button:has-text("Create profile")');
    if (await createBtn.isVisible() && await createBtn.isEnabled()) {
      await createBtn.click();
      await page.waitForTimeout(2000);
    }

    // Screenshot step 3 (photos)
    await page.screenshot({ path: `${OUT}/${vp.name}-step3-photos.png`, fullPage: true });
    console.log(`  ✓ step3 (photos)`);

    await context.close();
  }

  await browser.close();
  console.log(`\nDone! Screenshots in ${OUT}/`);
}

run().catch(console.error);
