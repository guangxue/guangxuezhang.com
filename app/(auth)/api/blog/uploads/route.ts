import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const fileInfo = await req.json();
  // console.log(fileInfo);
  const rootPath = path.resolve("/");
  const savePath = `/Users/Guangxue/Codes/digitalocean/www/guangxuezhang.com/public/${fileInfo.name}`;
  const imageStr = fileInfo.file.substring("data:image/jpeg;base64".length);
  const base64Buf = Buffer.from(imageStr, "base64");
  try {
    await writeFile(path.join(savePath), base64Buf, {
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
