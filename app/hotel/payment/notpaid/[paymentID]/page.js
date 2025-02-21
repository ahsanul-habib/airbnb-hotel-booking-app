import { getPaymentDetails } from "@/app/actions/guest/getPaymentDetails";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";

const PaymentNotPaid = async ({ params }) => {
  const { paymentID } = params;
  const paymentDetails = await getPaymentDetails(paymentID);

  if (!paymentDetails || !paymentDetails.success) {
    if (paymentDetails.message === "User not authenticated") {
      redirect(
        `/login?callback=${encodeURIComponent(
          `/hotel/payment/notpaid/${paymentID}`
        )}`
      );
    } else if (paymentDetails.message === "Invalid payment ID"||paymentDetails.message === "Payment not found") {
      redirect(`/hotel/payment/notfound`);
    } else if(paymentDetails.message === "Unauthorized access"){
      redirect(`/hotel/payment/unauthorized`);
    } 
    else redirect(`/error`);
  }

  if (paymentDetails?.payment?.paymentStatus === "paid") {
    redirect(`/hotel/payment/alreadypaid/${paymentID}`);
  }

  return (
    <div className="h-full flex-grow bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <FaExclamationTriangle className="text-yellow-500 text-6xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Payment Not Paid
        </h2>
        <p className="text-gray-600 mb-6">
          Your payment is currently pending. Please complete the payment to
          access your services.
        </p>
        <Link
          href={`/api/payment/${paymentID}`}
          className="w-full bg-accent text-white py-2 px-3 rounded-lg hover:opacity-85 transition-colors duration-300"
        >
          Pay Now
        </Link>
      </div>
    </div>
  );
};

export default PaymentNotPaid;
