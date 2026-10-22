"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, type CSSProperties } from "react";
import type { Project } from "../data/projects";
import { VideoBox } from "./video-box";

const hoverColors: Record<string, string> = {
  lavender: "#b494ed",
  blindsight: "#b5b5b5",
  "get-clone": "#b5b5b5",
  "study-buddies": "#91bd87",
};

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project, trigger: HTMLButtonElement) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      className="project-card"
      data-project={project.id}
      style={{ "--project-hover": hoverColors[project.id] ?? "#b5b5b5" } as CSSProperties}
      type="button"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onClick={(event) => onOpen(project, event.currentTarget)}
      aria-label={`Open details for ${project.title}`}
    >
      <VideoBox
        imageSrc={project.imageSrc}
        videoSrc={project.videoSrc}
        altText={project.imageAlt}
        active={isHovered}
        startTime={project.id === "get-clone" ? 0.2 : 0}
      />
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

