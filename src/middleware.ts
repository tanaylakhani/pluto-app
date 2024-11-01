import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {}

// import { signToken, verifyToken } from "@/lib/actions";
// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// // const protectedRoutes = "/w";

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const sessionCookie = request.cookies.get("session");
//   if (
//     !sessionCookie &&
//     (pathname.includes("/w/") || pathname.includes("/workspace"))
//   ) {
//     return NextResponse.redirect(new URL("/login", request.nextUrl));
//   }

//   let res = NextResponse.next();

//   if (sessionCookie) {
//     try {
//       res.headers.append("session", sessionCookie?.value);
//     } catch (error) {
//       console.error("Error updating session:", error);
//       res.cookies.delete("session");
//     }
//   }

//   return res;
// }

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/(dashboard)/(.*)",
  ],
};
