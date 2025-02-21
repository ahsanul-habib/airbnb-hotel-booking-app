import { NextResponse } from "next/server";

export function POST(req, {params}) {
  const encryptedID=params.paymentID;
  if(!encryptedID){
    return NextResponse.redirect(process.env.BASE_URL+"/hotel/payment/sslcommerz/failed",303);
  }
  return NextResponse.redirect(process.env.BASE_URL+`/hotel/payment/sslcommerz/success/${encryptedID}`,303);
}