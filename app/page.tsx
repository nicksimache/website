import type { Metadata } from "next";
import { ExperienceSection } from "./components/ExperienceSection";
import { Header } from "./components/Header";
import { ProjectGrid } from "./components/ProjectGrid";
import { ScrollReveal } from "./components/scroll-reveal";

export const metadata: Metadata = {
  title: "Nick Sima — Software Engineer",
  description:
    "Computer Science and Mathematics student building software, machine-learning systems, and games.",
};

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main>
        <ExperienceSection />
        <ProjectGrid />
      </main>
      <ScrollReveal>
        <footer className="site-footer">
          <p>Nick Sima</p>
          <a href="#experience">Back to top</a>
        </footer>
      </ScrollReveal>
    </>
  );
}
