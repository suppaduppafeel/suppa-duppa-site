import React, { useEffect, useMemo, useState } from "react";

const SHOP_BASE = "https://shop.suppaduppa.us";
const COLLECTION_URL = `${SHOP_BASE}/collections/suppaduppa-summer-drop`;
const ALL_PRODUCTS_URL = `${SHOP_BASE}/collections/all`;
const CART_URL = `${SHOP_BASE}/cart`;
const CONTACT_EMAIL = "hello@suppaduppa.us";
const INSTAGRAM_URL = "#";
const SOCIAL_URL = "#";
const logoSrc = "";

const themeColors = [
  {
    name: "Coral Tide",
    gradient: "linear-gradient(135deg, #fff1e8 0%, #ffe0ba 20%, #ff9fc0 48%, #ff6e91 100%)",
    panel: "linear-gradient(135deg, rgba(255,188,129,0.95) 0%, rgba(255,150,193,0.93) 52%, rgba(255,108,152,0.97) 100%)",
    glowA: "rgba(255, 163, 122, 0.25)",
    glowB: "rgba(255, 98, 159, 0.20)",
    sea: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 25%, rgba(87,193,255,0.24) 62%, rgba(22,127,255,0.30) 100%)",
  },
  {
    name: "Aqua Wave",
    gradient: "linear-gradient(135deg, #eefcff 0%, #d9faff 18%, #90e6ff 48%, #5b93ff 100%)",
    panel: "linear-gradient(135deg, rgba(180,245,255,0.96) 0%, rgba(99,214,255,0.94) 55%, rgba(84,128,255,0.98) 100%)",
    glowA: "rgba(85, 219, 255, 0.24)",
    glowB: "rgba(76, 121, 255, 0.22)",
    sea: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(225,251,255,0.22) 24%, rgba(85,213,255,0.34) 62%, rgba(44,104,255,0.38) 100%)",
  },
  {
    name: "Lagoon Pop",
    gradient: "linear-gradient(135deg, #f2fffe 0%, #d9fff0 18%, #8df0db 48%, #1eb8c9 100%)",
    panel: "linear-gradient(135deg, rgba(180,255,234,0.96) 0%, rgba(85,232,214,0.94) 52%, rgba(29,184,201,0.98) 100%)",
    glowA: "rgba(90, 255, 209, 0.22)",
    glowB: "rgba(16, 172, 194, 0.22)",
    sea: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(223,255,246,0.18) 20%, rgba(86,239,214,0.28) 60%, rgba(17,150,189,0.34) 100%)",
  },
  {
    name: "Sunset Foam",
    gradient: "linear-gradient(135deg, #fff8ea 0%, #fff3c4 20%, #ffdb9b 46%, #ff91b4 100%)",
    panel: "linear-gradient(135deg, rgba(255,234,171,0.96) 0%, rgba(255,194,124,0.94) 48%, rgba(255,143,183,0.97) 100%)",
    glowA: "rgba(255, 223, 120, 0.24)",
    glowB: "rgba(255, 146, 181, 0.18)",
    sea: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,245,215,0.18) 18%, rgba(112,214,255,0.24) 58%, rgba(29,113,255,0.30) 100%)",
  },
];

