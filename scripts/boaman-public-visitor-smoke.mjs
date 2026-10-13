/**
 * BOAMAN anonymous visitor acceptance smoke.
 * Non-invasive: no accounts, form submissions, applicant records or security bypass.
 * Run in GitHub Actions with Playwright/Chromium so HTTP and UI checks use an
 * external client, not a deploy-provider's internal "READY" status.
 */
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const PUBLIC = "https://izzyakos.com/boaman/";
const PARTICIPATE = "https://izzyakos.com/boaman/participate/";
const APP = "https://boaman-pantrysterllcs-projects-b7b5c455.vercel.app/";
await mkdir("artifacts", { recursive: true });

const browser = await chromium.launch({ headless: true });
let passed = 0;
let failed = 0;
const checks = [];
async function check(label, fn) {
  try {
    await fn();
    passed++;
    checks.push({ label, status: "PASS" });
    console.log("PASS", label);
  } catch (error) {
    failed++;
    checks.push({ label, status: "FAIL", detail: error.message });
    console.error("FAIL", label, error.message);
  }
}

for (const [mode, options] of [
  ["mobile", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }],
  ["desktop", { viewport: { width: 1365, height: 850 } }],
]) {
  const context = await browser.newContext({ ...options, ignoreHTTPSErrors: false });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  const visit = async (url) => {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
    assert(response, "No HTTP response");
    assert.equal(response.status(), 200, "HTTP status was " + response.status() + " for " + url);
    await page.waitForTimeout(500);
  };

  await check(mode + " / public homepage loads", async () => {
    await visit(PUBLIC);
    assert.match(await page.title(), /BOAMAN/i);
    assert.match(await page.locator("h1").first().innerText(), /Recognize real capability/i);
    await page.screenshot({ path: "artifacts/" + mode + "-boaman-home.png", fullPage: true });
  });

  await check(mode + " / homepage offers research before product sign-in", async () => {
    await visit(PUBLIC);
    const cta = page.getByRole("link", { name: /Start with five research questions/i });
    assert.equal(await cta.count(), 1, "Expected one clearly named primary CTA");
    assert.match(await cta.getAttribute("href"), /participate/);
  });

  await check(mode + " / discovery page reachable without login", async () => {
    await visit(PARTICIPATE);
    assert.match(await page.locator("h1").first().innerText(), /Help us understand the hiring problem/i);
    assert.equal(await page.locator(".questionBox li").count(), 5, "Five questions not present");
    assert.equal(await page.getByRole("link", { name: /Request a 15-minute discovery conversation by email/i }).count(), 1);
    const html = await page.content();
    assert(!/http-equiv=["']refresh/i.test(html), "Unexpected forced meta-refresh");
    assert(!html.includes("window.location.replace("), "Unexpected forced JS redirect");
    await page.screenshot({ path: "artifacts/" + mode + "-participate.png", fullPage: true });
  });

  await check(mode + " / CTA actually moves from BOAMAN to public questions", async () => {
    await visit(PUBLIC);
    await page.getByRole("link", { name: /Start with five research questions/i }).click();
    await page.waitForURL("**/boaman/participate/", { timeout: 15000 });
    assert.equal(await page.locator(".questionBox li").count(), 5);
  });

  await check(mode + " / interactive app loads current employer view", async () => {
    await visit(APP + "#/home");
    await page.getByRole("link", { name: /Employer.*Buyer View/i }).first().waitFor({ timeout: 15000 });
    assert(!/Authentication Required|Vercel Authentication|Deployment Protection/i.test(await page.locator("body").innerText()), "Vercel protection or login wall");
    await page.getByRole("link", { name: /Employer.*Buyer View/i }).first().click();
    await page.waitForTimeout(500);
    assert.match(new URL(page.url()).hash, /employers/);
    assert.match(await page.locator("body").innerText(), /Reduce hiring guesswork/i);
    await page.screenshot({ path: "artifacts/" + mode + "-employer-view.png", fullPage: true });
  });

  await check(mode + " / secure portal is honest about sign-in", async () => {
    await visit(APP + "#/participate");
    await page.getByRole("heading", { name: /Discovery Survey.*Non-Binding Pilot Interest/i }).waitFor({ timeout: 15000 });
    assert.match(await page.locator("body").innerText(), /Sign in to submit/i);
    await page.screenshot({ path: "artifacts/" + mode + "-secure-portal.png", fullPage: true });
  });

  await check(mode + " / no critical browser execution errors", async () => {
    assert.deepEqual(errors, [], "Browser errors: " + errors.join(" | "));
  });

  await check(mode + " / no horizontal overflow in public pages", async () => {
    for (const url of [PUBLIC, PARTICIPATE]) {
      await visit(url);
      const dimensions = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth
      }));
      assert(dimensions.scroll <= dimensions.viewport + 3, "Horizontal overflow at " + url + ": " + JSON.stringify(dimensions));
    }
  });

  await context.close();
}
await browser.close();
console.log(JSON.stringify({ checks, passed, failed }, null, 2));
if (failed) process.exitCode = 1;
