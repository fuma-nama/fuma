"use client";
import Link from "next/link";
import { blog } from "content/blog";
import { useLayoutEffect, useState } from "react";

export function Card({
  id,
  title,
  date: rawDate,
  description,
}: {
  id: string;
  title: string;
  description: string;
  date: Date;
}) {
  const [date, setDate] = useState("");

  useLayoutEffect(() => {
    setDate(rawDate.toLocaleDateString(undefined, { dateStyle: "medium" }));
  }, [rawDate]);

  return (
    <Link
      href={`/blog/${id}`}
      className="relative group overflow-hidden z-2 flex flex-row shadow-inner shadow-neutral-800 p-4 rounded-lg border border-neutral-900 -mx-4 transition-colors hover:transition-none hover:bg-neutral-900"
    >
      <div className="flex-1">
        <div className="flex flex-row gap-2 justify-between">
          <h2 className="text-sm font-medium mb-2">{title}</h2>
          <span className="text-xs text-neutral-400 text-nowrap">{date}</span>
        </div>
        <p className="text-xs text-neutral-400">{description}</p>
      </div>
      <div className="z-[-1] size-40 absolute right-0 bottom-0 bg-neutral-400 blur-3xl opacity-0 rounded-full transition-opacity group-hover:opacity-20" />
    </Link>
  );
}
