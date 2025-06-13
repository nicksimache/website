"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface VideoBoxProps {
  imageSrc: string;
  videoSrc: string;
  altText: string;
  className?: string;
}

export function VideoBox({
  imageSrc,
  videoSrc,
  altText,
  className = "",
}: VideoBoxProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoLoaded && !videoError) {
      if (isHovering) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((err) => {
          console.error("Video play failed:", err);
          setVideoError(true);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovering, videoLoaded, videoError]);

  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    console.error("Video loading error:", e);
    setVideoError(true);
    setVideoLoaded(false);
  };

  const handleVideoCanPlay = () => {
    console.log("Video can play");
    setVideoLoaded(true);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={`transition-opacity duration-500 ${
          isHovering && videoLoaded && !videoError ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={altText}
          width={600}
          height={400}
          className="w-full h-64 object-cover"
        />
      </div>

      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={handleVideoLoad}
        onCanPlay={handleVideoCanPlay}
        onError={handleVideoError}
        className={`absolute inset-0 w-full h-64 object-cover transition-opacity duration-500 ${
          isHovering && videoLoaded && !videoError ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading/Error States */}
      {isHovering && !videoLoaded && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white text-sm">Loading video...</div>
        </div>
      )}

      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-red-400 text-sm text-center">
            <p>Video failed to load</p>
            <p className="text-xs mt-1">Check console for details</p>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-gray-300 text-xs">
          {videoError ? "Video unavailable" : isHovering ? "" : "Hover to play"}
        </p>
      </div>
    </div>
  );
}
