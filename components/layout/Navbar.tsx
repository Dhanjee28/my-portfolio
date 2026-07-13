"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Expertise", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Open Source", href: "/#open-source" },
  { label: "History", href: "/#notes" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState<"dark" | "light">("light");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", mode === "dark");
    document.body.classList.toggle("light-mode", mode === "light");
  }, [mode]);

  return (
    <>
      <nav className="nav" aria-label="Primary navigation">
        <a className="nav-brand" href="/#top" aria-label="Dhanjee Tiwari, home">
          <span className="nav-brand-mark">DJ</span>

        </a>

        <button
          className="nav-icon-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Open navigation menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>

        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
          onClick={() => setMode((current) => (current === "dark" ? "light" : "dark"))}
        >
          {mode === "dark" ? "Light" : "Dark"}
        </button>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {menuOpen ? (
        <div className="mobile-menu" id="mobile-menu">
          <p className="mobile-menu-title">Menu</p>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </>
  );
}
