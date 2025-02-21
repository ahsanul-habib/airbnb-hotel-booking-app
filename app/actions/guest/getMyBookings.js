'use server'

import dbConnect from "@/db/connectMongo";
import { auth } from "@/auth";
import userModel from "@/models/userModel";
import PaymentModel from "@/models/paymentModel";
import hotelModel from "@/models/hotelModel";

export default async function getMyBookings() {
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, message: 'Authentication required!' };
  }

  try {
    await dbConnect();

    const user = await userModel.findOne({ email: session.user.email })
    .populate({
      path: 'myBookings',
      populate: {
        path: 'hotel'
      }
    });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    return { success: true, bookings: user.myBookings };
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return { success: false, message: 'Error retrieving hotels' };
  }
}
