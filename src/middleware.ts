import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const { pathname } = req.nextUrl;

  console.log(role, token);

  if (!token) {
    const destination = `/login?redirect=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(new URL(destination, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/admin/user-Management",
    "/admin/post-Management",
    "/admin/leaderboard-Overview",
    "/admin/donation-History",
    "/admin/shipping-Management",
    "/admin/training",
    "/message",
    "/settings",
  ],
};
