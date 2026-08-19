# musingnotes.app

Marketing site for **Musing** — a context-aware AI notes app for creative minds.

Static HTML/CSS, no build step. The site files live in `public/`.

- `public/index.html` — landing page (features + pricing)
- `public/privacy.html` — privacy policy (canonical URL: `https://musingnotes.app/privacy`)
- `public/styles.css` — shared styles + five-room theme tokens (AppColors)
- `public/theme.js` — theme picker, shelf render, localStorage persistence
- `public/icon.png` — 1024 app-icon master (not linked as favicon)
- `public/favicon.ico` / `public/apple-touch-icon.png` — browser and iOS home-screen icons
- `public/llms.txt` — product summary for AI crawlers
- `src/worker.js` — HTTPS and slash-policy 301s (absolute `https://` Location)
- `wrangler.toml` — Cloudflare config; assets in `public/` plus the Worker

## Auto-deploy (Cloudflare Workers Builds)
The `musingnotes-site` Worker is connected to this repo. On every push to `main`,
Cloudflare runs `npx wrangler deploy`, which reads `wrangler.toml` and publishes
`public/` to `musingnotes.app`. No manual upload needed.

To change the site: edit a file in `public/`, commit, and push to `main`.

Support: support@musingnotes.app
