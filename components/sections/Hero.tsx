import { profile, typingLine } from "@/data/portfolio";

export function Hero() {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="about-section">
        <div className="image-wrapper" aria-hidden="true">
          <div className="hero-avatar">{profile.initials}</div>
        </div>

        <div className="content">
          <div className="social-icons" aria-label="Social links">
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              GH
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              IN
            </a>
            <a href={profile.links.email}>@</a>
          </div>

          <p className="hero-tag">{profile.tag}</p>
          <h1 className="hero-name" id="hero-title">
            {profile.firstName}
            <br />
            {profile.lastName}
          </h1>
          <p className="hero-subtitle">{typingLine}</p>

          <div className="hero-ctas">
            <a className="btn-primary" href="#projects">
              View Projects
            </a>
            <a className="btn-secondary" href="/case-studies/railinfo">
              RailInfo Case Study
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
