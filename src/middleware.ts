import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/pets", "/posts"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (
    !token &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
