"""
Drop .html-suffix fra interne href-attributter i alle HTML-filer.

Regler:
  href="index.html"          → href="/"
  href="dir/index.html"      → href="dir/"
  href="../index.html"       → href="../"
  href="page.html"           → href="page"
  href="page.html?foo=bar"   → href="page?foo=bar"
  href="page.html#section"   → href="page#section"
  href="https://..."         → uendret
  data-href="..."            → uendret (look-behind)

Bruk: python scripts/clean-urls.py
"""
import re
import os
from pathlib import Path

ROOT = Path(__file__).parent.parent

# Match href="..." der innholdet slutter på .html etterfulgt av ", ?, #
# Look-behind: href må ikke være forhåndset av bokstav/-bindestrek (skipper data-href)
PATTERN = re.compile(r'(?<![a-zA-Z\-])href="([^"]*?)\.html([?"#])')

def clean(match):
    path = match.group(1)
    end = match.group(2)
    # Hopp over eksterne URLer (skulle ikke matche pga .html-krav, men sikkert)
    if path.startswith(('http://', 'https://', 'mailto:', 'tel:')):
        return match.group(0)
    # index.html (root) → /
    if path == 'index':
        return f'href="/{end}'
    # ../index.html eller subdir/index.html → strip 'index'
    if path.endswith('/index'):
        return f'href="{path[:-5]}{end}'
    # Vanlig: bare drop .html
    return f'href="{path}{end}'

def process(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content, n = PATTERN.subn(clean, content)
    if n > 0:
        with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
            f.write(new_content)
    return n

total = 0
files_changed = 0
for html_file in ROOT.rglob('*.html'):
    # Hopp over node_modules
    if 'node_modules' in html_file.parts:
        continue
    # Hopp over .claude-undermapper (men ikke roten som er i en worktree)
    rel_parts = html_file.relative_to(ROOT).parts
    if '.claude' in rel_parts:
        continue
    n = process(html_file)
    if n > 0:
        rel = html_file.relative_to(ROOT)
        print(f'  {rel}: {n} link(er) oppdatert')
        total += n
        files_changed += 1

print(f'\nFerdig: {total} lenker oppdatert i {files_changed} filer')
