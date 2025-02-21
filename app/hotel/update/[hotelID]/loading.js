import { FaHotel, FaSpinner } from 'react-icons/fa';

const HotelUpdateLoadingPage = () => {
    return (
        <div className="h-full flex-grow bg-blue-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 text-center w-96 space-y-6">
                <FaHotel className="mx-auto text-6xl text-accent" />
                
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        Updating Hotel Details
                    </h1>
                    
                    <p className="text-gray-600 mb-6">
                        Please wait while we update your hotel information
                    </p>

                    <div className="flex justify-center items-center">
                        <FaSpinner className="animate-spin text-4xl text-accent" />
                    </div>
                </div>

                <div className="text-sm text-gray-500">
                    Do not close or refresh this page
                </div>
            </div>
        </div>
    );
};

export default HotelUpdateLoadingPage;