import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30; //revalidate page every 30 seconds

async function getData(slug: string) {
  const query = `*[_type == 'blog' && slug.current == '${slug}']{
      "currentSlug": slug.current,
        title,
        content,
        titleImage
    }[0]`;
  const data = client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);
  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary tracking-wide font-semibold">
          Hamza Lomari - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        alt="image"
        height={800}
        width={800}
        priority
        className="mt-8 inset-0 rounded-lg border-black border-2 dark:border-none"
      />
      <div className="mt-16 prose prose-xl prose-li:marker:text-secondary dark:prose-invert">
        <PortableText value={data.content}/>
      </div>
    </div>
  );
}
