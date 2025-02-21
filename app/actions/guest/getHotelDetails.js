"use server";

import dbConnect from "@/db/connectMongo";
import hotelModel from "@/models/hotelModel";
import mongoose from "mongoose";

export async function getHotelDetails(hotelID) {
  try {
    await dbConnect();
    if(!mongoose.Types.ObjectId.isValid(hotelID)){
      return { success: false, message: "Hotel not found" };
    }
    const hotel = await hotelModel.findById(hotelID).lean();
    if (!hotel) {
      return { success: false, message: "Hotel not found" };
    }
    return { success: true, hotel: { ...hotel, _id: hotel._id.toString() } };
  } catch (error) {
    console.log("Error retrieving hotel details:", error);
    return { success: false, message: "Error retrieving hotel details" };
  }
}