const featuredProducts = [
  { id: "suppafly-street-5-panel", name: "SuppaFly Street 5 Panel", type: "Hat", price: "$29.99", badge: "Street", vibe: "Street-ready 5 panel with crisp summer attitude.", shopUrl: `${SHOP_BASE}/products/5-panel-cap`, handle: "5-panel-cap", render: "hat" },
  { id: "suppa-camo-trucker-hat", name: "Suppa-Camo Trucker Hat", type: "Hat", price: "$34.99", badge: "Camo", vibe: "Outdoor flavor mixed with signature SuppaDuppa vibes.", shopUrl: `${SHOP_BASE}/products/suppa-camo-trucker-hat`, handle: "suppa-camo-trucker-hat", render: "hatPink" },
  { id: "suppa-classic-dad-hat", name: "Suppa-Classic Dad Hat", type: "Hat", price: "$27.99", badge: "Classic", vibe: "An easy clean cap for everyday summer fits.", shopUrl: `${SHOP_BASE}/products/distressed-dad-hat`, handle: "distressed-dad-hat", render: "blackHat" },
  { id: "suppa-foam-trucker-hat", name: "Suppa-Foam Trucker Hat", type: "Hat", price: "$27.99", badge: "Foam", vibe: "A lighter trucker style with easy fun color pop.", shopUrl: `${SHOP_BASE}/products/suppaduppa-foam-trucker-cap`, handle: "suppaduppa-foam-trucker-cap", render: "hatPink" },
  { id: "suppa-signature-snapback", name: "Suppa-Signature Snapback", type: "Hat", price: "$44.99", badge: "Signature", vibe: "A sharper premium cap with statement Suppa energy.", shopUrl: `${SHOP_BASE}/products/snapback-hat`, handle: "snapback-hat", render: "blackHat" },
  { id: "suppa-snapback-hat", name: "Suppa-Snapback Hat", type: "Hat", price: "$34.99", badge: "Snapback", vibe: "Straight-up classic cap style with sunny attitude.", shopUrl: `${SHOP_BASE}/products/suppa-snapback-hat`, handle: "suppa-snapback-hat", render: "hat" },
  { id: "suppa-vintage-cotton-twill-cap", name: "Suppa-Vintage Cotton Twill Cap", type: "Hat", price: "$34.99", badge: "Vintage", vibe: "Vintage texture with a smoother elevated finish.", shopUrl: `${SHOP_BASE}/products/vintage-cotton-twill-cap`, handle: "vintage-cotton-twill-cap", render: "blackHat" },
  { id: "suppa-washed-baseball-cap", name: "Suppa-washed baseball cap", type: "Hat", price: "$29.99", badge: "Washed", vibe: "Relaxed washed cap feel with everyday summer style.", shopUrl: `${SHOP_BASE}/products/garment-washed-baseball-cap`, handle: "garment-washed-baseball-cap", render: "denimHat" },
  { id: "suppa-washed-denim-cap", name: "Suppa-Washed Denim Cap", type: "Hat", price: "$29.99", badge: "Denim", vibe: "Soft denim energy for chill bright-day fits.", shopUrl: `${SHOP_BASE}/products/suppaduppa-washed-denim-cap`, handle: "suppaduppa-washed-denim-cap", render: "denimHat" },
  { id: "suppa-racerback-tank-top", name: "Suppa-racerback tank top", type: "Tank", price: "$34.99", badge: "Tank", vibe: "Breezy racerback energy for warm sunny days.", shopUrl: `${SHOP_BASE}/products/women-s-fitted-racerback-tank-top`, handle: "women-s-fitted-racerback-tank-top", render: "tank" },
  { id: "suppa-summer-premium-tank", name: "Suppa-Summer Premium Tank", type: "Tank", price: "$39.99", badge: "Premium Tank", vibe: "Clean summer layering piece with premium feel.", shopUrl: `${SHOP_BASE}/products/men-s-premium-tank-top`, handle: "men-s-premium-tank-top", render: "tank" },
  { id: "recycled-long-sleeve-crop-top", name: "Recycled long-sleeve crop top", type: "Crop", price: "$40.24", badge: "Active", vibe: "Sporty crop energy with a smooth summer feel.", shopUrl: `${SHOP_BASE}/products/recycled-long-sleeve-crop-top`, handle: "recycled-long-sleeve-crop-top", render: "tee" },
  { id: "suppa-cropped-tee", name: "Suppa-Cropped Tee", type: "Top", price: "$24.12", badge: "Crop", vibe: "Light, playful, and made for bright weather.", shopUrl: `${SHOP_BASE}/products/women-s-crop-top`, handle: "women-s-crop-top", render: "tee" },
  { id: "suppa-sunset-crop", name: "Suppa-Sunset Crop", type: "Crop", price: "$24.99", badge: "Sunset", vibe: "Soft crop made for warm glow evenings.", shopUrl: `${SHOP_BASE}/products/cotton-crop-top`, handle: "cotton-crop-top", render: "tee" },
  { id: "suppa-wave-crop", name: "Suppa-Wave Crop", type: "Crop", price: "$49.99", badge: "Wave", vibe: "Premium sporty crop with smooth wave energy.", shopUrl: `${SHOP_BASE}/products/recycled-long-sleeve-crop-top-1`, handle: "recycled-long-sleeve-crop-top-1", render: "tee" },
  { id: "oversized-hoodie", name: "Oversized Heavyweight Hoodie", type: "Hoodie", price: "$47.45", badge: "Cozy", vibe: "A clean heavyweight piece for breezy nights.", shopUrl: `${SHOP_BASE}/products/oversized-heavyweight-hoodie`, handle: "oversized-heavyweight-hoodie", render: "hoodie" },
  { id: "suppaduppa-sticker-pack", name: "SuppaDuppa Sticker Pack", type: "Sticker", price: "$2.50", badge: "Sticker", vibe: "Small pop, big SuppaDuppa personality.", shopUrl: `${SHOP_BASE}/products/bubble-free-stickers`, handle: "bubble-free-stickers", render: "tee" },
];

