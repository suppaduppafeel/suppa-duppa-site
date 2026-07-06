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
    name: "Sunset Coral",
    gradient: "linear-gradient(135deg, #fff1e8 0%, #ffe3b3 28%, #ff8fb1 62%, #ff6b8a 100%)",
    panel: "linear-gradient(135deg, rgba(255,184,116,0.95) 0%, rgba(255,149,181,0.92) 55%, rgba(255,105,180,0.96) 100%)",
    glowA: "rgba(255,148,120,0.28)",
    glowB: "rgba(255,105,180,0.22)",
  },
  {
    name: "Ocean Aqua",
    gradient: "linear-gradient(135deg, #ecfeff 0%, #d7f9ff 22%, #8fe3ff 58%, #4f8dff 100%)",
    panel: "linear-gradient(135deg, rgba(127,236,255,0.96) 0%, rgba(72,199,255,0.94) 52%, rgba(71,127,255,0.96) 100%)",
    glowA: "rgba(56,189,248,0.26)",
    glowB: "rgba(59,130,246,0.24)",
  },
  {
    name: "Palm Lime",
    gradient: "linear-gradient(135deg, #f7ffe1 0%, #e9ffb3 26%, #8ee58f 62%, #3bcf86 100%)",
    panel: "linear-gradient(135deg, rgba(202,255,113,0.96) 0%, rgba(82,221,128,0.95) 55%, rgba(34,197,94,0.96) 100%)",
    glowA: "rgba(132,204,22,0.26)",
    glowB: "rgba(34,197,94,0.22)",
  },
  {
    name: "Sand Cream",
    gradient: "linear-gradient(135deg, #fff8ea 0%, #fff1bf 28%, #ffe59a 55%, #ffbf71 100%)",
    panel: "linear-gradient(135deg, rgba(255,229,153,0.96) 0%, rgba(255,238,196,0.94) 52%, rgba(255,186,110,0.96) 100%)",
    glowA: "rgba(255,213,128,0.28)",
    glowB: "rgba(251,191,36,0.18)",
  },
];

