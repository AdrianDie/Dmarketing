import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'mobile_screenshots', 'audit');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const pages = [
  { name: 'index', url: 'http://127.0.0.1:8765/index.html' },
  { name: 'tjenester', url: 'http://127.0.0.1:8765/tjenester.html' },
  { name: 'kontakt', url: 'http://127.0.0.1:8765/kontakt.html' },
  { name: 'maler-index', url: 'http://127.0.0.1:8765/maler/index.html' },
  { name: 'mal-elektriker', url: 'http://127.0.0.1:8765/maler/elektriker/index.html' },
  { name: 'mal-bilverksted', url: 'http://127.0.0.1:8765/maler/bilverksted/index.html' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const issues = [];
  for (const p of pages) {
    console.log(`\n=== ${p.name} ===`);
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    try {
      await page.goto(p.url + '?t=' + Date.now(), { waitUntil: 'networkidle0', timeout: 20000 });
      await new Promise(r => setTimeout(r, 1500));

      // Diagnostic: detect common issues
      const diag = await page.evaluate(() => {
        const docEl = document.documentElement;
        const hasHorizontalScroll = docEl.scrollWidth > docEl.clientWidth + 1;
        const overflowing = [];
        document.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.right > window.innerWidth + 1 && r.width > 0 && r.height > 0 && el.children.length === 0) {
            const tag = el.tagName.toLowerCase();
            const cls = (el.className || '').toString().slice(0, 60);
            const txt = (el.textContent || '').trim().slice(0, 40);
            overflowing.push(`${tag}.${cls} | "${txt}" | right=${Math.round(r.right)}`);
          }
        });
        return {
          vw: window.innerWidth,
          docWidth: docEl.scrollWidth,
          docHeight: docEl.scrollHeight,
          hasHorizontalScroll,
          overflowingCount: overflowing.length,
          overflowingSample: overflowing.slice(0, 8),
        };
      });
      console.log(JSON.stringify(diag, null, 2));
      issues.push({ page: p.name, url: p.url, ...diag });

      // Full page screenshot
      await page.screenshot({ path: path.join(outDir, `${p.name}-full.png`), fullPage: true });
      // Top of page
      await page.screenshot({ path: path.join(outDir, `${p.name}-top.png`) });
      // Mid scroll
      await page.evaluate(() => window.scrollTo(0, Math.floor(document.body.scrollHeight / 2)));
      await new Promise(r => setTimeout(r, 400));
      await page.screenshot({ path: path.join(outDir, `${p.name}-mid.png`) });
      // Bottom scroll
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await new Promise(r => setTimeout(r, 400));
      await page.screenshot({ path: path.join(outDir, `${p.name}-bottom.png`) });

      console.log(`✓ ${p.name}`);
    } catch (e) {
      console.log(`✗ ${p.name}: ${e.message}`);
      issues.push({ page: p.name, error: e.message });
    }
    await page.close();
  }
  await browser.close();

  fs.writeFileSync(path.join(outDir, 'diagnostics.json'), JSON.stringify(issues, null, 2));
  console.log(`\nDone. ${issues.length} pages audited.`);
  console.log(`Diagnostics: ${path.join(outDir, 'diagnostics.json')}`);
})();
