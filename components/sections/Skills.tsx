import { skills } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title">
      <div className="section-label">Expertise</div>
      <h2 className="section-title" id="skills-title">
        What I work with
      </h2>
      <p className="section-desc">
        The stack behind my projects and production work. No fake percentages, just tools I
        can discuss in an interview.
      </p>

      <div className="skills-layout">
        {skills.map((group) => (
          <article className="skill-group" key={group.category}>
            <h3>{group.category}</h3>
            <div className="skill-list">
              {group.items.map((skill) => (
                <span className="skill-pill" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
