"use client";
// import BlogTags from "@/components/BlogTags";
import BlogPreviews from "@/components/BlogPreviews";
import React from "react";

async function fetchBlogMetaData() {
  const url = `${process.env.baseUrl}/api/blog/metadata`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const BlogPage = async () => {
  // function handleSearchTag(clickedTag: string) {
  //   const blogs = getBlogByTag(clickedTag);
  //   setPostList(blogs);
  // }
  const { blogMetadata } = await fetchBlogMetaData();
  return (
    <section className="BlogPage flex flex-col m-8  font-jumbo">
      <h1>All blogs</h1>
      <div className="BlogPreviews flex flex-wrap gap-6">
        {blogMetadata.map((blog: any) => (
          <BlogPreviews
            key={blog.title + blog.publish}
            title={blog.title}
            tags={blog.tags}
            publish={blog.publish}
            intro={blog.intro}
            slug={blog.slug}
          />
        ))}
      </div>
      {/* // <BlogTags onSearchTag={handleSearchTag} /> */}
    </section>
  );
};

export default BlogPage;
