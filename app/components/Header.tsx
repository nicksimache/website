"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const sections = ["experience", "projects"] as const;

export function Header() {
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]>(
    "experience"
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 8);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id as typeof activeSection);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", updateScrolled);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`site-header page-load-fade${scrolled ? " scrolled" : ""}`}>
      <div className="header-inner">
        <a className="brand" href="#experience" aria-label="Nick Sima, home">
          Nick Sima<span className="brand-mark">.</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
        <nav
          id="primary-navigation"
          className={`desktop-nav${menuOpen ? " open" : ""}`}
          aria-label="Primary navigation"
        >
          {sections.map((section) => (
            <a
              key={section}
              className={`nav-link${activeSection === section ? " active" : ""}`}
              href={`#${section}`}
              aria-current={activeSection === section ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {section[0].toUpperCase() + section.slice(1)}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
