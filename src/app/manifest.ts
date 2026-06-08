import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: "Original AI-generated phone wallpapers, free to download in high resolution.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfbfd",
    theme_color: "#fbfbfd",
    icons: [{ src: "/icon", sizes: "any", type: "image/svg+xml" }],
  };
}
