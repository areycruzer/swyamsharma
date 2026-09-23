import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/go/", "/resume", "/me", "/sw-rx/"],
      },
    ],
    sitemap: `${DATA.url}/sitemap.xml`,
  };
}
