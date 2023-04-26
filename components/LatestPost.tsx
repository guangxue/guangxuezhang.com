import Image from "next/image";

const LatestPost = () => {
  return (
    <div className="LatestPost flex sm:basis-full md:basis-[46%] lg:basis-[32%] bg-neutral-50">
      <div className="pic m-3">
        <Image src="/nextjs.svg" alt="" width={150} height={150} />
      </div>
      <article className="desc m-1">
        <h3>Using TypeScript with Next.js to define dynamic</h3>
        <p>
          When it comes to build personal portfolio/ blog, a static site is
          written in markdown that becomes the first choice , and I&apos;m no
          exception.
        </p>
      </article>
    </div>
  );
};

export default LatestPost;
