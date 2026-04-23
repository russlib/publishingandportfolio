#!/usr/bin/env node
// Screenshot every route on the running dev server at 3 viewports.
// Run: node scripts/screenshot-viewports.mjs
// Requires: dev server running at BASE_URL (default http://localhost:3000).

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = process.env.OUT_DIR ?? "mobile-review";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844, deviceScaleFactor: 2 },   // iPhone 14 Pro
  { name: "tablet", width: 820, height: 1180, deviceScaleFactor: 2 },  // iPad Air
  { name: "desktop", width: 1440, height: 900, deviceScaleFactor: 1 },
];

const STATIC_ROUTES = ["/", "/actuator-mechanical-design-engineer"];

async function discoverRoutes(page) {
  const routes = new Set(STATIC_ROUTES);

  for (const seed of ["/", "/actuator-mechanical-design-engineer"]) {
    await page.goto(BASE_URL + seed, { waitUntil: "networkidle" });
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
    for (const h of hrefs) {
      if (!h) continue;
      if (h.startsWith("/skill/") || h.startsWith("/project/")) {
        const clean = h.split("#")[0].split("?")[0];
        routes.add(clean);
      }
    }
  }

  return [...routes].sort();
}

function slugForRoute(route) {
  const s = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "__");
  return s || "home";
}

async function run() {
  const browser = await chromium.launch();
  const discoveryCtx = await browser.newContext({ viewport: VIEWPORTS[2] });
  const discoveryPage = await discoveryCtx.newPage();

  console.log(`Discovering routes via ${BASE_URL} ...`);
  const routes = await discoverRoutes(discoveryPage);
  console.log(`Found ${routes.length} routes:`);
  for (const r of routes) console.log(`  ${r}`);
  await discoveryCtx.close();

  const manifest = [];

  for (const vp of VIEWPORTS) {
    const dir = join(OUT_DIR, vp.name);
    await mkdir(dir, { recursive: true });

    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.deviceScaleFactor,
      isMobile: vp.name !== "desktop",
      hasTouch: vp.name !== "desktop",
    });
    const page = await ctx.newPage();

    for (const route of routes) {
      const slug = slugForRoute(route);
      const out = join(dir, `${slug}.png`);
      try {
        await page.goto(BASE_URL + route, { waitUntil: "networkidle", timeout: 30000 });
        // Wait for web fonts to finish loading so screenshots don't capture the fallback
        // (Overused Grotesk is loaded via next/font with display: swap).
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(200);
        await page.screenshot({ path: out, fullPage: true });
        console.log(`  [${vp.name}] ${route} -> ${out}`);
        manifest.push({ viewport: vp.name, route, file: out, ok: true });
      } catch (e) {
        console.log(`  [${vp.name}] ${route} FAILED: ${e.message}`);
        manifest.push({ viewport: vp.name, route, file: out, ok: false, error: e.message });
      }
    }

    await ctx.close();
  }

  await browser.close();
  await writeFile(join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
  const failed = manifest.filter((m) => !m.ok);
  console.log(`\nDone. ${manifest.length - failed.length} ok, ${failed.length} failed. Output: ${OUT_DIR}/`);
  if (failed.length) process.exitCode = 1;
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
