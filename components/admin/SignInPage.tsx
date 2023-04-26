"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

function AdminSignInPage() {
  const uname = React.useRef<HTMLInputElement>(null);
  const pwd = React.useRef<HTMLInputElement>(null);
  const [err, setErr] = React.useState<string>("");
  const router = useRouter();

  async function handleAdminLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const unameVal = uname.current?.value;
    const pwdVal = pwd.current?.value;

    const res = await signIn("credentials", {
      username: unameVal,
      password: pwdVal,
      redirect: false,
    });
    if (res?.error) {
      console.log(res);
      setErr(res.error);
    } else {
      router.push("/dashboard");
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
            <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-white">
              Login
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}

export default AdminSignInPage;
