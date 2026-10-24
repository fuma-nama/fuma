import { type TierName, tiers } from "@/app/sponsors/data";
import { getSponsors } from "@/lib/get-sponsors";

export const revalidate = 3600;

export interface APISponsorItem {
  __typename: "User" | "Organization";
  login: string;
  avatarUrl: string;
  websiteUrl: string | null;
  name: string;
  tier: {
    monthlyPriceInDollars: number;
    name?: string;
  };
  tierName?: TierName;
  isActive: boolean;
  isOneTimePayment: boolean;
}

export async function GET() {
  const sponsors = await getSponsors();
  return Response.json(
    sponsors.map((item): APISponsorItem => ({
      ...item,
      tierName: tiers.find((tier) => item.tier.monthlyPriceInDollars >= tier.min)?.name,
    })),
  );
}
