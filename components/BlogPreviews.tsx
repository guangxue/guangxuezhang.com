import { NextPage } from "next";
import Link from "next/link";

interface BlogPreviewsProps {
	title: string;
	tags: string;
	publish: string;
	modified?: string;
	description: string;
	slug: string;
}

const BlogPreviews: NextPage<BlogPreviewsProps> = (props)=> {
	const publishDate = (new Date(props.publish)).toDateString();
	return (
		<div className="post-heading">
			<Link href={`/blog/${props.slug}`}>
				<h2>{props.title}</h2>
				<time className="publish-time">{publishDate}</time>
			</Link>
		</div>
	)
}

export default BlogPreviews;