"use server"

import { auth } from "@/auth";
import dbConnect from "@/db/connectMongo";
import hotelModel from "@/models/hotelModel";
import PaymentModel from "@/models/paymentModel";
import userModel from "@/models/userModel";

const initiatePaymentDetails = async (paymentData) => {
  try {
    const session=await auth();

    if(!session){
      return { isSuccess: false, message: 'User not authenticated' };
    }

    const user = session.user.id;

    await dbConnect();

    const { 
      hotelID, cardNumber, expiration, cvv, streetAddress, aptOrSuite, 
      city, state, zipCode,guests, checkIn, checkOut
    } = paymentData;

    const hotelResponse=await hotelModel.findById(hotelID).lean();

    if(!hotelResponse){
      return { isSuccess: false, message: 'Hotel not found' };
    }

    const pricePerNight=hotelResponse.pricePerNight;

    if (!user) {
      return { isSuccess: false, message: 'User ID is required' };
    }

    if (!hotelID) {
      return { isSuccess: false, message: 'Hotel ID is required' };
    }

    if (!cardNumber) {
      return { isSuccess: false, message: 'Card number is required' };
    }

    if (!pricePerNight) {
      return { isSuccess: false, message: 'Price per night is required' };
    }

    if (!expiration) {
      return { isSuccess: false, message: 'Expiration date is required' };
    }

    if (!cvv) {
      return { isSuccess: false, message: 'CVV is required' };
    }

    if (!streetAddress) {
      return { isSuccess: false, message: 'Street address is required' };
    }

    if (!city) {
      return { isSuccess: false, message: 'City is required' };
    }

    if (!state) {
      return { isSuccess: false, message: 'State is required' };
    }

    if (!zipCode) {
      return { isSuccess: false, message: 'ZIP code is required' };
    }

    if (!guests) {
      return { isSuccess: false, message: 'Number of guests is required' };
    }

    if (!checkIn) {
      return { isSuccess: false, message: 'Check-in date is required' };
    }

    if (!checkOut) {
      return { isSuccess: false, message: 'Check-out date is required' };
    }

    const payment = new PaymentModel({
      user,
      hotel:hotelID,
      cardNumber,
      expiration,
      cvv,
      streetAddress,
      aptOrSuite,
      city,
      state,
      zipCode,
      pricePerNight,
      paymentStatus:'pending',
      amount:pricePerNight*guests*(checkOut-checkIn)/ (1000 * 3600 * 24)+17.50+51.31,
      guests,
      checkIn,
      checkOut
    });

    const savedPayment=await payment.save();

    const userDB = await userModel.findById(user);

    if (!userDB) {
      return { success: false, message: "User not found" };
    }

    userDB.myBookings.push(savedPayment._id);

    await userDB.save();


    return { isSuccess: true, message: 'Payment saved successfully', paymentID: savedPayment._id.toString(), amount: savedPayment.amount };
  } catch (error) {
    console.error('Error saving payment:', error);

    return { isSuccess: false, message: error.message || 'An error occurred' };
  }
};


export default initiatePaymentDetails;