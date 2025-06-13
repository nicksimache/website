import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import { Github, Linkedin } from "lucide-react";
import { Technologies } from "./components/Technologies";
import { TextHoverEffect } from "./components/ui/text-hover-effect";
import { ProjectCard } from "./components/ProjectCard";
import { ScrollReveal } from "./components/scroll-reveal";
import { VideoBox } from "./components/video-box";
import Footer from "./components/Footer";

const firaCode = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nick Sima",
  description: "A showcase of my work and skills",
};

export default function PortfolioPage() {
  return (
    <main
      className={`min-h-screen bg-background text-white ${firaCode.className}`}
    >
      <div className="max-w-xl mx-auto px-4 py-16 space-y-24">
        <ScrollReveal>
          <Header />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Experience />
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <FeaturedWork />
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <Projects />
        </ScrollReveal>
      </div>

      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="space-y-4">
      <TextHoverEffect text="Nick Sima" duration={0} />
      <p className="text-xl text-gray-400">
        Computer Science and Mathematics at UVic
      </p>
      <div className="flex space-x-4">
        <a
          href="https://github.com/nicksimache"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/nick-sima-a64613235/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors"
        >
          <Linkedin className="w-6 h-6" />
        </a>
      </div>
    </header>
  );
}

function Experience() {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Freelance",
      period: "May 2025 - Present",
      description:
        "Building a Web3 iOS application using React Native and Solidity, integrating smart contracts and wallet interactions.",
    },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-xl font-medium">{exp.title}</h3>
            <p className="text-gray-400">
              {exp.company} | {exp.period}
            </p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedWork() {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold">Currently Working On</h2>
      <p className="text-gray-400 mb-4">Multiplayer Dungeon Crawler in Unity</p>

      <div className="grid gap-6 md:grid-cols-2">
        <VideoBox
          imageSrc="/icons/temp.png"
          videoSrc="/icons/vid.mp4"
          altText="Multiplayer Dungeon Crawler Demo"
          className="md:col-span-2"
        />
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      title: "Blindsight",
      description:
        "Smart glasses leveraging on-devie AI to allow the visually impaired to interact with the environment",
      link: "https://github.com/PABLO-HACKERS/blindsight",
    },
    {
      title: "Get Clone",
      description:
        "Create a clone that looks, speaks, and acts like you, leveraging various Generative AI models",
      link: "https://github.com/pahu2353/get-clone",
    },
    {
      title: "Neural Network",
      description:
        "Simple linear regression model trained on handwritten digits built from scratch in python",
      link: "https://github.com/nicksimache/neural-network",
    },
    {
      title: "Study Buddies",
      description:
        "Mobile app that generates personalized quizzes based off of course content",
      link: "https://github.com/PABLO-HACKERS/studybuddies",
    },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ScrollReveal key={index} delay={index * 100}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
