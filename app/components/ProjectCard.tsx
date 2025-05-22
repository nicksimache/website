"use client";

import { useState, useRef } from "react";
import type React from "react";

interface ProjectProps {
  title: string;
  description: string;
  link: string;
}

export function ProjectCard({ project }: { project: ProjectProps }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 bg-techcard rounded-lg transition-colors relative overflow-hidden h-48 md:h-52 flex flex-col justify-between"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.15), transparent 80px)`,
          }}
        />
      )}
      <h3 className="text-xl font-medium mb-2 z-10 relative">
        {project.title}
      </h3>
      <p className="text-gray-400 z-10 relative">{project.description}</p>
    </a>
  );
}
