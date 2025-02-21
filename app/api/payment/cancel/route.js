import { NextResponse } from "next/server";

export function POST(req, {params}) {
  return NextResponse.redirect(process.env.BASE_URL+`/hotel/payment/sslcommerz/cancel`,303);
}

export function GET(req, {params}) {
  return NextResponse.redirect(process.env.BASE_URL+`/hotel/payment/sslcommerz/cancel`,303);
}