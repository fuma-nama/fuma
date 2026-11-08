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
