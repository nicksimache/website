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
  startTime?: number;
}

export function VideoBox({
  imageSrc,
  videoSrc,
  altText,
  className = "",
  eager = false,
  active,
  startTime = 0,
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
      const video = videoRef.current;
      if (!video) return;
      if (video.currentTime < startTime) video.currentTime = startTime;
      await video.play();
    } catch {
      // Keep the poster visible when playback is unavailable.
    }
  }, [resolvedVideoSrc, videoFailed, startTime]);

  const resetVideo = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = startTime;
    }
  }, [startTime]);

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
        sizes="(max-width: 640px) 100vw, 50vw"
        className={playing && videoReady ? "hidden-media" : "visible-media"}
      />
      {resolvedVideoSrc && !videoFailed && (
        <video
          ref={videoRef}
          className={playing && videoReady ? "visible-media" : "hidden-media"}
          muted
          loop={startTime === 0}
          playsInline
          preload="metadata"
          poster={resolvedImageSrc}
          aria-label={`${altText} video preview`}
          onCanPlay={() => setVideoReady(true)}
          onLoadedMetadata={(event) => { event.currentTarget.currentTime = startTime; }}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={(event) => {
            if (startTime > 0) {
              event.currentTarget.currentTime = startTime;
              void event.currentTarget.play().catch(() => setPlaying(false));
            } else {
              setPlaying(false);
            }
          }}
          onError={() => {
            setVideoFailed(true);
            setPlaying(false);
          }}
        >
          <source src={resolvedVideoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
