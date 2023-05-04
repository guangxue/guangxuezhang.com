import { prisma } from "@/lib/globals/db";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";

interface Params {
  params: {
    slug: string;
  };
}

const BlogSlugPage = async ({ params }: Params) => {
  const { slug } = params;
  const post = await prisma.post.findUnique({
    where: { slug: slug },
    select: {
      title: true,
      publish: true,
      content: true,
      logo: true,
    },
  });

  if (post) {
    return (
      <article className="sm:max-w-3xl max-w-sm self-center p-8 font-lora">
        <header className="border-b mb-3 border-slate-700">
          <div className="">
            <h1 className="m-0">{post.title}</h1>
          </div>
          <div className="flex items-center gap-5">
            <Image alt="logo" src={post.logo} width={30} height={20} />
            <time className="">Published <em>{post.publish?.toDateString()}</em></time>
          </div>
        </header>

        {/*@ts-expect-error Async JSX Component */}
        <MDXRemote source={post.content} />
      </article>
    );
  } else {
    return <div>Nothing here</div>;
  }
};

export default BlogSlugPage;
