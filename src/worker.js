const APEX = "musingnotes.app";

// Slash policy: `/` and `/blog/` keep a trailing slash; everything else does not.
function canonicalPath(pathname) {
  if (pathname.endsWith("/index.html")) {
    const parent = pathname.slice(0, -"index.html".length);
    return parent === "/" ? "/" : parent;
  }
  if (pathname.endsWith(".html")) pathname = pathname.slice(0, -".html".length);
  if (pathname === "/blog") return "/blog/";
  if (pathname.length > 1 && pathname.endsWith("/") && pathname !== "/blog/") {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const original = url.href;

    // Absolute https:// Location so HTTP visitors are not kept on http://
    // (Cloudflare's asset 307s used a relative Location).
    if (url.protocol !== "https:") {
      url.protocol = "https:";
      url.port = "";
    }
    if (url.hostname.toLowerCase() === `www.${APEX}`) url.hostname = APEX;
    url.pathname = canonicalPath(url.pathname);

    if (url.href !== original) return Response.redirect(url.href, 301);
    return env.ASSETS.fetch(request);
  },
};
