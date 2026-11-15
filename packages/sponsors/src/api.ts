export const sponsorsApiUrl = "https://www.fuma-nama.dev/api/sponsors";

export type TierName = "Platinum Sponsor" | "Golden Sponsor" | "Silver Sponsor";

export interface SponsorTier {
  monthlyPriceInDollars: number;
  name?: string;
}

export interface APISponsorItem {
  __typename: "User" | "Organization";
  login: string;
  avatarUrl: string;
  websiteUrl: string | null;
  name: string;
  tier: SponsorTier;
  tierName?: TierName;
  isActive: boolean;
  isOneTimePayment: boolean;
}

export async function getSponsors(
  apiUrl: string = sponsorsApiUrl,
  requestInit?: RequestInit,
): Promise<APISponsorItem[]> {
  const response = await fetch(apiUrl, requestInit);
  if (!response.ok) {
    throw new Error(`Failed to fetch sponsors: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as APISponsorItem[];
}
