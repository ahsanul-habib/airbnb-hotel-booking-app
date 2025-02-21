import { getPaymentDetails } from "@/app/actions/guest/getPaymentDetails";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaCheckCircle, FaFileDownload, FaRoute } from "react-icons/fa";

const PaymentAlreadyPaid = async ({ params }) => {
  const { paymentID } = params;
  const paymentDetails = await getPaymentDetails(paymentID);

  if (!paymentDetails || !paymentDetails.success) {
    if (paymentDetails?.message === "User not authenticated") {
      redirect(
        `/login?callback=${encodeURIComponent(
          `/hotel/payment/alreadypaid/${paymentID}`
        )}`
      );
    } else if (
      paymentDetails?.message === "Invalid payment ID" ||
      paymentDetails?.message === "Payment not found"
    ) {
      redirect(`/hotel/payment/notfound`);
    } else if (paymentDetails?.message === "Unauthorized access") {
      redirect(`/hotel/payment/unauthorized`);
    } else redirect(`/error`);
  }

  if (paymentDetails?.payment?.paymentStatus === "pending") {
    redirect(`/hotel/payment/notpaid/${paymentID}`);
  }

  return (
    <div className="h-full flex-grow bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-accent text-6xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Already Paid</h2>
        <p className="text-gray-600 mb-6">
          This payment has already been paid. Our records indicate that you have
          already completed the payment for this transaction. No further action
          is required at this time. If you believe this is an error or need
          additional information, please contact our customer support team for
          assistance.
        </p>
        <div className="flex space-x-4">
          <Link
            href={`/hotel/payment/invoice/${paymentID}`}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <FaRoute />
            View Trip
          </Link>
          <Link
            href={`/api/payment/receipt/${paymentID}`}
            className="flex-1 bg-accent text-white py-3 rounded-lg hover:opacity-85 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <FaFileDownload />
            Download PDF
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentAlreadyPaid;
