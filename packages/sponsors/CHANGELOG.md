## @fumari/sponsors@0.1.3

### Fetch the sponsors in the browser

`@fumari/sponsors/client` exports a `SponsorsMarquee` that fetches the sponsors after hydration, so a page rendering it stays static. It renders nothing until the list arrives, then grows into place and fades in. Later pages of the same visit show it at once, scrolling on from where the last one stopped.

```tsx
import { SponsorsMarquee } from "@fumari/sponsors/client";

<SponsorsMarquee />;
```

The API is requested at `https://www.fuma-nama.dev/api/sponsors`, which answers without a redirect.

## @fumari/sponsors@0.1.2

### Fade the marquee edges without a mask

The sponsors marquee now fades its edges with gradient overlays instead of a CSS mask, so Chrome no longer redraws the moving track offscreen on every frame.

The overlays take the color of `--fumari-sponsors-marquee-fade`, which defaults to `--color-fd-card` on Fumadocs sites and to the page background elsewhere. Set it when the marquee sits on another surface:

```css
.fumari-sponsors-marquee {
  --fumari-sponsors-marquee-fade: var(--my-surface);
}
```

## @fumari/sponsors@0.1.1

### Fix user to organization website url mapping

## @fumari/sponsors@0.1.0

### Add sponsor components and API

Publish the reusable sponsor marquee, its styles, and a tiny client for the public sponsor API.
