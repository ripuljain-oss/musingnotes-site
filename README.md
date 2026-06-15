# musingnotes.app

Marketing site for **Musing** — a context-aware AI notes app for creative minds.

Static HTML/CSS, no build step.

- `index.html` — landing page (features + pricing)
- `privacy.html` — privacy policy (used as the App Store privacy URL: `https://musingnotes.app/privacy.html`)
- `styles.css` — shared styles
- `icon.png` — app icon (favicon + social preview)

## Deploy with Cloudflare Pages
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Pick this repo. Framework preset: **None**. Build command: *(leave empty)*.
   Build output directory: `/` (root).
3. Deploy, then **Custom domains → Set up a custom domain → `musingnotes.app`**
   (Cloudflare handles DNS automatically since the domain is on your account).

Support: support@musingnotes.app
