"use client";

import Link from "next/link";

const apps = [
  {
    name: "WebGL",
    url: "/playground/webgl",
  },
  {
    name: "Anime",
    url: "/playground/demo",
  },
  {
    name: "Math",
    url: "/playground/math",
  },
  {
    name: "Physic",
    url: "/playground/physic",
  },
];

export default function Page() {
  return (
    <>
      <div className="relative text-center">
        <h1 className="font-medium text-neutral-100">Welcome</h1>
        <p className="text-sm text-neutral-100/80 mt-2">
          Some boring things I've created for fun.
        </p>
        <div className="absolute z-[-1] inset-0 bg-neutral-900 blur-2xl" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6 md:gap-8 md:grid-cols-4">
        {apps.map((app) => (
          <Link
            key={app.name}
            href={app.url}
            className="text-sm flex text-center justify-center items-center gap-4 rounded-full backdrop-blur-md size-24 font-medium text-neutral-100/80 transition-colors hover:bg-neutral-400"
            style={{
              backgroundImage:
                "linear-gradient(to top right, pink, rgb(155 0 255 / 0.5), transparent 80%), radial-gradient(circle at center, rgb(38 48 48 / 0.5) 40%, rgba(255,255,255, 0.5))",
              backgroundBlendMode: "overlay, normal",
            }}
          >
            {app.name}
          </Link>
        ))}
      </div>
    </>
  );
}
