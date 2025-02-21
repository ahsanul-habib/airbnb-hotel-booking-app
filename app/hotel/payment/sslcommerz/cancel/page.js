import Link from 'next/link';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const OrderCancelledPage = () => {
  return (
    <div className="h-full flex-grow bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 text-center">
        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Cancelled</h2>
        <p className="text-gray-600 mb-6">
          Your booking has been successfully cancelled. 
          A refund will be processed according to our cancellation policy.
        </p>
        <Link
            href="/" 
          className="w-full bg-accent text-white py-2 px-3 rounded-lg hover:opacity-85 transition duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderCancelledPage;