import { aboutChips, profile } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title">
      <div className="section-label">About Me</div>
      <h2 className="section-title" id="about-title">
        I fix things that are on fire
      </h2>

      <div className="about-grid">
        <div className="about-img-wrap">
          <div className="about-avatar" aria-label="Dhanjee Tiwari initials">
            {profile.initials}
          </div>
          <div className="about-badge">
            <div className="about-badge-dot" aria-hidden="true" />
            <span className="about-badge-text">Open to work | Hyderabad</span>
          </div>
        </div>

        <div className="about-content">
          <h3>Hi, I am Dhanjee</h3>
          <p>
            I am a backend developer at <strong>{profile.company}</strong>, where my work
            includes production support, backend debugging, issue investigation, and reading
            unfamiliar systems under pressure.
          </p>
          <p>
            Outside work, I build projects I can explain deeply: a train booking backend
            with token reuse detection and race-aware rate limiting, plus an RBAC-driven
            employee management API. My core stack is <strong>Node.js, TypeScript,
            PostgreSQL, Redis, Prisma, and Docker</strong>.
          </p>
          <p>
            I studied Computer Science at <strong>KIIT University</strong>, class of 2025.
            I also work through DSA patterns in C++ and use AI tools such as ChatGPT,
            Claude, Cursor, and Claude Code to speed up development while still owning the
            code I ship.
          </p>
          {/* <p>
            Away from software, I mod Seiko watches and create travel content. It is a
            useful reminder that small details matter when the system has many moving parts.
          </p> */}

          <div className="about-chips" aria-label="Personal highlights">
            {aboutChips.map((chip) => (
              <span className="chip" key={chip}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
