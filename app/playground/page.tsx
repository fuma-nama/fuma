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
    <div className="flex flex-row flex-wrap items-center justify-center gap-8">
      {apps.map((app) => (
        <Link
          key={app.name}
          href={app.url}
          className="text-sm flex text-center justify-center items-center gap-4 rounded-full backdrop-blur-md size-24 font-medium text-neutral-100 transition-colors hover:bg-neutral-400"
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
  );
}
