import type { Metadata } from "next";
import { IntroSection } from "./components/ExperienceSection";
import { ProjectGrid } from "./components/ProjectGrid";
import { TravelSection } from "./components/TravelSection";

export const metadata: Metadata = {
  title: "Nick Sima",
  description:
    "Computer Science and Mathematics student building software, machine-learning systems, and games.",
};

export default function PortfolioPage() {
  return (
    <>
      <main>
        <IntroSection />
        <ProjectGrid />
        <TravelSection />
      </main>
      <footer className="site-footer">
        <p>last updated <time dateTime="2026-10-23">23/10/2026</time></p>
      </footer>
    </>
  );
}
