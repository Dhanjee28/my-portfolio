import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';

// ─── Inline Styles & Config ───────────────────────────────────────────────────
const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Cabinet+Grotesk:wght@400;500;700;900&display=swap');
`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  :root {
    --bg: #0a0a0f;
    --bg2: #111118;
    --bg3: #1a1a26;
    --surface: #16161f;
    --border: rgba(255,255,255,0.07);
    --accent: #7fff7a;
    --accent2: #a78bfa;
    --accent3: #38bdf8;
    --text: #f0eff8;
    --text2: #9896b0;
    --text3: #5e5c78;
    --glow: rgba(127,255,122,0.15);
    --card-bg: #13131c;
    --nav-bg: rgba(10,10,15,0.85);
  }
  .light {
    --bg: #f4f3ff;
    --bg2: #ebe9fd;
    --bg3: #dddafd;
    --surface: #ffffff;
    --border: rgba(0,0,0,0.08);
    --accent: #16a34a;
    --accent2: #7c3aed;
    --accent3: #0284c7;
    --text: #0f0e1a;
    --text2: #4b4869;
    --text3: #9997b8;
    --glow: rgba(22,163,74,0.12);
    --card-bg: #ffffff;
    --nav-bg: rgba(244,243,255,0.88);
  }

  body {
    font-family: 'Cabinet Grotesk', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    transition: background 0.4s, color 0.4s;
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

  /* ── Noise overlay ── */
  body::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 9999;
    opacity: 0.4;
  }

  /* ── Nav ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    backdrop-filter: blur(20px) saturate(1.4);
    background: var(--nav-bg);
    border-bottom: 1px solid var(--border);
    padding: 0 clamp(1rem, 5vw, 3rem);
    height: 64px;
    display: flex; align-items: center; justify-content: space-between;
    transition: all 0.3s;
  }
  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 1.25rem;
    color: var(--text);
    letter-spacing: -0.02em;
  }
  .nav-logo span { color: var(--accent); }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a {
    font-family: 'DM Mono', monospace;
    font-size: 0.78rem; font-weight: 500;
    color: var(--text2);
    text-decoration: none;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: color 0.2s;
    position: relative;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
    height: 1px; background: var(--accent);
    transform: scaleX(0); transition: transform 0.25s;
  }
  .nav-links a:hover { color: var(--text); }
  .nav-links a:hover::after { transform: scaleX(1); }
  .nav-right { display: flex; gap: 1rem; align-items: center; }
  .theme-btn {
    width: 40px; height: 40px; border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text); cursor: pointer;
    font-size: 1.1rem;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .theme-btn:hover { border-color: var(--accent); color: var(--accent); transform: scale(1.05); }

  /* mobile nav */
  .burger {
    display: none; flex-direction: column; gap: 5px;
    cursor: pointer; background: none; border: none; padding: 4px;
  }
  .burger span {
    display: block; width: 22px; height: 2px;
    background: var(--text); border-radius: 2px;
    transition: all 0.3s;
  }
  .mobile-menu {
    position: fixed; top: 64px; left: 0; right: 0;
    background: var(--nav-bg); backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    padding: 1.5rem clamp(1rem, 5vw, 3rem);
    z-index: 999;
    display: flex; flex-direction: column; gap: 1.2rem;
    transform: translateY(-20px); opacity: 0;
    animation: slideDown 0.25s forwards;
  }
  @keyframes slideDown { to { transform: translateY(0); opacity: 1; } }
  .mobile-menu a {
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem; color: var(--text2);
    text-decoration: none; letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .burger { display: flex; }
  }

  /* ── Sections ── */
  section { padding: clamp(5rem, 10vw, 8rem) clamp(1rem, 5vw, 3rem); max-width: 1200px; margin: 0 auto; }

  /* ── Hero ── */
  .hero-section {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: center;
    position: relative; overflow: hidden;
    padding-top: 100px;
    max-width: 100%;
  }
  .hero-bg-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%);
  }
  .hero-glow {
    position: absolute; width: 600px; height: 600px;
    background: radial-gradient(circle, var(--glow) 0%, transparent 70%);
    top: 10%; left: -10%;
    pointer-events: none; animation: pulse 6s ease-in-out infinite;
  }
  .hero-glow2 {
    position: absolute; width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%);
    bottom: 20%; right: 5%;
    pointer-events: none; animation: pulse 8s ease-in-out infinite reverse;
  }
  @keyframes pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } }

  .hero-inner {
    position: relative; z-index: 1;
    max-width: 1200px; margin: 0 auto;
    padding: 0 clamp(1rem, 5vw, 3rem);
    width: 100%;
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'DM Mono', monospace; font-size: 0.75rem;
    color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase;
    border: 1px solid rgba(127,255,122,0.25);
    padding: 6px 14px; border-radius: 100px;
    margin-bottom: 1.5rem;
    background: rgba(127,255,122,0.05);
    animation: fadeUp 0.6s both;
  }
  .hero-tag::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: blink 1.5s infinite; }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.2; } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

  .hero-name {
    font-family: 'Syne', sans-serif;
    font-size: clamp(3rem, 9vw, 7.5rem);
    font-weight: 800; line-height: 0.95;
    letter-spacing: -0.03em;
    animation: fadeUp 0.6s 0.1s both;
    color: #ffffff;
  }
  .hero-name em { font-style: normal; color: var(--accent); }
    font-family: 'DM Mono', monospace;
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    color: var(--text2); margin-top: 1.5rem;
    animation: fadeUp 0.6s 0.2s both;
    max-width: 580px;
  }
  .hero-subtitle .cursor {
    display: inline-block; width: 2px; height: 1.1em;
    background: var(--accent); margin-left: 2px;
    animation: blink 0.9s step-end infinite;
    vertical-align: text-bottom;
  }
  .hero-ctas {
    display: flex; gap: 1rem; flex-wrap: wrap;
    margin-top: 2.5rem;
    animation: fadeUp 0.6s 0.3s both;
  }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 0.75rem 1.75rem; border-radius: 10px;
    background: var(--accent); color: #0a0a0f;
    font-family: 'Cabinet Grotesk', sans-serif;
    font-weight: 700; font-size: 0.95rem;
    text-decoration: none; border: none; cursor: pointer;
    transition: all 0.25s; letter-spacing: -0.01em;
    box-shadow: 0 0 0 0 var(--glow);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px var(--glow); }
  .btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 0.75rem 1.75rem; border-radius: 10px;
    background: transparent; color: var(--text);
    font-family: 'Cabinet Grotesk', sans-serif;
    font-weight: 700; font-size: 0.95rem;
    text-decoration: none; border: 1px solid var(--border);
    cursor: pointer; transition: all 0.25s;
  }
  .btn-secondary:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

  .hero-stats {
    display: flex; gap: 3rem; margin-top: 4rem;
    animation: fadeUp 0.6s 0.4s both;
    flex-wrap: wrap;
  }
  .stat { }
  .stat-num {
    font-family: 'Syne', sans-serif; font-size: 2rem;
    font-weight: 800; color: var(--text);
    letter-spacing: -0.03em;
  }
  .stat-num span { color: var(--accent); }
  .stat-label {
    font-family: 'DM Mono', monospace; font-size: 0.7rem;
    color: var(--text3); text-transform: uppercase; letter-spacing: 0.08em;
    margin-top: 2px;
  }
  .scroll-indicator {
    position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    color: var(--text3); font-family: 'DM Mono', monospace; font-size: 0.65rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    animation: float 2s ease-in-out infinite;
    z-index: 1;
  }
  .scroll-line {
    width: 1px; height: 50px;
    background: linear-gradient(to bottom, var(--text3), transparent);
  }
  @keyframes float { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }

  /* ── Section Header ── */
  .section-label {
    font-family: 'DM Mono', monospace; font-size: 0.72rem;
    color: var(--accent); letter-spacing: 0.12em; text-transform: uppercase;
    display: flex; align-items: center; gap: 12px; margin-bottom: 0.75rem;
  }
  .section-label::before {
    content: ''; flex: 0 0 40px; height: 1px; background: var(--accent);
  }
  .section-title {
    font-family: 'Syne', sans-serif; font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 800; letter-spacing: -0.03em; color: #ffffff;
    line-height: 1.05; margin-bottom: 0.5rem;
  }
  .section-desc { color: var(--text2); max-width: 540px; line-height: 1.7; font-size: 1rem; }

  /* ── About ── */
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 4rem; align-items: center; margin-top: 3rem;
  }
  .about-img-wrap {
    position: relative;
  }
  .about-avatar {
    width: 100%; aspect-ratio: 1;
    border-radius: 24px;
    background: linear-gradient(135deg, var(--bg3) 0%, var(--surface) 100%);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 5rem; position: relative; overflow: hidden;
  }
  .about-avatar::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(127,255,122,0.06) 0%, rgba(167,139,250,0.06) 100%);
  }
  .about-badge {
    position: absolute; bottom: -12px; right: -12px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 12px 16px;
    display: flex; align-items: center; gap: 10px;
  }
  .about-badge-dot {
    width: 10px; height: 10px; border-radius: 50%;
    background: var(--accent); animation: blink 1.5s infinite;
    box-shadow: 0 0 8px var(--accent);
  }
  .about-badge-text { font-family: 'DM Mono', monospace; font-size: 0.75rem; color: var(--text2); }
 .about-content h3 {
    font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 700;
    color: #ffffff; margin-bottom: 1rem;
  }
  .about-content p { color: var(--text2); line-height: 1.8; margin-bottom: 1rem; font-size: 0.97rem; }
  .about-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 1.5rem; }
  .chip {
    font-family: 'DM Mono', monospace; font-size: 0.72rem;
    padding: 5px 12px; border-radius: 100px;
    border: 1px solid var(--border); color: var(--text2);
    background: var(--surface); letter-spacing: 0.03em;
    transition: all 0.2s;
  }
  .chip:hover { border-color: var(--accent); color: var(--accent); background: rgba(127,255,122,0.05); }
  @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; } .about-img-wrap { max-width: 300px; } }

  /* ── Skills ── */
  .skills-layout { margin-top: 3rem; }
  .skills-categories { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 2.5rem; }
  .skill-cat-btn {
    font-family: 'DM Mono', monospace; font-size: 0.72rem;
    padding: 6px 14px; border-radius: 8px;
    border: 1px solid var(--border); color: var(--text2);
    background: var(--surface); cursor: pointer; transition: all 0.2s;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
  .skill-cat-btn.active, .skill-cat-btn:hover {
    border-color: var(--accent); color: var(--accent);
    background: rgba(127,255,122,0.06);
  }
  .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
  .skill-card {
    background: var(--card-bg); border: 1px solid var(--border);
    border-radius: 16px; padding: 1.25rem;
    transition: border-color 0.3s, transform 0.3s;
  }
  .skill-card:hover { border-color: rgba(127,255,122,0.3); transform: translateY(-2px); }
  .skill-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
  .skill-name { font-weight: 600; font-size: 0.9rem; color: var(--text); }
  .skill-level {
    font-family: 'DM Mono', monospace; font-size: 0.7rem;
    color: var(--accent); letter-spacing: 0.05em;
  }
  .skill-bar {
    height: 4px; background: var(--bg3); border-radius: 4px; overflow: hidden;
  }
  .skill-bar-fill {
    height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent2));
    border-radius: 4px; transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
    transform-origin: left;
  }

  /* ── Projects ── */
  .projects-controls {
    display: flex; gap: 8px; flex-wrap: wrap;
    margin: 2rem 0;
  }
  .filter-btn {
    font-family: 'DM Mono', monospace; font-size: 0.72rem;
    padding: 6px 16px; border-radius: 8px;
    border: 1px solid var(--border); color: var(--text2);
    background: var(--surface); cursor: pointer; transition: all 0.2s;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
  .filter-btn.active {
    background: var(--accent); color: #0a0a0f;
    border-color: var(--accent); font-weight: 700;
  }
  .projects-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 1.5rem;
  }
  .project-card {
    background: var(--card-bg); border: 1px solid var(--border);
    border-radius: 20px; overflow: hidden;
    cursor: pointer; transition: all 0.3s;
    position: relative;
  }
  .project-card:hover { border-color: rgba(127,255,122,0.3); transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
  .project-thumb {
    height: 200px; position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-size: 4rem;
  }
  .project-thumb-bg {
    position: absolute; inset: 0;
    transition: transform 0.5s;
  }
  .project-card:hover .project-thumb-bg { transform: scale(1.05); }
  .project-thumb-icon { position: relative; z-index: 1; }
  .project-body { padding: 1.5rem; }
  .project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1rem; }
  .project-tag {
    font-family: 'DM Mono', monospace; font-size: 0.65rem;
    padding: 3px 10px; border-radius: 100px;
    background: var(--bg3); color: var(--text3);
    letter-spacing: 0.04em;
  }
  .project-name {
    font-family: 'Syne', sans-serif; font-size: 1.25rem;
    font-weight: 700; color: var(--text); margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }
  .project-desc { color: var(--text2); font-size: 0.88rem; line-height: 1.65; }
  .project-footer {
    display: flex; justify-content: space-between; align-items: center;
    padding: 1rem 1.5rem; border-top: 1px solid var(--border);
  }
  .project-link {
    font-family: 'DM Mono', monospace; font-size: 0.72rem;
    color: var(--accent); text-decoration: none;
    display: flex; align-items: center; gap: 6px;
    letter-spacing: 0.05em; text-transform: uppercase;
    transition: gap 0.2s;
  }
  .project-link:hover { gap: 10px; }
  .featured-badge {
    font-family: 'DM Mono', monospace; font-size: 0.62rem;
    padding: 3px 8px; border-radius: 4px;
    background: rgba(127,255,122,0.1);
    color: var(--accent); letter-spacing: 0.08em; text-transform: uppercase;
    border: 1px solid rgba(127,255,122,0.2);
  }

  /* ── Modal ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 2000;
    background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
    animation: fadeIn 0.2s;
  }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  .modal {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 24px; max-width: 640px; width: 100%;
    max-height: 90vh; overflow-y: auto;
    animation: scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes scaleIn { from { opacity:0; transform:scale(0.94); } to { opacity:1; transform:scale(1); } }
  .modal-header {
    position: relative; height: 220px;
    display: flex; align-items: center; justify-content: center;
    font-size: 5rem; border-radius: 24px 24px 0 0;
    overflow: hidden;
  }
  .modal-close {
    position: absolute; top: 1rem; right: 1rem;
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);
    color: #fff; cursor: pointer; font-size: 1rem;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; z-index: 1;
  }
  .modal-close:hover { background: rgba(255,255,255,0.1); transform: scale(1.1); }
  .modal-body { padding: 1.75rem 2rem 2rem; }
  .modal-title {
    font-family: 'Syne', sans-serif; font-size: 1.6rem;
    font-weight: 800; color: var(--text); letter-spacing: -0.03em;
    margin-bottom: 0.75rem;
  }
  .modal-desc { color: var(--text2); line-height: 1.75; margin-bottom: 1.5rem; }
  .modal-section-title {
    font-family: 'DM Mono', monospace; font-size: 0.72rem;
    color: var(--accent); text-transform: uppercase; letter-spacing: 0.1em;
    margin-bottom: 0.75rem;
  }
  .modal-highlights { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 1.5rem; }
  .modal-highlights li {
    display: flex; gap: 10px; align-items: flex-start;
    color: var(--text2); font-size: 0.9rem; line-height: 1.6;
  }
  .modal-highlights li::before { content: '›'; color: var(--accent); font-size: 1.1rem; flex-shrink: 0; margin-top: -1px; }
  .modal-stack { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.5rem; }
  .modal-stack-item {
    font-family: 'DM Mono', monospace; font-size: 0.7rem;
    padding: 4px 12px; border-radius: 100px;
    background: var(--bg3); color: var(--accent);
    border: 1px solid rgba(127,255,122,0.15);
  }
  .modal-actions { display: flex; gap: 0.75rem; }

  /* ── Contact ── */
  .contact-grid {
    display: grid; grid-template-columns: 1fr 1.2fr;
    gap: 4rem; margin-top: 3rem;
  }
  .contact-info h3 {
    font-family: 'Syne', sans-serif; font-size: 1.4rem;
    font-weight: 700; color: var(--text); margin-bottom: 1rem;
  }
  .contact-info p { color: var(--text2); line-height: 1.75; margin-bottom: 2rem; font-size: 0.95rem; }
  .contact-links { display: flex; flex-direction: column; gap: 1rem; }
  .contact-link {
    display: flex; align-items: center; gap: 12px;
    color: var(--text2); text-decoration: none;
    font-size: 0.9rem; transition: color 0.2s;
    padding: 0.75rem 1rem; border-radius: 12px;
    border: 1px solid var(--border); background: var(--surface);
  }
  .contact-link:hover { color: var(--accent); border-color: rgba(127,255,122,0.3); }
  .contact-link-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: var(--bg3); display: flex; align-items: center; justify-content: center;
    font-size: 1rem; flex-shrink: 0;
  }
  .form { display: flex; flex-direction: column; gap: 1rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-label {
    font-family: 'DM Mono', monospace; font-size: 0.7rem;
    color: var(--text3); text-transform: uppercase; letter-spacing: 0.08em;
  }
  .form-input, .form-textarea {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 0.75rem 1rem;
    color: var(--text); font-family: 'Cabinet Grotesk', sans-serif;
    font-size: 0.95rem; transition: border-color 0.2s;
    outline: none;
  }
  .form-input:focus, .form-textarea:focus { border-color: var(--accent); }
  .form-textarea { resize: vertical; min-height: 120px; }
  .form-success {
    padding: 1rem; border-radius: 12px;
    background: rgba(127,255,122,0.08); border: 1px solid rgba(127,255,122,0.25);
    color: var(--accent); font-family: 'DM Mono', monospace; font-size: 0.85rem;
    text-align: center;
  }
  @media (max-width: 768px) {
    .contact-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
  }

  /* ── Footer ── */
  footer {
    border-top: 1px solid var(--border);
    padding: 2rem clamp(1rem, 5vw, 3rem);
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 1rem;
    max-width: 1200px; margin: 0 auto;
  }
  .footer-text {
    font-family: 'DM Mono', monospace; font-size: 0.72rem;
    color: var(--text3); letter-spacing: 0.05em;
  }
  .footer-text span { color: var(--accent); }
  .footer-socials { display: flex; gap: 0.75rem; }
  .social-btn {
    width: 36px; height: 36px; border-radius: 10px;
    border: 1px solid var(--border); background: var(--surface);
    color: var(--text2); cursor: pointer; font-size: 0.9rem;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; text-decoration: none;
  }
  .social-btn:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

  /* ── Animations ── */
  .reveal {
    opacity: 0; transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }
  .reveal-delay-5 { transition-delay: 0.5s; }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const TYPING_STRINGS = [
  "Full-Stack Developer",
  "Tech Enthusiast",
  "SQL Specialist",
  "Backend Architect",
  "CS Graduate @ KIIT",
];

const SKILLS = [
  { name: "Java", level: 85, cat: "Languages" },
  { name: "Python", level: 80, cat: "Languages" },
  { name: "C++", level: 72, cat: "Languages" },
  { name: "JavaScript", level: 85, cat: "Languages" },
  { name: "SQL", level: 90, cat: "Languages" },
  { name: "React.js", level: 82, cat: "Frontend" },
  { name: "Node.js", level: 78, cat: "Backend" },
  { name: "Express.js", level: 76, cat: "Backend" },
  { name: "REST API", level: 88, cat: "Backend" },
  { name: "MySQL", level: 88, cat: "Databases" },
  { name: "MongoDB", level: 74, cat: "Databases" },
  { name: "Query Optimization", level: 85, cat: "Databases" },
  { name: "OpenCV", level: 78, cat: "ML/CV" },
  { name: "NumPy / Pandas", level: 80, cat: "ML/CV" },
  { name: "Git & GitHub", level: 88, cat: "Tools" },
  { name: "Microservices", level: 72, cat: "Architecture" },
  { name: "OOP & DSA", level: 85, cat: "Architecture" },
];

const PROJECTS = [
  {
    id: 1,
    name: "Employee Directory",
    tagline: "Full-Stack CRUD System",
    desc: "RESTful API with 12+ endpoints for employee management, JWT auth, and Azure deployment.",
    longDesc:
      "A production-grade employee directory built with ASP.NET Core Web API and MySQL. Features normalized database schema, three-tier MVC architecture with dependency injection, and full Swagger documentation for seamless frontend integration.",
    tags: ["Full-Stack", "Backend"],
    stack: ["ASP.NET Core", "MySQL", "Entity Framework", "LINQ", "JWT", "Swagger", "Azure"],
    highlights: [
      "Architected RESTful API with 12+ endpoints supporting CRUD, handling 500+ concurrent requests with sub-200ms response time",
      "Designed normalized schema cutting query execution time by 35%",
      "Implemented 3-tier MVC with dependency injection achieving 85% unit test coverage",
      "Integrated JWT authentication, logging middleware, and Azure cloud deployment",
    ],
    icon: "🗂️",
    gradient: "linear-gradient(135deg, #1a1a3e 0%, #0f2a1a 100%)",
    featured: true,
    category: "backend",
  },
  {
    id: 2,
    name: "Stock Prediction ML",
    tagline: "Machine Learning Forecasting",
    desc: "ML model predicting stock movements using historical data, technical indicators, and trend analysis.",
    longDesc:
      "A machine learning pipeline for stock price prediction leveraging Python, pandas, and scikit-learn. Processes historical OHLCV data, engineers technical indicators (RSI, MACD, Bollinger Bands), and trains ensemble models for directional forecasting.",
    tags: ["ML", "Python"],
    stack: ["Python", "pandas", "NumPy", "scikit-learn", "Matplotlib", "yfinance"],
    highlights: [
      "Built feature engineering pipeline with 20+ technical indicators from raw OHLCV data",
      "Trained ensemble models achieving ~72% directional accuracy on test data",
      "Visualized model predictions vs actuals with interactive Matplotlib dashboards",
      "Automated data fetching via yfinance API for real-time inference",
    ],
    icon: "📈",
    gradient: "linear-gradient(135deg, #0f1e3a 0%, #1a0f2e 100%)",
    featured: false,
    category: "ml",
  },
  {
    id: 3,
    name: "Air Canvas",
    tagline: "Gesture-Controlled Drawing",
    desc: "Real-time computer vision app that turns your fingertip into a paintbrush — no hardware needed.",
    longDesc:
      "A real-time gesture-controlled drawing application powered by Mediapipe and OpenCV. Detects hand landmarks at 30+ FPS and maps fingertip coordinates to canvas operations. Supports multi-color drawing, erase, and clear gestures.",
    tags: ["CV", "Python"],
    stack: ["Python", "OpenCV", "Mediapipe", "NumPy", "Git"],
    highlights: [
      "Built gesture-controlled drawing reaching 30+ FPS and 95% recognition accuracy",
      "Optimized frame processing lowering latency by 40% via vectorized NumPy operations",
      "Delivered multi-color drawing modes with fingertip coordinate tracking",
      "Intuitive draw, erase, and clear controls using hand pose detection",
    ],
    icon: "✋",
    gradient: "linear-gradient(135deg, #1f0a2e 0%, #0a1f1a 100%)",
    featured: true,
    category: "ml",
  },
];

const CATEGORIES = ["All", "Backend", "ML"];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useTyping(strings, speed = 80, pause = 2000) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx % strings.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) { setDeleting(false); setIdx((i) => i + 1); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, strings, speed, pause]);

  return text;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ─── Components ───────────────────────────────────────────────────────────────
function SkillBar({ name, level, cat, visible }) {
  return (
    <div className="skill-card">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-level">{level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{ width: visible ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ background: project.gradient }}>
          <span>{project.icon}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="project-tags" style={{ marginBottom: "0.5rem" }}>
            {project.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
          </div>
          <h2 className="modal-title">{project.name}</h2>
          <p className="modal-desc">{project.longDesc}</p>
          <p className="modal-section-title">Key Highlights</p>
          <ul className="modal-highlights">
            {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
          <p className="modal-section-title">Tech Stack</p>
          <div className="modal-stack">
            {project.stack.map((s) => <span key={s} className="modal-stack-item">{s}</span>)}
          </div>
          <div className="modal-actions">
            <button className="btn-secondary" style={{ fontSize: "0.85rem" }} onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [skillCat, setSkillCat] = useState("All");
  const [modal, setModal] = useState(null);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);

  const typedText = useTyping(TYPING_STRINGS);
  useReveal();

  // Skill visibility via IntersectionObserver
  useEffect(() => {
    if (!skillsRef.current) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setSkillsVisible(true), { threshold: 0.2 });
    obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const filteredProjects = PROJECTS.filter(
    (p) => activeFilter === "All" || p.category === activeFilter.toLowerCase()
  );

  const skillCats = ["All", ...new Set(SKILLS.map((s) => s.cat))];
  const filteredSkills = skillCat === "All" ? SKILLS : SKILLS.filter((s) => s.cat === skillCat);

 const handleSubmit = (e) => {
  e.preventDefault();
  emailjs.send(
    'service_gobztet',      // ← paste your Service ID
    'template_q56oe4r',     // ← paste your Template ID
    {
      from_name: formState.name,
      from_email: formState.email,
      subject: formState.subject,
      message: formState.message,
    },
    'Y_OFWj96_PGUCT-S5'       // ← paste your Public Key
  ).then(() => {
    setSubmitted(true);
  }).catch((err) => {
    alert('Failed to send. Please try again or email me directly!');
    console.error(err);
  });
};

  return (
    <>
      <style>{FONTS + CSS}</style>
      <div className={dark ? "" : "light"}>

        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">DT<span>.</span></div>
          <ul className="nav-links">
            {["About", "Skills", "Projects", "Contact"].map((l) => (
              <li key={l}><a href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a></li>
            ))}
          </ul>
          <div className="nav-right">
            <button className="theme-btn" onClick={() => setDark(!dark)}>
              {dark ? "☀️" : "🌙"}
            </button>
            <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="mobile-menu">
            {["About", "Skills", "Projects", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a>
            ))}
          </div>
        )}

        {/* HERO */}
        <div className="hero-section">
          <div className="hero-bg-grid" />
          <div className="hero-glow" />
          <div className="hero-glow2" />
          <div className="hero-inner">
            <div className="hero-tag">Available for opportunities</div>
            <h1 className="hero-name">
              Dhanjee<br /><em>Tiwari</em>
            </h1>
            <p className="hero-subtitle">
              {typedText}<span className="cursor" />
            </p>
            <div className="hero-ctas">
              <a href="#projects" className="btn-primary">View Projects →</a>
              <a href="#contact" className="btn-secondary">Get In Touch</a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-num">50<span>+</span></div>
                <div className="stat-label">Tickets / Week</div>
              </div>
              <div className="stat">
                <div className="stat-num">95<span>%</span></div>
                <div className="stat-label">Resolution Rate</div>
              </div>
              <div className="stat">
                <div className="stat-num">4.8<span>/5</span></div>
                <div className="stat-label">CSAT Score</div>
              </div>
              <div className="stat">
                <div className="stat-num">3<span>+</span></div>
                <div className="stat-label">Projects Built</div>
              </div>
            </div>
          </div>
          <div className="scroll-indicator">
            <div className="scroll-line" />
            scroll
          </div>
        </div>

        {/* ABOUT */}
        <section id="about">
          <div className="reveal section-label">About Me</div>
          <div className="reveal reveal-delay-1 section-title">The Developer<br />Behind the Code</div>
          <div className="about-grid">
            <div className="reveal reveal-delay-2 about-img-wrap">
              <div className="about-avatar">
                👨‍💻
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 30%, rgba(127,255,122,0.05) 0%, transparent 60%)" }} />
              </div>
              <div className="about-badge">
                <div className="about-badge-dot" />
                <span className="about-badge-text">Open to work · Hyderabad</span>
              </div>
            </div>
            <div className="reveal reveal-delay-3 about-content">
              <h3>Hi, I'm Dhanjee 👋</h3>
              <p>
                I'm a Programmer Analyst at <strong style={{ color: "var(--text)" }}>Cognizant Technology Solutions</strong> in Hyderabad, resolving 50+ technical tickets weekly with a 95% first-call resolution rate.
              </p>
              <p>
                I hold a B.Tech in Computer Science from <strong style={{ color: "var(--text)" }}>KIIT University</strong> (CGPA: 7.75). My passion lies in building robust backend systems, optimizing databases, and exploring computer vision and machine learning.
              </p>
              <p>
                Previously interned at <strong style={{ color: "var(--text)" }}>Celebal Technologies</strong> where I developed 50+ optimized SQL queries for ETL workflows, reducing report generation time by 45%.
              </p>
              <div className="about-chips">
                {["B.Tech CSE", "KIIT University", "Cognizant", "SQL Expert", "React Dev", "Open Source"].map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" ref={skillsRef}>
          <div className="reveal section-label">Technical Skills</div>
          <div className="reveal reveal-delay-1 section-title">What I Work With</div>
          <p className="reveal reveal-delay-2 section-desc">A curated set of languages, frameworks, and tools I've used to ship real products.</p>
          <div className="reveal reveal-delay-3 skills-layout">
            <div className="skills-categories">
              {skillCats.map((c) => (
                <button key={c} className={`skill-cat-btn ${skillCat === c ? "active" : ""}`} onClick={() => setSkillCat(c)}>{c}</button>
              ))}
            </div>
            <div className="skills-grid">
              {filteredSkills.map((s, i) => (
                <SkillBar key={s.name} {...s} visible={skillsVisible} />
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="reveal section-label">Projects</div>
          <div className="reveal reveal-delay-1 section-title">Things I've Built</div>
          <p className="reveal reveal-delay-2 section-desc">A selection of projects spanning backend systems, machine learning, and computer vision.</p>
          <div className="reveal reveal-delay-3 projects-controls">
            {CATEGORIES.map((c) => (
              <button key={c} className={`filter-btn ${activeFilter === c ? "active" : ""}`} onClick={() => setActiveFilter(c)}>{c}</button>
            ))}
          </div>
          <div className="projects-grid">
            {filteredProjects.map((p, i) => (
              <div
                key={p.id}
                className={`reveal reveal-delay-${i + 1} project-card`}
                onClick={() => setModal(p)}
              >
                <div className="project-thumb">
                  <div className="project-thumb-bg" style={{ background: p.gradient }} />
                  <span className="project-thumb-icon">{p.icon}</span>
                </div>
                <div className="project-body">
                  <div className="project-tags">
                    {p.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
                  </div>
                  <div className="project-name">{p.name}</div>
                  <p className="project-desc">{p.desc}</p>
                </div>
                <div className="project-footer">
                  <span className="project-link">View Details →</span>
                  {p.featured && <span className="featured-badge">Featured</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="reveal section-label">Contact</div>
          <div className="reveal reveal-delay-1 section-title">Let's Work Together</div>
          <div className="contact-grid">
            <div className="reveal reveal-delay-2 contact-info">
              <h3>Open to opportunities</h3>
              <p>I'm currently open to full-time roles, internships, and freelance projects. Whether you have a question or just want to say hi, my inbox is always open.</p>
              <div className="contact-links">
                <a href="mailto:dhanjee.tiwari458@gmail.com" className="contact-link">
                  <div className="contact-link-icon">📧</div>
                  dhanjee.tiwari458@gmail.com
                </a>
                <a href="https://linkedin.com/in/dhanjeetiwari" target="_blank" rel="noreferrer" className="contact-link">
                  <div className="contact-link-icon">💼</div>
                  linkedin.com/in/dhanjeetiwari
                </a>
                <a href="tel:+916204946431" className="contact-link">
                  <div className="contact-link-icon">📱</div>
                  +91-6204946431
                </a>
                <div className="contact-link">
                  <div className="contact-link-icon">📍</div>
                  Hyderabad, India
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-3">
              {submitted ? (
                <div className="form-success">
                  ✅ Message sent! I'll get back to you soon.
                </div>
              ) : (
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input className="form-input" placeholder="Jane Doe" required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input className="form-input" type="email" placeholder="jane@example.com" required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input className="form-input" placeholder="Project Opportunity" required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea className="form-textarea" placeholder="Tell me about your project or opportunity..." required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })} />
                  </div>
                  <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <p className="footer-text">
            Designed & built by <span>Dhanjee Tiwari</span> · {new Date().getFullYear()}
          </p>
          <div className="footer-socials">
            <a href="mailto:dhanjee.tiwari458@gmail.com" className="social-btn" title="Email">📧</a>
            <a href="https://linkedin.com/in/dhanjeetiwari" className="social-btn" target="_blank" rel="noreferrer" title="LinkedIn">💼</a>
            <a href="tel:+916204946431" className="social-btn" title="Phone">📱</a>
          </div>
        </footer>

        {/* MODAL */}
        {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
      </div>
    </>
  );
}
