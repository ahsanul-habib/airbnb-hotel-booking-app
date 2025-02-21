import getMyHotels from "@/app/actions/owner/getMyHotels";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import DeleteButton from "./deleteButton";
import NoHotelsCreated from "./NoHotelsCreated";
import calculateRatings from "@/utils/calculateRatings";

const Page = async () => {
  const response = await getMyHotels();
  if (!response.success) {
    return <div>{response.message}</div>;
  }
  const myHotels = response.hotels;

  if (myHotels?.length === 0) {
    return <NoHotelsCreated />;
  }

  return (
    <div className="bg-gray-50 font-sans h-full flex-grow">
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex justify-between items-center mb-6 mt-3">
          <h1 className="text-3xl font-bold text-zinc-800">Manage Hotels</h1>
          <button className="bg-accent text-white px-4 py-2 rounded-lg hover:brightness-90 transition-colors">
            + Create Hotel
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Hotel Card 1 */}
          {myHotels.map((hotel) => (
            <div key={hotel.id} className="overflow-hidden cursor-pointer">
              <Link href={`/hotel/details/${hotel.id}`} className="relative">
                <Image
                  height={200}
                  width={500}
                  src={
                    hotel.images[0] ||
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={hotel.title}
                  className="w-full h-48 object-cover rounded-md transition-all hover:scale-105"
                />
                <div className="absolute flex flex-row items-center top-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm font-semibold">
                  <FaStar className="text-yellow-500 mr-1" />
                  {calculateRatings(hotel)}
                </div>
              </Link>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-zinc-800 mb-2">
                  {hotel.title}
                </h2>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600">
                    {hotel.roomsAvailable} Rooms Available
                  </span>
                  <span className="text-rose-600 font-semibold">
                    ${hotel.pricePerNight}/night
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">
                    Location: {hotel.location}
                  </span>
                  <div className="space-x-2 flex flex-row">
                    <Link
                      href={`/hotel/update/${hotel.id}`}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <MdOutlineModeEdit className="text-2xl text-accent" />
                    </Link>
                    <DeleteButton hotelID={hotel.id} hotelName={hotel.title} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
