"use server"

import dbConnect from "@/db/connectMongo";
import PaymentModel from "@/models/paymentModel";
import HotelModel from "@/models/hotelModel";
import UserModel from "@/models/userModel";
import { auth } from "@/auth";
import mongoose from "mongoose";

export const getPaymentDetails = async (paymentId) => {
  try {
    const session=await auth();

    if(!session){
      return { success: false, message: 'User not authenticated' };
    }

    const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

    if (!isValidObjectId(paymentId)) {
      return { success: false, message: 'Invalid payment ID' };
    }

    if (!paymentId) {
      return { success: false, message: 'Payment ID is required' };
    }

    await dbConnect();

    const payment = await PaymentModel.findById(paymentId)
    ?.populate('hotel')
    ?.populate({
      path: 'user',
      select: 'name email',
    })
    ?.lean();

    if (!payment) {
      return { success: false, message: "Payment not found" };
    }

    if(payment.user.email!==session.user.email){
      return { success: false, message: "Unauthorized access" };
    }

    return { success: true, payment:{...payment,_id:payment._id.toString()} };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to fetch payment details" };
  }
};
