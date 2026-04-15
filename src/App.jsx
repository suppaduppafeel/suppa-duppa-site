import React, { useEffect, useMemo, useRef, useState } from "react";
import logoSrc from "./suppa-duppa-logo.png";

const css = `
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: #0f172a;
    background: linear-gradient(180deg, #fff7ed 0%, #fde68a 22%, #fef3c7 38%, #dbeafe 70%, #e0f2fe 100%);
  }
  a { color: inherit; text-decoration: none; }
  img { display: block; max-width: 100%; }

  .sd-site {
    min-height: 100vh;
  }

  .sd-section {
    position: relative;
    overflow: hidden;
  }

  .sd-shell {
    width: min(1280px, calc(100% - 48px));
    margin: 0 auto;
  }

  .sd-blur-a,
  .sd-blur-b {
    position: absolute;
    border-radius: 999px;
    filter: blur(60px);
    pointer-events: none;
  }

  .sd-blur-a {
    left: -80px;
    top: 110px;
    width: 260px;
    height: 260px;
    background: rgba(244, 114, 182, 0.22);
  }

  .sd-blur-b {
    right: 0;
    top: 0;
    width: 320px;
    height: 320px;
    background: rgba(34, 211, 238, 0.18);
  }

  .sd-overlay {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at top left, rgba(255,255,255,0.95), transparent 30%),
      radial-gradient(circle at top right, rgba(255,255,255,0.75), transparent 26%),
      radial-gradient(circle at bottom, rgba(14,165,233,0.12), transparent 30%);
    opacity: 0.65;
    pointer-events: none;
  }

  .sd-hero {
    position: relative;
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: 40px;
    align-items: center;
    padding: 84px 0 52px;
  }

  .sd-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    border-radius: 999px;
    background: rgba(255,255,255,0.62);
    border: 1px solid rgba(255,255,255,0.65);
    backdrop-filter: blur(10px);
    font-size: 14px;
    font-weight: 700;
    color: #334155;
  }

  .sd-spark {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: #f97316;
    box-shadow: 0 0 18px rgba(249, 115, 22, 0.5);
  }

  .sd-logo-main {
    width: 360px;
    max-width: 100%;
    margin: 18px 0 12px;
    filter: drop-shadow(0 22px 40px rgba(0,0,0,0.18));
  }

  .sd-kicker {
    margin: 0 0 14px;
    font-size: 18px;
    line-height: 1.2;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    font-weight: 900;
    color: #0891b2;
  }

  .sd-title {
    margin: 0;
    max-width: 760px;
    font-size: clamp(52px, 7vw, 92px);
    line-height: 0.95;
    letter-spacing: -0.05em;
    font-weight: 900;
    color: #0f172a;
  }

  .sd-title-gradient {
    background: linear-gradient(90deg, #f97316 0%, #ec4899 48%, #06b6d4 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .sd-body {
    margin: 24px 0 0;
    max-width: 720px;
    font-size: 22px;
    line-height: 1.7;
    color: #475569;
  }

  .sd-body-sub {
    margin: 14px 0 0;
    max-width: 760px;
    font-size: 18px;
    line-height: 1.7;
    color: #64748b;
    font-weight: 700;
  }

  .sd-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 30px;
  }

  .sd-btn,
  .sd-btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 56px;
    padding: 0 28px;
    border-radius: 999px;
    font-weight: 800;
    transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
    cursor: pointer;
  }

  .sd-btn {
    background: #0f172a;
    color: #ffffff;
    box-shadow: 0 18px 36px rgba(15, 23, 42, 0.16);
  }

  .sd-btn:hover,
  .sd-btn-outline:hover,
  .sd-card-btn:hover,
  .sd-email-btn:hover {
    transform: translateY(-1px);
  }

  .sd-btn-outline {
    background: rgba(255,255,255,0.62);
    border: 1px solid rgba(255,255,255,0.7);
    color: #0f172a;
    backdrop-filter: blur(10px);
  }

  .sd-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    max-width: 720px;
    margin-top: 34px;
  }

  .sd-stat {
    border-radius: 26px;
    padding: 20px;
    background: rgba(255,255,255,0.62);
    border: 1px solid rgba(255,255,255,0.7);
    backdrop-filter: blur(10px);
  }

  .sd-stat-number {
    font-size: 44px;
    line-height: 1;
    font-weight: 900;
    color: #0f172a;
  }

  .sd-stat-label {
    margin-top: 8px;
    font-size: 15px;
    color: #64748b;
  }

  .sd-picker-wrap {
    position: relative;
  }

  .sd-picker-blur {
    position: absolute;
    inset: -14px;
    border-radius: 34px;
    background: rgba(255,255,255,0.35);
    filter: blur(18px);
  }

  .sd-picker {
    position: relative;
    border-radius: 34px;
    padding: 22px;
    background: rgba(255,255,255,0.55);
    border: 1px solid rgba(255,255,255,0.7);
    box-shadow: 0 30px 70px rgba(251, 146, 60, 0.16);
    backdrop-filter: blur(12px);
  }

  .sd-picker-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 20px;
  }

  .sd-picker-label {
    font-size: 13px;
    line-height: 1.2;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    font-weight: 900;
    color: #f97316;
  }

  .sd-picker-title {
    margin: 8px 0 0;
    font-size: 36px;
    line-height: 1.05;
    font-weight: 900;
    color: #0f172a;
  }

  .sd-sun {
    font-size: 28px;
  }

  .sd-color-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 22px;
  }

  .sd-color-btn {
    border: 1px solid rgba(255,255,255,0.76);
    background: rgba(255,255,255,0.7);
    color: #334155;
    padding: 12px 18px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }

  .sd-color-btn.is-active {
    background: #0f172a;
    color: #ffffff;
    border-color: #0f172a;
  }

  .sd-featured {
    position: relative;
    overflow: hidden;
    border-radius: 28px;
    padding: 22px;
    min-height: 380px;
  }

  .sd-featured::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top, rgba(255,255,255,0.85), transparent 35%);
    pointer-events: none;
  }

  .sd-featured-card {
    position: relative;
    z-index: 1;
    border-radius: 24px;
    padding: 20px;
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.46);
    backdrop-filter: blur(8px);
  }

  .sd-featured-label {
    font-size: 11px;
    letter-spacing: 0.38em;
    text-transform: uppercase;
    font-weight: 900;
    color: rgba(255,255,255,0.95);
  }

  .sd-featured-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    margin-top: 18px;
  }

  .sd-product-mini {
    border-radius: 22px;
    background: rgba(255,255,255,0.82);
    padding: 16px;
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  }

  .sd-product-mini-title {
    margin-top: 12px;
    text-align: center;
    font-size: 12px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    font-weight: 800;
    color: #64748b;
  }

  .sd-product-mini-logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sd-hat {
    position: relative;
    width: 150px;
    height: 96px;
    margin: 0 auto;
  }

  .sd-hat-crown {
    position: absolute;
    left: 20px;
    top: 16px;
    width: 110px;
    height: 46px;
    border-radius: 999px 999px 24px 24px;
    background: #ffffff;
    box-shadow: 0 8px 18px rgba(15,23,42,0.08);
  }

  .sd-hat-brim {
    position: absolute;
    left: 68px;
    top: 52px;
    width: 72px;
    height: 14px;
    border-radius: 999px;
    background: #ffffff;
    box-shadow: 0 6px 14px rgba(15,23,42,0.08);
  }

  .sd-hat-logo {
    position: absolute;
    left: 42px;
    top: 18px;
    width: 66px;
    padding: 4px;
    border-radius: 12px;
    background: rgba(255,255,255,0.92);
    box-shadow: 0 4px 14px rgba(15,23,42,0.08);
  }

  .sd-tank {
    position: relative;
    width: 94px;
    height: 124px;
    margin: 0 auto;
    border-radius: 22px;
    background: #ffffff;
    box-shadow: 0 10px 22px rgba(15,23,42,0.08);
  }

  .sd-tank-neck {
    position: absolute;
    left: 50%;
    top: -8px;
    width: 44px;
    height: 22px;
    transform: translateX(-50%);
    border-radius: 0 0 22px 22px;
    border: 6px solid #ffffff;
    border-top: 0;
  }

  .sd-tank-logo {
    position: absolute;
    left: 10px;
    right: 10px;
    top: 34px;
    padding: 4px;
    border-radius: 16px;
    background: rgba(255,255,255,0.94);
    box-shadow: 0 4px 14px rgba(15,23,42,0.06);
  }

  .sd-featured-copy {
    margin-top: 16px;
    text-align: center;
    color: rgba(255,255,255,0.96);
    font-size: 15px;
    line-height: 1.6;
    font-weight: 700;
  }

  .sd-shopify {
    padding: 24px 0 26px;
  }

  .sd-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 26px;
  }

  .sd-row-kicker {
    font-size: 13px;
    line-height: 1.2;
    letter-spacing: 0.38em;
    text-transform: uppercase;
    font-weight: 900;
    color: #f97316;
  }

  .sd-row-title {
    margin: 8px 0 0;
    font-size: 48px;
    line-height: 1.05;
    font-weight: 900;
    color: #0f172a;
  }

  .sd-row-copy {
    max-width: 520px;
    margin: 0;
    font-size: 17px;
    line-height: 1.7;
    color: #475569;
  }

  .sd-info-card {
    margin-bottom: 30px;
    border-radius: 34px;
    padding: 24px;
    background: rgba(255,255,255,0.68);
    border: 1px solid rgba(255,255,255,0.72);
    box-shadow: 0 28px 60px rgba(249, 115, 22, 0.08);
    backdrop-filter: blur(12px);
  }

  .sd-info-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 20px;
    align-items: center;
  }

  .sd-dark-card {
    border-radius: 28px;
    padding: 22px;
    background: #0f172a;
    color: #ffffff;
    box-shadow: 0 24px 48px rgba(15,23,42,0.18);
  }

  .sd-dark-card h4,
  .sd-info-card h3,
  .sd-info-card p,
  .sd-dark-card p,
  .sd-dark-card li {
    margin: 0;
  }

  .sd-dark-card h4,
  .sd-info-card h3 {
    font-weight: 900;
  }

  .sd-dark-list {
    margin: 14px 0 0;
    padding-left: 18px;
    color: rgba(255,255,255,0.82);
    font-size: 14px;
    line-height: 1.7;
  }

  .sd-showcase {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
    margin-bottom: 32px;
  }

  .sd-card {
    border-radius: 34px;
    background: rgba(255,255,255,0.7);
    border: 1px solid rgba(255,255,255,0.74);
    box-shadow: 0 30px 70px rgba(249, 115, 22, 0.08);
    backdrop-filter: blur(12px);
    overflow: hidden;
  }

  .sd-card-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sd-card-side {
    position: relative;
    min-height: 320px;
    padding: 30px;
  }

  .sd-card-side-a {
    background: linear-gradient(180deg, rgba(125,211,252,0.35), rgba(254,249,195,0.8), rgba(253,230,138,0.9));
  }

  .sd-card-side-b {
    background: linear-gradient(135deg, rgba(251,207,232,0.88), rgba(255,237,213,0.9), rgba(207,250,254,0.9));
  }

  .sd-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 14px;
    border-radius: 999px;
    background: rgba(255,255,255,0.72);
    font-size: 12px;
    line-height: 1.1;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    font-weight: 900;
  }

  .sd-chip-pink { color: #db2777; }
  .sd-chip-cyan { color: #0891b2; }
  .sd-chip-orange { color: #f97316; }

  .sd-logo-panel {
    display: flex;
    justify-content: center;
    padding: 26px 0;
  }

  .sd-logo-panel img {
    max-width: 420px;
    filter: drop-shadow(0 16px 28px rgba(15,23,42,0.18));
  }

  .sd-showcase-copy {
    max-width: 520px;
    font-size: 15px;
    line-height: 1.8;
    color: #475569;
    font-weight: 700;
  }

  .sd-tank-card-side {
    padding: 24px;
  }

  .sd-tank-card-panel {
    margin-top: 18px;
    padding: 22px;
    border-radius: 28px;
    background: linear-gradient(135deg, rgba(186,230,253,0.9), rgba(255,255,255,0.96), rgba(251,207,232,0.76));
  }

  .sd-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
  }

  .sd-product-card {
    overflow: hidden;
    border-radius: 30px;
    border: 1px solid rgba(255,255,255,0.76);
    background: rgba(255,255,255,0.72);
    box-shadow: 0 24px 52px rgba(249, 115, 22, 0.08);
    backdrop-filter: blur(12px);
  }

  .sd-product-visual {
    position: relative;
    height: 288px;
    overflow: hidden;
  }

  .sd-product-visual::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top, rgba(255,255,255,0.84), transparent 35%);
    pointer-events: none;
  }

  .sd-product-accent {
    position: absolute;
    right: 18px;
    top: 18px;
    z-index: 1;
    border-radius: 999px;
    background: rgba(255,255,255,0.74);
    padding: 8px 12px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.24em;
    color: #334155;
  }

  .sd-product-badge {
    position: absolute;
    left: 18px;
    top: 18px;
    z-index: 1;
    border-radius: 999px;
    background: #0f172a;
    padding: 8px 12px;
    color: #ffffff;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  .sd-product-color {
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

  .sd-product-body {
    padding: 22px;
  }

  .sd-product-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .sd-product-type {
    font-size: 11px;
    line-height: 1.2;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    font-weight: 900;
    color: #f97316;
  }

  .sd-product-name {
    margin: 10px 0 0;
    font-size: 24px;
    line-height: 1.15;
    font-weight: 900;
    color: #0f172a;
  }

  .sd-price {
    border-radius: 999px;
    background: #0f172a;
    padding: 8px 12px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 800;
  }

  .sd-product-copy {
    margin: 12px 0 0;
    font-size: 15px;
    line-height: 1.7;
    color: #64748b;
  }

  .sd-card-btn,
  .sd-email-btn {
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
    color: #ffffff;
    font-weight: 800;
    cursor: pointer;
  }

  .sd-help-box {
    margin-top: 14px;
    border-radius: 20px;
    border: 1px dashed #cbd5e1;
    background: #f8fafc;
    padding: 14px;
    font-size: 14px;
    line-height: 1.6;
    color: #64748b;
  }

  .sd-help-box strong {
    color: #334155;
  }

  .sd-footer {
    padding: 16px 0 90px;
  }

  .sd-footer-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 24px;
  }

  .sd-tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
  }

  .sd-tag {
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.72);
    background: rgba(255,255,255,0.75);
    padding: 10px 16px;
    color: #475569;
    font-size: 14px;
    font-weight: 700;
  }

  .sd-email-card {
    border-radius: 34px;
    background: #0f172a;
    padding: 32px;
    color: #ffffff;
    box-shadow: 0 30px 68px rgba(15,23,42,0.18);
  }

  .sd-email-input {
    width: 100%;
    height: 52px;
    margin-top: 20px;
    padding: 0 16px;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.16);
    background: rgba(255,255,255,0.08);
    color: #ffffff;
    outline: none;
  }

  .sd-email-input::placeholder {
    color: rgba(255,255,255,0.55);
  }

  .sd-email-btn {
    background: #ffffff;
    color: #0f172a;
    margin-top: 12px;
  }

  .sd-email-note {
    margin-top: 14px;
    font-size: 14px;
    line-height: 1.7;
    color: rgba(255,255,255,0.68);
  }

  .sd-gradient-coral { background: linear-gradient(135deg, #fdba74 0%, #f472b6 55%, #fb7185 100%); }
  .sd-gradient-aqua { background: linear-gradient(135deg, #67e8f9 0%, #38bdf8 55%, #3b82f6 100%); }
  .sd-gradient-lime { background: linear-gradient(135deg, #bef264 0%, #34d399 55%, #22c55e 100%); }
  .sd-gradient-cream { background: linear-gradient(135deg, #fde68a 0%, #fef3c7 55%, #fdba74 100%); }

  .sd-panther {
    position: absolute;
    left: 6px;
    top: 84px;
    z-index: 3;
    display: none;
    width: 260px;
    height: 260px;
  }

  .sd-panther-head,
  .sd-panther-body,
  .sd-panther-arm,
  .sd-panther-leg,
  .sd-panther-paw,
  .sd-panther-tail,
  .sd-panther-ear {
    position: absolute;
    background: #0f172a;
  }

  .sd-panther-head {
    left: 98px;
    top: 16px;
    width: 92px;
    height: 78px;
    border-radius: 45px;
    box-shadow: 0 18px 30px rgba(15,23,42,0.2);
  }

  .sd-panther-ear.left {
    left: 88px;
    top: 4px;
    width: 28px;
    height: 28px;
    transform: rotate(-18deg);
    border-radius: 18px 3px 10px 3px;
  }

  .sd-panther-ear.right {
    left: 166px;
    top: 6px;
    width: 28px;
    height: 28px;
    transform: rotate(18deg);
    border-radius: 3px 18px 3px 10px;
  }

  .sd-panther-eye {
    position: absolute;
    top: 42px;
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: #fbbf24;
  }

  .sd-panther-eye.left { left: 112px; }
  .sd-panther-eye.right { left: 157px; }

  .sd-panther-mouth {
    position: absolute;
    left: 128px;
    top: 60px;
    width: 30px;
    height: 18px;
    border-radius: 8px 8px 18px 18px;
    background: rgba(255,255,255,0.92);
  }

  .sd-panther-body {
    left: 80px;
    top: 90px;
    width: 132px;
    height: 98px;
    border-radius: 60px;
    box-shadow: 0 18px 30px rgba(15,23,42,0.2);
  }

  .sd-panther-arm.left {
    left: 48px;
    top: 96px;
    width: 30px;
    height: 118px;
    transform: rotate(18deg);
    border-radius: 999px;
  }

  .sd-panther-arm.right {
    left: 210px;
    top: 96px;
    width: 30px;
    height: 118px;
    transform: rotate(-18deg);
    border-radius: 999px;
  }

  .sd-panther-paw.left {
    left: 34px;
    top: 178px;
    width: 76px;
    height: 16px;
    border-radius: 999px;
  }

  .sd-panther-paw.right {
    left: 180px;
    top: 178px;
    width: 76px;
    height: 16px;
    border-radius: 999px;
  }

  .sd-panther-leg.left {
    left: 100px;
    top: 208px;
    width: 16px;
    height: 42px;
    border-radius: 999px;
  }

  .sd-panther-leg.right {
    left: 158px;
    top: 208px;
    width: 16px;
    height: 42px;
    border-radius: 999px;
  }

  .sd-panther-tail.a {
    left: 186px;
    top: 144px;
    width: 74px;
    height: 12px;
    transform: rotate(35deg);
    border-radius: 999px;
  }

  .sd-panther-tail.b {
    left: 198px;
    top: 118px;
    width: 48px;
    height: 12px;
    transform: rotate(65deg);
    border-radius: 999px;
  }

  .sd-panther-bar {
    position: absolute;
    left: 92px;
    top: 124px;
    width: 1100px;
    height: 16px;
    border-radius: 999px;
    background: rgba(255,255,255,0.56);
    box-shadow: 0 8px 30px rgba(255,255,255,0.35);
    backdrop-filter: blur(8px);
  }

  .sd-panther-bar-text {
    position: absolute;
    left: 94px;
    top: 116px;
    border-radius: 999px;
    background: rgba(255,255,255,0.7);
    padding: 10px 18px;
    font-size: 14px;
    line-height: 1;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    font-weight: 900;
    color: #1e293b;
    box-shadow: 0 14px 28px rgba(255,255,255,0.18);
  }

  @media (min-width: 1100px) {
    .sd-panther { display: block; }
  }

  @media (max-width: 1100px) {
    .sd-hero,
    .sd-info-grid,
    .sd-showcase,
    .sd-footer-grid {
      grid-template-columns: 1fr;
    }

    .sd-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .sd-row {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media (max-width: 768px) {
    .sd-shell {
      width: min(100% - 24px, 100%);
    }

    .sd-hero {
      padding-top: 56px;
    }

    .sd-title {
      font-size: 46px;
    }

    .sd-body {
      font-size: 18px;
    }

    .sd-stats,
    .sd-grid,
    .sd-featured-grid,
    .sd-card-grid {
      grid-template-columns: 1fr;
    }

    .sd-showcase {
      gap: 20px;
    }

    .sd-row-title,
    .sd-picker-title {
      font-size: 34px;
    }
  }
`;

