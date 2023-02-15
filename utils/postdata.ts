import { blogMetaData } from '@/utils/filedata';
import { allPosts, Post } from 'contentlayer/generated';

export interface PostData {
	title: string;
	tags: string;
	publish: string;
	description: string;
	slug: string;
}

function splitTags(tags:string) {
	let sptags = [];
	if(tags&& tags.includes(',')) {
		sptags = [...tags.split(',')]
	}else {
		sptags.push(tags)
	}
	return sptags;
}

function convertURItags(tag:string) {
	const matches = /(\.|\s)/ig;
	return tag.replaceAll(matches, '-').toLocaleLowerCase();
}

function getAllPosts(tag: string): PostData[] {
	let allPosts: PostData[] = [];
	blogMetaData.forEach(blog=>{
		const taglist = splitTags(blog.tags);
		taglist.forEach(t=>{
			if(convertURItags(t) === tag) {
				allPosts.push(blog);
			}
		})
	})
	return allPosts;
}

function getPostBySlug (slug: string) {
	return allPosts.find(post=> post.slug == slug) as Post;
}

export {
	getAllPosts,
	getPostBySlug,
};
