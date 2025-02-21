"use server"

import { auth } from "@/auth";
import hotelModel from "@/models/hotelModel";

export default async function deleteRating(hotelID) {
    const session = await auth();
    
    if (!session?.user?.email) {
        return { isSuccess: false, message: 'User not authenticated, Please login again!' };
    }

    const hotel = await hotelModel.findById(hotelID);

    if (!hotel) {
        return { isSuccess: false, message: 'Hotel not found!' };
    }

    const { email } = session.user;

    const ratingIndex = hotel.ratings.findIndex(rating => rating.email === email);

    if (ratingIndex === -1) {
        return { isSuccess: false, message: 'Rating not found for this user!' };
    }

    hotel.ratings.splice(ratingIndex, 1);

    await hotel.save();

    return { isSuccess: true, message: 'Rating deleted successfully!' };
}
