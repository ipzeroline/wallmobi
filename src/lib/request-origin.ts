const fallbackOrigin = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

const allowedProductionHosts = new Set(["wallmobi.com", "www.wallmobi.com"]);

function isLocalHost(host: string) {
  return host === "localhost:3000" || host === "127.0.0.1:3000" || host === "localhost" || host.startsWith("localhost:");
}

export function getRequestOrigin(req: Request) {
  const url = new URL(req.url);
  const forwardedHost = req.headers.get("x-forwarded-host");
  const forwardedProto = req.headers.get("x-forwarded-proto");
  const host = (forwardedHost || req.headers.get("host") || url.host).toLowerCase();

  if (allowedProductionHosts.has(host)) {
    return `https://${host}`;
  }

  if (isLocalHost(host)) {
    const proto = forwardedProto || url.protocol.replace(":", "") || "http";
    return `${proto}://${host}`;
  }

  return fallbackOrigin;
}
