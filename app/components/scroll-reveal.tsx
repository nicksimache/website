"use client";

import type { ReactNode } from "react";
import { useScrollReveal } from "./use-scroll-reveal";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px",
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({
    threshold,
    rootMargin,
    delay,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
    >
      {children}
    </div>
  );
}
