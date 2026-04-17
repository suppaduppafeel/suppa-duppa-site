import React, { useEffect, useMemo, useState } from "react";
import logoSrc from "./suppa-duppa-logo.png";

const COLLECTION_URL = "https://shop.suppaduppa.us/collections/suppaduppa-summer-drop";
const ALL_PRODUCTS_URL = "https://shop.suppaduppa.us/collections/all";

const hatColors = [
  {
    name: "Sunset Coral",
    gradient: "linear-gradient(135deg, #fff1e8 0%, #ffe3b3 28%, #ff8fb1 62%, #ff6b8a 100%)",
    panel: "linear-gradient(135deg, rgba(255,184,116,0.95) 0%, rgba(255,149,181,0.92) 55%, rgba(255,105,180,0.96) 100%)",
    accent: "Coral Heat",
    glowA: "rgba(255, 148, 120, 0.28)",
    glowB: "rgba(255, 105, 180, 0.22)",
  },
  {
    name: "Ocean Aqua",
    gradient: "linear-gradient(135deg, #ecfeff 0%, #d7f9ff 22%, #8fe3ff 58%, #4f8dff 100%)",
    panel: "linear-gradient(135deg, rgba(127,236,255,0.96) 0%, rgba(72,199,255,0.94) 52%, rgba(71,127,255,0.96) 100%)",
    accent: "Cool Splash",
    glowA: "rgba(56, 189, 248, 0.26)",
    glowB: "rgba(59, 130, 246, 0.24)",
  },
  {
    name: "Palm Lime",
    gradient: "linear-gradient(135deg, #f7ffe1 0%, #e9ffb3 26%, #8ee58f 62%, #3bcf86 100%)",
    panel: "linear-gradient(135deg, rgba(202,255,113,0.96) 0%, rgba(82,221,128,0.95) 55%, rgba(34,197,94,0.96) 100%)",
    accent: "Fresh Energy",
    glowA: "rgba(132, 204, 22, 0.26)",
    glowB: "rgba(34, 197, 94, 0.22)",
  },
  {
    name: "Sand Cream",
    gradient: "linear-gradient(135deg, #fff8ea 0%, #fff1bf 28%, #ffe59a 55%, #ffbf71 100%)",
    panel: "linear-gradient(135deg, rgba(255,229,153,0.96) 0%, rgba(255,238,196,0.94) 52%, rgba(255,186,110,0.96) 100%)",
    accent: "Soft Shore",
    glowA: "rgba(255, 213, 128, 0.28)",
    glowB: "rgba(251, 191, 36, 0.18)",
  },
];

const featuredProducts = [
  {
    id: "summer-tank",
    name: "SuppaDuppa Summer Tank",
    type: "Tank",
    price: "$29.50",
    badge: "Hot Drop",
    vibe: "Bright, breezy, and ready for shoreline weather.",
    shopUrl: "https://shop.suppaduppa.us/products/suppaduppa-summer-tank",
    handle: "suppaduppa-summer-tank",
    render: "tank",
  },
  {
    id: "five-panel-cap",
    name: "SuppaDuppa 5 Panel Cap",
    type: "Hat",
    price: "$17.00",
    badge: "Best Seller",
    vibe: "Easy everyday cap with clean Suppa Duppa energy.",
    shopUrl: "https://shop.suppaduppa.us/products/suppaduppa-5-panel-cap",
    handle: "suppaduppa-5-panel-cap",
    render: "hat",
  },
  {
    id: "foam-trucker-cap",
    name: "SuppaDuppa Foam Trucker Cap",
    type: "Hat",
    price: "$15.50",
    badge: "Beach Pick",
    vibe: "A lighter cap look with playful summer pop.",
    shopUrl: "https://shop.suppaduppa.us/products/suppaduppa-foam-trucker-cap",
    handle: "suppaduppa-foam-trucker-cap",
    render: "hat",
  },
  {
    id: "washed-denim-cap",
    name: "SuppaDuppa Washed Denim Cap",
    type: "Hat",
    price: "$31.44",
    badge: "Fresh Color",
    vibe: "Soft denim feel with a laid-back sunny mood.",
    shopUrl: "https://shop.suppaduppa.us/products/suppaduppa-washed-denim-cap",
    handle: "suppaduppa-washed-denim-cap",
    render: "denimHat",
  },
  {
    id: "vintage-cotton-twill-cap",
    name: "SuppaDuppa Vintage Cotton Twill Cap",
    type: "Hat",
    price: "$40.99",
    badge: "Premium",
    vibe: "Vintage texture with a smoother, elevated finish.",
    shopUrl: "https://shop.suppaduppa.us/products/suppaduppa-vintage-cotton-twill-cap",
    handle: "suppaduppa-vintage-cotton-twill-cap",
    render: "blackHat",
  },
  {
    id: "oversized-hoodie",
    name: "Oversized Heavyweight Hoodie",
    type: "Hoodie",
    price: "$47.45",
    badge: "Cozy",
    vibe: "A clean heavyweight piece for breezy nights.",
    shopUrl: "https://shop.suppaduppa.us/products/oversized-heavyweight-hoodie",
    handle: "oversized-heavyweight-hoodie",
    render: "hoodie",
  },
];

