"use client";

import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "../data/projects";

export function ProjectModal({
  project,
  onClose,
  origin,
}: {
  project: Project;
  onClose: () => void;
  origin?: DOMRect;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

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

  return createPortal(
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={modalRef}
        className="project-modal"
        initial={reducedMotion || !origin ? false : {
          clipPath: `inset(${Math.max(0, origin.top)}px ${Math.max(0, window.innerWidth - origin.right)}px ${Math.max(0, window.innerHeight - origin.bottom)}px ${Math.max(0, origin.left)}px)`,
        }}
        animate={{ clipPath: "inset(0px 0px 0px 0px)" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
        <div className="modal-media">
          <Image src={project.imageSrc} alt={project.imageAlt}
            width={1600} height={900} sizes="(max-width: 640px) 100vw, 48vw" priority />
        </div>
        <div className="modal-content">
          <h2 id="project-modal-title">{project.title}</h2>
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
      </motion.div>
    </div>
    , document.body
  );
}
