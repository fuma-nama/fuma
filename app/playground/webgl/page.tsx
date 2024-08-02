import { ExitBar, Shell } from "@/components/ui/3d-shell";
import { Canvas } from "@/components/canvas/webgl";

export default function Page() {
  return (
    <>
      <Shell>
        <Canvas className="size-full" />
        <a
          href="https://x.com/stormoid"
          target="_blank"
          rel="noreferrer noopener"
          className="absolute right-4 bottom-4 text-xs text-neutral-100/50"
        >
          @stormoid
        </a>
      </Shell>
      <ExitBar />
    </>
  );
}
