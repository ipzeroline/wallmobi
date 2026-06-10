import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/wallpapers/",
        "/en/member",
        "/th/member",
        "/vi/member",
        "/lo/member",
        "/km/member",
        "/my/member",
        "/en/AdminConsole",
        "/th/AdminConsole",
        "/vi/AdminConsole",
        "/lo/AdminConsole",
        "/km/AdminConsole",
        "/my/AdminConsole",
      ],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
