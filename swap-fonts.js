// Bytter ut Manrope-display-font per flerside-mal til distinkte alternativer.
import fs from 'fs';
import path from 'path';

const swaps = [
  { dir: 'maler/snekker',    from: 'Manrope', to: 'Fraunces',           weights: '500;600;700;800;900' },
  { dir: 'maler/malerfirma', from: 'Manrope', to: 'Bricolage+Grotesque', display: 'Bricolage Grotesque', weights: '500;600;700;800' },
  { dir: 'maler/psykolog',   from: 'Manrope', to: 'Newsreader',         weights: '400;500;600;700;800' },
  { dir: 'maler/elektriker', from: 'Manrope', to: 'IBM+Plex+Sans',      display: 'IBM Plex Sans',       weights: '500;600;700' },
];

const subPages = ['index.html', 'tjenester.html', 'om-oss.html', 'kontakt.html'];

for (const s of swaps) {
  const displayFont = s.display || s.to;
  for (const page of subPages) {
    const f = path.join(s.dir, page);
    if (!fs.existsSync(f)) continue;
    let txt = fs.readFileSync(f, 'utf8');
    const before = txt;
    // Replace the font URL family parameter
    txt = txt.replace(
      /family=Manrope:wght@[\d;]+/g,
      `family=${s.to}:wght@${s.weights}`
    );
    // Replace font-family CSS references
    txt = txt.replace(/'Manrope'/g, `'${displayFont}'`);
    if (txt !== before) {
      fs.writeFileSync(f, txt);
      console.log('Updated', f, '→', displayFont);
    }
  }
}
