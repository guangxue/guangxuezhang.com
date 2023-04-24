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
    return NextResponse.json({ blogMetadata });
  } catch (error) {
    return NextResponse.json({ dbErr: error });
  }
}
