import { NextRequest, NextResponse } from "next/server";

// import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";
  const baseDomain = process.env.NEXT_PUBLIC_DOMAIN || "localhost:3000";

  // 🚀 Handle Subdomains → Rewrite to `/agency/{subdomain}{pathname}`
  if (hostname !== baseDomain && hostname.endsWith(baseDomain)) {
    const subdomain = hostname.split(`.${baseDomain}`)[0];
    const newPath = `/agency/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(new URL(newPath, req.url));
  }

  // 🚀 Handle Login Redirection Based on `state`
  if (url.pathname === "/login") {
    const stateParam = url.searchParams.get("state");
    if (stateParam && stateParam !== "public") {
      const redirectUrl = `http://${stateParam}.${baseDomain}${url.pathname}?${url.searchParams.toString()}`;
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // Apply to all except assets
};


// export default function middleware(req:NextRequest)=>{

// }