import type { Metadata } from "next";
import { Component } from "@/components/ui/living-origami-bg";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Lavender demo",
  description: "Lavender demo video on an upward-facing perspective screen.",
  robots: { index: false, follow: false },
};

export default function Test2Page() {
  return (
    <Component>
      <div className={styles.stage}>
        <div className={styles.screen}>
          <video
            className={styles.video}
            src="/projects/lavender_demo.mp4"
            aria-label="Lavender demo"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            Your browser does not support embedded video. <a href="/projects/lavender_demo.mp4">Download the Lavender demo</a>.
          </video>
        </div>
      </div>
    </Component>
  );
}
