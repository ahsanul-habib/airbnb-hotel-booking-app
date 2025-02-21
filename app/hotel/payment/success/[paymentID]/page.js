import { getPaymentDetails } from "@/app/actions/guest/getPaymentDetails";
import calculateRatings from "@/utils/calculateRatings";
import { FaMessage } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import TickSVG from "./TickSVG";
import Link from "next/link";
import { redirect } from "next/navigation";
import PaymentNotFound from "./PaymentNotFound";
import Image from "next/image";

const PaymentPage = async ({ params: { paymentID } }) => {
  const response = await getPaymentDetails(paymentID);
  if (!response.success) {
    if (response.message === "Unauthorized access") {
      redirect("/unauthorized");
    } else if (response.message === "User not authenticated") {
      redirect("/login?redirect=/hotel/payment/success/" + paymentID);
    } else if (
      response.message === "Payment not found" ||
      response.message === "Invalid payment ID"
    ) {
      return <PaymentNotFound />;
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-3xl mx-auto p-6">
        {/* Success Message Section */}
        <div className="text-center my-12">
          <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
            <TickSVG className="text-4xl text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-zinc-600 mb-8">
            Your booking has been confirmed. Check your email for details.
          </p>
        </div>
        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start gap-6 mb-6 pb-6 border-b">
            <Image
              width={128}
              height={128}
              src={response.payment.hotel.images[0]}
              alt="Property"
              className="w-32 h-32 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {response.payment.hotel.title}
              </h2>
              <div className="flex items-center mb-2">
                <i className="fas fa-star text-sm mr-1" />
                <span className="text-sm">
                  {calculateRatings(response.payment.hotel)} (
                  {response.payment.hotel.ratings.length} reviews)
                </span>
              </div>
              <p className="text-zinc-600">
                {response.payment.hotel.description}
              </p>
            </div>
          </div>
          {/* Reservation Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Reservation Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-600 text-sm">Check-in</span>
                  <span className="text-zinc-500 text-sm">
                    {response.payment.checkIn.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 text-sm">Check-out</span>
                  <span className="text-zinc-500 text-sm">
                    {response.payment.checkOut.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 text-sm">Guests</span>
                  <span className="text-zinc-500 text-sm">
                    {response.payment.guests} guest
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-600">Total amount paid</span>
                  <span className="font-semibold">
                    ${response.payment.amount}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 text-sm">Booking ID</span>
                  <span>{paymentID}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6">Next Steps</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="text-primary">
                <MdEmail className="text-accent text-2xl" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Check your email</h4>
                <p className="text-zinc-600">
                  We&apos;ve sent your confirmation and trip details to your
                  email address.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-primary">
                <FaMessage className="text-accent text-xl" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Message your host</h4>
                <p className="text-zinc-600">
                  Introduce yourself and let them know your travel plans.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-primary h-full flex flex-col justify-center items-center">
                <FaSuitcaseRolling className="text-accent text-2xl" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Plan your trip</h4>
                <p className="text-zinc-600">
                  Review house rules and check-in instructions in your trip
                  details.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/api/payment/receipt/${paymentID}`}
            className="flex flex-row items-center px-6 py-3 bg-accent text-white rounded-lg hover:brightness-90"
          >
            <IoMdDownload className="mr-2 text-2xl" />
            Download Receipt
          </Link>
        </div>
        {/* Need Help Section */}
        <div className="mt-12 text-center">
          <p className="text-zinc-600">Need help with your booking?</p>
          <a href="#" className="text-primary hover:underline">
            Visit our Help Center
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
