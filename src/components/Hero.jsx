import "../styles/Hero.css";

export default function Hero({ typedText }) {
  return (
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
  );
}