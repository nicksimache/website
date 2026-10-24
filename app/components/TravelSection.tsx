import { readdir } from "node:fs/promises";
import path from "node:path";
import { TravelCarousel } from "./TravelCarousel";

const photoOrder = ["concert.png", "shanghai.jpeg", "5040-peak.jpg", "vincom-mega-mall.jpg", "zhujiajiao-ancient-town.jpg"];

const photoDetails: Record<string, { caption: string; place: string }> = {
  "5040-peak.jpg": { caption: "5040 Peak", place: "Vancouver Island - Canada" },
  "zhujiajiao-ancient-town.jpg": { caption: "Zhujiajiao Ancient Town", place: "Shanghai - China" },
  "vincom-mega-mall.jpg": { caption: "Vincom mega mall", place: "Hanoi - Vietnam" },
  "concert.png": { caption: "Bring me the horizon", place: "Toronto - Canada" },
  "shanghai.jpeg": { caption: "The bund", place: "Shanghai - China" },
};

export async function TravelSection() {
  const files = await readdir(path.join(process.cwd(), "public", "travel"));
  const photos = files
    .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
    .sort((a, b) => {
      const orderA = photoOrder.indexOf(a);
      const orderB = photoOrder.indexOf(b);
      return (orderA === -1 ? photoOrder.length : orderA) - (orderB === -1 ? photoOrder.length : orderB) || a.localeCompare(b);
    })
    .map((file) => ({
      src: `/travel/${encodeURIComponent(file)}`,
      caption: photoDetails[file]?.caption ?? file.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
      place: photoDetails[file]?.place ?? "",
    }));

  return (
    <section className="section travel-section" id="travel" aria-label="Travel">
      <TravelCarousel photos={photos} />
    </section>
  );
}
