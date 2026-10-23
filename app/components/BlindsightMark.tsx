import { TextHoverEffect } from "./ui/text-hover-effect";

export function BlindsightMark() {
  return (
    <h1 className="m-0 aspect-[11/2] w-[92%] max-w-[1400px]" aria-label="Blindsight">
      <span className="block h-full w-full" aria-hidden="true">
        <TextHoverEffect text="BLINDSIGHT" strokeWidth={0.45} duration={0} viewBox="0 0 440 80" />
      </span>
    </h1>
  );
}
