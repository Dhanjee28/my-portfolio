import "../styles/Navbar.css";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

export default function Navbar({ dark, setDark, menuOpen, setMenuOpen }) {
  return (
    <>
      <nav className="nav">
        <div className="nav-logo">DJ<span>.</span></div>

        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {l}
              </a>
            </li>
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
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {l}
            </a>
          ))}
        </div>
      )}
    </>
  );
}