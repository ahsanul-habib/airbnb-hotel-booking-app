"use server";

import dbConnect from "@/db/connectMongo";
import hotelModel from "@/models/hotelModel";

export async function getAllHotels(page=-1,searchQuery="") {
  try {
    await dbConnect();

    const filter = searchQuery
    ? { title: { $regex: searchQuery, $options: "i" } } // Case-insensitive search on title
    : {};

    const hotels = await hotelModel.find(filter).lean();

    return {
      success: true,
      totalHotels: hotels.length,
      hotels: page===-1? hotels : hotels.slice((page-1) * 8, (page-1) * 8 + 8),
    };
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return {
      success: false,
      message: "Error fetching hotels",
    };
  }
}
