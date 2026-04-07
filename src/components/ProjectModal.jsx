import "../styles/Projects.css";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Gradient header with icon */}
        <div className="modal-header" style={{ background: project.gradient }}>
          <span>{project.icon}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="project-tags" style={{ marginBottom: "0.5rem" }}>
            {project.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
          </div>

          <h2 className="modal-title">{project.name}</h2>
          <p className="modal-desc">{project.longDesc}</p>

          <p className="modal-section-title">Key Highlights</p>
          <ul className="modal-highlights">
            {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>

          <p className="modal-section-title">Tech Stack</p>
          <div className="modal-stack">
            {project.stack.map((s) => (
              <span key={s} className="modal-stack-item">{s}</span>
            ))}
          </div>

          <div className="modal-actions">
            <button className="btn-secondary" style={{ fontSize: "0.85rem" }} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}