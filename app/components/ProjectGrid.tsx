"use client";

import { useCallback, useRef, useState } from "react";
import { projects, type Project } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { ScrollReveal } from "./scroll-reveal";

const featuredProjects = projects.filter((project) =>
  ["lavender", "blindsight", "get-clone", "study-buddies"].includes(project.id)
);

export function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [origin, setOrigin] = useState<DOMRect>();
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openProject = (project: Project, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setOrigin(trigger.getBoundingClientRect());
    setSelectedProject(project);
  };

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <section className="section projects-section" id="projects" aria-label="Projects">
      <div className="project-grid">
        {featuredProjects.map((project, index) => (
          <ScrollReveal
            className="project-reveal"
            delay={(index % 2) * 70}
            key={project.id}
            threshold={0.08}
          >
            <ProjectCard project={project} onOpen={openProject} />
          </ScrollReveal>
        ))}
      </div>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeProject} origin={origin} />
      )}
    </section>
  );
}
