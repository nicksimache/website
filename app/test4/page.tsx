import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Get Clone demo",
  description: "Get Clone on a metallic screen angled upward and left against a liquid-metal background.",
  robots: { index: false, follow: false },
};

export default function Test4Page() {
  return (
    <main className={styles.scene} aria-label="Get Clone demo">
      <div className={styles.stage}>
        <div className={styles.screen}>
          <video
            className={styles.video}
            src="/projects/getclone_video_cropped.mp4"
            aria-label="Get Clone demo video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            Your browser does not support embedded video. <a href="/projects/getclone_video_cropped.mp4">Download the Get Clone demo</a>.
          </video>
        </div>
      </div>
    </main>
  );
}
