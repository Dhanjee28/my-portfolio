import { notes } from "@/data/portfolio";

export function ProductionNotes() {
  return (
    <section id="notes" aria-labelledby="notes-title">
      <div className="section-label">Production Notes</div>
      <h2 className="section-title" id="notes-title">
        Things I learned the hard way
      </h2>
      <p className="section-desc">
        Short engineering notes from projects and production-style work: the reasoning
        behind decisions, not just a feature list.
      </p>

      <div className="notes-grid">
        {notes.map((note) => (
          <article className="note-card" key={note.id}>
            <div className="note-context">{note.context}</div>
            <h3 className="note-title">{note.title}</h3>
            <p className="note-body">{note.body}</p>
            <div className="note-tags">
              {note.tags.map((tag) => (
                <span className="note-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