const css = `
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #0f172a; background: #fff; }
  img { display: block; max-width: 100%; }
  a { color: inherit; text-decoration: none; }
  button { font: inherit; }
  svg { display: block; }

  @keyframes vibeShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  @keyframes floatOne { 0%, 100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(22px,-18px,0) scale(1.05); } }
  @keyframes floatTwo { 0%, 100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-28px,24px,0) scale(1.08); } }
  @keyframes floatLogo { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes shimmer { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
  @keyframes slidePanel { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes waveDrift { 0% { transform: translateX(0); } 50% { transform: translateX(-2%); } 100% { transform: translateX(0); } }

  .site { min-height: 100vh; position: relative; overflow: hidden; color: #0f172a; background-image: var(--siteGradient); background-size: 240% 240%; animation: vibeShift 16s ease infinite; transition: background-image .6s ease; }
  .ambient { position: absolute; border-radius: 999px; filter: blur(70px); pointer-events: none; z-index: 0; }
  .ambient.one { left: -90px; top: 70px; width: 320px; height: 320px; background: var(--glowA); animation: floatOne 12s ease-in-out infinite; }
  .ambient.two { right: -70px; top: 20px; width: 360px; height: 360px; background: var(--glowB); animation: floatTwo 14s ease-in-out infinite; }
  .ambient.three { left: 38%; bottom: 200px; width: 260px; height: 260px; background: rgba(255,255,255,0.18); filter: blur(90px); animation: floatOne 18s ease-in-out infinite; }
  .overlay { position: absolute; inset: 0; background: radial-gradient(circle at top left, rgba(255,255,255,0.94), transparent 28%), radial-gradient(circle at top right, rgba(255,255,255,0.70), transparent 26%), linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.10) 35%, rgba(255,255,255,0) 100%); pointer-events: none; z-index: 0; }
  .ocean-wash { position: absolute; left: 0; right: 0; top: 240px; bottom: 0; background: var(--seaGradient); opacity: .95; pointer-events: none; z-index: 0; }
  .ocean-lines { position: absolute; left: -4%; right: -4%; bottom: -12px; height: 56%; pointer-events: none; z-index: 0; opacity: .42; background: radial-gradient(120% 60% at 10% 100%, rgba(255,255,255,0.56) 0 20%, transparent 21%), radial-gradient(120% 60% at 34% 100%, rgba(255,255,255,0.40) 0 18%, transparent 19%), radial-gradient(120% 60% at 62% 100%, rgba(255,255,255,0.34) 0 18%, transparent 19%), radial-gradient(120% 60% at 90% 100%, rgba(255,255,255,0.28) 0 18%, transparent 19%); animation: waveDrift 12s ease-in-out infinite; }
  .container { width: min(1220px, calc(100% - 40px)); margin: 0 auto; position: relative; z-index: 1; }

  .site-nav-wrap { position: sticky; top: 14px; z-index: 10; padding-top: 14px; }
  .site-nav { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 18px; width: 100%; padding: 12px 16px; border-radius: 999px; background: rgba(255,255,255,0.68); border: 1px solid rgba(255,255,255,0.82); box-shadow: 0 18px 36px rgba(15,23,42,0.10); backdrop-filter: blur(14px); }
  .nav-brand { display: inline-flex; align-items: center; gap: 10px; min-width: max-content; font-weight: 900; color: #0f172a; }
  .nav-brand-mark { width: 38px; height: 38px; border-radius: 999px; background-image: var(--siteGradient); background-size: 240% 240%; animation: vibeShift 16s ease infinite; box-shadow: 0 10px 20px rgba(15,23,42,0.12); }
  .nav-brand-text { font-size: 15px; letter-spacing: .08em; text-transform: uppercase; }
  .nav-links { display: flex; align-items: center; justify-content: center; gap: 10px; flex: 1; flex-wrap: wrap; }
  .nav-link { display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 0 16px; border-radius: 999px; color: #334155; font-size: 14px; font-weight: 800; transition: transform .18s ease, background .18s ease, color .18s ease, box-shadow .18s ease; }
  .nav-link:hover, .nav-link:focus-visible { background-image: var(--siteGradient); background-size: 240% 240%; animation: vibeShift 16s ease infinite; color: #ffffff; box-shadow: 0 12px 24px rgba(15,23,42,0.14); transform: translateY(-1px); outline: none; }
  .nav-actions { display: flex; align-items: center; gap: 10px; min-width: max-content; }
  .nav-social { display: flex; align-items: center; gap: 8px; }
  .social-icon-link { width: 42px; height: 42px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.78); background: rgba(255,255,255,0.78); color: #0f172a; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 10px 22px rgba(15,23,42,0.08); transition: transform .18s ease, box-shadow .18s ease, color .18s ease, background .18s ease; }
  .social-icon-link:hover, .social-icon-link:focus-visible { background-image: var(--siteGradient); background-size: 240% 240%; animation: vibeShift 16s ease infinite; color: #ffffff; transform: translateY(-1px) scale(1.04); box-shadow: 0 14px 26px rgba(15,23,42,0.16); outline: none; }
  .nav-pill-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 42px; padding: 0 16px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.78); background: rgba(255,255,255,0.78); color: #0f172a; font-size: 14px; font-weight: 900; box-shadow: 0 10px 22px rgba(15,23,42,0.08); }
  .nav-pill-btn.primary { background: #0f172a; color: #ffffff; border-color: #0f172a; }
  .nav-pill-btn.color-toggle { background-image: var(--siteGradient); background-size: 240% 240%; animation: vibeShift 16s ease infinite; color: #ffffff; border: 0; }
  .cart-icon { font-size: 18px; line-height: 1; }

  .color-drawer { position: absolute; top: calc(100% + 10px); right: 0; width: min(320px, 100%); padding: 16px; border-radius: 28px; background: rgba(255,255,255,0.78); border: 1px solid rgba(255,255,255,0.86); box-shadow: 0 24px 48px rgba(15,23,42,0.14); backdrop-filter: blur(16px); animation: slidePanel .22s ease; }
  .drawer-kicker { font-size: 11px; letter-spacing: .34em; text-transform: uppercase; font-weight: 900; color: #f97316; }
  .drawer-title { margin: 8px 0 0; font-size: 24px; line-height: 1.05; font-weight: 900; color: #0f172a; }
  .drawer-colors { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 14px; }
  .drawer-color-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 14px; min-height: 52px; padding: 0 14px; border-radius: 18px; border: 1px solid rgba(255,255,255,0.85); background: rgba(255,255,255,0.82); color: #0f172a; cursor: pointer; font-size: 14px; font-weight: 900; }
  .drawer-color-btn.active { background-image: var(--siteGradient); background-size: 240% 240%; animation: vibeShift 16s ease infinite; color: #ffffff; }
  .drawer-color-left { display: flex; align-items: center; gap: 12px; }
  .drawer-swatch { width: 24px; height: 24px; border-radius: 999px; border: 2px solid rgba(255,255,255,0.8); box-shadow: 0 6px 16px rgba(15,23,42,0.12); }

  .hero { display: grid; grid-template-columns: 1.08fr 0.92fr; gap: 28px; align-items: end; padding: 48px 0 24px; position: relative; }
  .hero-shell { position: relative; overflow: hidden; border-radius: 42px; padding: 34px; background: rgba(255,255,255,0.26); border: 1px solid rgba(255,255,255,0.50); box-shadow: 0 24px 50px rgba(15,23,42,0.08); backdrop-filter: blur(10px); }
  .pill { display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 999px; background: rgba(255,255,255,0.62); border: 1px solid rgba(255,255,255,0.68); backdrop-filter: blur(10px); font-size: 14px; font-weight: 700; color: #334155; }
  .spark { width: 8px; height: 8px; border-radius: 999px; background: #f97316; box-shadow: 0 0 18px rgba(249,115,22,.5); }
  .kicker { margin: 18px 0 6px; font-size: 18px; line-height: 1.2; letter-spacing: 0.24em; text-transform: uppercase; font-weight: 900; color: #0891b2; }
  .logo-scene { position: relative; display: block; width: 100%; max-width: 100%; margin: 8px 0 16px; overflow: visible; }
  .logo-main { display: block; width: 450px; max-width: 100%; height: auto; object-fit: contain; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.12)) drop-shadow(0 8px 14px rgba(255,255,255,0.18)); animation: floatLogo 5.6s ease-in-out infinite; }
  .logo-fallback { display: inline-flex; align-items: center; justify-content: center; padding: 20px 28px; border-radius: 28px; background: rgba(255,255,255,0.62); border: 1px solid rgba(255,255,255,0.72); box-shadow: 0 18px 34px rgba(15,23,42,0.08); backdrop-filter: blur(10px); animation: floatLogo 5.6s ease-in-out infinite; }
  .logo-fallback-text { font-size: clamp(42px, 7vw, 88px); line-height: .95; letter-spacing: -0.06em; font-weight: 900; background: linear-gradient(90deg,#f97316,#ec4899,#06b6d4,#8b5cf6,#f97316); background-size: 300% 300%; animation: shimmer 8s linear infinite; -webkit-background-clip: text; background-clip: text; color: transparent; }
  .mini-copy { margin: 0 0 8px; max-width: 560px; font-size: 14px; line-height: 1.65; color: #64748b; font-weight: 700; }
  .title { margin: 0; max-width: 680px; font-size: clamp(46px, 6.2vw, 78px); line-height: .94; letter-spacing: -0.05em; font-weight: 900; color: #0f172a; }
  .gradient-text { background: linear-gradient(90deg,#f97316,#ec4899,#06b6d4,#8b5cf6,#f97316); background-size: 300% 300%; animation: shimmer 8s linear infinite; -webkit-background-clip: text; background-clip: text; color: transparent; }
  .body { margin: 18px 0 0; max-width: 620px; font-size: 19px; line-height: 1.65; color: #475569; }
  .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 22px; }
  .btn, .btn-outline, .view-all-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 56px; padding: 0 28px; border-radius: 999px; font-weight: 800; cursor: pointer; transition: transform .18s ease, box-shadow .18s ease; }
  .btn { background: #0f172a; color: #fff; border: 0; }
  .btn-outline, .view-all-btn { background: rgba(255,255,255,0.62); border: 1px solid rgba(255,255,255,0.7); color: #0f172a; backdrop-filter: blur(10px); }
  .btn:hover, .btn-outline:hover, .view-all-btn:hover { transform: translateY(-1px); }
  .stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; max-width: 600px; margin-top: 22px; }
  .stat { border-radius: 22px; padding: 16px; background: rgba(255,255,255,0.62); border: 1px solid rgba(255,255,255,0.7); backdrop-filter: blur(10px); }
  .stat-number { font-size: 34px; line-height: 1; font-weight: 900; color: #0f172a; }
  .stat-label { margin-top: 8px; font-size: 15px; color: #64748b; }

  .hero-side { position: relative; min-height: 100%; display: flex; align-items: stretch; }
  .hero-ocean-card { width: 100%; border-radius: 34px; padding: 24px; background: rgba(255,255,255,0.28); border: 1px solid rgba(255,255,255,0.52); box-shadow: 0 24px 50px rgba(15,23,42,0.08); backdrop-filter: blur(10px); position: relative; overflow: hidden; }
  .hero-ocean-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 16px; }
  .hero-ocean-label { font-size: 12px; letter-spacing: .34em; text-transform: uppercase; font-weight: 900; color: #0f172a; }
  .hero-ocean-badge { display: inline-flex; align-items: center; justify-content: center; min-height: 34px; padding: 0 12px; border-radius: 999px; background: rgba(255,255,255,0.74); border: 1px solid rgba(255,255,255,0.82); font-size: 12px; font-weight: 900; color: #0f172a; }
  .ocean-window { position: relative; border-radius: 28px; min-height: 360px; overflow: hidden; background: linear-gradient(180deg, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.20) 18%, rgba(57,189,255,0.28) 58%, rgba(19,114,255,0.34) 100%); }
  .ocean-sun { position: absolute; top: 34px; right: 34px; width: 72px; height: 72px; border-radius: 999px; background: radial-gradient(circle at 30% 30%, #fff7d6 0%, #ffe38d 38%, #ffb85e 100%); box-shadow: 0 0 34px rgba(255,214,124,0.45); }
  .ocean-wave { position: absolute; left: -8%; right: -8%; border-radius: 50%; animation: waveDrift 11s ease-in-out infinite; }
  .ocean-wave.one { bottom: 94px; height: 118px; background: rgba(255,255,255,0.42); filter: blur(0.4px); }
  .ocean-wave.two { bottom: 42px; height: 140px; background: rgba(124,225,255,0.48); animation-duration: 15s; }
  .ocean-wave.three { bottom: -24px; height: 168px; background: rgba(31,122,255,0.40); animation-duration: 18s; }
  .ocean-copy { position: absolute; left: 24px; right: 24px; bottom: 26px; z-index: 1; }
  .ocean-copy-title { font-size: 30px; line-height: 1.02; font-weight: 900; color: #ffffff; margin: 0; }
  .ocean-copy-text { margin: 10px 0 0; font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.92); max-width: 360px; }

  .products-section { padding: 16px 0 70px; }
  .products-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 20px; }
  .product-card { height: 100%; overflow: hidden; border-radius: 30px; border: 1px solid rgba(255,255,255,0.76); background: rgba(255,255,255,0.72); box-shadow: 0 24px 52px rgba(36,126,255,0.10); backdrop-filter: blur(12px); }
  .product-visual { position: relative; height: 250px; overflow: hidden; background-image: var(--panelGradient); }
  .product-visual::after { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at top, rgba(255,255,255,0.84), transparent 35%); pointer-events: none; }
  .product-badge { display: none; }
  .product-visual-inner { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 24px; }
  .product-photo { width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 12px 18px rgba(15,23,42,0.12)); }
  .product-body { padding: 18px; }
  .product-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .product-type { font-size: 18px; line-height: 1.12; letter-spacing: .01em; text-transform: none; font-weight: 900; color: #f97316; font-family: "Trebuchet MS", "Avenir Next", "Segoe UI", sans-serif; }
  .product-name { margin: 8px 0 0; font-size: 21px; line-height: 1.12; font-weight: 900; color: #0f172a; }
  .price { border-radius: 999px; background: #0f172a; padding: 8px 12px; color: #fff; font-size: 14px; font-weight: 800; white-space: nowrap; }
  .product-copy { margin: 12px 0 0; font-size: 15px; line-height: 1.7; color: #64748b; }
  .variant-row { margin-top: 14px; }
  .variant-nav { display: flex; align-items: center; justify-content: center; gap: 10px; }
  .variant-arrow { width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.78); background-image: var(--siteGradient); background-size: 240% 240%; animation: vibeShift 16s ease infinite; color: #ffffff; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; font-weight: 900; line-height: 1; box-shadow: 0 10px 22px rgba(15,23,42,0.12); }
  .variant-arrow:hover { transform: translateY(-1px) scale(1.04); box-shadow: 0 14px 28px rgba(15,23,42,0.18); }
  .card-actions { display: flex; gap: 10px; margin-top: 16px; }
  .card-btn, .card-btn-secondary { flex: 1; display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 16px; border-radius: 999px; font-size: 13px; font-weight: 900; cursor: pointer; border: 0; }
  .card-btn { background: #0f172a; color: #fff; }
  .card-btn-secondary { background: rgba(15,23,42,0.06); color: #0f172a; }
  .products-footer { display: flex; justify-content: center; margin-top: 26px; }

  .bottom-bar { margin: 34px 0 26px; padding: 0 0 8px; }
  .bottom-bar-shell { display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 18px 20px; border-radius: 30px; background: rgba(255,255,255,0.70); border: 1px solid rgba(255,255,255,0.82); box-shadow: 0 20px 40px rgba(15,23,42,0.10); backdrop-filter: blur(14px); }
  .bottom-copy { display: flex; flex-direction: column; gap: 6px; }
  .bottom-contact { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 8px; }
  .contact-chip { display: inline-flex; align-items: center; gap: 8px; min-height: 40px; padding: 0 14px; border-radius: 999px; background: rgba(255,255,255,0.84); border: 1px solid rgba(255,255,255,0.88); color: #0f172a; font-size: 13px; font-weight: 900; }
  .bottom-social { display: flex; align-items: center; gap: 8px; }
  .bottom-kicker { font-size: 12px; letter-spacing: .34em; text-transform: uppercase; font-weight: 900; color: #f97316; }
  .bottom-title { font-size: 24px; line-height: 1.1; font-weight: 900; color: #0f172a; }
  .bottom-links { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .bottom-link { display: inline-flex; align-items: center; justify-content: center; min-height: 42px; padding: 0 16px; border-radius: 999px; background: rgba(255,255,255,0.82); border: 1px solid rgba(255,255,255,0.86); color: #0f172a; font-size: 14px; font-weight: 900; }
  .bottom-link.primary { background-image: var(--siteGradient); background-size: 240% 240%; animation: vibeShift 16s ease infinite; color: #ffffff; }
  .footer { padding: 0 0 72px; }

  @media (max-width: 1180px) { .hero { grid-template-columns: 1fr; } .products-grid { grid-template-columns: repeat(3, minmax(0,1fr)); } }
  @media (max-width: 980px) { .site-nav { border-radius: 32px; flex-wrap: wrap; justify-content: center; } .nav-brand, .nav-actions, .nav-links, .nav-social { width: 100%; justify-content: center; } .nav-actions { flex-wrap: wrap; } .color-drawer { width: 100%; } .bottom-bar-shell { flex-direction: column; align-items: flex-start; } }
  @media (max-width: 768px) { .container { width: min(100% - 22px, 100%); } .hero-shell, .hero-ocean-card { padding: 22px; border-radius: 28px; } .title { max-width: 100%; font-size: 42px; } .body, .mini-copy { max-width: 100%; } .stats, .products-grid { grid-template-columns: 1fr; } .site-nav-wrap { top: 8px; } .site-nav { border-radius: 30px; } .ocean-window { min-height: 280px; } .ocean-copy-title { font-size: 24px; } }
`;

