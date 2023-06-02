"use client";
import Loader from "@/components/Loader";
import { signIn } from "next-auth/react";
import React from "react";

export default function AdminSignInPage() {
  const uname = React.useRef<HTMLInputElement>(null);
  const pwd = React.useRef<HTMLInputElement>(null);
  const [disabled, setDisable] = React.useState<boolean>(false);
  const [err, setErr] = React.useState<string>("");

  async function handleAdminLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const unameVal = uname.current?.value;
    const pwdVal = pwd.current?.value;

    const res = await signIn("credentials", {
      username: unameVal,
      password: pwdVal,
      redirect: true,
      callbackUrl: "/dashboard/admin"
    });

    if (res?.error) {
      console.log(res);
      setErr(res.error);
    }
  }

  return (
    <div className="AdminSignInPage flex justify-center items-center w-screen prose prose-neutral prose-h1:text-3xl max-w-none">
      <form onSubmit={handleAdminLogin}>
        <section className="flex flex-col  py-14 px-12 gap-6">
          <h1 className="text-center">Login as Admin</h1>
          {err.length > 0 && (
            <div className="bg-red-100 p-3 border border-red-300 text-sm">
              Incorrect username or password.
            </div>
          )}
          <div>
            <input
              type="text"
              placeholder="Username"
              className="border border-neutral-300 px-3 py-2"
              ref={uname}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Your password"
              className="border border-neutral-300 px-3 py-2"
              ref={pwd}
            />
          </div>
          <div>
            <button onClick={() => { setDisable(true) }} disabled={disabled} className="flex w-full gap-2 justify-center items-center rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-500">
              <span>Login</span>
              {/* <Loader /> */}
              {disabled ? <Loader /> : ''}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
