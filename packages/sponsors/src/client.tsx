"use client";
import { Suspense, use, useSyncExternalStore, type JSX } from "react";
import { getSponsors, sponsorsApiUrl, type APISponsorItem } from "./api";
import {
  SponsorsMarqueeView,
  type SponsorsMarqueeProps as ServerSponsorsMarqueeProps,
} from "./sponsors-marquee";

export type SponsorsMarqueeProps = Omit<ServerSponsorsMarqueeProps, "fetchOptions">;

const cache = new Map<string, APISponsorItem[] | Promise<APISponsorItem[]>>();
/** when the last marquee began scrolling, so the next one, on another page, continues from there */
let scrollStart: number | undefined;

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
  if (scrollStart !== undefined)
    element.style.setProperty("--fumari-marquee-delay", `${scrollStart - performance.now()}ms`);

  return () => {
    const timing = element
      .querySelector(".fumari-marquee-content")
      ?.getAnimations()[0]
      ?.effect?.getComputedTiming();
    // the local time stands still while paused on hover, so the pauses are kept
    if (typeof timing?.localTime === "number")
      scrollStart = performance.now() - timing.localTime + (timing.delay ?? 0);
  };
}

/**
 * Fetches the sponsors in the browser after hydration, so the page around it stays static.
 * The sponsors fade in when they arrive, later pages show them at once and keep scrolling from where they were.
 * Nothing renders when the request fails.
 */
export function SponsorsMarquee({
  apiUrl = sponsorsApiUrl,
  ...props
}: SponsorsMarqueeProps = {}): JSX.Element {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const loading = <SponsorsMarqueeView {...props} />;
  if (!hydrated) return loading;

  const sponsors = load(apiUrl);
  if (Array.isArray(sponsors))
    return <SponsorsMarqueeView ref={keepScroll} sponsors={sponsors} {...props} />;

  return (
    <Suspense fallback={loading}>
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
