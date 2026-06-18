import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isLoginPage = pathname === "/admin/login";

  // Sudah login tapi ke halaman login → redirect ke dashboard
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Belum login dan bukan halaman login → redirect ke login
  if (!token && !isLoginPage) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Set header pathname agar layout bisa tahu halaman mana yang dirender
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
