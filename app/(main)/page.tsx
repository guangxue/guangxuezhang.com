import Image from "next/image";
import photo from "@/public/me.jpg";
import { prisma } from "@/lib/globals/db";
import LatestPost from "@/components/LatestPost";

export const revalidate = 6;

export default async function HomePage() {
  const latestPostsQty: number = Number((await prisma.settings.findUnique({
    where: {
      name: "latestPostsQty"
    },
    select: {
      value: true,
    }
  }))?.value);

  const latestPosts = await prisma.post.findMany({
    take: latestPostsQty,
    where: {
      draft: false,
    },
    select: {
      id: true,
      logo: true,
      title: true,
      intro: true,
      slug: true,
    },
  });

  return (
    <div className="HomePage flex flex-col h-screen gap-5">
      <div className="HomePage_intro flex flex-wrap sm:justify-start justify-center items-center">
        <Image
          src={photo}
          alt="photo"
          className="sm:ml-16 sm:mr-5 mx-5 sm:w-[200px] sm:h-[200px] w-[100px] h-[100px]"
          width={200}
          height={200}
        />
        <hgroup className="sm:mx-12 sm:my-5 mx-5 font-lora">
          <h1 className="flex flex-col my-2 sm:text-4xl text-xl">
            Hello.
            <span className="my-1 sm:text-3xl text-lg">I&apos;m Guangxue</span>
          </h1>
          <h2 className="my-1 sm:text-2xl text-sm">
            A front end web developer.
          </h2>
        </hgroup>
        <div className="flex flex-wrap gap-3 md:basis-full lg:basis-1/3 basis-full p-6">
          <div className="border border-slate-400 px-2 py-1 rounded sm:text-sm text-xs">
            HTML/CSS
          </div>
          <div className="border border-slate-400 px-2 py-1 rounded sm:text-sm text-xs">
            React.js
          </div>
          <div className="border border-slate-400 px-2 py-1 rounded sm:text-sm text-xs">
            PHP
          </div>
          <div className="border border-slate-400 px-2 py-1 rounded sm:text-sm text-xs">
            Go
          </div>
          <div className="border border-slate-400 px-2 py-1 rounded sm:text-sm text-xs">
            Python
          </div>
          <div className="border border-slate-400 px-2 py-1 rounded sm:text-sm text-xs">
            Node.js
          </div>
          <div className="border border-slate-400 px-3 py-1 rounded sm:text-sm text-xs">
            Ubuntu
          </div>
          <div className="border border-slate-400 px-3 py-1 rounded sm:text-sm text-xs">
            Shell Script
          </div>
          <div className="border border-slate-400 px-3 py-1 rounded sm:text-sm text-xs">
            Vimscript
          </div>
          <div className="border border-slate-400 px-3 py-1 rounded sm:text-sm text-xs">
            MySQL
          </div>
        </div>
      </div>
      <div className="HomePage_posts flex flex-wrap m-6 font-lora gap-5">
        {latestPosts.map(post => {
          {/*@ts-expect-error Async JSX Component */ }
          return <LatestPost post={post} key={post.id} />
        })}
      </div>
    </div>
  );
}
