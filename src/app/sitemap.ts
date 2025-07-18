import type { MetadataRoute } from "next";
import { client } from "@/sanity/client"; // Adjust the import path to your Sanity client
import { SanityDocument } from "next-sanity";
import { cities } from "@/lib/locationNames"; // Adjust the import path to your location names

const POSTS_QUERY = `*[_type == "post" && defined(slug.current)]{
  "slug": slug.current,
  "_updatedAt": _updatedAt
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: SanityDocument[] = await client.fetch(POSTS_QUERY);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: "https://havam.az",
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
    {
      url: "https://havam.az/about-us",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://havam.az/blog",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://havam.az/history",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://havam.az/monthly",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://havam.az/istehsalat-teqvimi-2025",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://havam.az/namaz",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://havam.az/quba",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://havam.az/weekly",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://havam.az/hava-melumati",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic routes for posts
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://havam.az/blog/${post.slug}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic routes for cities
  const cityRoutes: MetadataRoute.Sitemap = Object.keys(cities).map((city) => ({
    url: `https://havam.az/${city.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes, ...cityRoutes];
}
