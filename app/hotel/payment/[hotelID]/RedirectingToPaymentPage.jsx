import { FaCreditCard } from 'react-icons/fa';

const RedirectingToPaymentPage = () => {

  return (
    <div className="flex flex-col items-center justify-center h-full flex-grow bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md text-center">
        <FaCreditCard className="mx-auto text-6xl text-accent mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Processing Payment
        </h2>
        <p className="text-gray-600 mb-6">
          Please wait while we redirect you to the payment gateway
        </p>
        <div className="flex justify-center space-x-2">
          <div className="w-4 h-4 bg-accent rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-accent rounded-full animate-pulse delay-100"></div>
          <div className="w-4 h-4 bg-accent rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default RedirectingToPaymentPage; 