const css = `
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: #0f172a;
    background: #fff;
  }
  img { display: block; max-width: 100%; }
  a { color: inherit; text-decoration: none; }
  button { font: inherit; }

  @keyframes vibeShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes floatOne {
    0%, 100% { transform: translate3d(0,0,0) scale(1); }
    50% { transform: translate3d(22px,-18px,0) scale(1.05); }
  }
  @keyframes floatTwo {
    0%, 100% { transform: translate3d(0,0,0) scale(1); }
    50% { transform: translate3d(-28px,24px,0) scale(1.08); }
  }
  @keyframes floatLogo {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 18px 36px rgba(15, 23, 42, 0.16); }
    50% { box-shadow: 0 24px 48px rgba(15, 23, 42, 0.24); }
  }
  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  .site {
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    color: #0f172a;
    background-image: var(--siteGradient);
    background-size: 240% 240%;
    animation: vibeShift 16s ease infinite;
    transition: background-image .6s ease;
  }
  .ambient {
    position: absolute;
    border-radius: 999px;
    filter: blur(70px);
    pointer-events: none;
    z-index: 0;
  }
  .ambient.one {
    left: -90px;
    top: 90px;
    width: 300px;
    height: 300px;
    background: var(--glowA);
    animation: floatOne 12s ease-in-out infinite;
  }
  .ambient.two {
    right: -70px;
    top: 40px;
    width: 360px;
    height: 360px;
    background: var(--glowB);
    animation: floatTwo 14s ease-in-out infinite;
  }
  .ambient.three {
    left: 38%;
    bottom: 180px;
    width: 260px;
    height: 260px;
    background: rgba(255,255,255,0.18);
    filter: blur(90px);
    animation: floatOne 18s ease-in-out infinite;
  }
  .overlay {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at top left, rgba(255,255,255,0.94), transparent 28%),
      radial-gradient(circle at top right, rgba(255,255,255,0.7), transparent 26%),
      radial-gradient(circle at bottom, rgba(255,255,255,0.22), transparent 34%);
    pointer-events: none;
    z-index: 0;
  }
  .container {
    width: min(1220px, calc(100% - 40px));
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .hero {
    display: grid;
    grid-template-columns: 1.16fr 0.84fr;
    gap: 34px;
    align-items: start;
    padding: 54px 0 20px;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    border-radius: 999px;
    background: rgba(255,255,255,0.62);
    border: 1px solid rgba(255,255,255,0.68);
    backdrop-filter: blur(10px);
    font-size: 14px;
    font-weight: 700;
    color: #334155;
  }
  .spark {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: #f97316;
    box-shadow: 0 0 18px rgba(249,115,22,.5);
  }
  .kicker {
    margin: 18px 0 6px;
    font-size: 18px;
    line-height: 1.2;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    font-weight: 900;
    color: #0891b2;
  }
  .logo-scene {
    position: relative;
    display: block;
    width: 100%;
    max-width: 100%;
    margin: 6px 0 16px;
    padding: 0;
    overflow: visible;
  }
  .logo-main {
    display: block;
    width: 450px;
    max-width: 100%;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 20px 30px rgba(0,0,0,0.12)) drop-shadow(0 8px 14px rgba(255,255,255,0.18));
    animation: floatLogo 5.6s ease-in-out infinite;
  }
  .mini-copy {
    margin: 0 0 8px;
    max-width: 560px;
    font-size: 14px;
    line-height: 1.65;
    color: #64748b;
    font-weight: 700;
  }
  .title {
    margin: 0;
    max-width: 620px;
    font-size: clamp(46px, 6.2vw, 78px);
    line-height: .95;
    letter-spacing: -0.05em;
    font-weight: 900;
    color: #0f172a;
  }
  .gradient-text {
    background: linear-gradient(90deg,#f97316,#ec4899,#06b6d4,#8b5cf6,#f97316);
    background-size: 300% 300%;
    animation: shimmer 8s linear infinite;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .body {
    margin: 18px 0 0;
    max-width: 620px;
    font-size: 19px;
    line-height: 1.65;
    color: #475569;
  }
  .body-sub {
    margin: 10px 0 0;
    max-width: 620px;
    font-size: 16px;
    line-height: 1.6;
    color: #64748b;
    font-weight: 700;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 22px;
  }
  .btn, .btn-outline, .view-all-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 56px;
    padding: 0 28px;
    border-radius: 999px;
    font-weight: 800;
    cursor: pointer;
    transition: transform .18s ease, box-shadow .18s ease;
  }
  .btn {
    background: #0f172a;
    color: #fff;
    animation: pulseGlow 4s ease-in-out infinite;
  }
  .btn-outline, .view-all-btn {
    background: rgba(255,255,255,0.62);
    border: 1px solid rgba(255,255,255,0.7);
    color: #0f172a;
    backdrop-filter: blur(10px);
  }
  .btn:hover, .btn-outline:hover, .view-all-btn:hover, .product-link:hover { transform: translateY(-1px); }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    max-width: 600px;
    margin-top: 22px;
  }
  .stat {
    border-radius: 22px;
    padding: 16px;
    background: rgba(255,255,255,0.62);
    border: 1px solid rgba(255,255,255,0.7);
    backdrop-filter: blur(10px);
  }
  .stat-number {
    font-size: 34px;
    line-height: 1;
    font-weight: 900;
    color: #0f172a;
  }
  .stat-label {
    margin-top: 8px;
    font-size: 15px;
    color: #64748b;
  }

  .picker-wrap {
    position: relative;
    width: 100%;
    max-width: 380px;
    justify-self: end;
    align-self: start;
  }
  .picker-blur {
    position: absolute;
    inset: -14px;
    border-radius: 34px;
    background: rgba(255,255,255,0.35);
    filter: blur(18px);
  }
  .picker {
    position: relative;
    border-radius: 28px;
    padding: 18px;
    background: rgba(255,255,255,0.58);
    border: 1px solid rgba(255,255,255,0.72);
    box-shadow: 0 22px 46px rgba(251,146,60,0.12);
    backdrop-filter: blur(12px);
  }
  .picker-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
  }
  .picker-label {
    font-size: 13px;
    line-height: 1.2;
    letter-spacing: .35em;
    text-transform: uppercase;
    font-weight: 900;
    color: #f97316;
  }
  .picker-title {
    margin: 6px 0 0;
    font-size: 30px;
    line-height: 1.02;
    font-weight: 900;
    color: #0f172a;
  }
  .sun { font-size: 28px; animation: floatLogo 4s ease-in-out infinite; }
  .color-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 16px;
  }
  .color-btn {
    border: 1px solid rgba(255,255,255,0.76);
    background: rgba(255,255,255,0.7);
    color: #334155;
    padding: 12px 18px;
    border-radius: 999px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
  }
  .color-btn.active {
    background: #0f172a;
    color: #fff;
    border-color: #0f172a;
  }
  .featured {
    position: relative;
    overflow: hidden;
    border-radius: 24px;
    padding: 16px;
    min-height: 312px;
    background-image: var(--panelGradient);
  }
  .featured-card {
    position: relative;
    z-index: 1;
    border-radius: 24px;
    padding: 20px;
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.46);
    backdrop-filter: blur(8px);
  }
  .featured-label {
    font-size: 11px;
    letter-spacing: .38em;
    text-transform: uppercase;
    font-weight: 900;
    color: rgba(255,255,255,0.95);
  }
  .featured-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0,1fr));
    gap: 16px;
    margin-top: 18px;
  }
  .product-mini {
    border-radius: 22px;
    background: rgba(255,255,255,0.82);
    padding: 16px;
    box-shadow: 0 12px 30px rgba(15,23,42,0.08);
  }
  .product-mini-title {
    margin-top: 12px;
    text-align: center;
    font-size: 12px;
    letter-spacing: .28em;
    text-transform: uppercase;
    font-weight: 800;
    color: #64748b;
  }

  .hat, .tee, .hoodie, .tank {
    position: relative;
    margin: 0 auto;
  }
  .hat {
    width: 150px;
    height: 96px;
  }
  .hat-crown {
    position: absolute;
    left: 20px;
    top: 16px;
    width: 110px;
    height: 46px;
    border-radius: 999px 999px 24px 24px;
    background: var(--productBody, #fff);
    box-shadow: 0 8px 18px rgba(15,23,42,0.08);
  }
  .hat-brim {
    position: absolute;
    left: 68px;
    top: 52px;
    width: 72px;
    height: 14px;
    border-radius: 999px;
    background: var(--productBody, #fff);
    box-shadow: 0 6px 14px rgba(15,23,42,0.08);
  }
  .hat-logo {
    position: absolute;
    left: 42px;
    top: 18px;
    width: 66px;
    padding: 4px;
    border-radius: 12px;
    background: rgba(255,255,255,0.92);
    box-shadow: 0 4px 14px rgba(15,23,42,0.08);
  }
  .tank {
    width: 98px;
    height: 132px;
    border-radius: 24px;
    background: var(--productBody, #fff);
    box-shadow: 0 10px 22px rgba(15,23,42,0.08);
  }
  .tank-neck {
    position: absolute;
    left: 50%;
    top: -8px;
    width: 44px;
    height: 22px;
    transform: translateX(-50%);
    border-radius: 0 0 22px 22px;
    border: 6px solid var(--productBody, #fff);
    border-top: 0;
  }
  .tank-logo {
    position: absolute;
    left: 10px;
    right: 10px;
    top: 34px;
    padding: 4px;
    border-radius: 16px;
    background: rgba(255,255,255,0.94);
    box-shadow: 0 4px 14px rgba(15,23,42,0.06);
  }
  .hoodie {
    width: 142px;
    height: 138px;
    border-radius: 18px 18px 26px 26px;
    background: var(--productBody, #7c746f);
    box-shadow: 0 10px 22px rgba(15,23,42,0.08);
  }
  .hoodie-hood {
    position: absolute;
    left: 50%;
    top: -14px;
    width: 62px;
    height: 46px;
    transform: translateX(-50%);
    border-radius: 0 0 34px 34px;
    border: 12px solid var(--productBody, #7c746f);
    border-top: 0;
  }
  .hoodie-pocket {
    position: absolute;
    left: 38px;
    bottom: 18px;
    width: 66px;
    height: 30px;
    border-radius: 14px;
    background: rgba(255,255,255,0.12);
  }
  .hoodie-logo {
    position: absolute;
    left: 36px;
    right: 36px;
    top: 44px;
    padding: 4px;
    border-radius: 14px;
    background: rgba(255,255,255,0.92);
  }
  .tee {
    width: 150px;
    height: 118px;
    border-radius: 12px 12px 20px 20px;
    background: var(--productBody, #fff);
    box-shadow: 0 10px 22px rgba(15,23,42,0.08);
  }
  .tee-sleeve-left,
  .tee-sleeve-right {
    position: absolute;
    top: 10px;
    width: 34px;
    height: 48px;
    background: var(--productBody, #fff);
  }
  .tee-sleeve-left {
    left: -22px;
    border-radius: 20px 0 14px 14px;
    transform: rotate(25deg);
  }
  .tee-sleeve-right {
    right: -22px;
    border-radius: 0 20px 14px 14px;
    transform: rotate(-25deg);
  }
  .tee-neck {
    position: absolute;
    left: 50%;
    top: -5px;
    width: 34px;
    height: 16px;
    transform: translateX(-50%);
    border-radius: 0 0 16px 16px;
    border: 5px solid rgba(255,255,255,0.8);
    border-top: 0;
  }
  .tee-logo {
    position: absolute;
    left: 28px;
    right: 28px;
    top: 28px;
    padding: 4px;
    border-radius: 14px;
    background: rgba(255,255,255,0.92);
  }

  .products-section {
    padding: 14px 0 70px;
  }
  .section-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 22px;
  }
  .section-kicker {
    font-size: 13px;
    line-height: 1.2;
    letter-spacing: .38em;
    text-transform: uppercase;
    font-weight: 900;
    color: #f97316;
  }
  .section-title {
    margin: 8px 0 0;
    font-size: 42px;
    line-height: 1.05;
    font-weight: 900;
    color: #0f172a;
  }
  .section-copy {
    max-width: 520px;
    margin: 0;
    font-size: 17px;
    line-height: 1.7;
    color: #475569;
  }
  .products-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0,1fr));
    gap: 20px;
  }
  .product-link {
    display: block;
  }
  .product-card {
    height: 100%;
    overflow: hidden;
    border-radius: 30px;
    border: 1px solid rgba(255,255,255,0.76);
    background: rgba(255,255,255,0.72);
    box-shadow: 0 24px 52px rgba(249,115,22,0.08);
    backdrop-filter: blur(12px);
  }
  .product-visual {
    position: relative;
    height: 250px;
    overflow: hidden;
    background-image: var(--panelGradient);
  }
  .product-visual::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top, rgba(255,255,255,0.84), transparent 35%);
    pointer-events: none;
  }
  .product-accent {
    position: absolute;
    right: 18px;
    top: 18px;
    z-index: 1;
    border-radius: 999px;
    background: rgba(255,255,255,0.74);
    padding: 8px 12px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .24em;
    color: #334155;
  }
  .product-badge {
    position: absolute;
    left: 18px;
    top: 18px;
    z-index: 1;
    border-radius: 999px;
    background: #0f172a;
    padding: 8px 12px;
    color: #fff;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: .22em;
    text-transform: uppercase;
  }
  .product-color {
    position: absolute;
    left: 18px;
    bottom: 18px;
    z-index: 1;
    border-radius: 999px;
    background: rgba(255,255,255,0.76);
    padding: 10px 14px;
    color: #334155;
    font-size: 14px;
    font-weight: 700;
    backdrop-filter: blur(10px);
  }
  .product-visual-inner {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .product-photo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 12px 18px rgba(15,23,42,0.12));
  }
  .product-body {
    padding: 18px;
  }
  .product-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }
  .product-type {
    font-size: 11px;
    line-height: 1.2;
    letter-spacing: .35em;
    text-transform: uppercase;
    font-weight: 900;
    color: #f97316;
  }
  .product-name {
    margin: 8px 0 0;
    font-size: 21px;
    line-height: 1.12;
    font-weight: 900;
    color: #0f172a;
  }
  .price {
    border-radius: 999px;
    background: #0f172a;
    padding: 8px 12px;
    color: #fff;
    font-size: 14px;
    font-weight: 800;
    white-space: nowrap;
  }
  .product-copy {
    margin: 12px 0 0;
    font-size: 15px;
    line-height: 1.7;
    color: #64748b;
  }
  .product-cta {
    margin-top: 14px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 900;
    color: #0f172a;
  }
  .products-footer {
    display: flex;
    justify-content: center;
    margin-top: 26px;
  }

  .footer { padding: 0 0 72px; }

  @media (max-width: 1100px) {
    .hero { grid-template-columns: 1fr; }
    .products-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
    .section-header {
      flex-direction: column;
      align-items: flex-start;
    }
    .picker-wrap {
      max-width: 100%;
      justify-self: stretch;
    }
  }
  @media (max-width: 768px) {
    .container { width: min(100% - 22px, 100%); }
    .hero {
      position: relative;
      display: block;
      padding-top: 92px;
      padding-bottom: 18px;
    }
    .picker-wrap {
      position: absolute;
      top: 6px;
      right: 0;
      left: auto;
      width: auto;
      max-width: min(230px, calc(100% - 24px));
      z-index: 5;
    }
    .picker-blur {
      inset: -4px;
      border-radius: 999px;
      filter: blur(8px);
    }
    .picker {
      border-radius: 999px;
      padding: 8px 10px;
      min-height: auto;
    }
    .picker-top,
    .featured {
      display: none !important;
    }
    .color-list {
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
      margin: 0;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .color-list::-webkit-scrollbar { display: none; }
    .color-btn {
      flex: 0 0 auto;
      padding: 8px 12px;
      font-size: 12px;
      line-height: 1;
      white-space: nowrap;
    }
    .logo-main {
      width: min(100%, 360px);
      max-width: 100%;
      height: auto;
    }
    .title {
      max-width: 100%;
      font-size: 44px;
    }
    .body, .body-sub, .mini-copy { max-width: 100%; }
    .stats, .products-grid, .featured-grid {
      grid-template-columns: 1fr;
    }
    .section-title, .picker-title {
      font-size: 30px;
    }
  }
`;

