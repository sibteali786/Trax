import { NextRequest, NextResponse } from "next/server";
export default function middleware(req: NextRequest) {
  const token = req.cookies.get("TRAX_ACCESS_TOKEN");
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: ["/", "/library/:path*", "/playlist/:path*"],
};
