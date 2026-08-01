const { chromium } = require("playwright");

const VIEWPORTS = [
  { name: "desktop-1920", width: 1920, height: 1080 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "tablet-1024", width: 1024, height: 768 },
];

const URL = process.env.URL || "http://localhost:3000";
const PATH = process.env.SITE_PATH || "";
const TAG = process.env.TAG || "";
const OUT_DIR = "screenshots";

async function main() {
  const fs = require("fs");
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

  const browser = await chromium.launch();
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    await page.goto(URL + PATH, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    const tagSuffix = TAG ? `-${TAG}` : "";
    await page.screenshot({
      path: `${OUT_DIR}/${vp.name}${tagSuffix}-top.png`,
      fullPage: false,
    });
    await page.screenshot({
      path: `${OUT_DIR}/${vp.name}${tagSuffix}-full.png`,
      fullPage: true,
    });

    console.log(`  ${vp.name}${tagSuffix}: top + full`);
    await context.close();
  }
  await browser.close();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
