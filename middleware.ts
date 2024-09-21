import { NextRequest, NextResponse } from "next/server";

export function middleware(request:NextRequest) {
  const host = request.headers.get("host");

  if (host && host.startsWith("www.")) {
    const url = new URL(request.url);
    url.host = host.replace("www.", "");
    return NextResponse.redirect(url.toString(), 301);
  }

  return NextResponse.next();
}
