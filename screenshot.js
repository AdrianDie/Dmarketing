import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const malDir = path.join(__dirname, 'maler');
const outDir = path.join(malDir, 'temporary_screenshots');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const all = ['elektriker.html', 'rorlegger.html', 'tannlege.html', 'frisor.html', 'regnskap.html', 'index.html'];

const targets = process.argv[2] === 'all'
  ? all
  : process.argv[2]
    ? [process.argv[2]]
    : all;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  for (const file of targets) {
    const filePath = path.join(malDir, file);
    if (!fs.existsSync(filePath)) { console.log(`Skipping ${file} — not found`); continue; }
    const url = `file://${filePath.replace(/\\/g, '/')}`;
    console.log(`Screenshotting ${file}...`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 800));
    const outFile = path.join(outDir, file.replace('.html', '.png'));
    await page.screenshot({ path: outFile, fullPage: true });
    console.log(`  → ${outFile}`);
  }

  await browser.close();
  console.log('Done.');
})();
