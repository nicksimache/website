"use client";

import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Project } from "../data/projects";
import { HighlightedText } from "./HighlightedText";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
  origin?: DOMRect;
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

  return createPortal(
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
        aria-label={`${project.title} details`}
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
        <div className={`modal-media${project.id === "lavender" ? " lavender-cropped" : ""}`}>
          {project.id === "lavender" ? (
            <video
              className="modal-still-video"
              src="/projects/lavender_demo.mp4"
              poster="/projects/lavender-demo-still.jpg"
              aria-label="Paused frame of the Lavender demo"
              preload="none"
              muted
              playsInline
              onPlay={(event) => event.currentTarget.pause()}
            />
          ) : (
            <Image src={project.imageSrc} alt={project.imageAlt}
              width={1600} height={900} sizes="(max-width: 640px) 100vw, 48vw" priority />
          )}
        </div>
        <div className="modal-content">
          <h3 className="info-heading">Overview</h3>
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
          {project.article ? (
            <article className="project-article project-writeup" aria-label={`${project.title} write-up`}>
              {project.article.map((block, index) => {
                if (block.type === "heading") return <h3 className="writeup-heading" key={index}>{block.text}</h3>;
                if (block.type === "paragraph") return <p key={index}><HighlightedText text={block.text} /></p>;
                if (block.type === "list") return <ul key={index}>{block.items.map((item) => <li key={item}><HighlightedText text={item} /></li>)}</ul>;
                return (
                  <div className="article-images" key={index}>
                    {block.images.map((image) => (
                      <figure key={image.src}>
                        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 640px) 90vw, 780px" />
                      </figure>
                    ))}
                  </div>
                );
              })}
            </article>
          ) : (
          <div className="project-article">
            {project.details.map((detail) => (
              <section className="article-section" key={detail.title}>
                <h3>{detail.title}</h3>
                {detail.paragraphs.map((paragraph) => (
                  <p key={paragraph}><HighlightedText text={paragraph} /></p>
                ))}
              </section>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
    , document.body
  );
}
