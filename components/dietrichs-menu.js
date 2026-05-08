/**
 * Dietrichs Marketing — Universell meny-komponent
 * ================================================
 *
 * BRUK:
 *   <script src="components/dietrichs-menu.js" defer></script>
 *   (eller "../components/dietrichs-menu.js" hvis siden ligger i undermappe)
 *
 * Komponenten injecter:
 *   - CSS for menyen
 *   - HTML (header-strip + overlay) som første element i <body>
 *   - Toggle-logikk (åpne/lukke, body.menu-open klasse)
 *
 * KONFIG:
 *   Sett window.DIETRICHS_MENU_CONFIG før scriptet lastes:
 *     <script>
 *       window.DIETRICHS_MENU_CONFIG = {
 *         basePath: '../',     // prefix for href (default: '')
 *         active: 'tjenester'  // hvilken link er aktiv (default: ingen)
 *       };
 *     </script>
 *     <script src="../components/dietrichs-menu.js" defer></script>
 *
 * DEPENDENCIES:
 *   - Archivo-font (lastes automatisk hvis ikke til stede)
 */

(function () {
  'use strict';

  const config = window.DIETRICHS_MENU_CONFIG || {};
  const basePath = config.basePath || '';
  const active = config.active || '';

  // 1. Last Archivo-font hvis ikke allerede inkludert
  if (!document.querySelector('link[href*="Archivo"]')) {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&display=swap';
    document.head.appendChild(fontLink);
  }

  // 2. Injecter CSS
  const css = `
    .menu-wrap { background-color: #ffffff; padding: 16px 0; border-bottom: 1px solid #E4E4E7; }
    .navbar-2 {
      z-index: 101; justify-content: space-between; align-items: center;
      width: 90%; max-width: 1440px; height: 50px;
      margin: 0 auto; display: flex; position: relative;
    }
    .logo-link-wrapper {
      flex-direction: column; justify-content: center; align-items: center;
      display: flex; text-decoration: none;
    }
    .brand-3 { order: -1; }
    .brand-3.w--current { flex-flow: column; }
    .logo-text-container { order: 0; margin-top: 20px; display: flex; }
    .heading-6 {
      color: #09090B; letter-spacing: 2px; text-transform: uppercase;
      margin: 0; font-family: Archivo, sans-serif;
      font-size: 12px; font-weight: 600; line-height: 12px;
    }
    .heading-6.logo-1 { margin-left: 10px; font-size: 30px; line-height: 45px; }
    .heading-6.logo-2 {
      color: transparent; -webkit-text-stroke: 0.5px #09090B;
      margin: 0 0 0 10px; font-size: 30px; line-height: 45px;
    }
    .navigation__menu-btn {
      cursor: pointer; flex-direction: column; order: 1;
      justify-content: flex-start; align-items: center;
      height: 25px; overflow: hidden; display: flex;
      background: transparent; border: 0; padding: 0;
      outline: none;
    }
    .navigation__menu-btn:focus,
    .navigation__menu-btn:focus-visible { outline: none; }
    .open-wrap { align-items: center; height: 25px; display: flex; }
    .navigation-text {
      color: #09090B; letter-spacing: 3px; text-transform: uppercase;
      font-family: Archivo, sans-serif; font-size: 12px; line-height: 12px;
      text-decoration: none;
    }
    .hamburger {
      flex-direction: column; justify-content: space-between; align-items: flex-end;
      width: 25px; height: 10px; margin-left: 12.5px; display: flex;
    }
    .hamburger-line { background-color: #09090B; width: 25px; height: 2.22px; }
    .hamburger-line-4 { background-color: #09090B; width: 15px; height: 2.22px; }
    body.menu-open .menu-wrap { background-color: #1a1a1f; border-bottom-color: rgba(255,255,255,0.1); }
    body.menu-open .heading-6.logo-1 { color: whitesmoke; }
    body.menu-open .heading-6.logo-2 { -webkit-text-stroke-color: whitesmoke; }
    body.menu-open .navigation-text { color: #fff; }
    body.menu-open .hamburger-line,
    body.menu-open .hamburger-line-4 { background-color: #fff; }
    body.menu-open .close-btn::before,
    body.menu-open .close-btn::after { background: #fff; }
    .menu-wrap, .heading-6, .navigation-text,
    .hamburger-line, .hamburger-line-4 {
      transition: background-color 0.25s ease, color 0.25s ease, -webkit-text-stroke-color 0.25s ease, border-color 0.25s ease;
    }
    .close-wrap {
      flex-direction: row; justify-content: flex-end; align-items: center;
      height: 25px; display: flex;
    }
    .close-btn {
      width: 18px; height: 18px; margin-left: 12.5px; position: relative;
    }
    .close-btn::before, .close-btn::after {
      content: ""; position: absolute; top: 50%; left: 0;
      width: 100%; height: 2px; background: #fff;
      transform-origin: center;
    }
    .close-btn::before { transform: translateY(-50%) rotate(45deg); }
    .close-btn::after { transform: translateY(-50%) rotate(-45deg); }
    .nav-container-2 {
      z-index: 97; background-color: #1a1a1f;
      flex-direction: column; justify-content: flex-start; align-items: center;
      min-height: 100vh; padding: 100px 0 80px;
      position: fixed; inset: 0;
      overflow-y: auto;
    }
    .nav__bg {
      z-index: -1; background-color: #1a1a1f;
      position: absolute; inset: 0;
    }
    .container-4 {
      width: 90%; max-width: none; margin: 0 auto;
    }
    .nav-items {
      z-index: 99; flex-flow: column; align-items: flex-start;
      width: 80%; max-width: 1200px; margin-top: 40px;
      display: flex; position: relative; overflow: hidden;
    }
    .nav-item {
      align-items: center; text-decoration: none; display: flex;
    }
    .nav-item.hide { display: none; }
    .nav-item-number {
      color: #fff; letter-spacing: 3px; margin-right: 20px;
      font-family: Archivo, sans-serif; font-size: 12px; line-height: 12px;
      transform: rotate(-90deg);
    }
    .special-text-wrapper { height: 130px; overflow: hidden; }
    .nav-item-text {
      color: transparent; -webkit-text-fill-color: transparent;
      -webkit-text-stroke: 0.8px #A5A3A6;
      text-transform: uppercase; font-family: Archivo, sans-serif;
      font-size: 90px; font-weight: 700; line-height: 130px; display: block;
    }
    .nav-item-text-full {
      color: #fff; text-transform: uppercase; font-family: Archivo, sans-serif;
      font-size: 90px; font-weight: 700; line-height: 130px;
    }
    .special-text-wrapper > div {
      transition: transform 0.55s cubic-bezier(0.65, 0, 0.35, 1);
    }
    .nav-item:hover .nav-item-text,
    .nav-item:hover .nav-item-text-full {
      transform: translateY(-130px);
    }
    .nav-container-2.hidden-menu {
      opacity: 0; visibility: hidden; pointer-events: none;
    }
    .nav-container-2 {
      transition: opacity 0.35s ease, visibility 0.35s ease;
    }
    .navigation__menu-btn.is-open .open-wrap { display: none; }
    .navigation__menu-btn:not(.is-open) .close-wrap { display: none; }
    @media screen and (min-width: 1440px) {
      .nav-item-text, .nav-item-text-full { font-size: 85px; line-height: 110px; }
      .nav-items { width: 50%; }
      .navigation-text { font-size: 15px; }
      .heading-6.logo-1, .heading-6.logo-2 { font-size: 40px; line-height: 30px; }
      .special-text-wrapper { height: 110px; }
      .nav-item:hover .nav-item-text,
      .nav-item:hover .nav-item-text-full { transform: translateY(-110px); }
    }
    @media screen and (max-width: 991px) {
      .nav-item-text, .nav-item-text-full { font-size: 85px; }
    }
    @media screen and (max-width: 767px) {
      .special-text-wrapper { height: auto; }
      .nav-item-text-full { font-size: 70px; line-height: 90px; display: none; }
      .nav-item-text { font-size: 70px; line-height: 120px; }
      .nav-items { width: 90%; }
      .heading-6.logo-1 { font-size: 22px; line-height: 30px; }
      .heading-6.logo-2 { font-size: 22px; line-height: 30px; margin-left: 6px; }
    }
    @media screen and (max-width: 479px) {
      .nav-item-text { font-size: 35px; line-height: 200%; }
      .nav-item-text-full { font-size: 35px; display: none; }
      .nav-items { margin-top: 20%; }
      .navbar-2 {
        justify-content: space-between; width: 100%;
        margin: 0 auto; padding: 0 16px;
      }
      .heading-6.logo-1 { font-size: 18px; line-height: 28px; margin-left: 0; }
      .heading-6.logo-2 { font-size: 18px; line-height: 28px; margin-left: 5px; }
    }
  `;
  const style = document.createElement('style');
  style.id = 'dietrichs-menu-styles';
  style.textContent = css;
  document.head.appendChild(style);

  // 3. Bygg meny-HTML
  const items = [
    { num: '01', label: 'Forside', href: '/', key: 'forside' },
    { num: '02', label: 'Tjenester', href: 'tjenester', key: 'tjenester' },
    { num: '03', label: 'Kontakt', href: 'kontakt', key: 'kontakt' },
    { num: '04', label: 'Maler', href: 'maler/', key: 'maler' },
    { num: '05', label: 'AI-webmaster', href: 'ai-webmaster', key: 'ai-webmaster' },
  ];

  const navItemsHTML = items.map(item => `
        <a href="${basePath}${item.href}" class="nav-item${item.key === active ? ' is-active' : ''}">
          <div class="nav-item-number">${item.num}</div>
          <div class="special-text-wrapper">
            <div class="nav-item-text">${item.label}</div>
            <div class="nav-item-text-full">${item.label}</div>
          </div>
        </a>`).join('');

  const menuHTML = `
  <section class="menu-wrap">
    <div class="navbar-2">
      <a href="${basePath}/" class="logo-link-wrapper brand-3">
        <div class="logo-text-container">
          <h1 class="heading-6 logo-1">Dietrichs</h1>
          <h1 class="heading-6 logo-2">marketing</h1>
        </div>
      </a>
      <button type="button" id="dm-menu-btn" class="navigation__menu-btn" aria-label="Åpne meny">
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
      </button>
    </div>
  </section>
  <div id="dm-menu-overlay" class="nav-container-2 hidden-menu">
    <div class="nav__bg"></div>
    <div class="container-4">
      <div class="nav-items">${navItemsHTML}
      </div>
    </div>
  </div>`;

  // 4. Injecter meny som første element i <body>
  document.body.insertAdjacentHTML('afterbegin', menuHTML);

  // 5. Toggle-logikk
  const btn = document.getElementById('dm-menu-btn');
  const overlay = document.getElementById('dm-menu-overlay');
  if (!btn || !overlay) return;

  const setOpen = (open) => {
    overlay.classList.toggle('hidden-menu', !open);
    btn.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-label', open ? 'Lukk meny' : 'Åpne meny');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  btn.addEventListener('click', () => setOpen(overlay.classList.contains('hidden-menu')));
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));

  // Esc lukker meny
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden-menu')) setOpen(false);
  });
})();
