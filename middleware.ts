import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const authToken = await getToken({ req });
  const signInUrl = `${process.env.NEXTAUTH_URL}signin`;

  if (req.nextUrl.pathname === "/admin" && authToken === null) {
    return NextResponse.redirect(`${signInUrl}?role=admin`);
  }
  if (req.nextUrl.pathname === "/user" && authToken === null) {
    return NextResponse.redirect(`${signInUrl}?role=user`);
  }
  if (authToken) {
    console.log(authToken);
    return NextResponse.rewrite(`${process.env.NEXTAUTH_URL}dashboard`);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/dashboard/:path*"],
};
