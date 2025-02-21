"use server";

import { auth } from "@/auth";
import dbConnect from "@/db/connectMongo";
import hotelModel from "@/models/hotelModel";

export default async function submitReview(review) {
  const session = await auth();
  if (!session) {
    return { isSuccess: false, message: "User not authenticated" };
  }

  await dbConnect();

  const { hotelID, rating, description } = review;

  if (!hotelID || !rating || !description) {
    throw new Error("Missing required fields!");
  }

  if (isNaN(rating) || rating < 1 || rating > 5) {
    throw new Error("Invalid rating!");
  }

  const { name, email, image } = session?.user;

  if (!name || !email || !image) {
    throw new Error("User details not found! Please login again.");
  }

  try {
    const hotel = await hotelModel.findById(hotelID);
    if (!hotel) {
      throw new Error("Hotel not found.");
    }

    const newRating = {
      name,
      email,
      image,
      rating: Number(rating),
      description,
    };
    hotel.ratings.push(newRating);

    await hotel.save();

    return { success: true, message: "Review submitted successfully!" };
  } catch (error) {
    console.error("Error submitting review:", error);
    return {
      success: false,
      message: "Failed to submit review. Please try again later.",
    };
  }
}
