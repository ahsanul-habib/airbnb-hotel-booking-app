
import Link from 'next/link';
import { FaHotel } from 'react-icons/fa';

const NoHotelsCreated= () => {

  return (
    <div className="flex flex-col flex-grow items-center justify-center h-full bg-gray-50 p-4">
      <FaHotel className="text-6xl text-accent mb-6" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        You have not created any hotels yet
      </h2>
      <Link href="/hotel/create"
        className="bg-accent text-white px-6 py-3 rounded-lg hover:opacity-85 transition-colors duration-300 flex items-center space-x-2"
      >
        Create One
      </Link>
    </div>
  );
};

export default NoHotelsCreated;