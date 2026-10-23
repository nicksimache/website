import type { Metadata } from "next";
import { DarkGradientBg } from "@/components/ui/elegant-dark-pattern";
import { BlindsightMark } from "@/app/components/BlindsightMark";

export const metadata: Metadata = {
  title: "Blindsight",
  description: "Blindsight animated wordmark on a blue gradient background.",
  robots: { index: false, follow: false },
};

export default function TestPage() {
  return (
    <DarkGradientBg>
      <main className="flex min-h-dvh items-center justify-center">
        <BlindsightMark />
      </main>
    </DarkGradientBg>
  );
}
