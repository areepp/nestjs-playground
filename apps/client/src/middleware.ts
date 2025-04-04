import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINT } from "./lib/constants";

export async function middleware(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie");

  // If no cookies exist, redirect to login immediately
  if (!cookieHeader) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  try {
    const refreshResponse = await fetch(`${API_ENDPOINT}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: cookieHeader, // Pass cookies from request headers
      },
      credentials: "include",
    });

    // If refresh fails, redirect to login
    if (!refreshResponse.ok) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }


    return NextResponse.next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }
}

// Protect /auth and /posts routes
export const config = {
  matcher: ["/auth", "/posts"],
};