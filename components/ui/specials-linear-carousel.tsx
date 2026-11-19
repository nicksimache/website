"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Carousel({ items }: { items: ReactNode[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  useEffect(() => {
    const element = viewport.current;
    const group = track.current;
    if (!element || !group) return;
    let frame = 0;
    let target = 0;
    const resetPosition = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      element.scrollLeft = group.offsetWidth;
      target = element.scrollLeft;
    };
    resetPosition();
    const resizeObserver = new ResizeObserver(resetPosition);
    resizeObserver.observe(element);
    const wrap = () => {
      const width = group.offsetWidth;
      if (!width) return;
      if (element.scrollLeft < width * 0.5 || element.scrollLeft >= width * 2) {
        const previous = element.scrollLeft;
        element.scrollLeft = width + ((previous % width) + width) % width;
        target += element.scrollLeft - previous;
      }
    };
    let previousTime = 0;
    const animate = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 50) : 16;
      previousTime = time;
      const remaining = target - element.scrollLeft;
      element.scrollLeft += remaining * (1 - Math.exp(-elapsed / 85));
      wrap();
      if (Math.abs(target - element.scrollLeft) > 1) {
        frame = requestAnimationFrame(animate);
      } else {
        element.scrollLeft = target;
        frame = 0;
        previousTime = 0;
      }
    };
    const scrollHorizontally = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const distance = delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientWidth : 1);
      if (distance) {
        event.preventDefault();
        if (!frame) target = element.scrollLeft;
        target += distance;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          element.scrollLeft = target;
          wrap();
        } else if (!frame) {
          frame = requestAnimationFrame(animate);
        }
      }
    };
    element.addEventListener("wheel", scrollHorizontally, { passive: false });
    element.addEventListener("scroll", wrap, { passive: true });
    return () => {
      element.removeEventListener("wheel", scrollHorizontally);
      element.removeEventListener("scroll", wrap);
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [items.length]);
  return (
    <div className={`linear-carousel${expanded !== null ? " has-expanded-photo" : ""}`} role="region" aria-label="Travel photos" aria-roledescription="carousel"
      onPointerLeave={() => setExpanded(null)}>
      <div ref={viewport} className="linear-carousel-viewport" tabIndex={0} aria-label="Photo strip. Scroll, swipe, or use arrow keys to browse."
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            event.currentTarget.scrollBy({ left: (event.key === "ArrowLeft" ? -1 : 1) * 336,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
          }
        }}>
        {[0, 1, 2].map((copy) => (
          <div key={copy} ref={copy === 1 ? track : undefined} className="linear-carousel-track">
            {items.map((item, index) => <div key={index}
              className={`linear-carousel-item${expanded === index ? " is-expanded" : ""}`}
              onPointerEnter={() => setExpanded(index)}
              onFocus={() => setExpanded(index)}
              onBlur={() => setExpanded(null)}>{item}</div>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Card({ card }: { card: { src: string; title: string; place: string } }) {
  return (
    <figure className="linear-photo-card" tabIndex={0}>
      <Image src={card.src} alt={`${card.title}${card.place ? `, ${card.place}` : ""}`} fill sizes="(max-width: 640px) 98vw, 416px" draggable={false} />
      <figcaption className="linear-photo-caption">
        <em>{card.title}</em>
        {card.place && <span>{card.place}</span>}
      </figcaption>
    </figure>
  );
}
