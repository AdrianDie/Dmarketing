// Helper: injects Dietrichs menu into a target HTML file.
// Usage: node inject-menu.js <file> <currentItem>
//   <currentItem> = forside | tjenester | kontakt | maler | ai-webmaster
import fs from 'fs';
import path from 'path';

const file = process.argv[2];
const current = process.argv[3] || '';

const headInject = `
  <!-- Dietrichs-meny avhengigheter -->
  <link href="css/normalize.css" rel="stylesheet" type="text/css">
  <link href="css/webflow.css" rel="stylesheet" type="text/css">
  <link href="css/dietrichsmarketing.webflow.css" rel="stylesheet" type="text/css">
  <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript"></script>
  <script type="text/javascript">WebFont.load({  google: {    families: ["Archivo:300,400,500,600,700"]  }});</script>
  <script type="text/javascript">!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);</script>
  <style>
    body { background-color: #FAFAFA !important; color: #09090B !important; }
    h1, h2, h3, h4, h5, h6 { text-transform: none !important; margin-left: 0 !important; }
    .nav-container-2 { display: none; }
    .navbar-2 { background: transparent !important; position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; width: 100% !important; max-width: 100% !important; margin: 0 !important; padding: 0 5% !important; height: 56px !important; z-index: 50; }
    .open-wrap .navigation-text { color: #09090B !important; }
    .close-wrap .navigation-text { color: #fff !important; }
    .hamburger-line, .hamburger-line-4 { background-color: #09090B !important; }
  </style>
`;

const navHtml = (cur) => `
  <!-- DIETRICHS NAV -->
  <section>
    <div class="w-layout-blockcontainer navbar-2 w-container">
      <a href="index.html" class="logo-link-wrapper brand brand-2 logo-link brand-3 w-nav-brand${cur==='forside'?' w--current':''}">
        <div class="w-layout-blockcontainer logo-text-container w-container">
          <h1 class="heading-6 logo-1">Dietrichs</h1>
          <h1 class="heading-6 logo-2">marketing</h1>
        </div>
      </a>
      <div data-w-id="030c9a2b-7371-70e1-61b4-748a08fec351" class="navigation__menu-btn">
        <div class="open-wrap">
          <div class="navigation-text">Meny</div>
          <div class="hamburger">
            <div class="hamburger-line"></div>
            <div class="hamburger-line-4"></div>
          </div>
        </div>
        <div class="close-wrap">
          <div class="navigation-text">Lukk</div>
          <div class="close-btn"></div>
        </div>
      </div>
    </div>
    <div class="nav-container-2">
      <div class="w-layout-blockcontainer container-4 w-container">
        <div class="nav-items">
          <a data-w-id="030c9a2b-7371-70e1-61b4-748a08fec35f" href="index.html" class="nav-item link-block-11 link-block-12 link-block-13 w-inline-block${cur==='forside'?' w--current':''}">
            <div class="nav-item-number">01</div>
            <div class="special-text-wrapper">
              <div class="nav-item-text">Forside</div>
              <div class="nav-item-text-full">Forside</div>
            </div>
          </a>
          <a data-w-id="030c9a2b-7371-70e1-61b4-748a08fec367" href="tjenester.html" class="nav-item w-inline-block${cur==='tjenester'?' w--current':''}">
            <div class="nav-item-number">02</div>
            <div class="special-text-wrapper">
              <div class="nav-item-text">Tjenester</div>
              <div class="nav-item-text-full">Tjenester</div>
            </div>
          </a>
          <a data-w-id="030c9a2b-7371-70e1-61b4-748a08fec377" href="kontakt.html" class="nav-item w-inline-block${cur==='kontakt'?' w--current':''}">
            <div class="nav-item-number">03</div>
            <div class="special-text-wrapper">
              <div class="nav-item-text">Kontakt</div>
              <div class="nav-item-text-full">Kontakt</div>
            </div>
          </a>
          <a href="maler/index.html" class="nav-item w-inline-block${cur==='maler'?' w--current':''}">
            <div class="nav-item-number">04</div>
            <div class="special-text-wrapper">
              <div class="nav-item-text">Maler</div>
              <div class="nav-item-text-full">Maler</div>
            </div>
          </a>
          <a href="ai-webmaster.html" class="nav-item w-inline-block${cur==='ai-webmaster'?' w--current':''}">
            <div class="nav-item-number">05</div>
            <div class="special-text-wrapper">
              <div class="nav-item-text">AI-webmaster</div>
              <div class="nav-item-text-full">AI-webmaster</div>
            </div>
          </a>
        </div>
      </div>
      <div class="w-embed">
        <style type="text/css">
.nav-item-text { color: transparent; -webkit-text-fill-color: transparent; -webkit-text-stroke-width: 0.8px; -webkit-text-stroke-color: #A5A3A6; }
        </style>
      </div>
      <div class="nav__bg"></div>
    </div>
  </section>
`;

const bodyJs = `
  <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6602e8dd371d4541deb5adb1" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="js/webflow.js" type="text/javascript"></script>
`;

let s = fs.readFileSync(file, 'utf8');

if (s.includes('navigation__menu-btn')) {
  console.log('SKIP — already has Dietrichs menu:', file);
  process.exit(0);
}

// Inject head deps before </head>
s = s.replace('</head>', headInject + '</head>');

// Replace existing <nav>...</nav> if present
const navRe = /<nav[\s\S]*?<\/nav>/;
if (navRe.test(s)) {
  s = s.replace(navRe, navHtml(current).trim());
} else {
  // Insert right after <body>
  s = s.replace(/<body[^>]*>/, m => m + '\n' + navHtml(current));
}

// Add JS before </body>
s = s.replace('</body>', bodyJs + '</body>');

fs.writeFileSync(file, s);
console.log('Updated:', file);
