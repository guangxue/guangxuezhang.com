import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/globals/db";

// Handling POST request
export async function GET(req: NextRequest) {
  try {
    const blogMetadata = await prisma.post.findMany({
      where: { draft: false },
      select: {
        slug: true,
        title: true,
        intro: true,
        publish: true,
      },
    });
    const blogMetaJSON = JSON.stringify(blogMetadata);
    return new Response(blogMetaJSON, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
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
