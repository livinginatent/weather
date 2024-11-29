import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Havam.az | Hava Proqnozu - Bloq və məqalələr | Hava Haqqında",
  description:
    "Azərbaycanda dəqiq və güncəl hava proqnozları, iqlim xəbərləri və mövsümi təhlillər. Hava şəraitinə hazır olun və iqlim dəyişiklikləri ilə bağlı son yenilikləri öyrənin!",
};
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt,mainImage}`;

const options = { next: { revalidate: 30 } };

export default async function page() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-center">Bloq - Hava və İqlim Haqqında Məqalələr</h1>
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
      <div className="mt-8 ml-2">
        <a
          className="font-bold text-decoration-line: underline text-center"
          href="/"
        >
          Hava proqnozuna geri qayıt
        </a>
      </div>
    </div>
  );
}
