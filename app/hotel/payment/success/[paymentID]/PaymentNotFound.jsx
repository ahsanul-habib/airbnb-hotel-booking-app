import Link from 'next/link';
import { FaCreditCard, FaExclamationCircle } from 'react-icons/fa';

const PaymentNotFound= () => {
  return (
    <div className="h-full flex-grow bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <FaCreditCard className="text-6xl text-accent" />
          <FaExclamationCircle className="text-4xl text-red-500 -ml-4 mt-4" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Not Found</h1>
        
        <p className="text-gray-600 mb-6">
          We couldn&apos;t locate the payment you&apos;re looking for. It may have been canceled, expired, or doesn&apos;t exist.
        </p>
        
        <div className="flex space-x-4 justify-center">
          <Link 
          href={"/"}
            className="bg-accent text-white px-6 py-2 rounded-lg hover:opacity-85 transition-colors"
          >
            Go Home
          </Link>
          <Link
          href={"/hotel/bookings"} 
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            View Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentNotFound;