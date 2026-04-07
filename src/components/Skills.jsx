import "../styles/Skills.css";

// Individual skill bar card
function SkillBar({ name, level, visible }) {
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

export default function Skills({ skills, skillCat, setSkillCat, skillsRef, skillsVisible }) {
  const skillCats = ["All", ...new Set(skills.map((s) => s.cat))];
  const filteredSkills = skillCat === "All" ? skills : skills.filter((s) => s.cat === skillCat);

  return (
    <section id="skills" ref={skillsRef}>
      <div className="reveal section-label">Technical Skills</div>
      <div className="reveal reveal-delay-1 section-title">What I Work With</div>
      <p className="reveal reveal-delay-2 section-desc">
        A curated set of languages, frameworks, and tools I've used to ship real products.
      </p>

      <div className="reveal reveal-delay-3 skills-layout">
        {/* Category filter buttons */}
        <div className="skills-categories">
          {skillCats.map((c) => (
            <button
              key={c}
              className={`skill-cat-btn ${skillCat === c ? "active" : ""}`}
              onClick={() => setSkillCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Skill bars grid */}
        <div className="skills-grid">
          {filteredSkills.map((s) => (
            <SkillBar key={s.name} {...s} visible={skillsVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}