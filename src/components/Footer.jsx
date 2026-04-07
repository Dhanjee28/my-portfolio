export default function Footer() {
  return (
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
  );
}