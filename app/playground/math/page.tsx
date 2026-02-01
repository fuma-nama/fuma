import { Canvas } from "@/components/canvas/math";
import { ExitBar, Shell } from "@/components/ui/3d-shell";

export default function Page() {
  const functions = [
    {
      name: "sin",
      color: "rgba(255,50,50,0.8)",
    },
    {
      name: "cos",
      color: "rgba(100,200,255,0.8)",
    },
    {
      name: "tan",
      color: "rgba(100,255,100,0.8)",
    },
  ];

  return (
    <>
      <Shell>
        <div className="flex flex-row items-center gap-4 absolute left-4 bottom-4 p-2 bg-neutral-800 shadow-lg shadow-neutral-950/50 rounded-xl">
          {functions.map((f) => (
            <div key={f.name} className="inline-flex items-center gap-1 text-xs text-neutral-50/80">
              <svg
                viewBox="0 0 24 24"
                fill={f.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
              <p>{f.name}</p>
            </div>
          ))}
        </div>
        <Canvas />
      </Shell>
      <ExitBar />
    </>
  );
}
