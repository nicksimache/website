"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const sections = ["projects", "experience", "travel"] as const;

export function Header() {
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]>(
    "projects"
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateNavigation = () => {
      setScrolled(window.scrollY > 8);
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 64;
      let current: (typeof sections)[number] = "projects";
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= headerHeight + 48) {
          current = id;
        }
      }
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = "travel";
      }
      setActiveSection(current);
    };
    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });
    window.addEventListener("resize", updateNavigation);
    const resizeObserver = new ResizeObserver(updateNavigation);
    resizeObserver.observe(document.body);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("scroll", updateNavigation);
      window.removeEventListener("resize", updateNavigation);
      window.removeEventListener("keydown", closeOnEscape);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <header className={`site-header page-load-fade${scrolled ? " scrolled" : ""}`}>
      <div className="header-inner">
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
              onClick={(event) => {
                const target = document.getElementById(section);
                if (!target) return;
                event.preventDefault();
                setMenuOpen(false);
                setActiveSection(section);
                window.history.pushState(null, "", `#${section}`);
                target.scrollIntoView({
                  behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
                  block: "start",
                });
              }}
            >
              {section[0].toUpperCase() + section.slice(1)}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
