import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
    const authorization = cookies().get("Authorization");
    // console.log(authorization);
    if (!authorization) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const token = authorization.value.split(" ")[1];
    // console.log(token);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify<{
      _id: string;
      username: string;
      email: string;
    }>(token, secret);
    // console.log(payload);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("userId", payload._id);
    const response = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });
    return response;
  }

  if (request.nextUrl.pathname.startsWith("/wishlist")) {
    const authorization = cookies().get("Authorization");

    if (!authorization) {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL as string);
    }
  }
}
