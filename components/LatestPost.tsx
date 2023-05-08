import Image from "next/image";
import Link from "next/link";

type LastestPostProps = {
  post: {
    id: number;
    logo: string;
    title: string;
    intro: string;
    slug: string;
  }
}
export default function LatestPost({ post }: LastestPostProps) {
  return (
    <div className="LatestPost flex sm:basis-full md:basis-[46%] lg:basis-[32%] bg-neutral-50">
      <div className="pic m-3">
        <Image src={post.logo} alt="" width={39} height={39} />
      </div>
      <article className="desc m-1 basis-[60%]">
        <Link href={`blog/${post.slug}`}>
          <h3>{post.title}</h3>
        </Link>
        <p>{post.intro}</p>
      </article>
    </div>
  )
}