import "../styles/About.css";

const CHIPS = ["B.Tech CSE", "KIIT University", "Cognizant", "SQL Expert", "React Dev", "Open Source"];

export default function About() {
  return (
    <section id="about">
      <div className="reveal section-label">About Me</div>
      <div className="reveal reveal-delay-1 section-title">
        The Developer<br />Behind the Code
      </div>

      <div className="about-grid">
        {/* Avatar */}
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

        {/* Content */}
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
            {CHIPS.map((c) => (
              <span key={c} className="chip">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}