"use client";

import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "../data/projects";
import { TechnologyTags } from "./TechnologyTags";
import { VideoBox } from "./video-box";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.classList.add("modal-open");
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        )
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <button
          ref={closeRef}
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X size={20} />
        </button>
        <VideoBox
          className="modal-media"
          imageSrc={project.imageSrc}
          videoSrc={project.videoSrc}
          altText={project.imageAlt}
          eager
        />
        <div className="modal-content">
          <h2 id="project-modal-title">{project.title}</h2>
          <TechnologyTags technologies={project.technologies} />
          <p className="modal-description">{project.description}</p>
          {(project.githubUrl || project.liveUrl) && (
            <div className="modal-links">
              {project.githubUrl && (
                <a className="text-link" href={project.githubUrl} target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight size={14} />
                </a>
              )}
              {project.liveUrl && (
                <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">
                  Live demo <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          )}
          <div className="project-article">
            {project.details.map((detail) => (
              <section className="article-section" key={detail.title}>
                <h3>{detail.title}</h3>
                {detail.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
