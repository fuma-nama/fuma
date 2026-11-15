---
packages:
  npm:@fumari/sponsors: patch
---

## Fetch the sponsors in the browser

`@fumari/sponsors/client` exports a `SponsorsMarquee` that fetches the sponsors after hydration, so a page rendering it stays static. It renders nothing until the list arrives, then grows into place and fades in. Later pages of the same visit show it at once, scrolling on from where the last one stopped.

```tsx
import { SponsorsMarquee } from "@fumari/sponsors/client";

<SponsorsMarquee />;
```

The API is requested at `https://www.fuma-nama.dev/api/sponsors`, which answers without a redirect.
