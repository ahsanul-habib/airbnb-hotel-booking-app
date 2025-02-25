import { NextResponse } from "next/server";
import { dataConfig, sslConfig } from "@/lib/sslCommerzConfig";
import dbConnect from "@/db/connectMongo";
import PaymentModel from "@/models/paymentModel";
import hotelModel from "@/models/hotelModel";
import CryptoJS from "crypto-js";
import { auth } from "@/auth";

export async function GET(request,{params}) {
  try {
    await dbConnect();

    const paymentId = params.paymentID;

    const session=await auth();

    if(!session?.user?.email){
      return NextResponse.redirect(`/login?callback=${encodeURIComponent(request.url)}`);
    }

    if (!paymentId) {
      return NextResponse.json({
        isSuccess: false,
        message: "Payment ID is required",
      });
    }

    const payment = await PaymentModel.findById(paymentId).populate("user").populate("hotel").lean();

    if (!payment) {
      return NextResponse.redirect(`/hotel/payment/notfound`);
    }

    if(payment.user.email!==session.user.email){
      return NextResponse.redirect(`/hotel/payment/unauthorized`);
    }

    if(payment.status==='paid'){
      return NextResponse.redirect(`/hotel/payment/alreadypaid/${paymentId}`);
    }

    const { amount, user, hotel } = payment;

    const encryptedPaymentID=await CryptoJS.AES.encrypt(paymentId, process.env.SSL_Commertz_SecretKey).toString().replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

    const data = dataConfig({
      total_amount: amount,
      tran_id: `TRAN_${paymentId}`,
      success_url: `${process.env.BASE_URL}/api/payment/success/${encryptedPaymentID}`,
      fail_url: `${process.env.BASE_URL}/api/payment/failed/${paymentId}`,
      cancel_url: `${process.env.BASE_URL}/api/payment/cancel`,
      product_name: hotel.title,
      product_category: "Hotel Booking",
      cus_name: user.name,
      cus_email: user.email,
      cus_add1: payment.streetAddress || "N/A",
      cus_phone: user.phone || "0000000000",
    });

    const result = await sslConfig.init(data);

    if (!result.GatewayPageURL || result.status === "FAILED") {
      return NextResponse.redirect(`/hotel/payment/sslcommerz/failed?callback=${encodeURIComponent(`/api/payment/`+paymentId)}`);
    }

    return NextResponse.redirect(result.GatewayPageURL);
  } catch (error) {
    console.error("Error initiating payment:", error);
    return NextResponse.json({
      isSuccess: false,
      message: error.message || "An error occurred while initiating payment",
    });
  }
}
