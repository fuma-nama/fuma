"use client";
import { useEffect, useRef } from "react";

export function Canvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const renderer = createRenderer(ref.current);

    return () => {
      renderer();
    };
  });

  return (
    <canvas
      ref={ref}
      width={500}
      height={500}
      className="w-full max-w-[400px] border border-neutral-800 rounded-lg mx-auto"
    />
  );
}

function createRenderer(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;

  let unmounted = false;
  let th = Math.PI / 4;
  const speed = 0.5;
  const r = 150;

  function render() {
    if (unmounted) return;

    th = (th + (Math.PI / 180) * speed) % (2 * Math.PI);
    const w = Math.cos(th) * r;
    const h = Math.sin(th) * r;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.lineTo(w, -h);
    ctx.lineTo(0, 0);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.lineTo(0, r);
    ctx.moveTo(-r, 0);
    ctx.lineTo(r, 0);
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.stroke();
    ctx.resetTransform();

    requestAnimationFrame(() => render());
  }

  render();

  return () => {
    unmounted = true;
  };
}
