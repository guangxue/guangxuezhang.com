import Image from "next/image";
import SignOutButton from "../SignOutButton";
import type { User } from "next-auth";

const Header = async ({ adminInfo }: { adminInfo: User }) => {
  return (
    <header className="w-full border-b border-gray-200">
      <nav className="flex p-4 gap-3">
        <span className="">
          <Image src="/qvb.jpeg" alt="image" width={20} height={20} />
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
