"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealProps {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

export function useScrollReveal({
  threshold = 0.1,
  rootMargin = "0px",
  delay = 0,
}: UseScrollRevealProps = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    let revealTimer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            revealTimer = setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (revealTimer) {
        clearTimeout(revealTimer);
      }
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin, delay]);

  return { ref, isVisible };
}