function HatMock({ tone = "#fff" }) {
  return (
    <div className="hat" style={{ "--productBody": tone }}>
      <div className="hat-crown" />
      <div className="hat-brim" />
      <div className="hat-logo"><img src={logoSrc} alt="Suppa Duppa logo" /></div>
    </div>
  );
}

function TankMock({ tone = "#fff" }) {
  return (
    <div className="tank" style={{ "--productBody": tone }}>
      <div className="tank-neck" />
      <div className="tank-logo"><img src={logoSrc} alt="Suppa Duppa logo" /></div>
    </div>
  );
}

function HoodieMock({ tone = "#7c746f" }) {
  return (
    <div className="hoodie" style={{ "--productBody": tone }}>
      <div className="hoodie-hood" />
      <div className="hoodie-logo"><img src={logoSrc} alt="Suppa Duppa logo" /></div>
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
      <div className="tee-logo"><img src={logoSrc} alt="Suppa Duppa logo" /></div>
    </div>
  );
}

function ProductVisual({ kind }) {
  if (kind === "tank") return <TankMock tone="#2996ff" />;
  if (kind === "hoodie") return <HoodieMock tone="#7a756f" />;
  if (kind === "denimHat") return <HatMock tone="#bcd3df" />;
  if (kind === "blackHat") return <HatMock tone="#282828" />;
  if (kind === "tee") return <TeeMock tone="#ffffff" />;
  return <HatMock tone="#111111" />;
}

