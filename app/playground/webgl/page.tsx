import { ExitBar, Shell } from "@/components/ui/3d-shell";
import { Canvas } from "@/components/canvas/webgl";

export default function Page() {
  return (
    <>
      <Shell>
        <Canvas className="size-full" />
      </Shell>
      <ExitBar />
    </>
  );
}
