import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { Role } from "@prisma/client";
/* ----------------
| Below codes are VITAL related to `async session callback` with following statement:
|       
|     >>> session.user.role = token.role;
|
| that compiler keep getting error says:
|
|     >>> Type 'unknown' is not assignable to type 'Role | null | undefined'.
|                 |
|                 |--> refers to `token.role`
|                                         |
|                                         |--> refers to `JWT` which has NO role property
| Fix this with following code snippets:
| It works for:  "next": "^13.3.0",
|                "next-auth": "^4.22.0"
|------------------- */
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role | null;
    accessToken?: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      role?: Role | null;
    } & DefaultSession["user"];
    accessToken?: string | null;
  }

  interface User {
    role?: Role | null;
  }
}
