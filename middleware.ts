import { NextRequest, NextResponse } from "next/server";
import { updateSessionExpiration, getUserFromSession } from "./lib/session";

const protectedRoutes = ["/admin"];
const publicRoutes = ["/login", "/signup"];

export async function middleware(req: NextRequest) {
  const response = (await middlewareAuth(req)) ?? NextResponse.next();

  // 更新session的expiration
  await updateSessionExpiration({
    set: (key, value, options) => {
      response.cookies.set({ ...options, name: key, value }); // 放到response中
    },
    get: (key) => req.cookies.get(key), // 从request中获取cookie
  });

  return response;
}

export async function middlewareAuth(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);

  const user = await getUserFromSession(req.cookies);

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
