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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a small delay if specified
          if (delay) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          // Once the element is visible, we can stop observing it
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
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, delay]);

  return { ref, isVisible };
}
