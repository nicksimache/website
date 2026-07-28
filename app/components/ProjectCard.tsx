"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Project } from "../data/projects";
import { TechnologyTags } from "./TechnologyTags";
import { VideoBox } from "./video-box";

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
      />
      <div className="project-card-content">
        <div className="project-title-row">
          <h3>{project.title}</h3>
          <ArrowUpRight className="open-icon" size={18} aria-hidden="true" />
        </div>
        <p className="project-summary">{project.summary}</p>
        <TechnologyTags technologies={project.technologies} />
      </div>
    </button>
  );
}
