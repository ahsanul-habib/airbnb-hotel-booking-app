import Link from 'next/link';
import { FaExclamationTriangle, FaHotel } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';

const HotelPaymentInvalidPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-md w-full border-2 border-red-200">
        <div className="bg-red-50 border-b border-red-200 p-6 flex items-center">
          <FaExclamationTriangle className="text-red-500 text-3xl mr-4" />
          <h1 className="text-xl font-semibold text-gray-800">Payment Error</h1>
        </div>
        
        <div className="p-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <FaHotel className="text-red-600 text-5xl" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Invalid Payment Identifier</h2>
          
          <p className="text-gray-600 mb-6 px-4">
            The payment process cannot be completed due to an invalid payment ID or a system-level error. 
            Please restart your booking or contact our support team.
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 font-medium">
              Error: Invalid Payment Identifier (PID-404)
            </p>
          </div>
          
          <div className="space-y-4">
            <Link href={"/"}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <IoMdArrowBack className="mr-2" />
              Go to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelPaymentInvalidPage;