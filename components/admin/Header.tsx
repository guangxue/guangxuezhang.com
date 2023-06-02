"use client"
import Image from "next/image";
import SignOutButton from "../SignOutButton";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <header className="w-full border-b border-gray-200">
      <nav className="flex p-4 gap-3 items-center">
        <span className="">
          <Link href={"/"}>
            <Image
              src="/coffee.jpg"
              alt="image"
              className="h-8 w-8"
              width={39}
              height={38}
              style={{ width: '39px', height: '38px' }}
            />
          </Link>
        </span>
        <span className="">
          Login as {status === 'authenticated' ? session.user.name : ''}
        </span>
        <span className="">
          <SignOutButton />
        </span>
      </nav>
    </header>
  );
};

export default Header;
