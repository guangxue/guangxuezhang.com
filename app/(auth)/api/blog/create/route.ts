import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { prisma } from "@/lib/globals/db";
import matter from "gray-matter";

async function createFile(filename: string, content: string) {
  try {
    console.log("creating file from content: ", content);
    const fileDir = `${process.cwd()}/posts${filename}.mdx`;
    const file = await writeFile(fileDir, content, { flag: "wx+" });
    console.log(`file: ${file} created sucessfully.`);
  } catch (err) {
    console.error(err);
  }
}

// Handling POST request
export async function POST(req: NextRequest) {
  const postData = await req.json();
  const logoLocPrefix = "https://beta.guangxuezhang.com/images/main/";
  if (!postData) {
    return NextResponse.json({ error: "No Data Posted" });
  }
  const metadata = matter(postData);
  try {
    const post = await prisma.post.create({
      data: {
        title: metadata.data.title,
        intro: metadata.data.intro,
        tags: metadata.data.tags,
        logo: `${logoLocPrefix}${metadata.data.logo}`,
        slug: metadata.data.slug,
        publish: metadata.data.publish,
        content: metadata.content,
      },
    });
    if (post.id) {
      return NextResponse.json({
        status: 200,
        ok: true,
        statusText: "created successfully",
        postID: post.id,
      });
    }
  } catch (err: any) {
    return new Response(err, { status: 500 });
  }
}
