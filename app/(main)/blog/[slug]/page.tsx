import { prisma } from "@/lib/globals/db";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Params {
  params: {
    slug: string;
  };
}

const BlogSlugPage = async ({ params }: Params) => {
  const { slug } = params;
  const post: { content: string } | null = await prisma.post.findUnique({
    where: { slug: slug },
    select: { content: true },
  });

  if (post) {
    return (
      <article className="max-w-[88%] self-center p-8">
        {/*@ts-expect-error Async JSX Component */}
        <MDXRemote source={post.content} />
      </article>
    );
  } else {
    return <div>Nothing here</div>;
  }
};

export default BlogSlugPage;
