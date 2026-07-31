import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BLOG_SLUG_REDIRECTS } from "@/lib/related-links";

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

  const pathname = request.nextUrl.pathname;

  // Redirect common alternative URLs
  const redirects: Record<string, string> = {
    "/seeking-alternatives": "/alternatives",
  };
  if (redirects[pathname]) {
    return NextResponse.redirect(new URL(redirects[pathname], request.url), 301);
  }

  // Blog URLs that were linked across the site but never written. Internal
  // links now point straight at the destinations; these 301s catch anything
  // already indexed or linked from outside, so the equity isn't lost to a 404.
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.slice("/blog/".length).replace(/\/$/, "");
    const mapped = BLOG_SLUG_REDIRECTS[slug];
    if (mapped) {
      return NextResponse.redirect(new URL(mapped.href, request.url), 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|api/).*)",
};
