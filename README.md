# musingnotes.app

Marketing site for **Musing** — a context-aware AI notes app for creative minds.

Static HTML/CSS, no build step. The site files live in `public/`.

- `public/index.html` — landing page (features + pricing)
- `public/privacy.html` — privacy policy (App Store privacy URL: `https://musingnotes.app/privacy.html`)
- `public/styles.css` — shared styles
- `public/icon.png` — app icon (favicon + social preview)
- `wrangler.toml` — Cloudflare config; serves `public/` as static assets

## Auto-deploy (Cloudflare Workers Builds)
The `musingnotes-site` Worker is connected to this repo. On every push to `main`,
Cloudflare runs `npx wrangler deploy`, which reads `wrangler.toml` and publishes
`public/` to `musingnotes.app`. No manual upload needed.

To change the site: edit a file in `public/`, commit, and push to `main`.

Support: support@musingnotes.app
