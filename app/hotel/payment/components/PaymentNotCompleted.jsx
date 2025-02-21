import Link from 'next/link';
import { FaCreditCard, FaExclamationCircle } from 'react-icons/fa';

const PaymentNotDonePage= ({paymentID}) => {

    return (
        <div className="h-full flex-grow bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center">
                <FaExclamationCircle className="mx-auto text-yellow-500 text-6xl mb-4" />
                
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Payment Not Completed</h2>
                
                <p className="text-gray-600 mb-6">
                    Your booking is pending. Please complete the payment to confirm your reservation.
                </p>
                
                <Link href={paymentID?`/api/payment/${paymentID}`:"/"} 
                    className={`w-full py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover-bg-blue-700 text-white bg-blue-50`}
                >
                    <FaCreditCard />
                    <span>{paymentID?`Pay Now`:"Go Home"}</span>
                </Link>
            </div>
        </div>
    );
};

export default PaymentNotDonePage;