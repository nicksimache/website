import { readdir } from "node:fs/promises";
import path from "node:path";
import { TravelCarousel } from "./TravelCarousel";

export async function TravelSection() {
  const files = await readdir(path.join(process.cwd(), "public", "travel"));
  const photos = files
    .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      src: `/travel/${encodeURIComponent(file)}`,
      caption: file === "concert.png" ? "Bring me the horizon" : file === "shanghai.jpeg" ? "The bund" : file.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
      place: file === "concert.png" ? "Toronto - Canada" : file === "shanghai.jpeg" ? "Shanghai - China" : "",
    }));

  return (
    <section className="section travel-section" id="travel" aria-label="Travel">
      <TravelCarousel photos={photos} />
    </section>
  );
}
