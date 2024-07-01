"use client";
import { Nav } from "@/components/nav";
import { cn } from "@/lib/cn";
import { usePathname } from "next/navigation";

export function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const fullScreen =
    pathname === "/playground" || pathname.startsWith("/playground");

  return (
    <main className={cn("px-6 py-8", !fullScreen && "max-w-[600px] mx-auto")}>
      <Nav />
      {children}
    </main>
  );
}
