import { FaHotel } from 'react-icons/fa'
import { ImSpinner9 } from 'react-icons/im';
const Loading = () => {
  return (
    <div className="absolute z-10 flex flex-col items-center justify-center min-h-screen w-screen bg-blue-50 p-4">
    <div className="text-center">
      <FaHotel className="mx-auto mb-6 text-accent text-6xl" />
      <h1 className="text-3xl font-bold text-accent mb-4">
        Loading...
      </h1>
      <p className="text-accent mb-6">
        Seat back tight while we loading the login page for you...
      </p>
      <ImSpinner9 className="mx-auto text-4xl text-accent animate-spin" />
    </div>
  </div>

  )
}

export default Loading