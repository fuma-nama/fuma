"use client";
import { useRef, useEffect } from "react";

export function Canvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    let unmounted = false;
    let animation = false;
    const element = ref.current!;
    const ctx = element.getContext("2d")!;
    const width = element.clientWidth,
      height = element.clientHeight;

    element.width = width * window.devicePixelRatio;
    element.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    function render() {
      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.stroke();

      ctx.strokeStyle = "rgba(255,50,50,0.8)";
      line((x) => Math.sin(x * 20));

      ctx.strokeStyle = "rgba(100,200,255,0.8)";
      line((x) => Math.cos(x * 20));

      ctx.strokeStyle = "rgba(100,255,100,0.8)";
      line((x) => Math.tan(x * 20));

      if (!unmounted && animation) requestAnimationFrame(() => render());
    }

    function line(fn: (x: number) => number) {
      ctx.beginPath();

      for (let i = 0; i <= width; i++) {
        const x = i / width;
        const y = (height - (fn(x) * height) / 4) / 2;

        if (Number.isNaN(y) || y > height || y < -height) {
          ctx.moveTo(i, y);
          continue;
        }

        ctx.lineTo(i, y);
      }

      ctx.lineWidth = 2;
      ctx.stroke();
    }

    render();
    return () => {
      unmounted = true;
    };
  }, []);

  return <canvas ref={ref} className="size-full" />;
}
