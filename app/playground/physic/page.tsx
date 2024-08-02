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
  }, []);

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
  let speedX = 1.2,
    speedY = -2;
  let x = 100,
    y = 100,
    r = 50;
  let mouseX = -1,
    mouseY = -1;
  const ctx = canvas.getContext("2d")!;

  function onMouseMove(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      mouseX = -1;
      mouseY = -1;
    } else {
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    }
  }

  let lastRender = Date.now();
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

    // Assume 1m = 10px
    x = speedX * 10 + x;
    y = speedY * 10 + y;

    if (y < 0 || y + 2 * r >= canvas.clientHeight) {
      speedY = Math.abs(speedY) >= 0.1 ? -speedY * 0.5 : 0;
    }

    if (x < 0 || x + 2 * r >= canvas.clientWidth) {
      speedX = Math.abs(speedX) >= 0.12 ? -speedX * 0.5 : 0;
    }

    const now = Date.now();
    const dt = (now - lastRender) / 1000;

    if (mouseX === -1 && mouseY === -1) {
      // return to natural gravity
      speedY += 9.81 * dt;
    } else {
      const dx = canvas.clientWidth / 2 - mouseX;
      const dy = canvas.clientHeight / 2 - mouseY;
      const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

      speedX += 9.81 * (dx / d) * dt;
      speedY += 9.81 * (dy / d) * dt;

      ctx.filter = "blur(24px)";
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 30, 0, 2 * Math.PI);
      ctx.fillStyle = "rgb(200,225,255)";
      ctx.fill();
    }

    lastRender = now;

    x = Math.min(Math.max(x, 0), canvas.clientWidth - 2 * r);
    y = Math.min(Math.max(y, 0), canvas.clientHeight - 2 * r);

    ctx.filter = "none";
    ctx.beginPath();
    ctx.arc(x + r, y + r, r, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    requestAnimationFrame(() => render());
  }

  render();
  document.addEventListener("mousemove", onMouseMove);

  return () => {
    document.removeEventListener("mousemove", onMouseMove);
    unmounted = true;
  };
}
