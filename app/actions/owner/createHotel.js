"use server"

import dbConnect from "@/db/connectMongo";
import validateFormData from "@/utils/validateFormData";
import hotelModel from "@/models/hotelModel";
import { auth } from "@/auth";
import userModel from "@/models/userModel";

export async function saveHotel(formData) {
    const session=await auth();
    if(!session?.user?.name){
        return { success: false, message: 'Authentication required!' };
    }
    formData.owner=session.user.name;
    formData.ownerEmail=session.user.email;

    const validation = validateFormData(formData);
    if (!validation.isValid) {
      return { success: false, message: validation.message };
    }

    try {
      await dbConnect();

      const newHotel = new hotelModel({
        ...formData,
      });

      await newHotel.save();

      const user = await userModel.findOne({ email: session.user.email });
      if (user) {
        user.myHotels.push(newHotel._id);
        await user.save();
      }
  
      return { success: true, message: 'Hotel added successfully', hotelID: newHotel._id.toString() };
    } catch (error) {
      console.error("This error:",error);
      return { success: false, message: 'Error saving hotel data' };
    }
  }