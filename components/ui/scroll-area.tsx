"use client";
import { cn } from "@/lib/cn";
import * as Primitive from "@radix-ui/react-scroll-area";

export function ScrollArea(props: React.ComponentPropsWithoutRef<typeof Primitive.Root>) {
  return (
    <Primitive.Root {...props}>
      <Primitive.Viewport className="size-full p-4">{props.children}</Primitive.Viewport>
      <Scrollbar />
    </Primitive.Root>
  );
}

function Scrollbar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentPropsWithRef<typeof Primitive.Scrollbar>) {
  return (
    <Primitive.Scrollbar
      orientation={orientation}
      className={cn(
        "flex select-none touch-none duration-150 transition-all ease-out",
        orientation === "vertical" && "w-2.5 px-0.5 py-3 hover:w-3",
        orientation === "horizontal" && "flex-col px-3 py-0.5 h-2.5",
        className,
      )}
      {...props}
    >
      <Primitive.Thumb className="flex-1 bg-neutral-100/20 rounded-full relative" />
    </Primitive.Scrollbar>
  );
}