const hatColors = [
  { name: "Sunset Coral", swatchClass: "sd-gradient-coral", accent: "Coral Heat" },
  { name: "Ocean Aqua", swatchClass: "sd-gradient-aqua", accent: "Cool Splash" },
  { name: "Palm Lime", swatchClass: "sd-gradient-lime", accent: "Fresh Energy" },
  { name: "Sand Cream", swatchClass: "sd-gradient-cream", accent: "Soft Shore" },
];

const products = [
  {
    id: "suppa-duppa-beach-snapback",
    name: "Suppa Duppa Beach Snapback",
    type: "Hat",
    vibe: "Easy, bright, all-day beach energy.",
    price: "$34",
    color: "Sunset Coral",
    badge: "Best Seller",
    shopifyUrl: "#",
    buyButtonHtml: "",
  },
  {
    id: "wave-runner-tank",
    name: "Wave Runner Tank",
    type: "Tank Top",
    vibe: "Built for hot sand, cold drinks, and golden hour.",
    price: "$29",
    color: "Ocean Aqua",
    badge: "New Drop",
    shopifyUrl: "#",
    buyButtonHtml: "",
  },
  {
    id: "palm-drift-tank",
    name: "Palm Drift Tank",
    type: "Tank Top",
    vibe: "Lightweight summer feel with playful color pop.",
    price: "$29",
    color: "Palm Lime",
    badge: "Summer Pick",
    shopifyUrl: "#",
    buyButtonHtml: "",
  },
  {
    id: "shoreline-snapback",
    name: "Shoreline Snapback",
    type: "Hat",
    vibe: "Clean neutral look for beach walks and sunset fits.",
    price: "$34",
    color: "Sand Cream",
    badge: "Fresh Color",
    shopifyUrl: "#",
    buyButtonHtml: "",
  },
];

