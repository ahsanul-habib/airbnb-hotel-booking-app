import getMyBookings from "@/app/actions/guest/getMyBookings";
import Image from "next/image";
import Link from "next/link"
import { FaDownload } from "react-icons/fa"
import NoBookings from "./NoBookings";

const page = async() => {
    const response=await getMyBookings();
    if(!response.success){
      return (<div>Error</div>);
    }
    const myBookings=response.bookings;
    if(!myBookings || myBookings.length===0){
      return (<NoBookings/>);
    }

  return (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
    <div className="space-y-4">
      {
        myBookings.map(booking=>(
      <div key={booking._id.toString()} className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-4">
          <Image src={booking.hotel.images[0]} width={96} height={96} alt="Property Thumbnail" className="w-24 h-24 object-cover rounded-md" />
          <div>
            <h2 className="text-lg text-zinc-800 font-semibold">
              {booking.hotel.title}
            </h2>
            <p className="text-zinc-500 text-sm">Booking Date: {booking?.createdAt?.toISOString()?.split("T")[0]}</p>
            <p className="text-zinc-500 text-sm">Booking Code: {booking._id.toString()}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {
          booking.paymentStatus==="pending"?(
            <>
          <Link href={`/hotel/payment/invoice/${booking._id.toString()}`} className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex justify-center items-center gap-2">
            View Trip Details
          </Link>
            <Link href={`/api/payment/${booking._id.toString()}`} className="px-3 py-2 text-sm bg-accent text-white rounded-lg hover:brightness-90 flex justify-center items-center">
            Pay Now
          </Link>
            </>
        ):(
<>
            <Link href={`/hotel/payment/invoice/${booking._id.toString()}`} className="px-3 py-2 text-sm bg-accent text-white rounded-lg hover:brightness-90 flex justify-center items-center">
            View Trip Details
          </Link>
          <Link href={`/api/payment/receipt/${booking._id.toString()}`} className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex justify-center items-center gap-2">
            <FaDownload className="mr-2" />
            Download Receipt
          </Link>
</>
          )
          }
        </div>
      </div>

        ))
      }
    </div>
  </div>

  )
}

export default page