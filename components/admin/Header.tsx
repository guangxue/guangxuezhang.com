import Image from "next/image";
import { authOption } from "@/app/(auth)/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import SignOutButton from "../SignOutButton";

const Header = async () => {
  const session = await getServerSession(authOption);
  return (
    <header className="w-full border-b border-gray-200">
      <nav className="flex p-3 gap-3">
        <span className="">
          <Image src="" alt="." width={20} height={20} />
        </span>
        <span className="">
          Welcome, {session?.user.name} as role: {session?.user.role}
        </span>
        <span className="">
          <SignOutButton />
        </span>
      </nav>
    </header>
  );
};

export default Header;
