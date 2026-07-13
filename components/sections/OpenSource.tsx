import { openSourceContributions } from "@/data/portfolio";

export function OpenSource() {
  return (
    <section id="open-source" aria-labelledby="open-source-title">
      <div className="section-label">Open Source</div>
      <h2 className="section-title" id="open-source-title">
        Contributing in public
      </h2>
      <p className="section-desc">
        Practical improvements submitted to projects beyond my own repositories.
      </p>

      <div className="open-source-grid">
        {openSourceContributions.map((contribution) => (
          <article className="open-source-card" key={contribution.url}>
            <div className="contribution-heading">
              <div>
                <p className="contribution-project">{contribution.project}</p>
                <h3>{contribution.title}</h3>
              </div>
              <span className="contribution-status">{contribution.status}</span>
            </div>

            <p className="contribution-description">{contribution.description}</p>

            <div className="project-stack" aria-label="Technologies used">
              {contribution.tags.map((tag) => (
                <span className="stack-chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <ul className="contribution-highlights">
              {contribution.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            <a
              className="btn-secondary"
              href={contribution.url}
              target="_blank"
              rel="noreferrer"
            >
              View pull request
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
