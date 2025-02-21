import { FaTimesCircle } from 'react-icons/fa';

const HotelOwnerRestriction= () => {
  return (
    <div className="flex flex-col items-center justify-center h-full flex-grow bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md">
        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Booking Restriction
        </h2>
        <p className="text-gray-600 mb-6">
          Hotel owners are not permitted to book their own hotels. This ensures 
          fair and transparent booking processes.
        </p>
        <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded">
          <p className="text-red-700 text-sm">
            Your account is identified as a hotel owner. Please use a different 
            account to make bookings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelOwnerRestriction;