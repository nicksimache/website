import type { ReactNode } from "react";
import styles from "./living-origami-bg.module.css";

export const Component = ({ children }: { children?: ReactNode }) => (
  <main className={styles.scene} aria-label="Dark purple background">
    {children}
  </main>
);
