"use client";

import { ArrowUpRight } from "lucide-react";
import { type CSSProperties } from "react";
import type { Project } from "../data/projects";
import { ProjectPreview } from "./ProjectPreview";

const hoverColors: Record<string, string> = {
  lavender: "#b494ed",
  blindsight: "#00cfff",
  "get-clone": "#b5b5b5",
  vertigis: "#9ccff3",
};

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project, trigger: HTMLButtonElement) => void;
}) {
  return (
    <button
      className="project-card"
      data-project={project.id}
      style={{ "--project-hover": hoverColors[project.id] ?? "#b5b5b5" } as CSSProperties}
      type="button"
      onClick={(event) => onOpen(project, event.currentTarget)}
      aria-label={`Open details for ${project.title}`}
    >
      <ProjectPreview id={project.id} />
      <div className="project-card-content">
        <div className="project-title-row">
          <div className="project-title-with-year">
            <h3>{project.title}</h3>
            {project.year && <span className="project-year">{project.year}</span>}
          </div>
          <ArrowUpRight className="open-icon" size={18} aria-hidden="true" />
        </div>
        <p className="project-summary">{project.summary}</p>
      </div>
    </button>
  );
}

