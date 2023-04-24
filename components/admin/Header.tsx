import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  return (
    <header className="w-full border-b border-gray-200">
      <nav className="flex p-3 gap-3">
        <span className="">
          <img src={session?.user?.image!} alt="." width={20} height={20} />
        </span>
        <span className="">
          Welcome, {session?.user?.name} as role: {session?.user.role}
        </span>
        <span className="">
          <button
            onClick={() => signOut({ callbackUrl: "http://localhost:2322" })}
          >
            Logout
          </button>
        </span>
      </nav>
    </header>
  );
};

export default Header;
