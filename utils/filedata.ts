import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";

const getFileContent = (filename: string) => {
	return readFileSync(filename, {encoding: 'utf8'})
}

const getFilesInDir = (fullDir: string, extname?: string) => {
	if(extname) {
		const files = readdirSync(fullDir,{encoding: 'utf8'}).filter(file=>file.endsWith(extname));
		return files
	} else {
		const files = readdirSync(fullDir,{encoding: 'utf8'})
		return files;
	}
}

const getFrontMatter = (mdfile: string) => {
	const mdContent = getFileContent(mdfile);
	return {
		title: matter(mdContent).data.title,
		tags: matter(mdContent).data.tags,
		publish: matter(mdContent).data.publish,
		description: matter(mdContent).data.description,
		slug: matter(mdContent).data.slug,
	}
};


const postDir = process.cwd() + '/posts/';
const postExtname = '.mdx';
const postDirFiles = getFilesInDir(postDir, postExtname);

const blogMetaData = postDirFiles.map(file=>{
	const fullPathMdFile = `${postDir}${file}`;
	return getFrontMatter(fullPathMdFile);
})

export {
	postDir,
	postExtname,
	postDirFiles,
	blogMetaData,
	getFrontMatter,
	getFileContent,
}