function useShopifyProductImage(handle) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadImage() {
      try {
        const response = await fetch(`https://shop.suppaduppa.us/products/${handle}.js`);
        if (!response.ok) return;
        const data = await response.json();
        const nextImage = data?.featured_image || data?.images?.[0] || "";
        if (!cancelled) setImageUrl(nextImage);
      } catch (error) {
        if (!cancelled) setImageUrl("");
      }
    }

    if (handle) loadImage();
    return () => {
      cancelled = true;
    };
  }, [handle]);

  return imageUrl;
}

function FeaturedCard({ product, selected }) {
  const imageUrl = useShopifyProductImage(product.handle);

  return (
    <a className="product-link" href={product.shopUrl}>
      <article className="product-card">
        <div className="product-visual" style={{ "--panelGradient": selected.panel }}>
          <div className="product-accent">{selected.accent}</div>
          <div className="product-badge">{product.badge}</div>
          <div className="product-visual-inner">
            {imageUrl ? <img className="product-photo" src={imageUrl} alt={product.name} loading="lazy" /> : <ProductVisual kind={product.render} />}
          </div>
          <div className="product-color">{selected.name}</div>
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
          <div className="product-cta"><span>Shop now</span><span>→</span></div>
        </div>
      </article>
    </a>
  );
}

