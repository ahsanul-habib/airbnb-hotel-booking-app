import { FaSync, FaCheckCircle } from 'react-icons/fa';

const UpdatingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full flex-grow bg-indigo-50 p-4">
      <div className="text-center bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <div className="relative mb-6">
          <FaSync className="mx-auto text-6xl text-accent animate-spin" />
          <FaCheckCircle className="absolute top-0 right-1/2 translate-x-1/2 text-2xl text-accent opacity-0 animate-ping" />
        </div>
        
        <h1 className="text-3xl font-bold text-accent mb-4">
          Updating Reservation
        </h1>
        
        <p className="text-accent mb-6">
          Your booking details are being processed...
        </p>
        
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg p-4 flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-4" />
            <div className="flex-grow">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4 flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-4" />
            <div className="flex-grow">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatingPage;