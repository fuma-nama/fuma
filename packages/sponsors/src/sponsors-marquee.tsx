import type { ComponentProps, JSX } from "react";
import { getSponsors, sponsorsApiUrl, type APISponsorItem, type TierName } from "./api";
import { Marquee } from "./marquee";

const defaultSponsorsUrl = "https://fuma-nama.dev/sponsors";
const defaultVisibleTiers = ["Golden Sponsor", "Platinum Sponsor"] satisfies TierName[];

interface SponsorFetchOptions extends RequestInit {
  next?: {
    revalidate?: number;
  };
}

export interface SponsorsMarqueeProps extends Omit<ComponentProps<"div">, "children"> {
  apiUrl?: string;
  sponsorsUrl?: string;
  visibleTiers?: readonly TierName[];
  fetchOptions?: SponsorFetchOptions;
}

export async function SponsorsMarquee({
  apiUrl = sponsorsApiUrl,
  sponsorsUrl = defaultSponsorsUrl,
  visibleTiers = defaultVisibleTiers,
  fetchOptions = { next: { revalidate: 3600 } },
  className,
  ...props
}: SponsorsMarqueeProps = {}): Promise<JSX.Element | null> {
  let sponsors: APISponsorItem[];
  try {
    sponsors = await getSponsors(apiUrl, fetchOptions);
  } catch {
    return null;
  }
  const items = sponsors.filter(
    (item) =>
      item.isActive &&
      item.tierName &&
      item.__typename === "Organization" &&
      visibleTiers.includes(item.tierName),
  );
  if (items.length === 0) return null;

  return (
    <div {...props} className={["fumari-sponsors-marquee", className].filter(Boolean).join(" ")}>
      <a href={sponsorsUrl} className="fumari-sponsors-marquee-heading">
        Sponsors
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </a>
      <Marquee pauseOnHover className="fumari-sponsors-marquee-track">
        {items.map((item) => (
          <a
            key={item.login}
            href={getSponsorUrl(item)}
            rel="sponsored noreferrer noopener"
            target="_blank"
            className="fumari-sponsors-marquee-item"
          >
            <img src={item.avatarUrl} alt={item.name} width={20} height={20} loading="lazy" />
            {item.name}
          </a>
        ))}
      </Marquee>
    </div>
  );
}

function getSponsorUrl(item: APISponsorItem): string {
  if (!item.websiteUrl) return `https://github.com/${item.login}`;
  if (!/^https?:\/\//.test(item.websiteUrl)) return `https://${item.websiteUrl}`;
  return item.websiteUrl;
}
