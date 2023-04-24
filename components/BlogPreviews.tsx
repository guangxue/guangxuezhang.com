import { NextPage } from "next";
import Link from "next/link";

interface BlogPreviewsProps {
  title: string;
  tags: string;
  publish: string;
  modified?: string;
  intro: string;
  slug: string;
  icon?: string;
}

const BlogPreviews: NextPage<BlogPreviewsProps> = (props) => {
  const publishDate = new Date(props.publish).toDateString();
  return (
    <article className="bg-neutral-50 sm:basis-full md:basis-[48%] lg:basis-[30%] p-6">
      <header>
        <Link href={`/blog/${props.slug}`}>
          <h2 className="m-0 p-0 text-2xl">{props.title}</h2>
        </Link>
        <time className="publish-time">{publishDate}</time>
        <p>{props.intro}</p>
      </header>
    </article>
  );
};

export default BlogPreviews;
