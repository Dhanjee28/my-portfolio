import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer>
      <p className="footer-text">
        <span>Dhanjee Tiwari</span> | Backend Engineer | Built for proof of work
      </p>
      <div className="footer-socials" aria-label="Footer links">
        <a className="social-btn" href={profile.links.github} target="_blank" rel="noreferrer">
          GH
        </a>
        <a className="social-btn" href={profile.links.linkedin} target="_blank" rel="noreferrer">
          IN
        </a>
        <a className="social-btn" href={profile.links.email}>
          @
        </a>
      </div>
    </footer>
  );
}