const featuredProducts = [
  { id: "suppafly-street-5-panel", name: "SuppaFly Street 5 Panel", type: "Hat", price: "$29.99", badge: "Street", vibe: "Street-ready 5 panel with crisp summer attitude.", shopUrl: `${SHOP_BASE}/products/5-panel-cap`, handle: "5-panel-cap", render: "hat" },
  { id: "suppa-camo-trucker-hat", name: "Suppa-Camo Trucker Hat", type: "Hat", price: "$34.99", badge: "Camo", vibe: "Outdoor flavor mixed with signature SuppaDuppa vibes.", shopUrl: `${SHOP_BASE}/products/suppa-camo-trucker-hat`, handle: "suppa-camo-trucker-hat", render: "hatPink" },
  { id: "suppa-classic-dad-hat", name: "Suppa-Classic Dad Hat", type: "Hat", price: "$27.99", badge: "Classic", vibe: "An easy clean cap for everyday summer fits.", shopUrl: `${SHOP_BASE}/products/distressed-dad-hat`, handle: "distressed-dad-hat", render: "blackHat", useShopifyImage: false },
  { id: "suppa-foam-trucker-hat", name: "Suppa-Foam Trucker Hat", type: "Hat", price: "$27.99", badge: "Foam", vibe: "A lighter trucker style with easy fun color pop.", shopUrl: `${SHOP_BASE}/products/suppaduppa-foam-trucker-cap`, handle: "suppaduppa-foam-trucker-cap", render: "hatPink" },
  { id: "suppa-signature-snapback", name: "Suppa-Signature Snapback", type: "Hat", price: "$44.99", badge: "Signature", vibe: "A sharper premium cap with statement Suppa energy.", shopUrl: `${SHOP_BASE}/products/snapback-hat`, handle: "snapback-hat", render: "blackHat" },
  { id: "suppa-snapback-hat", name: "Suppa-Snapback Hat", type: "Hat", price: "$34.99", badge: "Snapback", vibe: "Straight-up classic cap style with sunny attitude.", shopUrl: `${SHOP_BASE}/products/suppa-snapback-hat`, handle: "suppa-snapback-hat", render: "hat" },
  { id: "suppa-vintage-cotton-twill-cap", name: "Suppa-Vintage Cotton Twill Cap", type: "Hat", price: "$34.99", badge: "Vintage", vibe: "Vintage texture with a smoother elevated finish.", shopUrl: `${SHOP_BASE}/products/vintage-cotton-twill-cap`, handle: "vintage-cotton-twill-cap", render: "blackHat", useShopifyImage: false },
  { id: "suppa-washed-baseball-cap", name: "Suppa-washed baseball cap", type: "Hat", price: "$29.99", badge: "Washed", vibe: "Relaxed washed cap feel with everyday summer style.", shopUrl: `${SHOP_BASE}/products/garment-washed-baseball-cap`, handle: "garment-washed-baseball-cap", render: "denimHat", useShopifyImage: false },
  { id: "suppa-washed-denim-cap", name: "Suppa-Washed Denim Cap", type: "Hat", price: "$29.99", badge: "Denim", vibe: "Soft denim energy for chill bright-day fits.", shopUrl: `${SHOP_BASE}/products/suppaduppa-washed-denim-cap`, handle: "suppaduppa-washed-denim-cap", render: "denimHat", useShopifyImage: false },
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
  @keyframes pulseGlow { 0%, 100% { box-shadow: 0 18px 36px rgba(15,23,42,0.16); } 50% { box-shadow: 0 24px 48px rgba(15,23,42,0.24); } }
  @keyframes shimmer { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }

  .site { min-height: 100vh; position: relative; overflow: hidden; color: #0f172a; background-image: var(--siteGradient); background-size: 240% 240%; animation: vibeShift 16s ease infinite; transition: background-image .6s ease; }
  .ambient { position: absolute; border-radius: 999px; filter: blur(70px); pointer-events: none; z-index: 0; }
  .ambient.one { left: -90px; top: 90px; width: 300px; height: 300px; background: var(--glowA); animation: floatOne 12s ease-in-out infinite; }
  .ambient.two { right: -70px; top: 40px; width: 360px; height: 360px; background: var(--glowB); animation: floatTwo 14s ease-in-out infinite; }
  .ambient.three { left: 38%; bottom: 180px; width: 260px; height: 260px; background: rgba(255,255,255,0.18); filter: blur(90px); animation: floatOne 18s ease-in-out infinite; }
  .overlay { position: absolute; inset: 0; background: radial-gradient(circle at top left, rgba(255,255,255,0.94), transparent 28%), radial-gradient(circle at top right, rgba(255,255,255,0.7), transparent 26%), radial-gradient(circle at bottom, rgba(255,255,255,0.22), transparent 34%); pointer-events: none; z-index: 0; }
  .container { width: min(1220px, calc(100% - 40px)); margin: 0 auto; position: relative; z-index: 1; }

  .site-nav { position: sticky; top: 14px; z-index: 8; display: flex; align-items: center; justify-content: space-between; gap: 18px; width: 100%; margin-top: 14px; padding: 12px 16px; border-radius: 999px; background: rgba(255,255,255,0.68); border: 1px solid rgba(255,255,255,0.82); box-shadow: 0 18px 36px rgba(15,23,42,0.10); backdrop-filter: blur(14px); }
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
  .cart-icon { font-size: 18px; line-height: 1; }

  .hero { display: grid; grid-template-columns: 1.16fr 0.84fr; gap: 34px; align-items: start; padding: 28px 0 20px; }
  .pill { display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 999px; background: rgba(255,255,255,0.62); border: 1px solid rgba(255,255,255,0.68); backdrop-filter: blur(10px); font-size: 14px; font-weight: 700; color: #334155; }
  .spark { width: 8px; height: 8px; border-radius: 999px; background: #f97316; box-shadow: 0 0 18px rgba(249,115,22,.5); }
  .kicker { margin: 18px 0 6px; font-size: 18px; line-height: 1.2; letter-spacing: 0.24em; text-transform: uppercase; font-weight: 900; color: #0891b2; }
  .logo-scene { position: relative; display: block; width: 100%; max-width: 100%; margin: 6px 0 16px; overflow: visible; }
  .logo-main { display: block; width: 450px; max-width: 100%; height: auto; object-fit: contain; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.12)) drop-shadow(0 8px 14px rgba(255,255,255,0.18)); animation: floatLogo 5.6s ease-in-out infinite; }
  .logo-fallback { display: inline-flex; align-items: center; justify-content: center; padding: 20px 28px; border-radius: 28px; background: rgba(255,255,255,0.62); border: 1px solid rgba(255,255,255,0.72); box-shadow: 0 18px 34px rgba(15,23,42,0.08); backdrop-filter: blur(10px); animation: floatLogo 5.6s ease-in-out infinite; }
  .logo-fallback-text { font-size: clamp(42px, 7vw, 88px); line-height: .95; letter-spacing: -0.06em; font-weight: 900; background: linear-gradient(90deg,#f97316,#ec4899,#06b6d4,#8b5cf6,#f97316); background-size: 300% 300%; animation: shimmer 8s linear infinite; -webkit-background-clip: text; background-clip: text; color: transparent; }
  .mini-copy { margin: 0 0 8px; max-width: 560px; font-size: 14px; line-height: 1.65; color: #64748b; font-weight: 700; }
  .title { margin: 0; max-width: 620px; font-size: clamp(46px, 6.2vw, 78px); line-height: .95; letter-spacing: -0.05em; font-weight: 900; color: #0f172a; }
  .gradient-text { background: linear-gradient(90deg,#f97316,#ec4899,#06b6d4,#8b5cf6,#f97316); background-size: 300% 300%; animation: shimmer 8s linear infinite; -webkit-background-clip: text; background-clip: text; color: transparent; }
  .body { margin: 18px 0 0; max-width: 620px; font-size: 19px; line-height: 1.65; color: #475569; }
  .body-sub { margin: 10px 0 0; max-width: 620px; font-size: 16px; line-height: 1.6; color: #64748b; font-weight: 700; }
  .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 22px; }
  .btn, .btn-outline, .view-all-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 56px; padding: 0 28px; border-radius: 999px; font-weight: 800; cursor: pointer; transition: transform .18s ease, box-shadow .18s ease; }
  .btn { background: #0f172a; color: #fff; animation: pulseGlow 4s ease-in-out infinite; border: 0; }
  .btn-outline, .view-all-btn { background: rgba(255,255,255,0.62); border: 1px solid rgba(255,255,255,0.7); color: #0f172a; backdrop-filter: blur(10px); }
  .btn:hover, .btn-outline:hover, .view-all-btn:hover { transform: translateY(-1px); }
  .stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; max-width: 600px; margin-top: 22px; }
  .stat { border-radius: 22px; padding: 16px; background: rgba(255,255,255,0.62); border: 1px solid rgba(255,255,255,0.7); backdrop-filter: blur(10px); }
  .stat-number { font-size: 34px; line-height: 1; font-weight: 900; color: #0f172a; }
  .stat-label { margin-top: 8px; font-size: 15px; color: #64748b; }

  .picker-wrap { position: relative; width: 100%; max-width: 380px; justify-self: end; align-self: start; }
  .picker-blur { position: absolute; inset: -14px; border-radius: 34px; background: rgba(255,255,255,0.35); filter: blur(18px); }
  .picker { position: relative; border-radius: 28px; padding: 18px; background: rgba(255,255,255,0.58); border: 1px solid rgba(255,255,255,0.72); box-shadow: 0 22px 46px rgba(251,146,60,0.12); backdrop-filter: blur(12px); }
  .picker-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
  .picker-label { font-size: 13px; line-height: 1.2; letter-spacing: .35em; text-transform: uppercase; font-weight: 900; color: #f97316; }
  .picker-title { margin: 6px 0 0; font-size: 30px; line-height: 1.02; font-weight: 900; color: #0f172a; }
  .sun { font-size: 28px; animation: floatLogo 4s ease-in-out infinite; }
  .color-list { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }
  .color-btn { border: 1px solid rgba(255,255,255,0.76); background: rgba(255,255,255,0.7); color: #334155; padding: 12px 18px; border-radius: 999px; cursor: pointer; font-size: 14px; font-weight: 700; }
  .color-btn.active { background: #0f172a; color: #fff; border-color: #0f172a; }
  .featured { position: relative; overflow: hidden; border-radius: 24px; padding: 16px; min-height: 312px; background-image: var(--panelGradient); }
  .featured-card { position: relative; z-index: 1; border-radius: 24px; padding: 20px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.46); backdrop-filter: blur(8px); }
  .featured-label { font-size: 11px; letter-spacing: .38em; text-transform: uppercase; font-weight: 900; color: rgba(255,255,255,0.95); }
  .featured-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 16px; margin-top: 18px; }
  .product-mini { border-radius: 22px; background: rgba(255,255,255,0.82); padding: 16px; box-shadow: 0 12px 30px rgba(15,23,42,0.08); }
  .product-mini-title { margin-top: 12px; text-align: center; font-size: 12px; letter-spacing: .28em; text-transform: uppercase; font-weight: 800; color: #64748b; }

  .hat, .tee, .hoodie, .tank { position: relative; margin: 0 auto; }
  .hat { width: 150px; height: 96px; }
  .hat-crown { position: absolute; left: 20px; top: 16px; width: 110px; height: 46px; border-radius: 999px 999px 24px 24px; background: var(--productBody, #fff); box-shadow: 0 8px 18px rgba(15,23,42,0.08); }
  .hat-brim { position: absolute; left: 68px; top: 52px; width: 72px; height: 14px; border-radius: 999px; background: var(--productBody, #fff); box-shadow: 0 6px 14px rgba(15,23,42,0.08); }
  .hat-logo, .tank-logo, .hoodie-logo, .tee-logo { display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .hat-logo { position: absolute; left: 42px; top: 18px; width: 66px; padding: 4px; border-radius: 12px; background: rgba(255,255,255,0.92); box-shadow: 0 4px 14px rgba(15,23,42,0.08); }
  .tank { width: 98px; height: 132px; border-radius: 24px; background: var(--productBody, #fff); box-shadow: 0 10px 22px rgba(15,23,42,0.08); }
  .tank-neck { position: absolute; left: 50%; top: -8px; width: 44px; height: 22px; transform: translateX(-50%); border-radius: 0 0 22px 22px; border: 6px solid var(--productBody, #fff); border-top: 0; }
  .tank-logo { position: absolute; left: 10px; right: 10px; top: 34px; padding: 4px; border-radius: 16px; background: rgba(255,255,255,0.94); box-shadow: 0 4px 14px rgba(15,23,42,0.06); }
  .hoodie { width: 142px; height: 138px; border-radius: 18px 18px 26px 26px; background: var(--productBody, #7c746f); box-shadow: 0 10px 22px rgba(15,23,42,0.08); }
  .hoodie-hood { position: absolute; left: 50%; top: -14px; width: 62px; height: 46px; transform: translateX(-50%); border-radius: 0 0 34px 34px; border: 12px solid var(--productBody, #7c746f); border-top: 0; }
  .hoodie-pocket { position: absolute; left: 38px; bottom: 18px; width: 66px; height: 30px; border-radius: 14px; background: rgba(255,255,255,0.12); }
  .hoodie-logo { position: absolute; left: 36px; right: 36px; top: 44px; padding: 4px; border-radius: 14px; background: rgba(255,255,255,0.92); }
  .tee { width: 150px; height: 118px; border-radius: 12px 12px 20px 20px; background: var(--productBody, #fff); box-shadow: 0 10px 22px rgba(15,23,42,0.08); }
  .tee-sleeve-left, .tee-sleeve-right { position: absolute; top: 10px; width: 34px; height: 48px; background: var(--productBody, #fff); }
  .tee-sleeve-left { left: -22px; border-radius: 20px 0 14px 14px; transform: rotate(25deg); }
  .tee-sleeve-right { right: -22px; border-radius: 0 20px 14px 14px; transform: rotate(-25deg); }
  .tee-neck { position: absolute; left: 50%; top: -5px; width: 34px; height: 16px; transform: translateX(-50%); border-radius: 0 0 16px 16px; border: 5px solid rgba(255,255,255,0.8); border-top: 0; }
  .tee-logo { position: absolute; left: 28px; right: 28px; top: 28px; padding: 4px; border-radius: 14px; background: rgba(255,255,255,0.92); }
  .logo-mini-fallback { font-size: 8px; font-weight: 900; letter-spacing: .04em; color: #0f172a; }

  .products-section { padding: 14px 0 70px; }
  .products-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 20px; }
  .product-card { height: 100%; overflow: hidden; border-radius: 30px; border: 1px solid rgba(255,255,255,0.76); background: rgba(255,255,255,0.72); box-shadow: 0 24px 52px rgba(249,115,22,0.08); backdrop-filter: blur(12px); }
  .product-visual { position: relative; height: 250px; overflow: hidden; background-image: var(--panelGradient); }
  .product-visual::after { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at top, rgba(255,255,255,0.84), transparent 35%); pointer-events: none; }
  .product-badge { position: absolute; left: 18px; top: 18px; z-index: 1; border-radius: 999px; background: #0f172a; padding: 8px 12px; color: #fff; font-size: 11px; font-weight: 900; letter-spacing: .22em; text-transform: uppercase; }
  .product-visual-inner { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 24px; }
  .product-photo { width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 12px 18px rgba(15,23,42,0.12)); }
  .product-body { padding: 18px; }
  .product-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .product-type { font-size: 11px; line-height: 1.2; letter-spacing: .35em; text-transform: uppercase; font-weight: 900; color: #f97316; }
  .product-name { margin: 8px 0 0; font-size: 21px; line-height: 1.12; font-weight: 900; color: #0f172a; }
  .price { border-radius: 999px; background: #0f172a; padding: 8px 12px; color: #fff; font-size: 14px; font-weight: 800; white-space: nowrap; }
  .product-copy { margin: 12px 0 0; font-size: 15px; line-height: 1.7; color: #64748b; }
  .variant-row { margin-top: 14px; }
  .variant-nav { display: flex; align-items: center; justify-content: center; gap: 10px; }
  .variant-arrow { width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.78); background-image: var(--siteGradient); background-size: 240% 240%; animation: vibeShift 16s ease infinite; color: #ffffff; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; font-weight: 900; line-height: 1; box-shadow: 0 10px 22px rgba(15,23,42,0.12); }
  .variant-arrow:hover { transform: translateY(-1px) scale(1.04); box-shadow: 0 14px 28px rgba(15,23,42,0.18); }
  .variant-arrow:disabled { opacity: 0.45; cursor: default; transform: none; box-shadow: 0 8px 18px rgba(15,23,42,0.08); }
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

  @media (max-width: 1100px) {
    .hero { grid-template-columns: 1fr; }
    .products-grid { grid-template-columns: repeat(3, minmax(0,1fr)); }
    .picker-wrap { max-width: 100%; justify-self: stretch; }
  }
  @media (max-width: 900px) {
    .site-nav { border-radius: 30px; flex-wrap: wrap; justify-content: center; }
    .nav-brand, .nav-actions, .nav-links, .nav-social { width: 100%; justify-content: center; }
    .nav-actions { flex-wrap: wrap; }
    .bottom-bar-shell { flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 768px) {
    .container { width: min(100% - 22px, 100%); }
    .hero { position: relative; display: block; padding-top: 28px; padding-bottom: 18px; }
    .picker-wrap { position: absolute; top: 6px; right: 0; left: auto; width: auto; max-width: min(230px, calc(100% - 24px)); z-index: 5; margin-top: 54px; }
    .picker-blur { inset: -4px; border-radius: 999px; filter: blur(8px); }
    .picker { border-radius: 999px; padding: 8px 10px; min-height: auto; }
    .picker-top, .featured { display: none !important; }
    .color-list { display: flex; flex-wrap: nowrap; justify-content: flex-end; align-items: center; gap: 8px; margin: 0; overflow-x: auto; scrollbar-width: none; }
    .color-list::-webkit-scrollbar { display: none; }
    .color-btn { flex: 0 0 auto; padding: 8px 12px; font-size: 12px; line-height: 1; white-space: nowrap; }
    .logo-main { width: min(100%, 360px); max-width: 100%; height: auto; }
    .title { max-width: 100%; font-size: 44px; }
    .body, .body-sub, .mini-copy { max-width: 100%; }
    .stats, .products-grid, .featured-grid { grid-template-columns: 1fr; }
    .picker-title { font-size: 30px; }
  }
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

  if (colorIndex === -1) {
    return { colorIndex: -1, colorValues: [] };
  }

  return {
    colorIndex,
    colorValues: Array.isArray(options[colorIndex]?.values) ? options[colorIndex].values : [],
  };
}

function getVariantForColor(productData, colorValue) {
  const variants = Array.isArray(productData?.variants) ? productData.variants : [];
  const { colorIndex } = getColorOptionMeta(productData);

  if (colorIndex === -1) {
    return variants.find((variant) => variant.available) || variants[0] || null;
  }

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
    setSelectedColor((current) => {
      if (current && colorMeta.colorValues.includes(current)) return current;
      return colorMeta.colorValues[0];
    });
  }, [colorMeta.colorValues]);

  const selectedVariant = useMemo(() => getVariantForColor(productData, selectedColor), [productData, selectedColor]);
  const shopifyImageUrl = selectedVariant?.featured_image?.src || productData?.featured_image || productData?.images?.[0] || "";
  const imageUrl = product.useShopifyImage === false ? "" : shopifyImageUrl;
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
        <div className="product-badge">{product.badge}</div>
        <div className="product-visual-inner">
          {imageUrl ? <img className="product-photo" src={imageUrl} alt={product.name} loading="lazy" /> : <ProductVisual kind={product.render} />}
        </div>
      </div>
      <div className="product-body">
        <div className="product-top">
          <div>
            <div className="product-type">{product.type}</div>
            <h3 className="product-name">{product.name}</h3>
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
  const selected = useMemo(() => themeColors.find((color) => color.name === activeColor) || themeColors[0], [activeColor]);

  return (
    <>
      <style>{css}</style>
      <div
        className="site"
        style={{
          "--siteGradient": selected.gradient,
          "--glowA": selected.glowA,
          "--glowB": selected.glowB,
        }}
      >
        <div className="ambient one" />
        <div className="ambient two" />
        <div className="ambient three" />
        <div className="overlay" />

        <div className="container">
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
              <div className="nav-social" aria-label="Social and contact">
                <a href={`mailto:${CONTACT_EMAIL}`} className="social-icon-link" aria-label="Contact email">
                  <MailIcon size={16} />
                </a>
                <a href={INSTAGRAM_URL} className="social-icon-link" aria-label="Instagram">
                  <CameraIcon size={16} />
                </a>
                <a href={SOCIAL_URL} className="social-icon-link" aria-label="Social media">
                  <MusicIcon size={16} />
                </a>
              </div>
              <a href={CART_URL} className="nav-pill-btn">
                <span className="cart-icon">🛒</span>
                <span>Cart</span>
              </a>
              <a href={COLLECTION_URL} className="nav-pill-btn primary">Shop now</a>
            </div>
          </header>

          <section className="hero">
            <div>
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
              <p className="mini-copy">Bright logo. Clean layout. Soft beach energy. A smoother first look that feels easy to shop.</p>
              <h1 className="title"><span className="gradient-text">Beach-ready hats and tanks with pure summer mood.</span></h1>
              <p className="body">Suppa Duppa feels like walking barefoot on warm sand, catching ocean breeze, and pulling up in bright colors that make the whole day feel lighter.</p>
              <p className="body-sub">Soft ocean breeze, clean color, smooth summer energy, and a fresh feel that fits the whole mood right.</p>
              <div className="actions">
                <a href={COLLECTION_URL} className="btn">
                  <span>🛍️</span><span>Shop the collection</span>
                </a>
                <a href={CART_URL} className="btn-outline">
                  <span>🛒</span><span>View cart</span>
                </a>
              </div>
              <div className="stats">
                <div className="stat"><div className="stat-number">17</div><div className="stat-label">Live shop cards</div></div>
                <div className="stat"><div className="stat-number">2</div><div className="stat-label">Tank styles</div></div>
                <div className="stat"><div className="stat-number">9</div><div className="stat-label">Hat styles first</div></div>
              </div>
            </div>

            <div className="picker-wrap">
              <div className="picker-blur" />
              <div className="picker">
                <div className="picker-top">
                  <div>
                    <div className="picker-label">Color picker</div>
                    <h2 className="picker-title">Choose your beach tone</h2>
                  </div>
                  <div className="sun">☀️</div>
                </div>
                <div className="color-list">
                  {themeColors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      className={`color-btn ${activeColor === color.name ? "active" : ""}`}
                      onClick={() => setActiveColor(color.name)}
                    
