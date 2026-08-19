const APEX = "musingnotes.app";

function canonicalPath(pathname) {
  if (pathname === "/blog") return "/blog/";
  if (pathname.endsWith("/index.html")) {
    const parent = pathname.slice(0, -"index.html".length);
    return parent === "/" ? "/" : parent;
  }
  if (pathname.endsWith(".html")) return pathname.slice(0, -".html".length);
  return pathname;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const original = url.href;
    const host = url.hostname.toLowerCase();

    if (url.protocol !== "https:") {
      url.protocol = "https:";
      url.port = "";
    }
    if (host === `www.${APEX}`) url.hostname = APEX;
    url.pathname = canonicalPath(url.pathname);

    if (url.href !== original) return Response.redirect(url.href, 301);
    return env.ASSETS.fetch(request);
  },
};
