"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { HTMLAttributes, useEffect, useId, useRef } from "react";

export function Shell({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boxRef.current) return;
    const box = boxRef.current;

    const listener = (e: MouseEvent) => {
      const bounds = box.getBoundingClientRect();
      const leftX = e.clientX - bounds.x;
      const topY = e.clientY - bounds.y;
      const centerX = leftX - bounds.width / 2;
      const centerY = topY - bounds.height / 2;

      const distance = Math.sqrt(centerX ** 2 + centerY ** 2);

      box.style.setProperty("transition", `none`);
      box.style.setProperty(
        "background-image",
        `radial-gradient(
      circle at
      ${centerX * 2 + bounds.width / 2}px
      ${centerY * 2 + bounds.height / 2}px,
      rgba(145,145,185,0.3),
      transparent 50%)`
      );
      box.style.setProperty(
        "transform",
        `rotate3d(
      ${centerY / 100},
      ${-centerX / 100},
      0,
      ${Math.log(distance) * 1.5}deg)`
      );
    };

    const onLeave = () => {
      box.style.setProperty("transition", `transform 1s`);
      box.style.setProperty("background-image", `none`);
      box.style.setProperty("transform", `none`);
    };

    box.addEventListener("mousemove", listener);
    box.addEventListener("mouseleave", onLeave);

    return () => {
      box.removeEventListener("mousemove", listener);
      box.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className={cn(
        "relative w-[94vw] h-[400px] max-w-[800px] bg-neutral-600/30 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-xl shadow-neutral-950/50 animate-shell-show",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none select-none z-[2]"
        style={{
          boxShadow:
            "inset 0 2px 8px rgba(205,185,235, 0.4), inset 0 -1px 10px rgba(100,120,120, 0.3)",
        }}
      />
      {children}
    </div>
  );
}

export function ExitBar() {
  return (
    <Link
      aria-label="Close"
      href="/playground"
      className="flex flex-row gap-2 pt-4 opacity-70 z-[2] transition-opacity hover:opacity-100"
    >
      <div className="size-2 rounded-full bg-neutral-50" />
      <div className="w-32 h-2 rounded-full bg-neutral-50 z-[2]" />
    </Link>
  );
}

export function Border({ color }: { color: string[] }) {
  const id = useId();

  return (
    <svg className="absolute inset-0 size-full z-[-1]">
      <linearGradient id={`${id}_border_gradient`} x1="0" x2="1" y1="0" y2="1">
        {color.map((c, i) => (
          <stop key={c} stopColor={c} offset={i / (color.length - 1)} />
        ))}
      </linearGradient>
      <clipPath id={`${id}_clip`}>
        <rect width="100%" height="100%" fill="white" rx="24px" />
      </clipPath>

      <rect
        width="100%"
        height="100%"
        stroke={`url(#${id}_border_gradient)`}
        clipPath={`url(#${id}_clip)`}
        strokeWidth="4px"
        fill="none"
        strokeLinejoin="round"
        rx="24px"
      />
    </svg>
  );
}
