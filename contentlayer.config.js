import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypePrettyCodeOptions } from "./utils/rehypePrettyCode";
 
export const Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  // Location of Post source files (relative to `contentDirPath`)
  filePathPattern: `**/*.mdx`,
  fields: {
    title: {type: 'string', required: true},
    tags: {type: 'string', required: true},
    publish: {type: 'date', required: true},
    description: {type: 'string', required: true},
    slug: {type: 'string', required: true},
  },
}))
 
export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      [rehypePrettyCode, rehypePrettyCodeOptions]
    ],
  }
})