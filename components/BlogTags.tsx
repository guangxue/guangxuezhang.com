"use client"
import { allBlogTags } from "@/utils/blogdata";
import { useRef, MouseEvent } from "react";


const BlogTags = ({onSearchTag}: any) => {
	function handleTag(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const clickedTagname = target.innerText;
		onSearchTag(clickedTagname)
		console.log(clickedTagname)
	}

	return (
		<div className="blog-tags flex gap-3 flex-wrap">
			{allBlogTags.map((tag,idx)=>{
				const matches = /(\.|\s)/ig;
				const tagpath = tag.replaceAll(matches, '-').toLocaleLowerCase();
				return (
					<button key={tag+idx} onClick={handleTag} >
						<span className="tag link-underline">#{tag}</span>
					</button>
				)
			})}
		</div>
	)
};

export default BlogTags;