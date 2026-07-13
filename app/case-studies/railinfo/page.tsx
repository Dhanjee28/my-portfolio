import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { projects, railInfoCaseStudy } from "@/data/portfolio";

const railInfo = projects[0];

export const metadata = {
  title: "RailInfo Case Study | Dhanjee Tiwari",
  description:
    "RailInfo backend case study covering authentication, token rotation, Redis rate limiting, database design, testing, and future improvements.",
};

export default function RailInfoCaseStudyPage() {
  return (
    <>
      <Navbar />
      <main className="case-page">
        <header className="case-header">
          <div>
            <a className="btn-text" href="/">
              Back to portfolio
            </a>
            <p className="case-kicker">Case Study | Backend System</p>
            <h1 className="case-title">RailInfo</h1>
            <p className="case-lede">{railInfo.longDescription}</p>
          </div>

          <aside className="spec-plate" aria-label="RailInfo project specification">
            <div className="spec-head">
              Project Spec <span>Ref. 001</span>
            </div>
            <dl className="spec-rows">
              <div className="spec-row">
                <dt>Stack</dt>
                <dd>{railInfo.stack.join(" | ")}</dd>
              </div>
              <div className="spec-row">
                <dt>Focus</dt>
                <dd>Auth, rate limits, booking flow, API testing</dd>
              </div>
              <div className="spec-row">
                <dt>Code</dt>
                <dd>
                  <a href={railInfo.github} target="_blank" rel="noreferrer">
                    GitHub repository
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </header>

        <section className="case-section" aria-labelledby="problem-title">
          <h2 id="problem-title">Problem</h2>
          <div className="case-grid">
            <article className="case-card">
              <h3>Goal</h3>
              <p>{railInfoCaseStudy.problem}</p>
            </article>
            <article className="case-card">
              <h3>Proof Points</h3>
              <ul>
                {railInfo.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="case-section" aria-labelledby="architecture-title">
          <h2 id="architecture-title">Architecture</h2>
          <div className="case-grid">
            {railInfoCaseStudy.architecture.map((item) => (
              <article className="case-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-section" aria-labelledby="decisions-title">
          <h2 id="decisions-title">Engineering Decisions</h2>
          <div className="case-grid">
            {railInfoCaseStudy.decisions.map((decision) => (
              <article className="case-card" key={decision.title}>
                <h3>{decision.title}</h3>
                <p>{decision.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-section" aria-labelledby="visuals-title">
          <h2 id="visuals-title">What To Show</h2>
          <div className="case-grid">
            {railInfoCaseStudy.visuals.map((visual) => (
              <article className="case-card" key={visual}>
                <h3>Visual</h3>
                <p>{visual}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-section" aria-labelledby="future-title">
          <h2 id="future-title">Future Improvements</h2>
          <div className="case-grid">
            {railInfoCaseStudy.improvements.map((improvement) => (
              <article className="case-card" key={improvement}>
                <h3>Next</h3>
                <p>{improvement}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