export default function App() {
  const [activeColor, setActiveColor] = useState(hatColors[0].name);
  const selected = useMemo(() => hatColors.find((c) => c.name === activeColor) || hatColors[0], [activeColor]);

  return (
    <>
      <style>{css}</style>
      <div
        className="site"
        style={{
          "--siteGradient": selected.gradient,
          "--glowA": selected.glowA,
          "--glowB": selected.glowB,
          "--panelGradient": selected.panel,
        }}
      >
        <div className="ambient one" />
        <div className="ambient two" />
        <div className="ambient three" />
        <div className="overlay" />

        <div className="container">
          <section className="hero">
            <div>
              <div className="pill"><span className="spark" />Summer drop is live</div>
              <p className="kicker">How You Feelin'? Suppa Duppa.</p>
              <div className="logo-scene">
                <img src={logoSrc} alt="Suppa Duppa" className="logo-main" />
              </div>
              <p className="mini-copy">Bright logo. Clean layout. Soft beach energy. A smoother first look that feels easy to shop.</p>
              <h1 className="title"><span className="gradient-text">Beach-ready hats and tanks with pure summer mood.</span></h1>
              <p className="body">Suppa Duppa feels like walking barefoot on warm sand, catching ocean breeze, and pulling up in bright colors that make the whole day feel lighter.</p>
              <p className="body-sub">Soft ocean breeze, clean color, smooth summer energy, and a fresh feel that fits the whole mood right.</p>
              <div className="actions">
                <a href={COLLECTION_URL} className="btn">
                  <span>🛍️</span><span>Shop the collection</span>
                </a>
                <a href={ALL_PRODUCTS_URL} className="btn-outline">
                  <span>🌊</span><span>View summer colors</span>
                </a>
              </div>
              <div className="stats">
                <div className="stat"><div className="stat-number">6</div><div className="stat-label">Featured products</div></div>
                <div className="stat"><div className="stat-number">4</div><div className="stat-label">Color moods</div></div>
                <div className="stat"><div className="stat-number">100%</div><div className="stat-label">Beach vibe energy</div></div>
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
                  {hatColors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      className={`color-btn ${activeColor === color.name ? "active" : ""}`}
                      onClick={() => setActiveColor(color.name)}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
                <div className="featured">
                  <div className="featured-card">
                    <div className="featured-label">Featured look</div>
                    <div className="featured-grid">
                      <div className="product-mini">
                        <ProductVisual kind="hat" />
                        <div className="product-mini-title">Hat</div>
                      </div>
                      <div className="product-mini">
                        <ProductVisual kind="tank" />
                        <div className="product-mini-title">Tank</div>
                      </div>
                    </div>
                    <p style={{ marginTop: 16, textAlign: "center", color: "rgba(255,255,255,0.96)", fontSize: 15, lineHeight: 1.6, fontWeight: 700 }}>
                      {selected.name} makes the whole fit feel fresh, playful, and made for the shoreline.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="products-section" id="featured-products">
            <div className="section-header">
              <div>
                <div className="section-kicker">Featured products</div>
                <h2 className="section-title">A few Suppa Duppa favorites right on the homepage</h2>
              </div>
              <p className="section-copy">Keep the custom branded front page clean, then send people straight into the live Shopify store when they tap a product.</p>
            </div>

            <div className="products-grid">
              {featuredProducts.map((product) => (
                <FeaturedCard key={product.id} product={product} selected={selected} />
              ))}
            </div>

            <div className="products-footer">
              <a href={ALL_PRODUCTS_URL} className="view-all-btn">View all products</a>
            </div>
          </section>

          <section className="footer" />
        </div>
      </div>
    </>
  );
}
