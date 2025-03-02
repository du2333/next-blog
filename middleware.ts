import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/admin"];
const publicRoutes = ["/login", "/signup"];

export async function middleware(req: NextRequest) {
  const response = (await middlewareAuth(req)) ?? NextResponse.next();

  // 更新session的expiration
  const res = await fetch(`${req.nextUrl.origin}/api/update-session`, {
    method: "GET",
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  const session = await res.json();

  if (session) {
    const { sessionKey, sessionId, expiresAt } = session;
    const expiresDate = new Date(expiresAt).toUTCString();

    response.headers.set(
      "Set-Cookie",
      `${sessionKey}=${sessionId}; HttpOnly; Secure; SameSite=Lax; Expires=${expiresDate}; Path=/`
    );
  }

  return response;
}

export async function middlewareAuth(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);

  const apiUrl = new URL("/api/get-user", req.nextUrl.origin);
  const user = await fetch(apiUrl, {
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  }).then((res) => res.json());

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && user) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
