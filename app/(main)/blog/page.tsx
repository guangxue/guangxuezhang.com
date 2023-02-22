'use client'
import BlogTags from "@/components/BlogTags";
import BlogPreviews from "@/components/BlogPreviews";
import { getBlogByTag, sortedBlogDes } from "@/utils/blogdata";
import { useState } from "react";

const BlogPage = () => {

	const [postList, setPostList] = useState(sortedBlogDes);

	function handleSearchTag(clickedTag: string) {
		const blogs = getBlogByTag(clickedTag);
		setPostList(blogs)
	}

	return (
		<>
			<h1>Blog</h1>
			<BlogTags onSearchTag={handleSearchTag}  />
			<div className="blog-previews flex flex-col gap-6">
				{postList.map(blog=>(
					<BlogPreviews
						key={blog.title+blog.publish}
						title={blog.title}
						tags={blog.tags}
						publish={blog.publish}
						description={blog.description}
						slug={blog.slug}
					/>
				))}
			</div>
		</>
	)
}

export default BlogPage;