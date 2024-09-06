import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    console.log("The token", token);
    const nextauthtoken = await getToken({
      req: request,
      secret: process.env.JSONWEBTOKEN as string,
    });

    console.log("Custom token:", token);
    console.log("NextAuth JWT Token:", nextauthtoken);

    const path = request.nextUrl.pathname;

    if ((token || nextauthtoken) && (path === "/login" || path === "/signup")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!token && !nextauthtoken && path !== "/login" && path !== "/signup") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/signup"],
};
