import { chromium } from "playwright";

const BASE = "https://meetyourplus.com";
const SCREENSHOTS_DIR = "/tmp/plus-audit";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  // Helper
  async function screenshot(page: any, name: string) {
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${SCREENSHOTS_DIR}/${name}.png`, fullPage: true });
    console.log(`  📸 ${name}.png`);
  }

  // ═══ 1. HOMEPAGE ═══
  console.log("\n=== HOMEPAGE ===");
  const home = await context.newPage();
  await home.goto(BASE, { waitUntil: "networkidle" });
  await screenshot(home, "01-homepage-top");

  // Check hero image loads
  const heroImg = await home.locator("img[alt='Couple enjoying luxury dating on a yacht']").first();
  const heroVisible = await heroImg.isVisible().catch(() => false);
  console.log(`  Hero image visible: ${heroVisible}`);

  // Check nav links
  const navLinks = await home.locator("nav a").allTextContents();
  console.log(`  Nav links: ${navLinks.join(", ")}`);

  // Check for stale "Arranged" or "Diamond" text
  const pageText = await home.textContent("body") || "";
  const staleTerms = ["Arranged", "Diamond", "Premium", "sugar daddy", "sugar baby"];
  for (const term of staleTerms) {
    const found = pageText.includes(term);
    if (found) console.log(`  ⚠️  STALE: "${term}" found on homepage`);
  }

  // Check pricing shows 3 tiers
  const hasFree = pageText.includes("$0");
  const hasPlus = pageText.includes("$49.99");
  const hasPlusPlus = pageText.includes("$99.99");
  console.log(`  Pricing tiers: Free=$0:${hasFree} Plus=$49.99:${hasPlus} Plus+=$99.99:${hasPlusPlus}`);

  // Scroll to bottom
  await home.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await screenshot(home, "02-homepage-bottom");

  // Check footer social links
  const igLink = await home.locator("a[href*='instagram.com/meetyourplus']").count();
  const ttLink = await home.locator("a[href*='tiktok.com/@meetyourplus']").count();
  console.log(`  Footer social: Instagram=${igLink > 0} TikTok=${ttLink > 0}`);
  await home.close();

  // ═══ 2. AUTH PAGE ═══
  console.log("\n=== AUTH PAGE ===");
  const auth = await context.newPage();
  await auth.goto(`${BASE}/auth`, { waitUntil: "networkidle" });
  await screenshot(auth, "03-auth-signin");

  // Check no side image (was removed per user request)
  const sideImage = await auth.locator("img").count();
  console.log(`  Images on auth page: ${sideImage} (should be 0)`);

  // Check city messaging
  const authText = await auth.textContent("body") || "";
  const hasCityMsg = authText.includes("Miami") && authText.includes("Houston");
  console.log(`  City messaging present: ${hasCityMsg}`);

  // Switch to register
  await auth.locator("button:has-text('Create account')").click();
  await auth.waitForTimeout(500);
  await screenshot(auth, "04-auth-register");

  // Check DOB field exists on register (should be there)
  const dobField = await auth.locator("input[type='date']").count();
  console.log(`  DOB field on register: ${dobField > 0}`);

  // Check user type selector
  const successfulBtn = await auth.locator("button:has-text('Successful')").count();
  const attractiveBtn = await auth.locator("button:has-text('Attractive')").count();
  console.log(`  User type buttons: Successful=${successfulBtn > 0} Attractive=${attractiveBtn > 0}`);

  // Check password field
  const pwField = await auth.locator("input[type='password']").count();
  console.log(`  Password field: ${pwField > 0}`);
  await auth.close();

  // ═══ 3. WAITLIST PAGE ═══
  console.log("\n=== WAITLIST PAGE ===");
  const wl = await context.newPage();
  await wl.goto(`${BASE}/waitlist`, { waitUntil: "networkidle" });
  await screenshot(wl, "05-waitlist-step0");

  // Step 0: City
  const cityInput = await wl.locator("input[placeholder*='Austin']");
  const cityVisible = await cityInput.isVisible().catch(() => false);
  console.log(`  Step 0 - City input visible: ${cityVisible}`);

  await cityInput.fill("Dallas");
  await wl.locator("button:has-text('Continue')").click();
  await wl.waitForTimeout(500);
  await screenshot(wl, "06-waitlist-step1");

  // Step 1: Worth joining
  const worthBtns = await wl.locator("button:has-text('Better people')").count();
  console.log(`  Step 1 - Worth joining options visible: ${worthBtns > 0}`);

  await wl.locator("button:has-text('Better people')").click();
  await wl.locator("button:has-text('Verified profiles')").click();
  await wl.locator("button:has-text('Continue')").click();
  await wl.waitForTimeout(500);
  await screenshot(wl, "07-waitlist-step2");

  // Step 2: Who's your +
  const genderBtns = await wl.locator("button:has-text('Woman')").count();
  console.log(`  Step 2 - Gender buttons visible: ${genderBtns > 0}`);

  const ageInput = await wl.locator("input[placeholder='28']");
  const ageVisible = await ageInput.isVisible().catch(() => false);
  console.log(`  Step 2 - Age input visible: ${ageVisible}`);

  await wl.locator("button:has-text('Woman')").click();
  await wl.locator("button:has-text('Men')").first().click();
  await ageInput.fill("26");
  await wl.locator("input[placeholder='21']").fill("25");
  await wl.locator("input[placeholder='45']").fill("50");
  await wl.locator("button:has-text('Continue')").click();
  await wl.waitForTimeout(500);
  await screenshot(wl, "08-waitlist-step3");

  // Step 3: Looking for + What matters
  const datingBtn = await wl.locator("button:has-text('Dating')").first().count();
  console.log(`  Step 3 - Looking for options visible: ${datingBtn > 0}`);

  await wl.getByRole("button", { name: "Dating", exact: true }).click();
  await wl.getByRole("button", { name: "Long-term", exact: true }).click();
  await wl.getByRole("button", { name: "Chemistry", exact: true }).click();
  await wl.getByRole("button", { name: "Ambition", exact: true }).first().click();
  await wl.locator("button:has-text('Continue')").click();
  await wl.waitForTimeout(500);
  await screenshot(wl, "09-waitlist-step4");

  // Step 4: What do you bring
  const bringBtns = await wl.locator("button:has-text('Ambition')").count();
  console.log(`  Step 4 - Bring to table options visible: ${bringBtns > 0}`);

  await wl.getByRole("button", { name: "Ambition", exact: true }).first().click();
  await wl.getByRole("button", { name: "Adventure", exact: true }).first().click();
  await wl.locator("button:has-text('Continue')").click();
  await wl.waitForTimeout(500);
  await screenshot(wl, "10-waitlist-step5");

  // Step 5: Contact info
  const nameInput = await wl.locator("input[placeholder='Your name']");
  const emailInput = await wl.locator("input[placeholder*='email']");
  const nameVisible = await nameInput.isVisible().catch(() => false);
  const emailVisible = await emailInput.isVisible().catch(() => false);
  console.log(`  Step 5 - Name input: ${nameVisible} Email input: ${emailVisible}`);

  const phoneInput = await wl.locator("input[placeholder*='555']");
  const igInput = await wl.locator("input[placeholder='@handle']");
  console.log(`  Step 5 - Phone field: ${await phoneInput.isVisible().catch(() => false)} IG field: ${await igInput.isVisible().catch(() => false)}`);
  await wl.close();

  // ═══ 4. PRICING PAGE ═══
  console.log("\n=== PRICING PAGE ===");
  const pricing = await context.newPage();
  await pricing.goto(`${BASE}/pricing`, { waitUntil: "networkidle" });
  await screenshot(pricing, "11-pricing");

  const pricingText = await pricing.textContent("body") || "";
  const pricingStale = ["Diamond", "Premium"].filter(t => {
    // Only flag if NOT in Seeking comparison context
    const idx = pricingText.indexOf(t);
    if (idx === -1) return false;
    const surrounding = pricingText.substring(Math.max(0, idx - 50), idx + 50);
    return !surrounding.includes("Seeking");
  });
  if (pricingStale.length) console.log(`  ⚠️  STALE terms (non-Seeking context): ${pricingStale.join(", ")}`);
  else console.log(`  ✅ No stale tier names`);

  const hasThreeTiers = pricingText.includes("Plus+") && pricingText.includes("$49.99");
  console.log(`  Three tiers present: ${hasThreeTiers}`);
  await pricing.close();

  // ═══ 5. BLOG ═══
  console.log("\n=== BLOG ===");
  const blog = await context.newPage();
  await blog.goto(`${BASE}/blog`, { waitUntil: "networkidle" });
  await screenshot(blog, "12-blog-listing");

  const postCount = await blog.locator("article, a[href^='/blog/']").count();
  console.log(`  Blog posts visible: ${postCount}`);

  // Check first post
  await blog.locator("a[href*='/blog/']").first().click();
  await blog.waitForTimeout(1500);
  await screenshot(blog, "13-blog-post");

  const postText = await blog.textContent("body") || "";
  const hasFAQ = postText.includes("Frequently asked questions");
  console.log(`  Blog post has FAQ section: ${hasFAQ}`);
  await blog.close();

  // ═══ 6. KEY PAGES CHECK ═══
  console.log("\n=== KEY PAGES ===");
  for (const page of ["about", "safety", "faq", "earn", "how-it-works", "contact"]) {
    const p = await context.newPage();
    await p.goto(`${BASE}/${page}`, { waitUntil: "networkidle" });
    const text = await p.textContent("body") || "";
    const hasArranged = text.includes("Arranged") && !text.includes("Seeking Arrangement");
    const hasSugar = text.toLowerCase().includes("sugar daddy") || text.toLowerCase().includes("sugar baby");
    const status = [];
    if (hasArranged) status.push("⚠️ ARRANGED");
    if (hasSugar) status.push("⚠️ SUGAR");
    if (!status.length) status.push("✅ Clean");
    console.log(`  /${page}: ${status.join(" ")}`);
    await p.close();
  }

  // ═══ 7. SETTINGS PAGE (unauthenticated - should redirect) ═══
  console.log("\n=== SETTINGS ===");
  const settings = await context.newPage();
  const settingsResp = await settings.goto(`${BASE}/settings`, { waitUntil: "networkidle" });
  console.log(`  /settings status: ${settingsResp?.status()} (should redirect to auth)`);
  await settings.close();

  // ═══ 8. FAVICON CHECK ═══
  console.log("\n=== FAVICON ===");
  const favicon = await context.newPage();
  const favResp = await favicon.goto(`${BASE}/favicon-32.png`);
  console.log(`  favicon-32.png status: ${favResp?.status()}`);
  const ogResp = await favicon.goto(`${BASE}/og-image.png`);
  console.log(`  og-image.png status: ${ogResp?.status()}`);
  await favicon.close();

  // ═══ 9. MOBILE VIEW ═══
  console.log("\n=== MOBILE VIEW ===");
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)",
  });
  const mHome = await mobile.newPage();
  await mHome.goto(BASE, { waitUntil: "networkidle" });
  await mHome.screenshot({ path: `${SCREENSHOTS_DIR}/14-mobile-homepage.png`, fullPage: false });
  console.log(`  📸 14-mobile-homepage.png`);

  // Check hamburger menu exists
  const hamburger = await mHome.locator("button[aria-label*='menu'], button[aria-label*='Menu']").count();
  console.log(`  Hamburger menu: ${hamburger > 0}`);

  // Mobile auth
  await mHome.goto(`${BASE}/auth?mode=register`, { waitUntil: "networkidle" });
  await mHome.screenshot({ path: `${SCREENSHOTS_DIR}/15-mobile-auth.png`, fullPage: true });
  console.log(`  📸 15-mobile-auth.png`);

  // Mobile waitlist
  await mHome.goto(`${BASE}/waitlist`, { waitUntil: "networkidle" });
  await mHome.screenshot({ path: `${SCREENSHOTS_DIR}/16-mobile-waitlist.png`, fullPage: true });
  console.log(`  📸 16-mobile-waitlist.png`);
  await mobile.close();

  await browser.close();
  console.log(`\n✅ Audit complete. Screenshots saved to ${SCREENSHOTS_DIR}/`);
}

run().catch(console.error);
