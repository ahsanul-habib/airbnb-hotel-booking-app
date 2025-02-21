"use server";

import dbConnect from "@/db/connectMongo";
import HotelModel from "@/models/hotelModel";
import { auth } from "@/auth";

export const updateHotel = async (hotelId, hotelData) => {
  try {
    // Authenticate user
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, message: "Authentication required!" };
    }

    if (!hotelId) {
      return { success: false, message: "Hotel ID is required." };
    }

    // Connect to the database
    await dbConnect();

    // Find the hotel by ID
    const hotel = await HotelModel.findById(hotelId);
    if (!hotel) {
      return { success: false, message: "Hotel not found." };
    }

    // Check if the current user owns the hotel
    if (hotel.ownerEmail !== session.user.email) {
      return { success: false, message: "Unauthorized access." };
    }

    // Validate the updated hotel data if necessary (add validation logic if required)

    // Update the hotel
    await HotelModel.updateOne({ _id: hotelId }, { $set: hotelData });

    return { success: true, message: "Hotel updated successfully." };
  } catch (error) {
    console.error("Error updating hotel:", error);
    return { success: false, message: "Failed to update hotel." };
  }
};
