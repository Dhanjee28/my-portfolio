import Image from "next/image";
import { projects } from "@/data/portfolio";

export function Projects() {
  return (
    <section id="projects" className="projects-container" aria-labelledby="projects-title">
      <div className="section-label">Projects</div>
      <h2 className="section-title" id="projects-title">
        Personal projects
      </h2>
      <p className="section-desc">
        Backend systems, API security, authorization design, and practical computer vision.
        RailInfo is the main case study.
      </p>

      <div className="projects-grid">
        {projects.map((project) => {
          const previewHref = project.caseStudy ?? project.github ?? "#projects";
          const isExternalPreview = previewHref.startsWith("http");

          return (
            <article className="project-card project" key={project.id}>
              {project.image ? (
                <a
                  href={previewHref}
                  aria-label={`Open ${project.name}`}
                  target={isExternalPreview ? "_blank" : undefined}
                  rel={isExternalPreview ? "noreferrer" : undefined}
                >
                  <Image
                    className="project-image zoom"
                    src={project.image}
                    alt={`${project.name} preview`}
                    width={980}
                    height={620}
                  />
                </a>
              ) : null}

              <div className="project-body">
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span className="project-tag chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.description}</p>

                <details className="project-details">
                  <summary>Read engineering details</summary>
                  <p>{project.longDescription}</p>
                  <ul className="project-highlights">
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="project-stack" aria-label={`${project.name} stack`}>
                    {project.stack.map((item) => (
                      <span className="stack-chip chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </details>

                {project.caseStudy || project.github ? (
                  <div className="project-actions">
                    {project.caseStudy ? (
                      <a className="btn-text" href={project.caseStudy}>
                        Case Study
                      </a>
                    ) : null}
                    {project.github ? (
                      <a className="btn-text" href={project.github} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
