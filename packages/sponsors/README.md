# `@fumari/sponsors`

Sponsor API client and the sponsor marquee used across Fuma Nama's open-source projects.

```tsx
import { SponsorsMarquee } from "@fumari/sponsors";
import "@fumari/sponsors/style.css";

export default function Footer() {
  return <SponsorsMarquee />;
}
```

The component fetches the public sponsor API with a one-hour revalidation by default.

The edges of the marquee fade into the color of `--fumari-sponsors-marquee-fade`, which defaults to `--color-fd-card` and otherwise to the page background. Set it when the marquee sits on another surface.

Use the API entry to fetch the public sponsor feed:

```ts
import { getSponsors } from "@fumari/sponsors/api";

const sponsors = await getSponsors();
```
