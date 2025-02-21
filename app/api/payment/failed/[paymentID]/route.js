import { NextResponse } from "next/server";

export async function POST(req, {params}) {
  const paymentID=params.paymentID;
  return NextResponse.redirect(process.env.BASE_URL+`/hotel/payment/sslcommerz/failed?callback=${encodeURIComponent(`/api/payment/`+paymentID)}`,303);
}

export async function GET(req, {params}) {
  const paymentID=params.paymentID;
  return NextResponse.redirect(process.env.BASE_URL+`/hotel/payment/sslcommerz/failed?callback=${encodeURIComponent(`/api/payment/`+paymentID)}`,303);
}