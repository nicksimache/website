import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

export function IntroSection() {
  return (
    <section className="section intro-section" aria-label="About Nick">
      <div className="profile-flow">
        <ScrollReveal className="intro-copy" threshold={0.05}>
          <h1>Nick Sima</h1>
          <p>
            I&apos;m a Mathematics and Computer Science student at the University of Victoria
            interested in agentic AI and quantum computing.
          </p>
          <div className="intro-links" aria-label="Social links">
            <a
              className="text-link"
              href="https://github.com/nicksimache"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={16} /> GitHub <ArrowUpRight size={14} />
            </a>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/nick-sima-a64613235/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section className="section experience-section" id="experience" aria-label="Experience">
        <ScrollReveal className="experience-column" threshold={0.05}>
          <article className="experience-card">
            <div className="experience-meta">
              <div>
                <h3>VertiGIS</h3>
                <p>QA Engineer Co-op</p>
              </div>
              <p className="experience-role">Jan. 2026 - Aug. 2026</p>
            </div>
            <p className="experience-summary">
              Worked on QA for VertiGIS Studio Web, testing product changes and
              collaborating with developers and other QA team members. Focused
              on Playwright automation by maintaining tests, migrating more than
              100 test suites, and improving their reliability and runtime.
            </p>
          </article>
        </ScrollReveal>
    </section>
  );
}
