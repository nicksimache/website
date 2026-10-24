"use client";
import { Carousel, Card } from "@/components/ui/specials-linear-carousel";

export function TravelCarousel({ photos }: { photos: { src: string; caption: string; place: string }[] }) {
  if (!photos.length) return <div className="travel-empty" aria-hidden="true" />;
  const cards = photos.map((photo) => <Card key={photo.src} card={{ src: photo.src, title: photo.caption, place: photo.place }} />);
  return <Carousel items={cards} />;
}
