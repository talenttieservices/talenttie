import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  const isAuthRoute = pathname === "/login" || pathname.startsWith("/register")
  const isApiRoute = pathname.startsWith("/api")
  const isStaticRoute =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")

  if (isStaticRoute || isApiRoute) {
    return NextResponse.next()
  }

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && token) {
    const dashboardUrl =
      token.role === "ADMIN"
        ? "/admin/dashboard"
        : token.role === "EMPLOYER"
          ? "/employer/dashboard"
          : "/candidate/dashboard"
    return NextResponse.redirect(new URL(dashboardUrl, request.url))
  }

  // Public routes
  const publicPrefixes = [
    "/", "/jobs", "/blog", "/about", "/contact", "/for-employers",
    "/privacy-policy", "/terms-of-service", "/cookie-policy",
    "/companies", "/login", "/register",
  ]
  const isPublicRoute = publicPrefixes.some(
    (route) => pathname === route || (route !== "/" && pathname.startsWith(route + "/"))
  )

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Protected routes
  if (!token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Role-based access
  if (pathname.startsWith("/candidate") && token.role !== "CANDIDATE") {
    return NextResponse.redirect(new URL("/", request.url))
  }
  if (pathname.startsWith("/employer") && token.role !== "EMPLOYER") {
    return NextResponse.redirect(new URL("/", request.url))
  }
  if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