function IconBase({ children, size = 16, viewBox = "0 0 24 24" }) {
  return (
    <svg width={size} height={size} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {children}
    </svg>
  );
}

function MailIcon({ size = 16 }) {
  return (
    <IconBase size={size}>
      <path d="M4 6H20V18H4V6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M4 7L12 13L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </IconBase>
  );
}

function CameraIcon({ size = 16 }) {
  return (
    <IconBase size={size}>
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </IconBase>
  );
}

function MusicIcon({ size = 16 }) {
  return (
    <IconBase size={size}>
      <path d="M10 6V16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 7L18 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="17" r="2.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="15" cy="15.5" r="2.5" stroke="currentColor" strokeWidth="2" />
    </IconBase>
  );
}

function LogoMini() {
  return logoSrc ? <img src={logoSrc} alt="Suppa Duppa logo" /> : <span className="logo-mini-fallback">Suppa</span>;
}

function HatMock({ tone = "#fff" }) {
  return (
    <div className="hat" style={{ "--productBody": tone }}>
      <div className="hat-crown" />
      <div className="hat-brim" />
      <div className="hat-logo"><LogoMini /></div>
    </div>
  );
}

function TankMock({ tone = "#fff" }) {
  return (
    <div className="tank" style={{ "--productBody": tone }}>
      <div className="tank-neck" />
      <div className="tank-logo"><LogoMini /></div>
    </div>
  );
}

