import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const authToken = await getToken({ req });

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (authToken === null) {
      return NextResponse.redirect(new URL("/signin/admin", req.url));
    } else {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/user")) {
    if (authToken === null) {
      return NextResponse.redirect(new URL("/signin/user", req.url));
    } else {
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/dashboard") && authToken === null) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/dashboard/:path*"],
};
