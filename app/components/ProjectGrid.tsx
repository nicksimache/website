"use client";

import { useCallback, useRef, useState } from "react";
import { projects, type Project } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

const featuredProjects = ["lavender", "vertigis", "blindsight", "get-clone"].flatMap((id) => projects.filter((project) => project.id === id));

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
        {featuredProjects.map((project) => (
          <div className="project-reveal" key={project.id}>
            <ProjectCard project={project} onOpen={openProject} />
          </div>
        ))}
      </div>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeProject} origin={origin} />
      )}
    </section>
  );
}
