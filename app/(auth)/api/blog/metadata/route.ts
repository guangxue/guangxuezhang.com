import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/globals/db";

// Handling GET request
export async function POST(req: NextRequest) {
  const action = await req.json();
  console.log("recevied data:");
  console.log(action);
  switch (action.name) {
    case "getPostMetadata":
      try {
        const blogMetadata = await prisma.post.findMany({
          where: { draft: false },
          select: {
            id: true,
            slug: true,
            title: true,
            intro: true,
            publish: true,
            logo: true,
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
    case "getPostContentById":
      try {
        const content = await prisma.post.findFirst({
          where: {
            id: action.id,
          },
          select: {
            content: true,
          },
        });
        return new Response(JSON.stringify(content), {
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
    case "updateMetadata":
      const updateId = Number(action.id);
      try {
        const updated = await prisma.post.update({
          where: { id: updateId },
          data: {
            title: action.updates.title,
            slug: action.updates.slug,
            logo: action.updates.logo,
            intro: action.updates.intro,
          },
        });
        return new Response(JSON.stringify({ updated: updated }), {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      } catch (error) {
        console.log(error);
        return NextResponse.json(error, {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      }
    default:
      return NextResponse.json("<NO ACTIONS FOUND>", {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
  }
}
