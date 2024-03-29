import { prisma } from "@/lib/globals/db";
import BlogPreviews from "@/components/BlogPreviews";
import { remoteImagePath } from "@/utils/request";

export const revalidate = 6;

const BlogPage = async () => {
  const blogMetadata = await prisma.post.findMany({
    where: { draft: false },
    select: {
      slug: true,
      title: true,
      intro: true,
      publish: true,
      logo: true,
    },
  });

  if (Array.isArray(blogMetadata) && blogMetadata.length >= 0) {
    return (
      <section className="BlogPage flex flex-col m-8 font-lora">
        <h1>All blogs</h1>
        <div className="BlogPreviews flex flex-wrap gap-6">
          {blogMetadata.map((blog: any) => (
            <BlogPreviews
              key={blog.slug}
              title={blog.title}
              tags={blog.tags}
              publish={blog.publish}
              intro={blog.intro}
              slug={blog.slug}
              logo={`${remoteImagePath}${blog.logo}`}
            />
          ))}
        </div>
        {/* // <BlogTags onSearchTag={handleSearchTag} /> */}
      </section>
    );
  } else {
    return <div>No blogs</div>
  }

};

export default BlogPage;
