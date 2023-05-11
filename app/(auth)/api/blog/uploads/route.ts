import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/globals/db";
import { ServerError, Success } from "@/utils/responses";

function getSavePath(fileInfo: any) {
  const rootPath = path.resolve("./");
  const destPath = `/public/${fileInfo.name}`;
  const savePath = path.join(rootPath, destPath);
  return savePath;
}

function getImgStr(fileInfo: any) {
  const imgReg = /data\:image\/(jpeg|png|svg\+xml)\;base64/;
  const imgInfo = fileInfo.file.match(imgReg);
  if (imgInfo === null) {
    return NextResponse.json("<matches Failed> Image Not acceptable", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
  console.log("<Accepted Image>:", imgInfo[0]);
  const imgStr = fileInfo.file.substring(imgInfo[0].length);
  return imgStr;
}

async function saveImageToPublicFolder(fileInfo: any) {
  const savePath = getSavePath(fileInfo);
  const base64Buf = Buffer.from(getImgStr(fileInfo), "base64");

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

export async function POST(req: NextRequest) {
  const fileInfo = await req.json();
  try {
    const image = await prisma.image.create({
      data: {
        name: fileInfo.name,
        data_url: fileInfo.dataUrl,
      },
    });
    return Success(image);
  } catch (error) {
    return ServerError(error);
  }
}
