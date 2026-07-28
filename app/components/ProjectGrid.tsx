"use client";

import { useCallback, useRef, useState } from "react";
import { projects, type Project } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { ScrollReveal } from "./scroll-reveal";

export function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openProject = (project: Project, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelectedProject(project);
  };

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <section className="section projects-section" id="projects">
      <ScrollReveal className="section-heading">
        <div>
          <h2>Projects</h2>
          <p className="projects-intro">
            
          </p>
        </div>
        <p></p>
      </ScrollReveal>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ScrollReveal
            className="project-reveal"
            delay={(index % 3) * 70}
            key={project.id}
            threshold={0.08}
          >
            <ProjectCard project={project} onOpen={openProject} />
          </ScrollReveal>
        ))}
      </div>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeProject} />
      )}
    </section>
  );
}
