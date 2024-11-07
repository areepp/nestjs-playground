import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINT } from "./lib/constants";

export async function middleware(req: NextRequest) {
  const refreshResponse = await fetch(`${API_ENDPOINT}/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // we need to send the cookie like this
      Cookie: cookies().toString(),
    },
    credentials: "include",
  });

  return refreshResponse.ok
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/auth/login", req.nextUrl));
}

export const config = {
  matcher: ["/auth", "/posts"],
};
