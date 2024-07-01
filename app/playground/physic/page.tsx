"use client";

import { ExitBar, Shell } from "@/components/ui/3d-shell";
import { useEffect, useRef } from "react";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvasRef.current;

    if (!element) return;
    const renderer = createRenderer({ canvas: element });

    return () => {
      renderer();
    };
  });

  return (
    <>
      <Shell>
        <canvas ref={canvasRef} className="size-full" />
      </Shell>
      <ExitBar />
    </>
  );
}

function createRenderer({ canvas }: { canvas: HTMLCanvasElement }) {
  let unmounted = false;
  let angle = (2.5 * Math.PI) / 2;
  let speed = 20;
  let x = 100,
    y = 100,
    d = 100;
  const ctx = canvas.getContext("2d")!;

  function render() {
    if (unmounted) return;

    if (
      canvas.width !== canvas.clientWidth * window.devicePixelRatio ||
      canvas.height !== canvas.clientHeight * window.devicePixelRatio
    ) {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    // prevent it exceeds 360
    angle %= 2 * Math.PI;
    x = speed * Math.cos(angle) + x;
    y = -speed * Math.sin(angle) + y;

    ctx.beginPath();
    ctx.arc(x + d / 2, y + d / 2, d / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    if (y < 0 || y + d > canvas.clientHeight) {
      let d = Math.asin(Math.sin(angle));
      angle =
        angle < Math.PI / 2 || angle > (3 * Math.PI) / 2
          ? 2 * Math.PI - d
          : Math.PI + d;
    }

    if (x < 0 || x + d > canvas.clientWidth) {
      let d = Math.acos(Math.cos(angle));
      angle = angle < Math.PI ? Math.PI - d : Math.PI + d;
    }

    x = Math.min(Math.max(x, 0), canvas.clientWidth - d);
    y = Math.min(Math.max(y, 0), canvas.clientHeight - d);

    requestAnimationFrame(() => render());
  }

  render();

  return () => {
    unmounted = true;
  };
}
