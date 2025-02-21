import { getPaymentDetails } from "@/app/actions/guest/getPaymentDetails";
import calculateRatings from "@/utils/calculateRatings";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import PaymentNotFound from "../../success/[paymentID]/PaymentNotFound";
import Image from "next/image";
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi";
import { redirect } from "next/navigation";

const page = async ({ params }) => {
  const paymentID = params.paymentID;
  const response = await getPaymentDetails(paymentID);
  if (!response.success) {
    if (response.message === "Unauthorized access") {
      redirect(
        `/unauthorized?callback=${encodeURIComponent(
          `/hotel/payment/invoice/${paymentID}`
        )}`
      );
    } else if (response.message === "User not authenticated") {
      redirect(
        `/login?callback=${encodeURIComponent(
          `/hotel/payment/invoice/${paymentID}`
        )}`
      );
    } else if (
      response.message === "Payment not found" ||
      response.message === "Invalid payment ID"
    ) {
      return <PaymentNotFound />;
    }
  }
  const paymentDetails = response.payment;

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg max-w-4xl w-full p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-600">
            Payment Receipt
            {paymentDetails?.paymentStatus === "pending" && (
              <span className="text-red-500">(Unpaid)</span>
            )}
          </h1>
          <p className="text-gray-500">Your booking details are below</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <Image
              width={768}
              height={512}
              src={paymentDetails.hotel.images[0]}
              alt="Hotel Image"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-2/3 flex flex-col justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              {paymentDetails.hotel.title}
            </h2>
            <p className="text-gray-600 mt-2">
             {paymentDetails.hotel.description}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-yellow-500">
                &#9733; {calculateRatings(paymentDetails.hotel)}
              </span>
              <span className="text-gray-500">
                ({paymentDetails.hotel.ratings.length} reviews)
              </span>
            </div>
          </div>
        </div>
        <hr className="my-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-green-600">Booking Details</h3>
            <p className="text-sm text-gray-600 mt-1">
              Check-in:{" "}
              <span className="font-medium">
                {paymentDetails.checkIn.toISOString().split("T")[0]}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Check-out:{" "}
              <span className="font-medium">
                {paymentDetails.checkOut.toISOString().split("T")[0]}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Issued at:{" "}
              <span className="font-medium">
                {paymentDetails.createdAt.toISOString().split("T")[0]}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Guests:{" "}
              <span className="font-medium">{paymentDetails.guests}</span>
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-green-600">Guest Details</h3>
            <p className="text-sm text-gray-600 mt-1">
              Name:{" "}
              <span className="font-medium">{paymentDetails.user.name}</span>
            </p>
            <p className="text-sm text-gray-600">
              Email:{" "}
              <span className="font-medium">{paymentDetails.user.email}</span>
            </p>
          </div>
        </div>
        <hr className="my-6" />
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-green-600">Price Details</h3>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Price per night:</span>
            <span>${paymentDetails.pricePerNight}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Nights:</span>
            <span>
              X{" "}
              {(paymentDetails.checkOut - paymentDetails.checkIn) /
                (1000 * 3600 * 24)}
            </span>
          </div>
          <hr className="my-1" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Price per guests:</span>
            <span>
              $
              {paymentDetails.pricePerNight *
                ((paymentDetails.checkOut - paymentDetails.checkIn) /
                  (1000 * 3600 * 24))}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Guests:</span>
            <span>X {paymentDetails.guests}</span>
          </div>
          <hr className="my-1" />
          <div className="flex justify-between font-semibold text-sm text-gray-700">
            <span>Total:</span>
            <span>
              $
              {paymentDetails.guests *
                paymentDetails.pricePerNight *
                ((paymentDetails.checkOut - paymentDetails.checkIn) /
                  (1000 * 3600 * 24))}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Cleaning fee:</span>
            <span>$17.50</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Service fee:</span>
            <span>$51.31</span>
          </div>
          <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between text-sm font-semibold text-gray-700">
            <span>Grand Total:</span>
            <span>${paymentDetails.amount}</span>
          </div>
        </div>
        <div className="w-full flex justify-center my-4">
          {paymentDetails.paymentStatus === "pending" ? (
            <Link
              href={`/api/payment/${paymentID}`}
              className="bg-accent text-white px-3 py-2 text-sm border border-gray-300 rounded-lg hover:opacity-80 flex justify-center items-center gap-1"
            >
              <HiOutlineCurrencyBangladeshi className="text-xl mr-1" />
              Pay Now
            </Link>
          ) : (
            <Link
              href={`/api/payment/receipt/${paymentID}`}
              className="bg-accent text-white px-3 py-2 text-sm border border-gray-300 rounded-lg hover:opacity-80 flex justify-center items-center gap-1"
            >
              <FaDownload className="mr-2" />
              Download Receipt
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
