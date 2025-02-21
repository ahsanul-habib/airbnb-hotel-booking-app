import Link from 'next/link';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFoundPage = () => {

  return (
    <div className="flex flex-col items-center justify-center h-full flex-grow bg-blue-50 p-4">
      <div className="text-center bg-white shadow-lg rounded-xl p-8 max-w-md">
        <FaExclamationTriangle className="text-accent text-6xl mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link 
          href="/"
          className="flex items-center justify-center mx-auto bg-accent text-white px-6 py-3 rounded-lg hover:opacity-85 transition duration-300"
        >
          <FaHome className="mr-2" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;