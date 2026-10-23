import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

export function ScrollReveal({ children, className }: ScrollRevealProps) {
  return <div className={className}>{children}</div>;
}
