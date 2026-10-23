"use client";

import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import styles from "./aurora.module.css";

interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  showRadialGradient?: boolean;
  light?: boolean;
  /** Animation duration in seconds. */
  animationSpeed?: number;
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  light = false,
  animationSpeed = 60,
  style,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(styles.background, light && styles.light, className)}
      style={{ "--animation-speed": `${Math.max(1, animationSpeed)}s`, ...style } as CSSProperties}
      {...props}
    >
      <div className={styles.clip} aria-hidden="true">
        <div className={cn(styles.aurora, showRadialGradient && styles.radial)} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
