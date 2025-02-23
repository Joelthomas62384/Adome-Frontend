import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";

  if (url.pathname.startsWith("/agency/")) {
    const segments = url.pathname.split("/");
    if (segments.length >= 3) {
      const subdomain = segments[2];
      const newPath = "/" + segments.slice(3).join("/") || "/"; 

      const baseDomain = process.env.NEXT_PUBLIC_DOMAIN || hostname;

      url.hostname = `${subdomain}.${baseDomain}`;
      url.pathname = newPath;

      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
