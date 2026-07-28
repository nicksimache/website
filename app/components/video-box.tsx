"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface VideoBoxProps {
  imageSrc: string;
  videoSrc?: string;
  altText: string;
  className?: string;
  eager?: boolean;
  active?: boolean;
}

export function VideoBox({
  imageSrc,
  videoSrc,
  altText,
  className = "",
  eager = false,
  active,
}: VideoBoxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const resolvedImageSrc = imageSrc.trim() || "/icons/temp.png";
  const resolvedVideoSrc = videoSrc?.trim() || undefined;

  const playVideo = useCallback(async () => {
    if (
      !resolvedVideoSrc ||
      videoFailed ||
      !window.matchMedia("(hover: hover)").matches
    ) {
      return;
    }
    try {
      await videoRef.current?.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, [resolvedVideoSrc, videoFailed]);

  const resetVideo = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (active === undefined) return;

    if (active) {
      void playVideo();
    } else {
      resetVideo();
    }
  }, [active, playVideo, resetVideo]);

  return (
    <div
      className={`media-preview ${className}`}
      onPointerEnter={active === undefined ? playVideo : undefined}
      onPointerLeave={active === undefined ? resetVideo : undefined}
    >
      <Image
        src={resolvedImageSrc}
        alt={altText}
        fill
        priority={eager}
        sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
        className={playing && videoReady ? "hidden-media" : "visible-media"}
      />
      {resolvedVideoSrc && !videoFailed && (
        <video
          ref={videoRef}
          className={playing && videoReady ? "visible-media" : "hidden-media"}
          muted
          loop
          playsInline
          preload="metadata"
          poster={resolvedImageSrc}
          aria-label={`${altText} video preview`}
          onCanPlay={() => setVideoReady(true)}
          onError={() => {
            setVideoFailed(true);
            setPlaying(false);
          }}
        >
          <source src={resolvedVideoSrc} type="video/mp4" />
        </video>
      )}
      {resolvedVideoSrc && !videoFailed && (
        <span className="video-label">{playing ? "Playing preview" : "Hover to play"}</span>
      )}
    </div>
  );
}
