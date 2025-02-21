import Link from 'next/link';
import { FaSearchDollar } from 'react-icons/fa';

const PaymentNotFound= () => {
  return (
    <div className="h-full flex-grow bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <FaSearchDollar className="text-red-500 text-6xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Not Found</h2>
        <p className="text-gray-600 mb-6">
          We could not locate the payment information. Please check the details and try again.
        </p>
        <Link 
          href={`/hotel/bookings`}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Manage your bookings
        </Link>
      </div>
    </div>
  );
};

export default PaymentNotFound; 