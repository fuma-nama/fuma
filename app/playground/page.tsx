"use client";

import Image from "next/image";
import Link from "next/link";

const apps = [
  {
    name: "WebGL",
    url: "/playground/webgl",
  },
  {
    name: "UI Demo",
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
          className="text-sm flex text-center justify-center items-center gap-4 rounded-full bg-neutral-800/50 backdrop-blur-md group size-24 font-medium text-neutral-100 transition-colors hover:bg-neutral-400/50"
        >
          <span
            style={{
              filter: "drop-shadow(0 2px 6px rgb(0 0 0))",
            }}
          >
            {app.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
