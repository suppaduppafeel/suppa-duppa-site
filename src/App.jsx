import React, { useMemo, useState } from "react";
import logoSrc from "./suppa-duppa-logo.png";

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

const products = [
  {
    id: "suppa-duppa-snapback",
    name: "Suppa Duppa Snapback",
    type: "Hat",
    vibe: "Light, bright, and easy for sunny fits.",
    price: "$34",
    badge: "Best Seller",
  },
  {
    id: "wave-runner-tank",
    name: "Wave Runner Tank",
    type: "Tank",
    vibe: "Breezy color and shoreline-ready energy.",
    price: "$29",
    badge: "New Drop",
  },
  {
    id: "palm-breeze-tank",
    name: "Palm Breeze Tank",
    type: "Tank",
    vibe: "Smooth summer feel with playful pop.",
    price: "$29",
    badge: "Summer Pick",
  },
  {
    id: "shoreline-hat",
    name: "Shoreline Hat",
    type: "Hat",
    vibe: "Clean beach mood for everyday wear.",
    price: "$34",
    badge: "Fresh Color",
  },
];

const css = `
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: #0f172a;
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
  @keyframes cardDrift {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
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
    width: min(1280px, calc(100% - 48px));
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .hero {
    display: grid;
    grid-template-columns: 1.08fr 0.92fr;
    gap: 56px;
    align-items: center;
    padding: 76px 0 52px;
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
  .logo-scene {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 16px;
    padding: 0;
  }
  .logo-frame {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: transparent;
    border: 0;
    box-shadow: none;
    backdrop-filter: none;
  }
  .logo-main {
    width: 390px;
    max-width: 100%;
    filter: drop-shadow(0 20px 30px rgba(0,0,0,0.12)) drop-shadow(0 8px 14px rgba(255,255,255,0.18));
    animation: floatLogo 5.6s ease-in-out infinite;
  }
  
  .kicker {
    margin: 0 0 18px;
    font-size: 18px;
    line-height: 1.2;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    font-weight: 900;
    color: #0891b2;
  }
  .mini-copy {
    margin: 0 0 10px;
    max-width: 620px;
    font-size: 15px;
    line-height: 1.7;
    color: #64748b;
    font-weight: 700;
  }
  .title {
    margin: 0;
    max-width: 680px;
    font-size: clamp(52px, 7vw, 92px);
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
    margin: 24px 0 0;
    max-width: 720px;
    font-size: 22px;
    line-height: 1.7;
    color: #475569;
  }
  .body-sub {
    margin: 14px 0 0;
    max-width: 760px;
    font-size: 18px;
    line-height: 1.7;
    color: #64748b;
    font-weight: 700;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 30px;
  }
  .btn, .btn-outline {
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
  .btn-outline {
    background: rgba(255,255,255,0.62);
    border: 1px solid rgba(255,255,255,0.7);
    color: #0f172a;
    backdrop-filter: blur(10px);
  }
  .btn:hover, .btn-outline:hover, .card-btn:hover, .email-btn:hover { transform: translateY(-1px); }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    max-width: 720px;
    margin-top: 34px;
  }
  .stat {
    border-radius: 26px;
    padding: 20px;
    background: rgba(255,255,255,0.62);
    border: 1px solid rgba(255,255,255,0.7);
    backdrop-filter: blur(10px);
    animation: cardDrift 8s ease-in-out infinite;
  }
  .stat:nth-child(2) { animation-delay: .8s; }
  .stat:nth-child(3) { animation-delay: 1.6s; }
  .stat-number {
    font-size: 44px;
    line-height: 1;
    font-weight: 900;
    color: #0f172a;
  }
  .stat-label {
    margin-top: 8px;
    font-size: 15px;
    color: #64748b;
  }

  .picker-wrap { position: relative; }
  .picker-blur {
    position: absolute;
    inset: -14px;
    border-radius: 34px;
    background: rgba(255,255,255,0.35);
    filter: blur(18px);
  }
  .picker {
    position: relative;
    border-radius: 34px;
    padding: 22px;
    background: rgba(255,255,255,0.55);
    border: 1px solid rgba(255,255,255,0.7);
    box-shadow: 0 30px 70px rgba(251,146,60,0.16);
    backdrop-filter: blur(12px);
  }
  .picker-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 20px;
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
    margin: 8px 0 0;
    font-size: 36px;
    line-height: 1.05;
    font-weight: 900;
    color: #0f172a;
  }
  .sun { font-size: 28px; animation: floatLogo 4s ease-in-out infinite; }
  .color-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 22px;
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
    border-radius: 28px;
    padding: 22px;
    min-height: 380px;
  }
  .featured::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top, rgba(255,255,255,0.85), transparent 35%);
    pointer-events: none;
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
    animation: cardDrift 7s ease-in-out infinite;
  }
  .product-mini:nth-child(2) { animation-delay: .7s; }
  .product-mini-title {
    margin-top: 12px;
    text-align: center;
    font-size: 12px;
    letter-spacing: .28em;
    text-transform: uppercase;
    font-weight: 800;
    color: #64748b;
  }
  .product-mini-logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hat {
    position: relative;
    width: 150px;
    height: 96px;
    margin: 0 auto;
  }
  .hat-crown {
    position: absolute;
    left: 20px;
    top: 16px;
    width: 110px;
    height: 46px;
    border-radius: 999px 999px 24px 24px;
    background: #fff;
    box-shadow: 0 8px 18px rgba(15,23,42,0.08);
  }
  .hat-brim {
    position: absolute;
    left: 68px;
    top: 52px;
    width: 72px;
    height: 14px;
    border-radius: 999px;
    background: #fff;
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
    position: relative;
    width: 94px;
    height: 124px;
    margin: 0 auto;
    border-radius: 22px;
    background: #fff;
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
    border: 6px solid #fff;
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
  .featured-copy {
    margin-top: 16px;
    text-align: center;
    color: rgba(255,255,255,0.96);
    font-size: 15px;
    line-height: 1.6;
    font-weight: 700;
  }

  .shopify { padding: 24px 0 26px; }
  .row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 26px;
  }
  .row-kicker {
    font-size: 13px;
    line-height: 1.2;
    letter-spacing: .38em;
    text-transform: uppercase;
    font-weight: 900;
    color: #f97316;
  }
  .row-title {
    margin: 8px 0 0;
    font-size: 48px;
    line-height: 1.05;
    font-weight: 900;
    color: #0f172a;
  }
  .row-copy {
    max-width: 520px;
    margin: 0;
    font-size: 17px;
    line-height: 1.7;
    color: #475569;
  }
  .info-card {
    margin-bottom: 30px;
    border-radius: 34px;
    padding: 24px;
    background: rgba(255,255,255,0.68);
    border: 1px solid rgba(255,255,255,0.72);
    box-shadow: 0 28px 60px rgba(249,115,22,0.08);
    backdrop-filter: blur(12px);
  }
  .info-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 20px;
    align-items: center;
  }
  .dark-card {
    border-radius: 28px;
    padding: 22px;
    background: #0f172a;
    color: #fff;
    box-shadow: 0 24px 48px rgba(15,23,42,0.18);
  }
  .dark-list {
    margin: 14px 0 0;
    padding-left: 18px;
    color: rgba(255,255,255,0.82);
    font-size: 14px;
    line-height: 1.7;
  }

  .showcase {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
    margin-bottom: 32px;
  }
  .card {
    border-radius: 34px;
    background: rgba(255,255,255,0.7);
    border: 1px solid rgba(255,255,255,0.74);
    box-shadow: 0 30px 70px rgba(249,115,22,0.08);
    backdrop-filter: blur(12px);
    overflow: hidden;
    animation: cardDrift 9s ease-in-out infinite;
  }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0,1fr));
  }
  .card-side {
    position: relative;
    min-height: 320px;
    padding: 30px;
  }
  .card-side-a {
    background: linear-gradient(180deg, rgba(125,211,252,0.35), rgba(254,249,195,0.8), rgba(253,230,138,0.9));
  }
  .card-side-b {
    background: linear-gradient(135deg, rgba(251,207,232,0.88), rgba(255,237,213,0.9), rgba(207,250,254,0.9));
  }
  .chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 14px;
    border-radius: 999px;
    background: rgba(255,255,255,0.72);
    font-size: 12px;
    line-height: 1.1;
    letter-spacing: .35em;
    text-transform: uppercase;
    font-weight: 900;
  }
  .chip-pink { color: #db2777; }
  .chip-cyan { color: #0891b2; }
  .chip-orange { color: #f97316; }
  .logo-panel {
    display: flex;
    justify-content: center;
    padding: 26px 0;
  }
  .logo-panel img {
    max-width: 420px;
    filter: drop-shadow(0 16px 28px rgba(15,23,42,0.18));
    animation: floatLogo 6.2s ease-in-out infinite;
  }
  .showcase-copy {
    max-width: 520px;
    font-size: 15px;
    line-height: 1.8;
    color: #475569;
    font-weight: 700;
  }
  .tank-card-side { padding: 24px; }
  .tank-card-panel {
    margin-top: 18px;
    padding: 22px;
    border-radius: 28px;
    background: linear-gradient(135deg, rgba(186,230,253,0.9), rgba(255,255,255,0.96), rgba(251,207,232,0.76));
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0,1fr));
    gap: 24px;
  }
  .product-card {
    overflow: hidden;
    border-radius: 30px;
    border: 1px solid rgba(255,255,255,0.76);
    background: rgba(255,255,255,0.72);
    box-shadow: 0 24px 52px rgba(249,115,22,0.08);
    backdrop-filter: blur(12px);
    animation: cardDrift 8.6s ease-in-out infinite;
  }
  .product-card:nth-child(2) { animation-delay: .5s; }
  .product-card:nth-child(3) { animation-delay: 1s; }
  .product-card:nth-child(4) { animation-delay: 1.5s; }
  .product-visual {
    position: relative;
    height: 288px;
    overflow: hidden;
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
  .product-body { padding: 22px; }
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
    margin: 10px 0 0;
    font-size: 24px;
    line-height: 1.15;
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
  }
  .product-copy {
    margin: 12px 0 0;
    font-size: 15px;
    line-height: 1.7;
    color: #64748b;
  }
  .card-btn, .email-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 52px;
    margin-top: 14px;
    padding: 0 18px;
    border-radius: 999px;
    border: 0;
    background: #0f172a;
    color: #fff;
    font-weight: 800;
    cursor: pointer;
  }
  .help-box {
    margin-top: 14px;
    border-radius: 20px;
    border: 1px dashed #cbd5e1;
    background: #f8fafc;
    padding: 14px;
    font-size: 14px;
    line-height: 1.6;
    color: #64748b;
  }
  .help-box strong { color: #334155; }

  .footer { padding: 16px 0 90px; }
  .footer-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 24px;
  }
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
  }
  .tag {
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.72);
    background: rgba(255,255,255,0.75);
    padding: 10px 16px;
    color: #475569;
    font-size: 14px;
    font-weight: 700;
  }
  .email-card {
    border-radius: 34px;
    background: #0f172a;
    padding: 32px;
    color: #fff;
    box-shadow: 0 30px 68px rgba(15,23,42,0.18);
  }
  .email-input {
    width: 100%;
    height: 52px;
    margin-top: 20px;
    padding: 0 16px;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.16);
    background: rgba(255,255,255,0.08);
    color: #fff;
    outline: none;
  }
  .email-input::placeholder { color: rgba(255,255,255,0.55); }
  .email-btn {
    background: #fff;
    color: #0f172a;
    margin-top: 12px;
  }
  .email-note {
    margin-top: 14px;
    font-size: 14px;
    line-height: 1.7;
    color: rgba(255,255,255,0.68);
  }

  @media (max-width: 1100px) {
    .hero, .info-grid, .showcase, .footer-grid { grid-template-columns: 1fr; }
    .grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
    .row {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  @media (max-width: 768px) {
    .container { width: min(100% - 24px, 100%); }
    .hero { padding-top: 56px; }
    .title { font-size: 46px; }
    .body { font-size: 18px; }
    .stats, .grid, .featured-grid, .card-grid { grid-template-columns: 1fr; }
    .showcase { gap: 20px; }
    .row-title, .picker-title { font-size: 34px; }
    .logo-scene {
      padding: 0 24px;
    }
    .logo-main {
      width: 260px;
    }
    .palm {
      top: -12px;
      width: 88px;
      height: 144px;
    }
  }
`;

