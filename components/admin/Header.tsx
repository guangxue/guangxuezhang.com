import Image from "next/image";
import SignOutButton from "../SignOutButton";
import type { User } from "next-auth";
import Link from "next/link";

const Header = async ({ adminInfo }: { adminInfo: User }) => {
  return (
    <header className="w-full border-b border-gray-200">
      <nav className="flex p-4 gap-3 items-center">
        <span className="">
          <Link href={"/"}>
            <Image src="/coffee.jpg" alt="image" className="h-8 w-8" width={40} height={30} />
          </Link>
        </span>
        <span className="">
          Welcome, {adminInfo.name} as role: {adminInfo.role}
        </span>
        <span className="">
          <SignOutButton />
        </span>
      </nav>
    </header>
  );
};

export default Header;
