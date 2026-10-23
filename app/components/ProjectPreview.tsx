"use client";

import { useEffect, useRef, useState } from "react";
import { DarkGradientBg } from "@/components/ui/elegant-dark-pattern";
import { AuroraBackground } from "@/components/ui/aurora";
import { TextHoverEffect } from "./ui/text-hover-effect";
import styles from "./ProjectPreview.module.css";

function PreviewVideo({ src, poster, active }: { src: string; poster: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      if (active && visible && !preference.matches) void video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(video);
    preference.addEventListener("change", update);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      video.pause();
    };
  }, [active]);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" />;
}

export function ProjectPreview({ id }: { id: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className={`media-preview ${styles.preview} ${styles[id] ?? ""}`} aria-hidden="true" onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)}>
      {id === "blindsight" && <>
        <DarkGradientBg className={styles.background} />
        <div className={styles.wordmark}>
          <TextHoverEffect text="BLINDSIGHT" hoverColor="#00cfff" strokeWidth={0.45} duration={0} viewBox="0 0 440 80" />
        </div>
      </>}
      {(id === "lavender" || id === "get-clone") && <>
        <div className={styles.stage}>
          <div className={styles.screen}>
            <PreviewVideo
              active={hovered}
              src={id === "lavender" ? "/projects/lavender_demo.mp4" : "/projects/getclone_video_cropped.mp4"}
              poster={id === "lavender" ? "/projects/lavender_thumbnail.png" : "/projects/getclone_thumbnail.png"}
            />
          </div>
        </div>
        <div className={styles.fade} />
      </>}
      {id === "vertigis" && <>
        <AuroraBackground light animationSpeed={15} className={styles.background} />
        <div className={`${styles.lightPanel} ${styles.backPanel}`}><div className={styles.backImage} /></div>
        <div className={`${styles.lightPanel} ${styles.designerPanel}`}><div className={styles.designer} /></div>
        <div className={`${styles.lightPanel} ${styles.appPanel}`}><div className={styles.webApp} /></div>
      </>}
    </div>
  );
}
