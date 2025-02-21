"use client";
import calculateRatings from "@/utils/calculateRatings";
import { FaStar } from "react-icons/fa";
import DatePickerComponent from "./DatePicker";
import { useState } from "react";
import { validateBookingDates } from "@/utils/validateBookingsDate";
import { toast } from "keep-react";
import { useRouter } from "next/navigation";

const BookingCard = ({ hotel }) => {
  const [formData, setFormData] = useState({
    checkIn: null,
    checkOut: null,
    guests: 0,
  });
  console.log(formData);
  const router = useRouter();
  const handleReservation = () => {
    const dateValidation = validateBookingDates(
      formData.checkIn,
      formData.checkOut
    );
    if (!dateValidation.isValid) {
      toast.error(dateValidation.message);
      return;
    }
    if (formData.guests <= 0) {
      toast.error("Invalid number of guests");
      return;
    }
    router.push(
      `/hotel/payment/${hotel._id.toString()}?checkIn=${
        formData.checkIn.toLocaleDateString('en-CA')
      }&checkOut=${formData.checkOut.toLocaleDateString('en-CA')}&guests=${
        formData.guests
      }`
    );
  };

  return (
    <div>
      <div className="bg-white shadow-lg rounded-xl p-6 border">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-xl font-bold">${hotel.pricePerNight}</span>
            <span className="text-gray-600 ml-1">per night</span>
          </div>
          <div className="flex items-center">
            <FaStar className="text-yellow-500 mr-1" />
            <span>{calculateRatings(hotel)}</span>
          </div>
        </div>
        <div className="border rounded-lg mb-4">
          <div className="grid grid-cols-2 border-b">
            <DatePickerComponent
              label="Check In"
              date={formData.checkIn}
              setDate={(value) => setFormData({ ...formData, checkIn: value })}
            />
            <DatePickerComponent
              label="Check Out"
              date={formData.checkOut}
              setDate={(value) => setFormData({ ...formData, checkOut: value })}
            />
          </div>
          <input
            type="number"
            placeholder="Guests"
            value={formData.guests}
            onChange={(e) =>
              setFormData({ ...formData, guests: e.target.value })
            }
            className="w-full p-3"
          />
        </div>
        <button
          onClick={handleReservation}
          className="w-full block text-center bg-accent text-white py-3 rounded-lg transition-all hover:brightness-90"
        >
          Reserve
        </button>
        <div className="text-center mt-4 text-gray-600">
          <p>You won&apos;t be charged yet</p>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
