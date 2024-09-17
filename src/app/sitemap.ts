import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://havam.az/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://havam.az/calendar",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://havam.az/aqi",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  
  ];
}
