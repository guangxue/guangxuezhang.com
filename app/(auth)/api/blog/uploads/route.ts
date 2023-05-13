import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/globals/db";
import { ServerError, Success } from "@/utils/responses";

type fileInfoProps = {
  filename: string;
  dataUrl: string;
};

function getPublicPath(fileInfo: fileInfoProps) {
  const rootPath = path.resolve("./");
  const destPath = `/public/${fileInfo.filename}`;
  return path.join(rootPath, destPath);
}

async function getImgStr(fileInfo: fileInfoProps) {
  const imgReg = /data\:image\/(jpeg|png|svg\+xml)\;base64\,/;
  const imgInfo = fileInfo.dataUrl.match(imgReg);
  if (imgInfo === null) {
    return Promise.reject("<matches Failed> Image Not acceptable");
  }
  return Promise.resolve(fileInfo.dataUrl.substring(imgInfo[0].length));
}

async function getBase64Image(fileInfo: fileInfoProps) {
  return getImgStr(fileInfo)
    .then((dataUrlstr) => {
      const base64 = Buffer.from(dataUrlstr, "base64");
      return Promise.resolve(base64);
    })
    .catch((err) => {
      return Promise.reject(`Unable covert to base64: <err> ${err}`);
    });
}

function getWebRootPath(fileInfo: fileInfoProps) {
  const rootPath = path.resolve("../");
  const destPath = `/beta.guangxuezhang.com/public/images/${fileInfo.filename}`;
  return path.join(rootPath, destPath);
}

async function saveImageToDB(fileInfo: fileInfoProps) {
  try {
    const image = await prisma.image.create({
      data: {
        name: fileInfo.filename,
        data_url: fileInfo.dataUrl,
      },
    });
    return Success(image);
  } catch (error) {
    console.log(error);
  }
}

async function saveImageToServer(saveDestPath: string, base64Buf: Buffer) {
  return writeFile(saveDestPath, base64Buf, { flag: "wx+" })
    .then((writeInfo) => {
      return NextResponse.json({
        ok: true,
      });
    })
    .catch((err) => {
      return ServerError(err.message);
    });
}
export async function POST(req: NextRequest) {
  const fileInfo = await req.json();
  const saveDestPath = getWebRootPath(fileInfo);
  console.log("saveDestPath:", saveDestPath);
  const imgStr = await getImgStr(fileInfo);
  const base64Buf = Buffer.from(imgStr, "base64");
  return await saveImageToServer(saveDestPath, base64Buf);
}
