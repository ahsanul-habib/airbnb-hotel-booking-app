import { FaHotel, FaSpinner } from "react-icons/fa"

const loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full flex-grow bg-blue-50 p-4">
    <div className="text-center">
      <FaHotel className="mx-auto mb-6 text-6xl text-accent animate-pulse" />
      <h1 className="text-3xl font-bold text-accent mb-4">
        Booking Your Perfect Stay
      </h1>
      <p className="text-accent mb-6">
        Finding the best rooms just for you...
      </p>
      <div className="flex justify-center items-center">
        <FaSpinner className="animate-spin text-4xl text-accent" />
      </div>
    </div>
  </div>
  )
}

export default loading