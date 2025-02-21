"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { NumberInputComponent } from "./NumberInputComponent";
import validateFormData from "@/utils/validatePaymentPageFormData";
import { toast } from "keep-react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import calculateRatings from "@/utils/calculateRatings";
import initiatePaymentDetails from "@/app/actions/guest/makePayment";
import DateRangePicker from "./DateRangePicker";
import RedirectingToPaymentPage from "./RedirectingToPaymentPage";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

const ReservePage = ({ hotel, checkIn, checkOut, guests }) => {
  console.log(checkIn, checkOut, guests);
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [formData, setFormData] = useState({
    hotelID: hotel._id,
    pricePerNight: hotel.pricePerNight,
    checkIn,
    checkOut,
    guests,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const error = validateFormData(formData);
    if (error) {
      toast.error(error);
      return;
    }
    toast.promise(
      async () => {
        const response = await initiatePaymentDetails(formData);

        if (response.isSuccess) {
          setIsRedirecting(true);
          router.push(`/api/payment/${response.paymentID}`);
          return response;
        } else {
          throw new Error(response.message || "Payment failed");
        }
      },
      {
        loading: "Processing payment...",
        success: (data) =>
          `Payment $${data.amount} initiated! Redirecting you to the payment page...`,
        error: (error) => {
          console.log(error);
          return `Payment failed: ${error.message || "An error occurred"}`;
        },
      }
    );
  };

  if(isRedirecting) {
    return <RedirectingToPaymentPage />;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href={`/hotel/details/${hotel.id}`} className="text-zinc-800 hover:underline">
            <IoArrowBackOutline className="mr-2" />
            Hotel Details
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your trip</h2>
              {/* Dates */}
              <div className="flex flex-col items-start mb-4">
                {/* <div> */}
                <h3 className="font-medium">Dates</h3>

                <DateRangePicker
                  checkIn={formData.checkIn}
                  checkOut={formData.checkOut}
                  onDone={(value) =>
                    setFormData({
                      ...formData,
                      checkIn: value?.from || formData.checkIn,
                      checkOut: value?.to || formData.checkOut,
                    })
                  }
                />
              </div>
              {/* Guests */}
              <NumberInputComponent
                value={formData.guests}
                changeTo={(value) =>
                  setFormData({ ...formData, guests: value })
                }
                maxGuests={hotel.numberOfGuests}
              />
            </section>
            {/* Payment Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Pay with American Express
              </h2>
              <div className="space-y-4">
                <input
                  type="number"
                  name="cardNumber"
                  placeholder="Card number"
                  className="w-full p-3 border rounded-lg"
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiration"
                    placeholder="Expiration"
                    className="p-3 border rounded-lg"
                    value={formData.expiration}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="cvv"
                    placeholder="CVV"
                    className="p-3 border rounded-lg"
                    maxLength={3}
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>
            {/* Billing Address */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Billing address</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="streetAddress"
                  placeholder="Street address"
                  className="w-full p-3 border rounded-lg"
                  value={formData.streetAddress}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="aptOrSuite"
                  placeholder="Apt or suite number"
                  className="w-full p-3 border rounded-lg"
                  value={formData.aptOrSuite}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  className="w-full p-3 border rounded-lg"
                  value={formData.city}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    className="p-3 border rounded-lg"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    placeholder="ZIP code"
                    className="p-3 border rounded-lg"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>
            {/* Book Button */}
            <button
              onClick={handleSubmit}
              className="w-full block text-center bg-accent text-white py-3 rounded-lg mt-6 hover:brightness-90"
            >
              Request to book
            </button>
          </div>
          {/* Right Column */}
          <div>
            {/* Price Details Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8 sticky top-0">
              <div className="flex items-start gap-4 mb-6">
                <Image
                  src={hotel.images[0]}
                  height={80}
                  width={80}
                  alt={hotel.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <p className="text-md font-bold">{hotel.title}</p>
                  <p className="text-sm">{hotel.description}</p>
                  <div className="flex items-center">
                    <FaStar className="text-sm mr-1" />
                    <span className="text-xs mt-1 text-zinc-500">
                      {calculateRatings(hotel)} ({hotel.ratings.length} Reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Price details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>
                      ${hotel.pricePerNight} x {formData.guests} guests x{" "}
                      {(formData.checkOut - formData.checkIn) /
                        (1000 * 3600 * 24)}{" "}
                      nights
                    </span>
                    <span>
                      $
                      {hotel.pricePerNight *
                        formData.guests *
                        ((formData.checkOut - formData.checkIn) /
                          (1000 * 3600 * 24))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>$17.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$51.31</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-3 border-t">
                    <span>Total (USD)</span>
                    <span>
                      $
                      {(hotel.pricePerNight *
                        formData.guests *
                        (formData.checkOut - formData.checkIn)) /
                        (1000 * 3600 * 24) +
                        17.5 +
                        51.31}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-12 text-sm text-zinc-500 max-w-7xl mx-auto py-4">
        <p>© 2024 Learn with Sumit • Terms • Privacy • Your Privacy Choices</p>
      </footer>
    </div>
  );
};

export default ReservePage;
