import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, request }) {
        const { pathname } = request.nextUrls;
        //allow auth related paths
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        // public paths
        if (pathname === "/" || pathname.startsWith("/api/videos")) {
          return true;
        }

        // blokced paths
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ["/((?!_next/image|_next/static|favicon.ico|public/).*)"],
};
