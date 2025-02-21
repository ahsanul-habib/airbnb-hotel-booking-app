import { NextResponse } from "next/server";
import {  getAuth } from "./auth-config";
// import { getSession } from "next-auth/react";
// import { auth } from "./auth";

const secret = process.env.AUTH_SECRET;


export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  const privateRoutes = ["/hotel/create", "/hotel/manage", "/hotel/bookings","/hotel/payment","/hotel/update"];
  
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (isPrivateRoute) {
    const auth=await getAuth();
    const token=await auth();
    if (!token) {
      return NextResponse.redirect(new URL(`/login?callback=${encodeURIComponent(pathname)}`, req.url))
    }
    else return NextResponse.next();
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
 };