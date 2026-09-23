import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: DATA.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${DATA.url}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];
}
