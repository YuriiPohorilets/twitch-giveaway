import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "access_token";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE);

  const isLoginPage = pathname === "/login";
  const isProtectedRoute = pathname === "/";

  if (isProtectedRoute && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoginPage && hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
