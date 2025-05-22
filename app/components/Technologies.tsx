"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";

const technologies = [
  { name: "Python", icon: "/icons/python.svg" },
  { name: "C#", icon: "/icons/csharp.svg" },
  { name: "Java", icon: "/icons/java.svg" },
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "Unity", icon: "/icons/unity.svg" },
  { name: "React", icon: "/icons/react.svg" },
  { name: "Node.js", icon: "/icons/nodejs.svg" },
];

export function Technologies() {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold">Technologies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {technologies.map((tech) => (
          <TechCard key={tech.name} tech={tech} />
        ))}
      </div>
    </section>
  );
}

function TechCard({ tech }: { tech: { name: string; icon: string } }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center justify-center p-4 bg-techcard rounded-lg transition-colors relative overflow-hidden"
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
      <div className="w-16 h-16 relative mb-2 z-10">
        <Image
          src={tech.icon || "/placeholder.svg"}
          alt={`${tech.name} icon`}
          fill
          sizes="64px"
          style={{ objectFit: "contain" }}
        />
      </div>
      <span className="text-sm text-center z-10">{tech.name}</span>
    </div>
  );
}
