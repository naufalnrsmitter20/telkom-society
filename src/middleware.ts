import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest, res: NextResponse, next: NextFetchEvent) {
  const requireAuthToken = ["/partner", "/profile", "/profile/edit", "/division", "/isiIdentitas", "/isiIdentitas/personalData", "/isiIdentitas/achievement", "/pilihKeahlian"];
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (requireAuthToken.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (pathname.includes("/signin") && token) {
    if (token.role === "GURU" || token.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }
  if (pathname.includes("/admin") && !token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  if (pathname.includes("/admin") && token?.role === "SISWA") {
    return NextResponse.redirect(new URL("/AccessDenied", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/division", "/partner", "/profile", "/profile/edit", "/isiIdentitas", "/isiIdentitas/personalData", "/isiIdentitas/achievement", "/pilihKeahlian"],
};
