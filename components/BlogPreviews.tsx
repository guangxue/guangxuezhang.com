import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

interface BlogPreviewsProps {
  title: string;
  tags: string;
  publish: string;
  modified?: string;
  intro: string;
  slug: string;
  logo: string;
}

const BlogPreviews: NextPage<BlogPreviewsProps> = (post) => {
  const publishDate = new Date(post.publish).toDateString();
  return (
    <article className="bg-neutral-50 sm:basis-full md:basis-[48%] lg:basis-[30%] p-3">
      <header className="flex items-center gap-5">
        <Image src={post.logo} className="mt-1" alt="" width={40} height={40} style={{ width: '39px', height: '39px' }} />
        <div className="mt-5">
          <Link href={`/blog/${post.slug}`}>
            <h1 className="text-xl">{post.title}</h1>
          </Link>
          <time className="publish-time">{publishDate}</time>
        </div>
      </header>
      <section>
        <p>{post.intro}</p>
      </section>
    </article>
  );
};

export default BlogPreviews;