function HatMock() {
  return (
    <div className="hat">
      <div className="hat-crown" />
      <div className="hat-brim" />
      <div className="hat-logo"><img src={logoSrc} alt="Suppa Duppa logo" /></div>
    </div>
  );
}

function TankMock() {
  return (
    <div className="tank">
      <div className="tank-neck" />
      <div className="tank-logo"><img src={logoSrc} alt="Suppa Duppa logo" /></div>
    </div>
  );
}



function ShopifyEmbedCard({ product, selected }) {
  const isHat = product.type === "Hat";
  return (
    <div className="product-card">
      <div className="product-visual" style={{ backgroundImage: selected.panel }}>
        <div className="product-accent">{selected.accent}</div>
        <div className="product-badge">{product.badge}</div>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {isHat ? <HatMock /> : <TankMock />}
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
        <a className="card-btn" href="#">Shop on Shopify</a>
        <div className="help-box">Paste your Shopify Buy Button embed code into <strong>buyButtonHtml</strong>, or add your Shopify product link to <strong>shopifyUrl</strong>.</div>
      </div>
    </div>
  );
}

function MockupShowcase() {
  return (
    <div className="showcase">
      <div className="card">
        <div className="card-grid">
          <div className="card-side card-side-a">
            <div className="chip chip-pink">Hero logo preview</div>
            <div className="logo-panel"><img src={logoSrc} alt="Suppa Duppa logo" /></div>
            <p className="showcase-copy">This shows how the Suppa Duppa logo lands on the homepage with a sunny beach backdrop and smoother summer energy.</p>
          </div>
          <div className="card-side card-side-b">
            <div className="chip chip-cyan">Lifestyle mockup</div>
            <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}><HatMock /></div>
            <div style={{ marginTop: 24, borderRadius: 24, background: "rgba(255,255,255,0.68)", padding: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#0f172a" }}>Suppa Duppa Snapback</div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.65, color: "#475569" }}>Quick mockup preview for how the logo can sit on hats inside the store before product photos are added.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card tank-card-side">
        <div className="chip chip-orange">Tank mockup</div>
        <div className="tank-card-panel"><TankMock /></div>
        <p style={{ margin: "18px 0 0", fontSize: 14, lineHeight: 1.75, color: "#475569" }}>Preview of the logo placed on a tank top product card for the summer collection section.</p>
      </div>
    </div>
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
              <div className="logo-scene">
                <div className="logo-frame"><img src={logoSrc} alt="Suppa Duppa" className="logo-main" /></div>
              </div>
              <p className="kicker">How You Feelin'? Suppa Duppa.</p>
              <p className="mini-copy">Bright logo. Palm trees. Clean layout. Soft beach energy. A smoother first look that feels easy to shop.</p>
              <h1 className="title">Beach-ready hats and tanks with pure <span className="gradient-text">summer mood</span>.</h1>
              <p className="body">Suppa Duppa feels like walking barefoot on warm sand, catching ocean breeze, and pulling up in bright colors that make the whole day feel lighter.</p>
              <p className="body-sub">Soft ocean breeze, clean color, smooth summer energy, and a fresh feel that fits the whole mood right.</p>
              <div className="actions">
                <a href="#shopify-products" className="btn"><span>🛍️</span><span>Shop the collection</span></a>
                <a href="#shopify-products" className="btn-outline"><span>🌊</span><span>View summer colors</span></a>
              </div>
              <div className="stats">
                <div className="stat"><div className="stat-number">4</div><div className="stat-label">Colorways ready</div></div>
                <div className="stat"><div className="stat-number">2</div><div className="stat-label">Summer staples</div></div>
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
                <div className="featured" style={{ backgroundImage: selected.panel }}>
                  <div className="featured-card">
                    <div className="featured-label">Featured look</div>
                    <div className="featured-grid">
                      <div className="product-mini">
                        <div className="product-mini-logo"><HatMock /></div>
                        <div className="product-mini-title">Hat</div>
                      </div>
                      <div className="product-mini">
                        <div className="product-mini-logo"><TankMock /></div>
                        <div className="product-mini-title">Tank</div>
                      </div>
                    </div>
                    <p className="featured-copy">{selected.name} makes the whole fit feel fresh, playful, and made for the shoreline.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="shopify-products" className="shopify">
            <div className="row">
              <div>
                <div className="row-kicker">Summer collection</div>
                <h2 className="row-title">Different color hats and tank tops</h2>
              </div>
              <p className="row-copy">A bright mix of clean neutrals, ocean blues, tropical greens, and sunset tones so every piece feels like vacation mode.</p>
            </div>

            <div className="info-card">
              <div className="info-grid">
                <div>
                  <div className="row-kicker" style={{ color: "#0891b2" }}>Shopify-ready section</div>
                  <h3 style={{ margin: "10px 0 0", fontSize: 34, lineHeight: 1.1, color: "#0f172a" }}>Drop your Shopify products right into this layout.</h3>
                  <p style={{ margin: "14px 0 0", maxWidth: 720, fontSize: 16, lineHeight: 1.8, color: "#64748b" }}>Each product card below can take either a Shopify product link or a full Shopify Buy Button embed. Keep the same Suppa Duppa design, and swap the mock cards for live products whenever you are ready.</p>
                </div>
                <div className="dark-card">
                  <div className="row-kicker" style={{ color: "#67e8f9" }}>How to use it</div>
                  <ol className="dark-list">
                    <li>Add your Shopify product URL in each card.</li>
                    <li>Or paste the Shopify Buy Button embed code into the product object.</li>
                    <li>Replace the sample products with your real Printful-synced Shopify items.</li>
                  </ol>
                </div>
              </div>
            </div>

            <MockupShowcase />

            <div className="grid">
              {products.map((product) => (
                <ShopifyEmbedCard key={product.id} product={product} selected={selected} />
              ))}
            </div>
          </section>

          <section className="footer">
            <div className="footer-grid">
              <div className="card" style={{ padding: 32 }}>
                <div className="row-kicker" style={{ color: "#0891b2" }}>Store mood</div>
                <h3 style={{ margin: "10px 0 0", fontSize: 48, lineHeight: 1.05, color: "#0f172a" }}>Walk the sand. Catch the light. Wear the feeling.</h3>
                <p style={{ margin: "18px 0 0", maxWidth: 760, fontSize: 20, lineHeight: 1.8, color: "#475569" }}>The whole site is built around a beach-day feeling — airy space, sun-washed colors, playful energy, and product cards that feel easy to shop on phone or desktop.</p>
                <div className="tag-list">
                  {["Beach launch banner", "Color-ready product grid", "Mobile-friendly layout", "Shopify-ready product cards"].map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="email-card">
                <div className="row-kicker" style={{ color: "#67e8f9" }}>Email sign-up</div>
                <h3 style={{ margin: "10px 0 0", fontSize: 38, lineHeight: 1.1, color: "#fff" }}>Get first access to new colors and beach drops.</h3>
                <input className="email-input" placeholder="Email address" />
                <button type="button" className="email-btn">Join the Suppa Duppa list</button>
                <p className="email-note">Bright fits, summer drops, and fresh beach energy straight to your inbox.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
