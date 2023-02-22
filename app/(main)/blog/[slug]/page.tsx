import { getPostBySlug } from '@/utils/postdata';
import { useMDXComponent } from 'next-contentlayer/hooks'

interface Params {
	params: {
		slug: string;
	}
}

const BlogSlugPage = ({params}: Params) => {
	const { slug } = params;
	const post = getPostBySlug(slug)
	if(post) {
		const MDXContent = useMDXComponent(post.body.code)
		return (
			<article>
				<MDXContent />
			</article>
		)
	} else {
		return <article></article>
	}
}

export default BlogSlugPage;