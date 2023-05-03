import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/globals/db";

// Handling POST request for DELETE POST
export async function POST(req: NextRequest) {
  const delData = await req.json();
  try {
    //const post = await prisma.post.create();
    if (delData) {
      return NextResponse.json({
        status: 200,
        ok: true,
        statusText: "deldata recevied successfully",
        DeleteInfo: delData,
      });
    }
  } catch (err: any) {
    // return new Response(err, { status: 500 });
  }
}
