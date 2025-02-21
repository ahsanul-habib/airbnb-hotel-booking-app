import { FaHotel } from 'react-icons/fa'
import { ImSpinner9 } from 'react-icons/im';
const loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full flex-grow bg-blue-50 p-4">
    <div className="text-center">
      <FaHotel className="mx-auto mb-6 text-accent text-6xl" />
      <h1 className="text-3xl font-bold text-accent mb-4">
        Loading...
      </h1>
      <p className="text-accent mb-6">
        Seat back tight while we load the page for you...
      </p>
      <ImSpinner9 className="mx-auto text-4xl text-accent animate-spin" />
    </div>
  </div>

  )
}

export default loading