"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const technologies = [
  {
    name: "Python",
    icon: "/icons/python1.svg",
    altIcon: "/icons/python2.svg",
  },
  { name: "C#", icon: "/icons/csharp1.svg", altIcon: "/icons/csharp2.svg" },
  { name: "Java", icon: "/icons/java1.svg", altIcon: "/icons/java2.svg" },
  {
    name: "JavaScript",
    icon: "/icons/javascript1.svg",
    altIcon: "/icons/javascript2.svg",
  },
  {
    name: "TypeScript",
    icon: "/icons/typescript1.svg",
    altIcon: "/icons/typescript2.svg",
  },
  { name: "Unity", icon: "/icons/unity1.svg", altIcon: "/icons/unity2.svg" },
  { name: "React", icon: "/icons/react1.svg", altIcon: "/icons/react2.svg" },
  {
    name: "Git",
    icon: "/icons/git1.svg",
    altIcon: "/icons/git2.svg",
  },
  {
    name: "C",
    icon: "/icons/c2.png",
    altIcon: "/icons/c1.png",
  },
  {
    name: "PyTorch",
    icon: "/icons/pytorch1.png",
    altIcon: "/icons/pytorch2.png",
  },
  {
    name: "SQL",
    icon: "/icons/sql1.png",
    altIcon: "/icons/sql2.png",
  },
  {
    name: "HTML/CSS",
    icon: "/icons/html.png",
    altIcon: "/icons/css.png",
  },
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

function TechCard({
  tech,
}: {
  tech: { name: string; icon: string; altIcon: string };
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showAltIcon, setShowAltIcon] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (isHovering) {
      intervalRef.current = setInterval(() => {
        setShowAltIcon((prev) => !prev);
      }, 500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setShowAltIcon(false);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering]);

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
          src={showAltIcon ? tech.altIcon || tech.icon : tech.icon}
          alt={`${tech.name} icon`}
          fill
          sizes="64px"
          style={{
            objectFit: "contain",
            transition: "opacity 0.2s ease-in-out",
          }}
        />
      </div>
      <span className="text-sm text-center z-10">{tech.name}</span>
    </div>
  );
}
