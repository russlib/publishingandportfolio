const puppeteer = require('puppeteer');

const url = process.argv[2] || 'http://localhost:8080';
const output = process.argv[3] || 'screenshot.png';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set desktop viewport
  await page.setViewport({ width: 1400, height: 900 });

  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: output, fullPage: false });

  console.log(`Screenshot saved to: ${output}`);
  await browser.close();
})();