function HoodieMock({ tone = "#7c746f" }) {
  return (
    <div className="hoodie" style={{ "--productBody": tone }}>
      <div className="hoodie-hood" />
      <div className="hoodie-logo"><LogoMini /></div>
      <div className="hoodie-pocket" />
    </div>
  );
}

function TeeMock({ tone = "#fff" }) {
  return (
    <div className="tee" style={{ "--productBody": tone }}>
      <div className="tee-sleeve-left" />
      <div className="tee-sleeve-right" />
      <div className="tee-neck" />
      <div className="tee-logo"><LogoMini /></div>
    </div>
  );
}

function ProductVisual({ kind }) {
  if (kind === "tank") return <TankMock tone="#2996ff" />;
  if (kind === "hoodie") return <HoodieMock tone="#7a756f" />;
  if (kind === "denimHat") return <HatMock tone="#bcd3df" />;
  if (kind === "blackHat") return <HatMock tone="#282828" />;
  if (kind === "tee") return <TeeMock tone="#ffffff" />;
  if (kind === "hatPink") return <HatMock tone="#ffc0dc" />;
  return <HatMock tone="#111111" />;
}

function getColorOptionMeta(productData) {
  const options = Array.isArray(productData?.options) ? productData.options : [];
  const colorIndex = options.findIndex((option) => {
    const optionName = String(option?.name || "").toLowerCase();
    return optionName.includes("color") || optionName.includes("colour");
  });
  if (colorIndex === -1) return { colorIndex: -1, colorValues: [] };
  return { colorIndex, colorValues: Array.isArray(options[colorIndex]?.values) ? options[colorIndex].values : [] };
}

