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

const BlogPreviews: NextPage<BlogPreviewsProps> = (props) => {
  const publishDate = new Date(props.publish).toDateString();
  return (
    <article className="bg-neutral-50 sm:basis-full md:basis-[48%] lg:basis-[30%] p-3">
      <header className="flex items-center gap-5">
        <Image src={props.logo} className="mt-1" alt="" width={40} height={40} />
        <div className="mt-5">
          <Link href={`/blog/${props.slug}`}>
            <h1 className="text-xl">{props.title}</h1>
          </Link>
          <time className="publish-time">{publishDate}</time>
        </div>
      </header>
      <section>
        <p>{props.intro}</p>
      </section>
    </article>
  );
};

export default BlogPreviews;
