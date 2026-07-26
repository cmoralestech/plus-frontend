import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // Redirect www to non-www
  if (host.startsWith("www.")) {
    const url = new URL(request.url);
    const cleanHost = host.replace("www.", "").replace(/:.*/, "");
    return NextResponse.redirect(
      `https://${cleanHost}${url.pathname}${url.search}`,
      301
    );
  }

  // Redirect common alternative URLs
  const redirects: Record<string, string> = {
    "/blog/seeking-arrangement-alternatives": "/alternatives",
    "/blog/seeking-alternatives": "/alternatives",
    "/seeking-alternatives": "/alternatives",
  };
  const pathname = request.nextUrl.pathname;
  if (redirects[pathname]) {
    return NextResponse.redirect(new URL(redirects[pathname], request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|api/).*)",
};
