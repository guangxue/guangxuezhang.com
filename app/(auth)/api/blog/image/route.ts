import { NextRequest, NextResponse } from "next/server";
import { ServerError, Success } from "@/utils/responses";
import path from "path";
import { readdir } from "fs/promises";

function getRemoteImagePath() {
  const rootPath = path.resolve("../");
  const destPath = `/assets.guangxuezhang.com/images/main/`;
  return path.join(rootPath, destPath);
}
export async function POST(req: NextRequest) {
  const action = await req.json();
  const imagePath = getRemoteImagePath();

  switch (action.name) {
    case "getImageList":
      try {
        const files = await readdir(imagePath);
        for (const file of files) {
          console.log(file);
        }
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      break;
  }
}
