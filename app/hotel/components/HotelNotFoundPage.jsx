import Link from 'next/link'
import { FaHome, FaHotel } from 'react-icons/fa'

const HotelNotFoundPage = ({hotelID}) => {
  return (
    <div className="h-full flex-grow bg-gray-100 flex flex-col items-center justify-center p-4">
    <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full">
      <FaHotel className="mx-auto text-6xl text-accent mb-6" />
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Hotel Not Found
      </h1>
      
      <p className="text-gray-600 mb-6">
        We&apos;re sorry, but the hotel you are looking for (id:&quot;{hotelID}&quot;) does not exist or has been removed.
      </p>
      
      <div className="flex justify-center space-x-4">
        <Link 
          href="/" 
          className="flex items-center text-accent px-4 py-2 border-2 border-accent rounded-lg hover:bg-accent hover:text-white transition duration-300"
        >
          <FaHome className="mr-2" /> Return Home
        </Link>
        
        <Link 
          href="/hotel/create" 
          className="flex items-center bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent transition duration-300"
        >
          Create Hotel
        </Link>
      </div>
    </div>
  </div>
  )
}

export default HotelNotFoundPage