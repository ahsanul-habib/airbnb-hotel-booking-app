"use client";

import { FaHotel, FaSpinner } from "react-icons/fa";
import HotelPaymentInvalidPage from "../../error/page";
import { useEffect } from "react";
import updatePaymentStatus from "@/app/actions/guest/updatePaymentStatus";
import { toast } from "keep-react";
import { useRouter } from "next/navigation";

const HotelPaymentLoadingPage = ({ params }) => {
  const { encryptedID: encryptedPaymentID } = params;
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    if (encryptedPaymentID) {
      toast.promise(
        async () => {
          const response = await updatePaymentStatus(encryptedPaymentID);
          if (!isMounted) return;
          if (response.success) {
            router.push(`/hotel/payment/success/${response.paymentID}`);
            return response;
          } else {
            if (response.error === "Invalid encrypted payment ID.") {
              router.push("/hotel/payment/sslcommerz/error");
            }
            else if (
              response.error === "You must be logged in to perform this action."
            ) {
              router.push(
                `/login?callback=${encodeURIComponent(
                  "/hotel/payment/sslcommerz/success/" + encryptedPaymentID
                )}`
              );
            }
            else if(response.error === 'Payment is already paid.') {
              router.push(`/hotel/payment/alreadypaid/${response.paymentID}`);

            }
            throw new Error(response.error);
          }
        },
        {
          loading: "Saving payment details info...",
          success: (data) => {
            return `Successfully saved.We are redirecting for you!`;
          },
          error: (error) => {
            console.log(error);
            return `Updating payment info failed: ${error}`;
          },
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [encryptedPaymentID, router]);

  if (!encryptedPaymentID) {
    return <HotelPaymentInvalidPage />;
  }

  return (
    <div className="h-full flex-grow bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <FaHotel className="text-accent text-6xl animate-pulse" />
        </div>

        <div className="flex items-center justify-center space-x-3 mb-6">
          <FaSpinner className="text-accent text-4xl animate-spin" />
          <h1 className="text-2xl font-semibold text-gray-700">
            Processing Your Booking
          </h1>
        </div>

        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Please wait while we secure your hotel reservation. Do not close or
          refresh this page.
        </p>

        <div className="w-64 mx-auto h-2 bg-gray-300 rounded-full overflow-hidden">
          <div className="h-full bg-accent animate-progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default HotelPaymentLoadingPage;
