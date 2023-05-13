import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/globals/db";
import { Success, ServerError } from "@/utils/responses";

export async function POST(req: NextRequest) {
  const action = await req.json();
  const logoLocPrefix = "https://beta.guangxuezhang.com/images/main/";
  switch (action.name) {
    case "getPostMetadata":
      try {
        const blogMetadata = await prisma.post.findMany({
          where: { draft: false },
          select: {
            id: true,
            slug: true,
            logo: true,
            title: true,
            intro: true,
            publish: true,
          },
        });
        const blogMetaJSON = JSON.stringify(blogMetadata);
        return Success(blogMetaJSON);
      } catch (error) {
        return ServerError("get post metadata failed");
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
            logo: `${logoLocPrefix}${action.updates.logo}`,
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
    case "updatePostTitle":
      const titleId = Number(action.id);
      try {
        const updated = await prisma.post.update({
          where: { id: titleId },
          data: {
            title: action.newTitle,
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
        return NextResponse.json(error, {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      }
    case "updatePostSlug":
      const slugId = Number(action.id);
      try {
        const updated = await prisma.post.update({
          where: { id: slugId },
          data: {
            slug: action.newSlug,
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
        return NextResponse.json(error, {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      }
    case "updatePostLogo":
      const logoId = Number(action.id);
      try {
        const updated = await prisma.post.update({
          where: { id: logoId },
          data: {
            logo: `${logoLocPrefix}${action.newLogo}`,
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
        return NextResponse.json(error, {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      }
    case "updatePostIntro":
      const introId = Number(action.id);
      try {
        const updated = await prisma.post.update({
          where: { id: introId },
          data: {
            intro: action.newIntro,
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
      } catch (err) {
        return NextResponse.json(err, {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      }
    case "updatePostContent":
      const pid = Number(action.id);
      try {
        const updated = await prisma.post.update({
          where: { id: pid },
          data: {
            content: action.newContent,
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
      } catch (err) {
        return NextResponse.json(err, {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      }
    case "getImageSrcByName":
      try {
        const dataUrl = (
          await prisma.image.findFirst({
            where: {
              name: action.logoname,
            },
            select: {
              data_url: true,
            },
          })
        )?.data_url;

        return Success(dataUrl);
      } catch (err) {
        return ServerError("getImageSrcByName err");
      }
    case "getImageDataUrls":
      try {
        const images = await prisma.image.findMany({
          where: {
            id: {
              gte: 1,
            },
          },
          select: {
            name: true,
            data_url: true,
          },
        });
        return Success(JSON.stringify(images));
      } catch (error) {
        return ServerError("getImageDataUrls err");
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
