import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const fileInfo = await req.json();

  const rootPath = path.resolve("./");
  const destPath = `/public/${fileInfo.name}`;
  const savePath = path.join(rootPath, destPath);

  const imageStr = fileInfo.file.substring("data:image/jpeg;base64".length);
  const base64Buf = Buffer.from(imageStr, "base64");

  try {
    await writeFile(savePath, base64Buf, {
      flag: "wx+",
    });
    return new Response("uploaded", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.log("<API Error>", error);
    return NextResponse.json(error, {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}
