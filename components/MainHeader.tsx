import Link from "next/link";

const MainHeader = () => {
  return (
    <header className="MainHeader sticky top-0 border border-b-neutral-100 bg-white">
      <nav>
        <ul className="flex list-none sm:space-x-16 space-x-8">
          <li className="zoom flex justify-center items-center sm:space-x-2 space-x-1 object-contain">
            <img
              src="/home.svg"
              alt="homelogo"
              width={20}
              height={15}
              className="m-0 w-[13px] h-[13px]"
            />
            <Link href="/">
              <span className="link-underline">home</span>
            </Link>
          </li>
          <li className="zoom flex justify-center items-center sm:space-x-2 space-x-1 object-contain">
            <img
              src="/blog.svg"
              alt="homelogo"
              width={20}
              height={15}
              className="m-0 w-[13px] h-[13px]"
            />
            <Link href="/blog">
              <span className="link-underline">blog</span>
            </Link>
          </li>
          <li className="zoom flex justify-center items-center sm:space-x-2 space-x-1 object-contain">
            <img
              src="/demo.svg"
              alt="homelogo"
              width={20}
              height={15}
              className="m-0 w-[13px] h-[13px]"
            />
            <Link href="https://beta.guangxuezhang.com">
              <span className="link-underline">demo</span>
            </Link>
          </li>
          <li className="zoom flex justify-center items-center sm:space-x-2 space-x-1 object-contain">
            <img
              src="/about.svg"
              alt="homelogo"
              width={20}
              height={15}
              className="m-0 w-[13px] h-[13px]"
            />
            <Link href="/about">
              <span className="link-underline">About</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
