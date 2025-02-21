import { getHotelDetails } from "@/app/actions/guest/getHotelDetails";
import { FaBed, FaStar } from "react-icons/fa";
import { TbBeach } from "react-icons/tb";
import { MdMeetingRoom, MdModeEdit, MdPool } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { TbToolsKitchen2 } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import { IoFitness } from "react-icons/io5";
import calculateRatings from "@/utils/calculateRatings";
import BookingCard from "./BookingCard";
import generateMetadata from "./generateMetadata";
import ReviewsSection from "./ReviewsSection";
import { auth } from "@/auth";
import HotelNotFoundPage from "../../components/HotelNotFoundPage";
import Image from "next/image";
import { BsFillPeopleFill } from "react-icons/bs";
import Link from "next/link";

export { generateMetadata };

const page = async ({ params }) => {
  const session = await auth();

  const hotelID = params.hotelID;
  const response = await getHotelDetails(hotelID);
  if (!response.success) {
    return <HotelNotFoundPage hotelID={hotelID} />;
  }
  const hotel = response.hotel;
  return (
    <div className="bg-gray-50">
      {/* Property Details Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Property Title and Rating */}
        <div className="mb-6">
          <div className="mb-2 flex justify-between">
            <h1 className="text-3xl font-bold">{hotel.title}</h1>
            {session?.user?.email === hotel.ownerEmail && (
              <Link
                href={`/hotel/update/${hotelID}`}
                className="bg-accent px-2 py-1 rounded-md text-white flex gap-1 items-center"
              >
                <MdModeEdit className="text-white text-xl" /> Update
              </Link>
            )}
          </div>
          <div className="flex items-center text-gray-600">
            <FaStar className="text-yellow-500 mr-1" />
            <span>{calculateRatings(hotel)} · </span>
            <span className="ml-2">{hotel?.ratings?.length} reviews</span>
            <span className="mx-2">·</span>
            <span>{hotel.location}</span>
          </div>
        </div>
        {/* Image Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-[500px]">
          <div className="col-span-2 row-span-2">
            <Image
              width={500}
              height={500}
              src={hotel.images[0]}
              alt="Main Room"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <Image
            width={250}
            height={250}
            src={hotel.images[1]}
            alt="Room 1"
            className="w-full h-full object-cover rounded-lg"
          />
          <Image
            width={250}
            height={250}
            src={hotel.images[2]}
            alt="Room 2"
            className="w-full h-full object-cover rounded-lg"
          />
          <Image
            width={250}
            height={250}
            src={hotel.images[3]}
            alt="Room 3"
            className="w-full h-full object-cover rounded-lg"
          />
          <Image
            width={250}
            height={250}
            src={hotel.images[4]}
            alt="Room 4"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        {/* Property Details */}
        <div
          className={`grid gap-8 ${
            session?.user?.email === hotel.ownerEmail
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          {/* Left Column: Property Description */}
          <div className="col-span-2">
            <div className="border-b pb-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Entire villa hosted by {hotel.owner}
              </h2>
              <div className="grid grid-cols-3 gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <BsFillPeopleFill className="text-3xl text-accent" />
                  <span>{hotel.numberOfGuests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdMeetingRoom className="text-accent text-3xl" />
                  <span>{hotel.numberOfBedrooms} bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBed className="text-accent text-3xl" />
                  <span>{hotel.numberOfBeds} beds</span>
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">About this place</h3>
              <p className="text-gray-700 leading-relaxed">
                {hotel.description}
              </p>
            </div>
            {/* Amenities */}
            {(hotel.amenities.beachAccess ||
              hotel.amenities.privatePool ||
              hotel.amenities.freeWiFi ||
              hotel.amenities.kitchen ||
              hotel.amenities.freeParking ||
              hotel.amenities.fitnessCenter) && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    What this place offers
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {hotel.amenities.beachAccess && (
                      <div className="flex items-center gap-2">
                        <TbBeach className="text-accent text-3xl" />
                        <span>Beach access</span>
                      </div>
                    )}
                    {hotel.amenities.privatePool && (
                      <div className="flex items-center gap-2">
                        <MdPool className="text-accent text-3xl" />
                        <span>Private pool</span>
                      </div>
                    )}
                    {hotel.amenities.freeWiFi && (
                      <div className="flex items-center gap-2">
                        <FaWifi className="text-accent text-3xl" />
                        <span>Free Wi-Fi</span>
                      </div>
                    )}
                    {hotel.amenities.kitchen && (
                      <div className="flex items-center gap-2">
                        <TbToolsKitchen2 className="text-accent text-3xl" />
                        <span>Kitchen</span>
                      </div>
                    )}
                    {hotel.amenities.freeParking && (
                      <div className="flex items-center gap-2">
                        <FaCar className="text-accent text-3xl" />
                        <span>Free Parking</span>
                      </div>
                    )}
                    {hotel.amenities.fitnessCenter && (
                      <div className="flex items-center gap-2">
                        <IoFitness className="text-accent text-3xl" />
                        <span>Fitness Center</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>
          {session?.user?.email === hotel.ownerEmail || (
            <BookingCard hotel={hotel} />
          )}
        </div>
      </div>
      {/* Reviews Section */}
      <ReviewsSection
        hotelID={hotel._id.toString()}
        ratings={hotel.ratings}
        ratingCount={calculateRatings(hotel)}
        userEmail={session?.user?.email}
        ownerEmail={hotel.ownerEmail}
      />

      <footer className="mt-12 text-sm text-zinc-500 max-w-7xl mx-auto py-4">
        <p>© 2024 Learn with Sumit • Terms • Privacy • Your Privacy Choices</p>
      </footer>
    </div>
  );
};

export default page;
