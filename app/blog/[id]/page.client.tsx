"use client";
import dynamic from "next/dynamic";
import { type HTMLAttributes, useEffect, useState } from "react";

export function Date({ value, ...props }: { value: Date } & HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(value.toLocaleDateString(undefined, { dateStyle: "full" }));
  }, [value]);

  return <span {...props}>{date}</span>;
}

export const CommentsWithAuth = dynamic(() =>
  import("./comment").then((res) => res.CommentsWithAuth),
);
