import Link from "next/link";
import { FaHotel } from "react-icons/fa";

const NoHotelAvailable = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full flex-grow p-6 rounded-xl">
      <FaHotel className="text-6xl text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-3">
        No Hotels Found
      </h2>
      <p className="text-gray-500 text-center mb-6">
        It seems no hotel is available at the moment.
      </p>
      <Link
        href="/hotel/create"
        className="bg-accent text-white px-6 py-2 rounded-md hover:bg-opacity-85 transition-colors"
      >
        Add New Hotel
      </Link>
    </div>
  );
};

export default NoHotelAvailable;