function HatMock() {
  return (
    <div className="sd-hat">
      <div className="sd-hat-crown" />
      <div className="sd-hat-brim" />
      <div className="sd-hat-logo">
        <img src={logoSrc} alt="Suppa Duppa logo" />
      </div>
    </div>
  );
}

function TankMock() {
  return (
    <div className="sd-tank">
      <div className="sd-tank-neck" />
      <div className="sd-tank-logo">
        <img src={logoSrc} alt="Suppa Duppa logo" />
      </div>
    </div>
  );
}

function ShopifyEmbedCard({ product, selected }) {
  const embedRef = useRef(null);
  const isHat = product.type === "Hat";
  const hasEmbed = Boolean(product.buyButtonHtml && product.buyButtonHtml.trim());

  useEffect(() => {
    if (!embedRef.current) return;
    embedRef.current.innerHTML = "";

    if (hasEmbed) {
      embedRef.current.innerHTML = product.buyButtonHtml;
    }
  }, [hasEmbed, product.buyButtonHtml]);

  return (
    <div className="sd-product-card">
      <div className={`sd-product-visual ${selected.swatchClass}`}>
        <div className="sd-product-accent">{selected.accent}</div>
        {product.badge ? <div className="sd-product-badge">{product.badge}</div> : null}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {isHat ? <HatMock /> : <TankMock />}
        </div>
        <div className="sd-product-color">{product.color}</div>
      </div>

      <div className="sd-product-body">
        <div className="sd-product-top">
          <div>
            <div className="sd-product-type">{product.type}</div>
            <h3 className="sd-product-name">{product.name}</h3>
          </div>
          <div className="sd-price">{product.price}</div>
        </div>

        <p className="sd-product-copy">{product.vibe}</p>

        {hasEmbed ? (
          <div ref={embedRef} style={{ minHeight: 56, marginTop: 14 }} />
        ) : (
          <>
            <a className="sd-card-btn" href={product.shopifyUrl || "#"} target="_blank" rel="noreferrer">
              Shop on Shopify
            </a>
            <div className="sd-help-box">
              Paste your Shopify Buy Button embed code into <strong>buyButtonHtml</strong>, or add your Shopify product link to <strong>shopifyUrl</strong>.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MockupShowcase() {
  return (
    <div className="sd-showcase">
      <div className="sd-card">
        <div className="sd-card-grid">
          <div className="sd-card-side sd-card-side-a">
            <div className="sd-chip sd-chip-pink">Hero logo preview</div>
            <div className="sd-logo-panel">
              <img src={logoSrc} alt="Suppa Duppa logo" />
            </div>
            <p className="sd-showcase-copy">
              This shows how the real Suppa Duppa logo hits on the homepage with a sunny beach backdrop and playful summer energy.
            </p>
          </div>

          <div className="sd-card-side sd-card-side-b">
            <div className="sd-chip sd-chip-cyan">Lifestyle mockup</div>
            <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
              <HatMock />
            </div>
            <div style={{ marginTop: 24, borderRadius: 24, background: "rgba(255,255,255,0.68)", padding: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#0f172a" }}>Suppa Duppa Snapback</div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.65, color: "#475569" }}>
                Quick mockup preview for how the logo can sit on hats inside the store before product photos are added.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sd-card sd-tank-card-side">
        <div className="sd-chip sd-chip-orange">Tank mockup</div>
        <div className="sd-tank-card-panel">
          <TankMock />
        </div>
        <p style={{ margin: "18px 0 0", fontSize: 14, lineHeight: 1.75, color: "#475569" }}>
          Preview of the logo placed on a tank top product card for the summer collection section.
        </p>
      </div>
    </div>
  );
}

function PantherBanner() {
  return (
    <div className="sd-panther" aria-hidden="true">
      <div className="sd-panther-head" />
      <div className="sd-panther-ear left" />
      <div className="sd-panther-ear right" />
      <div className="sd-panther-eye left" />
      <div className="sd-panther-eye right" />
      <div className="sd-panther-mouth" />
      <div className="sd-panther-body" />
      <div className="sd-panther-arm left" />
      <div className="sd-panther-arm right" />
      <div className="sd-panther-paw left" />
      <div className="sd-panther-paw right" />
      <div className="sd-panther-leg left" />
      <div className="sd-panther-leg right" />
      <div className="sd-panther-tail a" />
      <div className="sd-panther-tail b" />
      <div className="sd-panther-bar" />
      <div className="sd-panther-bar-text">How You Feelin'?</div>
    </div>
  );
}

export default function SuppaDuppaSummerSite() {
  const [activeColor, setActiveColor] = useState(hatColors[0].name);

  const selected = useMemo(
    () => hatColors.find((color) => color.name === activeColor) || hatColors[0],
    [activeColor]
  );

  return (
    <>
      <style>{css}</style>
      <div className="sd-site">
        <section className="sd-section">
          <div className="sd-overlay" />
          <div className="sd-blur-a" />
          <div className="sd-blur-b" />
          <PantherBanner />

          <div className="sd-shell">
            <div className="sd-hero">
              <div>
                <div className="sd-pill">
                  <span className="sd-spark" />
                  Summer drop is live
                </div>

                <img src={logoSrc} alt="Suppa Duppa" className="sd-logo-main" />

                <p className="sd-kicker">How You Feelin'? Suppa Duppa.</p>

                <h1 className="sd-title">
                  Beach-ready hats and tanks with pure <span className="sd-title-gradient">summer mood</span>.
                </h1>

                <p className="sd-body">
                  Suppa Duppa feels like walking barefoot on warm sand, catching ocean breeze, and pulling up in bright colors that make the whole day feel lighter.
                </p>

                <p className="sd-body-sub">
                  Soft ocean breeze, clean color, smooth summer energy, and a fresh feel that fits the whole mood right.
                </p>

                <div className="sd-actions">
                  <a href="#shopify-products" className="sd-btn">
                    <span>🛍️</span>
                    <span>Shop the collection</span>
                  </a>
                  <a href="#shopify-products" className="sd-btn-outline">
                    <span>🌊</span>
                    <span>View summer colors</span>
                  </a>
                </div>

                <div className="sd-stats">
                  <div className="sd-stat">
                    <div className="sd-stat-number">4</div>
                    <div className="sd-stat-label">Colorways ready</div>
                  </div>
                  <div className="sd-stat">
                    <div className="sd-stat-number">2</div>
                    <div className="sd-stat-label">Summer staples</div>
                  </div>
                  <div className="sd-stat">
                    <div className="sd-stat-number">100%</div>
                    <div className="sd-stat-label">Beach vibe energy</div>
                  </div>
                </div>
              </div>

              <div className="sd-picker-wrap">
                <div className="sd-picker-blur" />
                <div className="sd-picker">
                  <div className="sd-picker-top">
                    <div>
                      <div className="sd-picker-label">Color picker</div>
                      <h2 className="sd-picker-title">Choose your beach tone</h2>
                    </div>
                    <div className="sd-sun">☀️</div>
                  </div>

                  <div className="sd-color-list">
                    {hatColors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setActiveColor(color.name)}
                        className={`sd-color-btn ${activeColor === color.name ? "is-active" : ""}`}
                      >
                        {color.name}
                      </button>
                    ))}
                  </div>

                  <div className={`sd-featured ${selected.swatchClass}`}>
                    <div className="sd-featured-card">
                      <div className="sd-featured-label">Featured look</div>
                      <div className="sd-featured-grid">
                        <div className="sd-product-mini">
                          <div className="sd-product-mini-logo">
                            <HatMock />
                          </div>
                          <div className="sd-product-mini-title">Hat</div>
                        </div>
                        <div className="sd-product-mini">
                          <div className="sd-product-mini-logo">
                            <TankMock />
                          </div>
                          <div className="sd-product-mini-title">Tank</div>
                        </div>
                      </div>
                      <p className="sd-featured-copy">
                        {selected.name} makes the whole fit feel fresh, playful, and made for the shoreline.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="shopify-products" className="sd-shopify">
          <div className="sd-shell">
            <div className="sd-row">
              <div>
                <div className="sd-row-kicker">Summer collection</div>
                <h2 className="sd-row-title">Different color hats and tank tops</h2>
              </div>
              <p className="sd-row-copy">
                A bright mix of clean neutrals, ocean blues, tropical greens, and sunset tones so every piece feels like vacation mode.
              </p>
            </div>

            <div className="sd-info-card">
              <div className="sd-info-grid">
                <div>
                  <div className="sd-row-kicker" style={{ color: "#0891b2" }}>Shopify-ready section</div>
                  <h3 style={{ margin: "10px 0 0", fontSize: 34, lineHeight: 1.1, color: "#0f172a" }}>
                    Drop your Shopify products right into this layout.
                  </h3>
                  <p style={{ margin: "14px 0 0", maxWidth: 720, fontSize: 16, lineHeight: 1.8, color: "#64748b" }}>
                    Each product card below can take either a Shopify product link or a full Shopify Buy Button embed. Keep the same Suppa Duppa design, and swap the mock cards for live products whenever you are ready.
                  </p>
                </div>
                <div className="sd-dark-card">
                  <div className="sd-row-kicker" style={{ color: "#67e8f9" }}>How to use it</div>
                  <ol className="sd-dark-list">
                    <li>Add your Shopify product URL in each card.</li>
                    <li>Or paste the Shopify Buy Button embed code into the product object.</li>
                    <li>Replace the sample products with your real Printful-synced Shopify items.</li>
                  </ol>
                </div>
              </div>
            </div>

            <MockupShowcase />

            <div className="sd-grid">
              {products.map((item) => (
                <ShopifyEmbedCard key={item.id} product={item} selected={selected} />
              ))}
            </div>
          </div>
        </section>

        <section className="sd-footer">
          <div className="sd-shell">
            <div className="sd-footer-grid">
              <div className="sd-card" style={{ padding: 32 }}>
                <div className="sd-row-kicker" style={{ color: "#0891b2" }}>Store mood</div>
                <h3 style={{ margin: "10px 0 0", fontSize: 48, lineHeight: 1.05, color: "#0f172a" }}>
                  Walk the sand. Catch the light. Wear the feeling.
                </h3>
                <p style={{ margin: "18px 0 0", maxWidth: 760, fontSize: 20, lineHeight: 1.8, color: "#475569" }}>
                  The whole site is built around a beach-day feeling — airy space, sun-washed colors, playful energy, and product cards that feel easy to shop on phone or desktop.
                </p>
                <div className="sd-tag-list">
                  {["Beach launch banner", "Color-ready product grid", "Mobile-friendly layout", "Shopify-ready product cards"].map((tag) => (
                    <span key={tag} className="sd-tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="sd-email-card">
                <div className="sd-row-kicker" style={{ color: "#67e8f9" }}>Email sign-up</div>
                <h3 style={{ margin: "10px 0 0", fontSize: 38, lineHeight: 1.1, color: "#ffffff" }}>
                  Get first access to new colors and beach drops.
                </h3>
                <input className="sd-email-input" placeholder="Email address" />
                <button type="button" className="sd-email-btn">Join the Suppa Duppa list</button>
                <p className="sd-email-note">Bright fits, summer drops, and fresh beach energy straight to your inbox.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
