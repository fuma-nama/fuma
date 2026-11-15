"use client";
import { Suspense, use, useSyncExternalStore, type JSX } from "react";
import { getSponsors, sponsorsApiUrl, type APISponsorItem } from "./api";
import {
  SponsorsMarqueeView,
  type SponsorsMarqueeProps as ServerSponsorsMarqueeProps,
} from "./sponsors-marquee";

export type SponsorsMarqueeProps = Omit<ServerSponsorsMarqueeProps, "fetchOptions">;

/** the sponsors of each API URL, or their pending request */
const cache = new Map<string, APISponsorItem[] | Promise<APISponsorItem[]>>();
/** how far the last marquee had scrolled when it unmounted: the next one, on another page, continues from there */
let lastScroll: { time: number; leftAt: number } | undefined;

const subscribe = () => () => {};

function load(apiUrl: string) {
  let sponsors = cache.get(apiUrl);
  if (!sponsors) {
    sponsors = getSponsors(apiUrl)
      .catch(() => [])
      .then((result) => {
        cache.set(apiUrl, result);
        return result;
      });
    cache.set(apiUrl, sponsors);
  }
  return sponsors;
}

function keepScroll(element: HTMLDivElement) {
  const time = lastScroll ? lastScroll.time + performance.now() - lastScroll.leftAt : 0;
  element.style.setProperty("--fumari-marquee-delay", `${-time}ms`);

  return () => {
    const timing = element
      .querySelector(".fumari-marquee-content")
      ?.getAnimations()[0]
      ?.effect?.getComputedTiming();
    lastScroll = {
      // its local time stands still while paused on hover, the delay is negative
      time: typeof timing?.localTime === "number" ? timing.localTime - (timing.delay ?? 0) : time,
      leftAt: performance.now(),
    };
  };
}

/**
 * Fetches the sponsors in the browser after hydration, so the page around it stays static.
 * It grows into place when they arrive; on later pages it shows at once and keeps scrolling from where it was.
 * Nothing is rendered when the request fails.
 */
export function SponsorsMarquee({
  apiUrl = sponsorsApiUrl,
  ...props
}: SponsorsMarqueeProps = {}): JSX.Element | null {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  if (!hydrated) return null;

  const sponsors = load(apiUrl);
  if (Array.isArray(sponsors))
    return <SponsorsMarqueeView ref={keepScroll} sponsors={sponsors} {...props} />;

  return (
    <Suspense>
      <Entering request={sponsors} {...props} />
    </Suspense>
  );
}

function Entering({
  request,
  ...props
}: Omit<SponsorsMarqueeProps, "apiUrl"> & { request: Promise<APISponsorItem[]> }) {
  return <SponsorsMarqueeView ref={keepScroll} sponsors={use(request)} entering {...props} />;
}
