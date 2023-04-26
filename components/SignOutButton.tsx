"use client"

import { signOut } from "next-auth/react"

export default function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "http://localhost:2322" })}>
      Logout
    </button>
  )
}