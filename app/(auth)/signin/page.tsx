"use client"
import React from "react";
import Image from "next/image";
import { remoteImagePath } from "@/utils/request";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function AuthSignInPage() {
  const router = useRouter();
  const [disabled, setDisable] = React.useState<boolean>(false);
  function toAdminSignIn() {
    setDisable(true);
    router.push("/signin/admin")
  }
  function hoverEffect(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = e.target as HTMLButtonElement;
    btn.style.backgroundColor = 'rgb(2 132 199)'
  }

  function disableHoverEffect(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = e.target as HTMLButtonElement;
    btn.style.backgroundColor = 'white'
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 mt-10 prose prose-neutral prose-h1:text-3xl max-w-none">
      <h1>Welcome back</h1>
      <div className="flex flex-col gap-10">
        <button
          onClick={toAdminSignIn}
          onMouseEnter={hoverEffect}
          onMouseLeave={disableHoverEffect}
          disabled={disabled}
          className="flex flex-wrap justify-center border items-center py-4 px-8 shadow-md hover:shadow-none hover:bg-sky-600 hover:text-slate-50 transition-all"
          style={{ backgroundColor: disabled ? 'rgb(3 105 161)' : 'white', }}
        >
          <Image src={`${remoteImagePath}admin-icon.svg`} alt="" width={40} height={40} style={{ margin: '0 .36rem 0 0' }} />
          {disabled ? (<div><span className="">Sign In as Admin</span> <Loader /></div>) : <span className="">Sign In as Admin</span>}
        </button>
        <button
          onClick={() => { router.push("/signin/user") }}
          className="flex flex-wrap justify-center border items-center py-4 px-8 shadow-md hover:shadow-none hover:bg-sky-600 hover:text-slate-50 transition-all"
        >
          <Image src={`${remoteImagePath}user-icon.svg`} alt="" width={40} height={40} style={{ margin: '0 .36rem 0 0' }} />
          <span className="">Sign In as User</span>
        </button>
      </div>
    </div>
  );
}
