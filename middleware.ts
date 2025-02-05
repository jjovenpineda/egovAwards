import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  /*   const authToken = request.cookies.get("authToken");

  if (!authToken) {
    if (
      request.nextUrl.pathname.startsWith("/") &&
      request.nextUrl.pathname != "/sign-in"
    ) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
  return NextResponse.next(); */
}
export const config = {
  matcher:
    "/((?!sign-up|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)", //prevents middle to run on sign-in page and solves design issues
};
