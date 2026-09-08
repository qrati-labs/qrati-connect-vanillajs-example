# Qrati Connect — Vanilla JS Example

Embeds [Qrati Connect](https://qrati.com) into a plain HTML/JS page (Vite) using
the no-code **embed script**, with a host-controlled light/dark theme.

## Integration method: Embed script

A single `async` script tag mounts the widget where it sits. Config travels in
`data-*` attributes:

```html
<script async
  src="https://cdn.jsdelivr.net/npm/@qratilabs/qrati-connect/embed/embed.js"
  data-organization-id="your-org-id"
  data-router="hash"></script>
```

This example injects that tag from `src/main.js` immediately on page load.

## Run it

```bash
pnpm install
cp .env.example .env   # optional — sensible defaults are baked in
pnpm dev
```

## Configuration

| Variable                 | Description                                                       |
| ------------------------ | ----------------------------------------------------------------- |
| `VITE_ORGANIZATION_ID`   | Your Qrati organization ID                                        |
| `VITE_QRATI_EMBED_URL`   | CDN URL of the embed script (`embed/embed.js`)                     |

## Other integration methods

- **React component** — `import { QratiConnect }` (see the React / Next / Preact examples).
- **Web component** — `<qrati-connect>` from the CDN (see the Svelte / Solid / Qwik / Lit examples).

Docs: <https://www.npmjs.com/package/@qratilabs/qrati-connect>
