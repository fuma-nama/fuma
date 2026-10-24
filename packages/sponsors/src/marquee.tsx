import type { ComponentProps, JSX, ReactNode } from "react";

export interface MarqueeProps extends ComponentProps<"div"> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: ReactNode;
  vertical?: boolean;
  repeat?: number;
}

function joinClassNames(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps): JSX.Element {
  return (
    <div
      {...props}
      className={joinClassNames("fumari-marquee", className)}
      data-pause-on-hover={pauseOnHover}
      data-reverse={reverse}
      data-vertical={vertical}
    >
      {Array.from({ length: repeat }, (_, index) => (
        <div
          className="fumari-marquee-content"
          key={index}
          aria-hidden={index > 0}
          inert={index > 0 ? true : undefined}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
