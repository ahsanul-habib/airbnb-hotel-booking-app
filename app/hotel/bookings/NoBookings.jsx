import Link from 'next/link';
import { FaHotel } from 'react-icons/fa';

const NoBookings= () => {
  return (
    <div className="flex flex-col items-center justify-center h-full flex-grow bg-gray-100 p-4">
      <FaHotel className="text-6xl text-accent mb-6" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        You have not booked any hotels yet
      </h2>
      <Link href={"/"} className="bg-accent text-white px-6 py-3 rounded-lg hover:opacity-85 transition-colors duration-300 flex items-center space-x-2">
        <span>Explore Hotels</span>
      </Link>
    </div>
  );
};

export default NoBookings;