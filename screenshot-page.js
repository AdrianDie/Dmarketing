import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = process.argv[2];
const out = process.argv[3] || 'page';
const fullPage = process.argv[4] === 'full';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  const url = `file://${path.resolve(__dirname, file).replace(/\\/g, '/')}`;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: `maler/temporary_screenshots/${out}.png`, fullPage });
  await browser.close();
  console.log(`saved ${out}.png`);
})();
