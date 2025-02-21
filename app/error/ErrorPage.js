"use client";

import { useRouter } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = ({
  message = "We're sorry, but the page you were looking for encountered an error.",
}) => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <FaExclamationTriangle className="text-red-500 text-6xl" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push("/")}
            className="bg-accent text-white px-4 py-2 rounded-md hover:opacity-85 transition-colors"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => router.refresh()}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;