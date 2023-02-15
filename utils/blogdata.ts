import { allPosts, Post } from "@/.contentlayer/generated"


const blogMetaData = allPosts.map(post=>{
	return {
		title: post.title,
		tags: post.tags,
		publish: post.publish,
		description: post.description,
		slug: post.slug,
	}
})

const sortedBlogDes = blogMetaData.sort((postA, postB)=>{
	const d1: number = (new Date(postA.publish)).getTime();
	const d2: number = (new Date(postB.publish)).getTime();
	return d1-d2;
}).reverse();

interface BlogPost {
	title: '',
	tags: '',
	publish: '',
	description: '',
	slug: '',
}

const getBlogByTag = (tagname: string) => {

	const tagBasedBlog = sortedBlogDes.filter(post=>{
		if(post.tags.includes(tagname.substring(1))) return true;
	})
	return tagBasedBlog;
}
const allBlogTags = blogMetaData
	.map(post=>post.tags)
	.map(tag=>{
		if(tag.includes(',')) {
			return tag.split(',')
		}else {
			return tag
		}
	})
	.flat()
	.filter((val, idx, arr)=>{
		return arr.indexOf(val) === idx;
	});

export {
	allBlogTags,
	getBlogByTag,
	sortedBlogDes,
}
