"use client";
import { signOut } from "next-auth/react";

export default function UserDashboard() {
  return (
    <div>
      <h1>User Panel</h1>
      <div>
        <button
          onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL })}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
