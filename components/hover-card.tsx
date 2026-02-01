"use client";
import { useRef } from "react";

export function HoverCard() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="not-prose"
      style={{
        perspective: "200px",
      }}
      onMouseMove={(e) => {
        const element = ref.current;
        if (!element) return;

        const bounding = element.getBoundingClientRect();
        const centerX = bounding.left + bounding.width / 2;
        const centerY = bounding.top + bounding.height / 2;
        element.style.setProperty(
          "transform",
          `rotateY(${
            ((e.clientX - centerX) / bounding.width) * -2
          }deg) rotateX(${((e.clientY - centerY) / bounding.height) * 2}deg)`,
        );
        element.style.setProperty("--opacity", "0.6");
        element.style.setProperty(
          "--bg-x",
          `${100 - ((e.clientX - bounding.left) / bounding.width) * 10}%`,
        );
        element.style.setProperty(
          "--bg-y",
          `${100 - ((e.clientY - bounding.top) / bounding.height) * 10}%`,
        );
        element.style.setProperty(
          "--m-x",
          `${((e.clientX - bounding.left) / bounding.width) * 100}%`,
        );
        element.style.setProperty(
          "--m-y",
          `${((e.clientY - bounding.top) / bounding.height) * 100}%`,
        );
      }}
      onMouseLeave={() => {
        const element = ref.current;
        if (!element) return;

        element.style.setProperty("transform", "none");
        element.style.setProperty("--opacity", "0");
      }}
    >
      <div
        ref={ref}
        className="relative p-8 rounded-2xl border border-neutral-800 bg-gradient-to-b from-amber-950 to-neutral-950 overflow-hidden hover-card shadow-xl"
      >
        <div ref={containerRef} className="absolute inset-0 hover-card-layer"></div>
        <h2 className="font-bold text-neutral-50 text-6xl">Hello World</h2>
        <p>
          Hovering this card will give you an impressing experience. This card was inspired by
          Linear's customer page, their design is very inspiring and wonderful.
        </p>
      </div>
    </div>
  );
}
