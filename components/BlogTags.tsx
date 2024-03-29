"use client";
// import { allBlogTags } from "@/utils/blogdata";
import { MouseEvent } from "react";

const BlogTags = ({ onSearchTag }: any) => {
  /**
   * @todo
   * hard code allBlogTags just for now.
   * It will be implementing dymatic fetching blog tags.
   */
  const allBlogTags = ["Next.js", "digitalocean", "personal", "JavaScript", "React.js"]
  function handleTag(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const clickedTagname = target.innerText;
    onSearchTag(clickedTagname);
    console.log(clickedTagname);
  }

  return (
    <div className="BlogTags flex gap-3 flex-wrap">
      {allBlogTags.map((tag, idx) => {
        const matches = /(\.|\s)/gi;
        const tagpath = tag.replaceAll(matches, "-").toLocaleLowerCase();
        return (
          <button key={tag + idx} onClick={handleTag}>
            <span className="tag link-underline">#{tag}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BlogTags;
