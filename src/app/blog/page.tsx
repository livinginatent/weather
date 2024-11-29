import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt,mainImage}`;

const options = { next: { revalidate: 30 } };

export default async function page() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  return (
    <div >
      <h1 className="text-4xl font-bold mb-8 text-center">Bloq - Məqalələr</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="border p-4">
            <Link href={`blog/${post.slug.current}`}>
              {post.mainImage && (
                <Image
                  src={urlFor(post.mainImage).width(400).height(300).url()}
                  alt={post.title}
                  width={400}
                  height={300}
                />
              )}
              <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
              <p className="text-gray-600">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
