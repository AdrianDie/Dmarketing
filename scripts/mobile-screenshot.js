/**
 * Quick mobile screenshot utility — full page + scroll positions.
 * Usage: node scripts/mobile-screenshot.js [URL or path]
 */
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'http://127.0.0.1:8765/ai-webmaster.html';
const outDir = path.join(__dirname, '..', 'mobile_screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // iPhone 12 Pro
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1');

  console.log(`Loading ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  // Full page screenshot
  const fullPath = path.join(outDir, 'mobile-full.png');
  await page.screenshot({ path: fullPath, fullPage: true });
  console.log(`✓ Full page: ${fullPath}`);

  // Viewport-sized screenshots at scroll positions
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const vh = 844;
  const positions = [];
  for (let y = 0; y < totalHeight; y += vh) positions.push(y);

  for (let i = 0; i < positions.length; i++) {
    await page.evaluate(y => window.scrollTo(0, y), positions[i]);
    await new Promise(r => setTimeout(r, 500));
    const p = path.join(outDir, `mobile-scroll-${String(i).padStart(2, '0')}.png`);
    await page.screenshot({ path: p });
    console.log(`✓ Scroll ${positions[i]}px: ${p}`);
  }

  // Open menu screenshot
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 300));
  await page.click('#menu-btn');
  await new Promise(r => setTimeout(r, 600));
  const menuPath = path.join(outDir, 'mobile-menu-open.png');
  await page.screenshot({ path: menuPath });
  console.log(`✓ Menu open: ${menuPath}`);

  await browser.close();
  console.log(`\nDone. Screenshots in ${outDir}/`);
})();
