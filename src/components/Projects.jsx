import { useState } from "react";
import { CATEGORIES } from "../data/portfolioData";
import ProjectModal from "./ProjectModal";
import "../styles/Projects.css";

export default function Projects({ projects }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [modal, setModal] = useState(null);

  const filteredProjects = projects.filter(
    (p) => activeFilter === "All" || p.category === activeFilter.toLowerCase()
  );

  return (
    <section id="projects">
      <div className="reveal section-label">Projects</div>
      <div className="reveal reveal-delay-1 section-title">Things I've Built</div>
      <p className="reveal reveal-delay-2 section-desc">
        A selection of projects spanning backend systems, machine learning, and computer vision.
      </p>

      {/* Filter buttons */}
      <div className="reveal reveal-delay-3 projects-controls">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`filter-btn ${activeFilter === c ? "active" : ""}`}
            onClick={() => setActiveFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Project cards grid */}
      <div className="projects-grid">
        {filteredProjects.map((p, i) => (
          <div
            key={p.id}
            className={`reveal reveal-delay-${i + 1} project-card`}
            onClick={() => setModal(p)}
          >
            <div className="project-thumb">
              <div className="project-thumb-bg" style={{ background: p.gradient }} />
              <span className="project-thumb-icon">{p.icon}</span>
            </div>
            <div className="project-body">
              <div className="project-tags">
                {p.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
              </div>
              <div className="project-name">{p.name}</div>
              <p className="project-desc">{p.desc}</p>
            </div>
            <div className="project-footer">
              <span className="project-link">View Details →</span>
              {p.featured && <span className="featured-badge">Featured</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Project detail modal */}
      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </section>
  );
}