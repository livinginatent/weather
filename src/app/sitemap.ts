import type { MetadataRoute } from "next";
import { client } from "@/sanity/client"; // Adjust the import path to your Sanity client
import { SanityDocument } from "next-sanity";

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
  ];

  // Dynamic routes for posts
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://havam.az/blog/${post.slug}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
    changeFrequency: "weekly" as const, 
    priority: 0.9,
  }));

  return [...staticRoutes, ...postRoutes];
}
