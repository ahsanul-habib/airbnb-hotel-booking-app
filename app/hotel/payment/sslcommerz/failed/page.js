"use client"

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { FaExclamationTriangle, FaHotel } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';

const HotelPaymentErrorPage = () => {
  const router = useRouter();
  const searchParams=useSearchParams();
  const callbackUrl=searchParams.get('callback');
  const handleRetry = () => {
    router.push(callbackUrl? decodeURIComponent(callbackUrl):'/');
  };

  return (
    <div className="h-full bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full border-2 border-red-200">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <FaExclamationTriangle className="text-red-600 text-6xl" />
          </div>
        </div>
        
        <div className="flex justify-center items-center mb-4">
          <FaHotel className="text-gray-500 mr-3 text-3xl" />
          <h1 className="text-2xl font-bold text-gray-800">Payment Failed</h1>
        </div>
        
        <p className="text-gray-600 mb-6 px-4">
          We couldn&apos;t process your hotel booking payment. 
          This could be due to insufficient funds, card issues, or network problems. Your booking is saved and you can retry payment anytime from <Link href='/hotel/bookings' className='text-blue-500'>my bookings</Link>.
        </p>
        
        <div className="bg-red-100 p-4 rounded-lg mb-6 border border-red-200">
          <p className="text-red-700 font-medium">
            Error: Payment Authorization Declined
          </p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={handleRetry}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            <IoMdRefresh className="mr-2" />
            Retry Payment
          </button>
        </div>
      </div>
    </div>
  );
};

const Wrapper=()=>{
    return (
      <Suspense>
        <HotelPaymentErrorPage />
      </Suspense>
    )
}


export default Wrapper;