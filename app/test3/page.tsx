import Image from "next/image";
import type { Metadata } from "next";
import { AuroraBackground } from "@/components/ui/aurora";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "VertiGIS preview",
  description: "VertiGIS designer and web app on a white and light blue aurora background.",
  robots: { index: false, follow: false },
};

export default function Test3Page() {
  return (
    <main className={styles.preview} aria-label="VertiGIS preview">
      <AuroraBackground light showRadialGradient animationSpeed={15}>
        <div className={styles.stack}>
          <div className={`${styles.panel} ${styles.backPanel}`}>
            <Image
              src="/projects/vertigis-designer.png"
              alt="VertiGIS Studio Web Designer with the services panel open"
              width={1912}
              height={1044}
              sizes="100vw"
              className={styles.backImage}
              priority
            />
          </div>
          <div className={styles.panel}>
            <div className={`${styles.screenshot} ${styles.designer}`} role="img" aria-label="VertiGIS Studio Web Designer with the Capital City map" />
          </div>
          <div className={styles.panel}>
            <div className={`${styles.screenshot} ${styles.webApp}`} role="img" aria-label="Capital City web app running in a browser" />
          </div>
        </div>
      </AuroraBackground>
    </main>
  );
}
