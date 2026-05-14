import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(() => NextResponse.next(), {
  callbacks: {
    authorized({ token, req }) {
      const { pathname } = req.nextUrl;

      // Allow auth related paths
      if (
        pathname.startsWith("/api/auth") ||
        pathname === "/login" ||
        pathname === "/register"
      ) {
        return true;
      }

      // Public paths
      if (
        pathname === "/" ||
        pathname.startsWith("/api/videos") ||
        pathname.startsWith("/api/imagekit-auth")
      ) {
        return true;
      }

      // Protected paths — require token
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/((?!_next/image|_next/static|favicon.ico|public/).*)"],
};
