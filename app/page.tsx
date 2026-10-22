import type { Metadata } from "next";
import { ExperienceSection, IntroSection } from "./components/ExperienceSection";
import { ProjectGrid } from "./components/ProjectGrid";
import { TravelSection } from "./components/TravelSection";

export const metadata: Metadata = {
  title: "Nick Sima — Software Engineer",
  description:
    "Computer Science and Mathematics student building software, machine-learning systems, and games.",
};

export default function PortfolioPage() {
  return (
    <>
      <main>
        <IntroSection />
        <ProjectGrid />
        <ExperienceSection />
        <TravelSection />
      </main>
      <footer className="site-footer">
        <p>last updated <time dateTime="2026-10-22">22/10/2026</time></p>
      </footer>
    </>
  );
}
