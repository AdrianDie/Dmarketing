import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const malDir = path.join(__dirname, 'maler');
const outDir = path.join(malDir, 'temporary_screenshots');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// { file: relative path from malDir, out: output filename (without .png) }
const all = [
  // One-page maler
  { file: 'elektriker.html',  out: 'elektriker' },
  { file: 'rorlegger.html',   out: 'rorlegger' },
  { file: 'tannlege.html',    out: 'tannlege' },
  { file: 'frisor.html',      out: 'frisor' },
  { file: 'regnskap.html',    out: 'regnskap' },
  { file: 'barber.html',      out: 'barber' },
  { file: 'bilverksted.html', out: 'bilverksted' },
  // Flerside maler — hero of index.html
  { file: 'elektriker/index.html',  out: 'elektriker-flerside' },
  { file: 'rorlegger/index.html',   out: 'rorlegger-flerside' },
  { file: 'snekker/index.html',     out: 'snekker' },
  { file: 'bilverksted/index.html', out: 'bilverksted' },
  { file: 'malerfirma/index.html',  out: 'malerfirma' },
  { file: 'psykolog/index.html',    out: 'psykolog' },
  // Gallery index
  { file: 'index.html', out: 'gallery' },
];

const targets = process.argv[2] === 'all'
  ? all
  : process.argv[2]
    ? all.filter(t => t.file === process.argv[2] || t.out === process.argv[2])
    : all;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  // 1440×900 — hero section fills the viewport; object-top in gallery shows the hero
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  for (const { file, out } of targets) {
    const filePath = path.join(malDir, file);
    if (!fs.existsSync(filePath)) { console.log(`Skipping ${file} — not found`); continue; }
    const url = `file://${filePath.replace(/\\/g, '/')}`;
    console.log(`Screenshotting ${file}...`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1200));
    const outFile = path.join(outDir, `${out}.png`);
    // Capture only the visible viewport — shows the hero section
    await page.screenshot({ path: outFile, fullPage: false });
    console.log(`  → ${outFile}`);
  }

  await browser.close();
  console.log('Done.');
})();