function getVariantForColor(productData, colorValue) {
  const variants = Array.isArray(productData?.variants) ? productData.variants : [];
  const { colorIndex } = getColorOptionMeta(productData);
  if (colorIndex === -1) return variants.find((variant) => variant.available) || variants[0] || null;
  const optionKey = `option${colorIndex + 1}`;
  return (
    variants.find((variant) => variant[optionKey] === colorValue && variant.available) ||
    variants.find((variant) => variant[optionKey] === colorValue) ||
    variants.find((variant) => variant.available) ||
    variants[0] ||
    null
  );
}

function useShopifyProductData(handle) {
  const [state, setState] = useState({ productData: null, loading: true });
  useEffect(() => {
    let cancelled = false;
    async function loadProduct() {
      if (!handle) {
        if (!cancelled) setState({ productData: null, loading: false });
        return;
      }
      try {
        const response = await fetch(`${SHOP_BASE}/products/${handle}.js`);
        if (!response.ok) throw new Error("Failed to load product");
        const data = await response.json();
        if (!cancelled) setState({ productData: data, loading: false });
      } catch {
        if (!cancelled) setState({ productData: null, loading: false });
      }
    }
    loadProduct();
    return () => {
      cancelled = true;
    };
  }, [handle]);
  return state;
}

function FeaturedCard({ product, selected }) {
  const { productData } = useShopifyProductData(product.handle);
  const colorMeta = useMemo(() => getColorOptionMeta(productData), [productData]);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    if (!colorMeta.colorValues.length) {
      setSelectedColor("");
      return;
    }
    setSelectedColor((current) => (current && colorMeta.colorValues.includes(current) ? current : colorMeta.colorValues[0]));
  }, [colorMeta.colorValues]);

  const selectedVariant = useMemo(() => getVariantForColor(productData, selectedColor), [productData, selectedColor]);
  const imageUrl = selectedVariant?.featured_image?.src || productData?.featured_image || productData?.images?.[0] || "";
  const variantId = selectedVariant?.id ? String(selectedVariant.id) : "";
  const activeIndex = colorMeta.colorValues.length ? Math.max(colorMeta.colorValues.indexOf(selectedColor), 0) : -1;

  function goPrevColor() {
    if (colorMeta.colorValues.length < 2) return;
    const nextIndex = activeIndex <= 0 ? colorMeta.colorValues.length - 1 : activeIndex - 1;
    setSelectedColor(colorMeta.colorValues[nextIndex]);
  }

  function goNextColor() {
    if (colorMeta.colorValues.length < 2) return;
    const nextIndex = activeIndex >= colorMeta.colorValues.length - 1 ? 0 : activeIndex + 1;
    setSelectedColor(colorMeta.colorValues[nextIndex]);
  }

  function handleAddToCart(event) {
    event.preventDefault();
    if (!variantId) {
      window.location.href = product.shopUrl;
      return;
    }
    window.location.href = `${SHOP_BASE}/cart/${variantId}:1`;
  }

  return (
    <article className="product-card">
      <div className="product-visual" style={{ "--panelGradient": selected.panel }}>
        <div className="product-visual-inner">
          {imageUrl ? <img className="product-photo" src={imageUrl} alt={product.name} loading="lazy" /> : <ProductVisual kind={product.render} />}
        </div>
      </div>
      <div className="product-body">
        <div className="product-top">
          <div>
            <div className="product-type">{product.name}</div>
          </div>
          <div className="price">{product.price}</div>
        </div>
        <p className="product-copy">{product.vibe}</p>
        {colorMeta.colorValues.length > 1 ? (
          <div className="variant-row">
            <div className="variant-nav">
              <button type="button" className="variant-arrow" onClick={goPrevColor} aria-label="Previous color">‹</button>
              <button type="button" className="variant-arrow" onClick={goNextColor} aria-label="Next color">›</button>
            </div>
          </div>
        ) : null}
        <div className="card-actions">
          <button type="button" className="card-btn" onClick={handleAddToCart}>Add to cart</button>
          <a className="card-btn-secondary" href={product.shopUrl}>View item</a>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [activeColor, setActiveColor] = useState(themeColors[0].name);
  const [pickerOpen, setPickerOpen] = useState(false);
  const selected = useMemo(() => themeColors.find((color) => color.name === activeColor) || themeColors[0], [activeColor]);

  return (
    <>
      <style>{css}</style>
      <div className="site" style={{ "--siteGradient": selected.gradient, "--glowA": selected.glowA, "--glowB": selected.glowB, "--seaGradient": selected.sea }}>
        <div className="ambient one" />
        <div className="ambient two" />
        <div className="ambient three" />
        <div className="overlay" />
        <div className="ocean-wash" />
        <div className="ocean-lines" />

        <div className="container">
          <div className="site-nav-wrap">
            <header className="site-nav" id="home">
              <a href="#home" className="nav-brand">
                <span className="nav-brand-mark" />
                <span className="nav-brand-text">SuppaDuppa</span>
              </a>

              <nav className="nav-links" aria-label="Main navigation">
                <a href="#home" className="nav-link">Home</a>
                <a href="#featured-products" className="nav-link">Shop</a>
                <a href={COLLECTION_URL} className="nav-link">Summer Drop</a>
                <a href={ALL_PRODUCTS_URL} className="nav-link">All Products</a>
                <a href="#contact" className="nav-link">Contact</a>
              </nav>

              <div className="nav-actions">
                <button type="button" className="nav-pill-btn color-toggle" onClick={() => setPickerOpen((open) => !open)}>
                  <span>🎨</span>
                  <span>Colors</span>
                </button>
                <div className="nav-social" aria-label="Social and contact">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="social-icon-link" aria-label="Contact email"><MailIcon size={16} /></a>
                  <a href={INSTAGRAM_URL} className="social-icon-link" aria-label="Instagram"><CameraIcon size={16} /></a>
                  <a href={SOCIAL_URL} className="social-icon-link" aria-label="Social media"><MusicIcon size={16} /></a>
                </div>
                <a href={CART_URL} className="nav-pill-btn"><span className="cart-icon">🛒</span><span>Cart</span></a>
                <a href={COLLECTION_URL} className="nav-pill-btn primary">Shop now</a>
              </div>

              {pickerOpen ? (
                <div className="color-drawer">
                  <div className="drawer-kicker">Color picker</div>
                  <h2 className="drawer-title">Pick the mood</h2>
                  <div className="drawer-colors">
                    {themeColors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        className={`drawer-color-btn ${activeColor === color.name ? "active" : ""}`}
                        onClick={() => {
                          setActiveColor(color.name);
                          setPickerOpen(false);
                        }}
                      >
                        <span className="drawer-color-left">
                          <span className="drawer-swatch" style={{ backgroundImage: color.gradient }} />
                          <span>{color.name}</span>
                        </span>
                        <span>{activeColor === color.name ? "On" : "Set"}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </header>
          </div>

          <section className="hero">
            <div className="hero-shell">
              <div className="pill"><span className="spark" />Summer drop is live</div>
              <p className="kicker">How You Feelin'? Suppa Duppa.</p>
              <div className="logo-scene">
                {logoSrc ? (
                  <img src={logoSrc} alt="Suppa Duppa" className="logo-main" />
                ) : (
                  <div className="logo-fallback" aria-label="Suppa Duppa logo">
                    <span className="logo-fallback-text">SuppaDuppa</span>
                  </div>
                )}
              </div>
              <p className="mini-copy">Bright logo. Clean layout. Ocean breeze. Summer color. Pure SuppaDuppa motion from top to bottom.</p>
              <h1 className="title"><span className="gradient-text">Beach-ready hats and tanks with pure summer mood.</span></h1>
              <p className="body">Suppa Duppa feels like walking barefoot on warm sand, catching ocean breeze, and pulling up in bright colors that make the whole day feel lighter.</p>
              <div className="actions">
                <a href={COLLECTION_URL} className="btn"><span>🛍️</span><span>Shop the collection</span></a>
                <a href={CART_URL} className="btn-outline"><span>🛒</span><span>View cart</span></a>
              </div>
              <div className="stats">
                <div className="stat"><div className="stat-number">17</div><div className="stat-label">Live shop cards</div></div>
                <div className="stat"><div className="stat-number">9</div><div className="stat-label">Hat styles first</div></div>
                <div className="stat"><div className="stat-number">100%</div><div className="stat-label">SuppaDuppa wave mood</div></div>
              </div>
            </div>

            <div className="hero-side">
              <div className="hero-ocean-card">
                <div className="hero-ocean-top">
                  <span className="hero-ocean-label">Ocean feel</span>
                  <span className="hero-ocean-badge">SuppaDuppa tide</span>
                </div>
                <div className="ocean-window">
                  <div className="ocean-sun" />
                  <div className="ocean-wave one" />
                  <div className="ocean-wave two" />
                  <div className="ocean-wave three" />
                  <div className="ocean-copy">
                    <h2 className="ocean-copy-title">Bright water. Soft breeze. Loud color.</h2>
                    <p className="ocean-copy-text">The page now leans ocean-forward so the whole storefront feels more alive, more summery, and more like a SuppaDuppa beach drop.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="products-section" id="featured-products">
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <FeaturedCard key={product.id} product={product} selected={selected} />
              ))}
            </div>
            <div className="products-footer">
              <a href={ALL_PRODUCTS_URL} className="view-all-btn">View all products</a>
            </div>
          </section>

          <section className="bottom-bar">
            <div className="bottom-bar-shell">
              <div className="bottom-copy" id="contact">
                <span className="bottom-kicker">Stay SuppaDuppa</span>
                <span className="bottom-title">Catch the summer drop and keep the wave going.</span>
                <div className="bottom-contact">
                  <a className="contact-chip" href={`mailto:${CONTACT_EMAIL}`}><MailIcon size={15} /><span>Contact</span></a>
                  <div className="bottom-social" aria-label="Social icons">
                    <a href={INSTAGRAM_URL} className="social-icon-link" aria-label="Instagram"><CameraIcon size={16} /></a>
                    <a href={SOCIAL_URL} className="social-icon-link" aria-label="Social media"><MusicIcon size={16} /></a>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="social-icon-link" aria-label="Email"><MailIcon size={16} /></a>
                  </div>
                </div>
              </div>
              <div className="bottom-links">
                <a href="#home" className="bottom-link">Back to top</a>
                <a href={CART_URL} className="bottom-link">View cart</a>
                <a href={ALL_PRODUCTS_URL} className="bottom-link primary">Shop all</a>
              </div>
            </div>
          </section>

          <section className="footer" />
        </div>
      </div>
    </>
  );
}
