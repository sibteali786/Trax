import { NextResponse } from "next/server";

const signedInPages = ["/", "/playlist", "/library"];

export default function middleware(req) {
  const url = req.nextUrl.clone();
  if (
    signedInPages.find((p) => {
      const URL = req.nextUrl.clone();
      URL.pathname = p;
      return URL === req.nextUrl.pathname;
    })
  ) {
    const token = req.cookies.TRAX_ACCESS_TOKEN;
    if (!token) {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }
}
