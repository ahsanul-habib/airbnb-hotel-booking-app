"use server";

import { auth } from "@/auth";
import dbConnect from "@/db/connectMongo";
import hotelModel from "@/models/hotelModel";

export const deleteHotel = async (hotelID) => {
  try {
    await dbConnect();

    if (!hotelID) {
      return { success: false, message: "Hotel ID is required." };
    }

    const session = await auth();

    if (!session || !session.user?.email) {
      return { success: false, message: "Unauthorized. Please log in." };
    }

    const hotel = await hotelModel.findById(hotelID);

    if (!hotel) {
        return { success: false, message: "Hotel not found." };
      }

      if (hotel.ownerEmail !== session.user.email) {
        return { success: false, message: "Unauthorized. You are not allowed to delete this hotel." };
      }

    const deletedHotel = await hotelModel.findByIdAndDelete(hotelID);

    if (!deletedHotel) {
        return { success: false, message: "Failed to delete the hotel." };
      }
  
      return { success: true, message: "Hotel deleted successfully." };
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return { success: false, message: "An error occurred while deleting the hotel." };
  }
};
