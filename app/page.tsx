import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import { Github, Linkedin, Mail } from "lucide-react";
import { Technologies } from "./components/Technologies";
import { TextHoverEffect } from "./components/ui/text-hover-effect";

const firaCode = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nick Sima",
  description: "A showcase of my work and skills",
};

export default function PortfolioPage() {
  return (
    <main className={`min-h-screen bg-black text-white ${firaCode.className}`}>
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-24">
        <Header />
        <Experience />
        <Technologies />
        <Projects />
      </div>
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
        <a
          href="mailto:nicksimache@gmail.com"
          className="hover:text-blue-400 transition-colors"
        >
          <Mail className="w-6 h-6" />
        </a>
      </div>
    </header>
  );
}

function Experience() {
  const experiences = [
    {
      title: "Senior Developer",
      company: "Tech Corp",
      period: "2020 - Present",
      description: "Led development of multiple high-impact projects.",
    },
    {
      title: "Full Stack Developer",
      company: "StartUp Inc",
      period: "2018 - 2020",
      description: "Developed and maintained various web applications.",
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

function Projects() {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with React and Node.js.",
      link: "https://github.com/yourusername/ecommerce-platform",
    },
    {
      title: "Task Management App",
      description: "A React Native mobile app for managing daily tasks.",
      link: "https://github.com/yourusername/task-management-app",
    },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h3 className="text-xl font-medium mb-2">{project.title}</h3>
            <p className="text-gray-400">{project.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
