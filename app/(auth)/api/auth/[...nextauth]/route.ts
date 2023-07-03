import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

const authOption: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        if (!username || !password) {
          console.log("Nothing passed in");
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { username: username },
        });

        if (!user) {
          return null;
        }
        const validPassword = await compare(password, user.password!);
        if (!validPassword) {
          return null;
        }
        return {
          id: user.id + "",
          name: user.username,
          email: user.email,
          role: user.role,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && user) {
        token.accessToken = account.access_token;
        if (user.role === null) {
          token.role = "User";
        } else {
          token.role = user.role;
        }
      }
      return token;
    },
    async session({ session, user, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
